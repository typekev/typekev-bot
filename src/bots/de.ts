import { BayesClassifier } from 'natural';

import classifier from './de/classifier.json';
import responses from './de/responses.json';
import { suggestions } from './de/suggestions.json';
import { getBotReply } from '../utils/getBotReply';Ï
import { getChatSuggestion } from '../utils/getChatSuggestion';

export const de = {
  getBotReply: getBotReply.bind({
    classifier: BayesClassifier.restore(classifier),
    responses,
  }),
  getChatSuggestion: getChatSuggestion.bind({ suggestions }),
};
