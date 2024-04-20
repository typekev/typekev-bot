import { BayesClassifier } from 'natural';

import classifier from './fr/classifier.json';
import responses from './fr/responses.json';
import { suggestions } from './fr/suggestions.json';
import { getBotReply } from '../utils/getBotReply';
import { getChatSuggestion } from '../utils/getChatSuggestion';

export const fr = {
  getBotReply: getBotReply.bind({
    classifier: BayesClassifier.restore(classifier),
    responses,
  }),
  getChatSuggestion: getChatSuggestion.bind({ suggestions }),
};
