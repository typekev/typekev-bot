import { createReadStream, writeFile } from 'fs';
import { parse } from 'csv-parse';

import { Bot, KB, Source } from '../types';
import { getInputFile } from './getInputFile';

Object.values(Bot).forEach(bot => {
  const parser = parse({ encoding: 'utf-8' }, (_, kb: KB) => {
    const personalQuestions = kb
      .slice(1)
      .filter(([, , source]) => source === Source.Personal)
      .map(([question]) => question);

    console.info(`Suggestions generated for ${bot}.`);

    writeFile(
      `src/bots/${bot}/suggestions.json`,
      JSON.stringify({ suggestions: personalQuestions }),
      'utf-8',
      err =>
        err
          ? console.error(err)
          : console.info(
              `Saved ${bot} suggestions as src/bots/${bot}/classifier.json`,
            ),
    );
  });

  createReadStream(getInputFile(bot), 'utf-8').pipe(parser);
});
