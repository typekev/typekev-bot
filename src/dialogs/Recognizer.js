import { LuisRecognizer } from 'botbuilder-ai';

export default class Recognizer {
  constructor(config) {
    const luisIsConfigured =
      config && config.applicationId && config.endpointKey && config.endpoint;
    if (luisIsConfigured) {
      this.recognizer = new LuisRecognizer(config, {}, true);
    }
  }

  get isConfigured() {
    return this.recognizer !== undefined;
  }

  /**
   * Returns an object with preformatted LUIS results for the bot's dialogs to consume.
   * @param {TurnContext} context
   */
  async executeLuisQuery(context) {
    const result = await this.recognizer.recognize(context);
    return result;
  }
}
