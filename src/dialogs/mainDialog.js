import { MessageFactory, InputHints } from 'botbuilder';
import { LuisRecognizer } from 'botbuilder-ai';
import {
  ComponentDialog,
  DialogSet,
  DialogTurnStatus,
  TextPrompt,
  WaterfallDialog,
} from 'botbuilder-dialogs';

const MAIN_WATERFALL_DIALOG = 'mainWaterfallDialog';

export default class MainDialog extends ComponentDialog {
  constructor(luisRecognizer, qnaMaker) {
    super('MainDialog');

    if (!luisRecognizer)
      throw new Error("[MainDialog]: Missing parameter 'luisRecognizer' is required");
    if (!qnaMaker) throw new Error("[MainDialog]: Missing parameter 'luisRecognizer' is required");
    this.luisRecognizer = luisRecognizer;
    this.qnaMaker = qnaMaker;

    // Define the main dialog and its related components.
    // This is a sample "book a flight" dialog.
    this.addDialog(new TextPrompt('TextPrompt')).addDialog(
      new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
        this.introStep.bind(this),
        this.actStep.bind(this),
        this.finalStep.bind(this),
      ]),
    );

    this.initialDialogId = MAIN_WATERFALL_DIALOG;
  }

  /**
   * The run method handles the incoming activity (in the form of a TurnContext)
   * and passes it through the dialog system.
   * If no dialog is active, it will start the default dialog.
   * @param {*} turnContext
   * @param {*} accessor
   */
  async run(turnContext, accessor) {
    const dialogSet = new DialogSet(accessor);
    dialogSet.add(this);

    const dialogContext = await dialogSet.createContext(turnContext);
    const results = await dialogContext.continueDialog();
    if (results.status === DialogTurnStatus.empty) {
      await dialogContext.beginDialog(this.id);
    }
  }

  /**
   * First step in the waterfall dialog. Prompts the user for a command.
   */
  async introStep(stepContext) {
    if (!this.luisRecognizer.isConfigured) {
      const messageText = 'LUIS is not configured';
      await stepContext.context.sendActivity(messageText, null, InputHints.IgnoringInput);
      const next = await stepContext.next();
      return next;
    }

    if (!this.qnaMaker.isConfigured) {
      const messageText = 'QnA is not configured';
      await stepContext.context.sendActivity(messageText, null, InputHints.IgnoringInput);
      const next = await stepContext.next();
      return next;
    }

    const messageText = stepContext.options.restartMsg ? stepContext.options.restartMsg : 'restart';
    const promptMessage = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
    const prompt = await stepContext.prompt('TextPrompt', { prompt: promptMessage });
    return prompt;
  }

  /**
   * Second step in the waterfall.
   * This will use LUIS to attempt to extract the origin, destination and travel dates.
   * Then, it hands off to the bookingDialog child dialog to collect any remaining details.
   */
  async actStep(stepContext) {
    // Call LUIS and gather any potential booking details.
    // (Note the TurnContext has the response to the prompt)
    const luisResult = await this.luisRecognizer.executeLuisQuery(stepContext.context);
    switch (LuisRecognizer.topIntent(luisResult)) {
      default:
        await this.qnaMaker.executeQnAQuery(stepContext.context);
    }

    const next = await stepContext.next();
    return next;
  }

  async finalStep(stepContext) {
    if (stepContext.result) {
      const msg = `final step`;
      await stepContext.context.sendActivity(msg, msg, InputHints.IgnoringInput);
    }

    // Restart the main dialog with a different message the second time around
    const replaceDialog = await stepContext.replaceDialog(this.initialDialogId, {
      restartMsg: 'What else can I do for you?',
    });
    return replaceDialog;
  }
}
