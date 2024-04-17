import { BayesClassifier } from 'natural';

import { getBotReply } from '../utils/getBotReply';
import classifier from './en/classifier.json';
import responses from './en/responses.json';

export const en = {
  getBotReply: getBotReply.bind({
    classifier: BayesClassifier.restore(classifier),
    responses,
  }),
};
