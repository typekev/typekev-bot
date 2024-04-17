import { BayesClassifier } from 'natural';

import responses from '../bots/en/responses.json';

type Responses = typeof responses;

const doesIntentExist = (
  intent: string,
  responses: Responses,
): intent is keyof typeof responses => intent in responses;

const getIntent = (
  text: string,
  classifier: BayesClassifier,
  responses: Responses,
): keyof typeof responses | undefined => {
  const intent = classifier.classify(text);
  return doesIntentExist(intent, responses) ? intent : undefined;
};

interface GetBotReply {
  classifier: BayesClassifier;
  responses: Responses;
}

export function getBotReply(this: GetBotReply, text: string) {
  const intent = getIntent(text, this.classifier, this.responses);

  if (intent) {
    const responseOptions = this.responses[intent];
    return responseOptions[Math.floor(Math.random() * responseOptions.length)];
  }
}
