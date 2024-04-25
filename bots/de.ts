import { BayesClassifier } from 'natural';

import classifier from './de/classifier.json';
import responses from './de/responses.json';
import { suggestions } from './de/suggestions.json';
import { getBotReply } from './helpers/getBotReply';
import { getChatSuggestion } from './helpers/getChatSuggestion';

export const de = {
  getBotReply: getBotReply.bind({
    classifier: BayesClassifier.restore(classifier),
    responses,
  }),
  getChatSuggestion: getChatSuggestion.bind({ suggestions }),
};
