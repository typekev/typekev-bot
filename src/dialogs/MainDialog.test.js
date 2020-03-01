import dotenv from 'dotenv';
import path from 'path';
import Recognizer from './Recognizer';
import QnA from './QnA';
import MainDialog from './MainDialog';

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

describe('Tests the main dialog', () => {
  it('does not throw', () => {
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

    expect(() => new MainDialog(luisRecognizer, qnaMaker)).not.toThrow();
  });
});
