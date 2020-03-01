import dotenv from 'dotenv';
import path from 'path';
import { MemoryStorage, UserState, ConversationState } from 'botbuilder';
import DialogAndWelcomeBot from './dialogAndWelcomeBot';
import Recognizer from '../dialogs/Recognizer';
import QnA from '../dialogs/QnA';
import MainDialog from '../dialogs/MainDialog';

const ENV_FILE = path.join(__dirname, '../.env');
dotenv.config({ path: ENV_FILE });

const {
  LuisAppId,
  LuisAPIKey,
  LuisAPIHostName,
  QnAKnowledgebaseId,
  QnAEndpointKey,
  QnAEndpointHostName,
} = process.env;

describe('Tests the welcome dialog', () => {
  it('does not throw', () => {
    const memoryStorage = new MemoryStorage();
    const conversationState = new ConversationState(memoryStorage);
    const userState = new UserState(memoryStorage);

    const luisConfig = {
      applicationId: LuisAppId,
      endpointKey: LuisAPIKey,
      endpoint: `https://${LuisAPIHostName}`,
    };

    const qnaConfig = {
      knowledgeBaseId: QnAKnowledgebaseId,
      endpointKey: QnAEndpointKey,
      host: QnAEndpointHostName,
    };

    const luisRecognizer = new Recognizer(luisConfig);
    const qnaMaker = new QnA(qnaConfig);

    const dialog = new MainDialog(luisRecognizer, qnaMaker);
    expect(() => new DialogAndWelcomeBot(conversationState, userState, dialog)).not.toThrow();
  });
});
