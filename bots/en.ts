import { BayesClassifier } from 'natural';

import classifier from './en/classifier.json';
import responses from './en/responses.json';
import { suggestions } from './en/suggestions.json';
import { getBotReply } from './helpers/getBotReply';
import { getChatSuggestion } from './helpers/getChatSuggestion';

export const en = {
  getBotReply: getBotReply.bind({
    classifier: BayesClassifier.restore(classifier),
    responses,
  }),
  getChatSuggestion: getChatSuggestion.bind({ suggestions }),
};
