import { BayesClassifier } from 'natural';

import { getBotReply } from './helpers/getBotReply';
import { getChatSuggestion } from './helpers/getChatSuggestion';
import classifier from './lu/classifier.json';
import responses from './lu/responses.json';
import { suggestions } from './lu/suggestions.json';

export const lu = {
  getBotReply: getBotReply.bind({
    classifier: BayesClassifier.restore(classifier),
    responses,
  }),
  getChatSuggestion: getChatSuggestion.bind({ suggestions }),
};
