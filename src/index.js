import dotenv from 'dotenv';
import path from 'path';
import restify from 'restify';
// See https://aka.ms/bot-services
import {
  BotFrameworkAdapter,
  ConversationState,
  InputHints,
  MemoryStorage,
  UserState,
} from 'botbuilder';
import { FlightBookingRecognizer } from './dialogs/flightBookingRecognizer';
import { DialogAndWelcomeBot } from './bots/dialogAndWelcomeBot';
import { MainDialog } from './dialogs/mainDialog';
import { BookingDialog } from './dialogs/bookingDialog';
import startDirectLineConversation from './utils/startDirectLineConversation';
import renewDirectLineToken from './utils/renewDirectLineToken';

const BOOKING_DIALOG = 'bookingDialog';

const ENV_FILE = path.join(__dirname, '../.env');
dotenv.config({ path: ENV_FILE });

const {
  LuisAppId,
  LuisAPIKey,
  LuisAPIHostName,
  MicrosoftAppId: appId,
  MicrosoftAppPassword: appPassword,
  DIRECT_LINE_SECRET,
  PORT = 3978,
} = process.env;

const adapter = new BotFrameworkAdapter({ appId, appPassword });

// See https://aka.ms/about-bot-state
const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

adapter.onTurnError = async (context, error) => {
  // eslint-disable-next-line no-console
  console.error(`\n [onTurnError]: ${error}`);
  const onTurnErrorMessage = `Sorry, it looks like something went wrong!`;
  await context.sendActivity(onTurnErrorMessage, onTurnErrorMessage, InputHints.ExpectingInput);
  await conversationState.delete(context);
};

const luisConfig = {
  applicationId: LuisAppId,
  endpointKey: LuisAPIKey,
  endpoint: `https://${LuisAPIHostName}`,
};

const luisRecognizer = new FlightBookingRecognizer(luisConfig);

const bookingDialog = new BookingDialog(BOOKING_DIALOG);
const dialog = new MainDialog(luisRecognizer, bookingDialog);
const bot = new DialogAndWelcomeBot(conversationState, userState, dialog);

const server = restify.createServer();
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`\n${server.name} listening to ${server.url}`);
});

// Listen for incoming activities and route them to your bot main dialog.
server.post('/api/messages', (req, res) => {
  // Route received a request to adapter for processing
  adapter.processActivity(req, res, async turnContext => {
    // route to bot activity handler.
    await bot.run(turnContext);
  });
});

const trustedOrigin = origin =>
  /^https?:\/\/localhost([/:]|$)/.test(origin) ||
  /^https?:\/\/webchat([/:]|$)/.test(origin) ||
  /^https?:\/\/[\d\w]+\.ngrok\.io([/:]|$)/.test(origin) ||
  /^https:\/\/typekev-bot\.azurewebsites\.net/.test(origin) ||
  /^https:\/\/typekev\.com/.test(origin);

const postDirectLineConversation = async (req, res) => {
  const origin = req.header('origin');

  if (!trustedOrigin(origin)) {
    return res.send(403, 'not trusted origin');
  }

  const { token } = req.query;

  try {
    if (token) {
      res.send(await renewDirectLineToken(token), {
        'Access-Control-Allow-Origin': '*',
      });
    } else {
      res.send(await startDirectLineConversation(), {
        'Access-Control-Allow-Origin': '*',
      });
    }
  } catch (err) {
    res.send(500, err.message, { 'Access-Control-Allow-Origin': '*' });
  }

  if (token) {
    // eslint-disable-next-line no-console
    console.log(`Refreshing Direct Line token for ${origin}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(
      `Requesting Direct Line token for ${origin} using secret "${DIRECT_LINE_SECRET.substr(
        0,
        3,
      )}...${DIRECT_LINE_SECRET.substr(-3)}"`,
    );
  }
  return origin;
};

server.post('/directline/conversations', postDirectLineConversation);
