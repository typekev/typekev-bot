import dotenv from 'dotenv';
import path from 'path';
import Recognizer from './Recognizer';

const ENV_FILE = path.join(__dirname, '../.env');
dotenv.config({ path: ENV_FILE });

const { LuisAppId, LuisAPIKey, LuisAPIHostName } = process.env;

describe('Tests the LUIS Recognizer', () => {
  it('does not throw', () => {
    const luisConfig = {
      applicationId: LuisAppId,
      endpointKey: LuisAPIKey,
      endpoint: `https://${LuisAPIHostName}`,
    };

    expect(() => new Recognizer(luisConfig)).not.toThrow();
  });
});
