import DialogBot from './dialogBot';

class DialogAndWelcomeBot extends DialogBot {
  constructor(conversationState, userState, dialog) {
    super(conversationState, userState, dialog);

    this.onMembersAdded(async (_context, next) => {
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }
}

export default DialogAndWelcomeBot;
