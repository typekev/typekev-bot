import { createReadStream } from 'fs';
import { BayesClassifier } from 'natural';
import { parse } from 'csv-parse';

import { Bot, KB } from '../types';
import { getInputFile } from './getInputFile';

const classifier = new BayesClassifier();

Object.values(Bot).forEach(bot => {
  const parser = parse({ delimiter: '\t' }, (_, kb: KB) => {
    kb.slice(1).forEach(([question, answer]) => {
      classifier.addDocument(question, answer);
    });

    classifier.train();
    console.info(`Training complete for ${bot} classifier.`);

    classifier.save(`src/bots/${bot}/classifier.json`, err =>
      err
        ? console.log(err)
        : console.info(
            `Successfully saved ${bot} classifier as src/bots/${bot}/classifier.json`,
          ),
    );
  });

  createReadStream(getInputFile(bot)).pipe(parser);
});
