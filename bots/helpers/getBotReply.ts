import { BayesClassifier } from 'natural';

import { injectActions } from '../../actions/injectActions';
import type { StructuredResponse } from '../../types';
import responses from '../en/responses.json';

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

export function getBotReply(
  this: GetBotReply,
  text: string,
): StructuredResponse | undefined {
  const intent = getIntent(text, this.classifier, this.responses);

  if (intent) {
    const responseOptions = this.responses[intent];
    const baseText =
      responseOptions[Math.floor(Math.random() * responseOptions.length)];
    return injectActions(intent, baseText);
  }
}
