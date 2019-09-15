// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { CardFactory } from 'botbuilder';

import { DialogBot } from './dialogBot';
import WelcomeCard from './resources/welcomeCard.json';

class DialogAndWelcomeBot extends DialogBot {
  constructor(conversationState, userState, dialog) {
    super(conversationState, userState, dialog);

    this.onMembersAdded(async (context, next) => {
      const { membersAdded } = context.activity;
      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
          const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
          await context.sendActivity({ attachments: [welcomeCard] });
          await dialog.run(context, conversationState.createProperty('DialogState'));
        }
      }

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }
}

export { DialogAndWelcomeBot };
