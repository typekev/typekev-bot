import { QnAMaker } from 'botbuilder-ai';
import { MessageFactory } from 'botbuilder';

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
      const { prompts } = qnaResults[0].context;
      const hasPrompts = prompts.length > 0;

      if (hasPrompts) {
        const reply = MessageFactory.suggestedActions(
          prompts.map(({ displayText }) => displayText),
          qnaResults[0].answer,
        );
        await context.sendActivity(reply);
      } else {
        await context.sendActivity(qnaResults[0].answer);
      }
    } else {
      await context.sendActivity("Sorry, I didn't get that.");
    }
  }
}
