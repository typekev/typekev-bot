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

import DialogAndWelcomeBot from './bots/dialogAndWelcomeBot';
import Recognizer from './dialogs/Recognizer';
import MainDialog from './dialogs/MainDialog';
import postDirectLineConversation from './utils/postDirectLineConversation';

const ENV_FILE = path.join(__dirname, '../.env');
dotenv.config({ path: ENV_FILE });

const {
  LuisAppId,
  LuisAPIKey,
  LuisAPIHostName,
  MicrosoftAppId: appId,
  MicrosoftAppPassword: appPassword,
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

const luisRecognizer = new Recognizer(luisConfig);

const dialog = new MainDialog(luisRecognizer);
const bot = new DialogAndWelcomeBot(conversationState, userState, dialog);

const server = restify.createServer();

server.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`\n${server.name} listening to ${server.url}`),
);

// Listen for incoming activities and route them to your bot main dialog.
server.post('/api/messages', (req, res) =>
  // Route received a request to adapter for processing
  adapter.processActivity(req, res, async turnContext => {
    // route to bot activity handler.
    await bot.run(turnContext);
  }),
);

server.post('/directline/conversations', postDirectLineConversation);
