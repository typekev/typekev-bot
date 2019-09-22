import { QnAMaker } from 'botbuilder-ai';

export default class QnA {
  constructor(config) {
    const qnaIsConfigured = config && config.knowledgeBaseId && config.endpointKey && config.host;
    if (qnaIsConfigured) {
      this.qnaMaker = new QnAMaker(config);
    }
  }

  get isConfigured() {
    return this.qnaMaker !== undefined;
  }

  /**
   * Returns an object with preformatted QnA results for the bot's dialogs to consume.
   * @param {TurnContext} context
   */
  async executeQnAQuery(context) {
    const qnaResults = await this.qnaMaker.getAnswers(context);
    if (qnaResults[0]) {
      await context.sendActivity(qnaResults[0].answer);
    } else {
      await context.sendActivity("Sorry, I didn't get that.");
    }
  }
}
