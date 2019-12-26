import { InputHints } from 'botbuilder';
import { LuisRecognizer } from 'botbuilder-ai';
import {
  ComponentDialog,
  DialogSet,
  DialogTurnStatus,
  TextPrompt,
  WaterfallDialog,
} from 'botbuilder-dialogs';

const MAIN_WATERFALL_DIALOG = 'mainWaterfallDialog';

const finalStep = async stepContext => {
  const end = await stepContext.endDialog();
  return end;
};

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
      new WaterfallDialog(MAIN_WATERFALL_DIALOG, [this.introStep.bind(this), finalStep]),
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

    const luisResult = await this.luisRecognizer.executeLuisQuery(stepContext.context);
    switch (LuisRecognizer.topIntent(luisResult)) {
      default:
        await this.qnaMaker.executeQnAQuery(stepContext.context);
    }

    const next = await stepContext.next();
    return next;
  }
}
