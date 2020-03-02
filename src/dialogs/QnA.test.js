import dotenv from 'dotenv';
import path from 'path';
import QnA from './QnA';

const ENV_FILE = path.join(__dirname, '../.env');
dotenv.config({ path: ENV_FILE });

const { QnAKnowledgebaseId, QnAEndpointKey, QnAEndpointHostName } = process.env;

describe('Tests the QnA', () => {
  it('does not throw', () => {
    const qnaConfig = {
      knowledgeBaseId: QnAKnowledgebaseId,
      endpointKey: QnAEndpointKey,
      host: QnAEndpointHostName,
    };

    expect(() => new QnA(qnaConfig)).not.toThrow();
  });
});
