import Fastify from 'fastify';

import { bots } from './bots';
import { Bot } from './types';

const server = Fastify({ logger: true });
const port = process.env.PORT || 3000;

Object.values(Bot).forEach(bot => {
  server.post(`/${bot}`, async ({ body: inputText }) =>
    typeof inputText === 'string'
      ? bots[bot].getBotReply(inputText)
      : `Body was of type '${typeof inputText}', expected 'string'.`,
  );
});

server.listen(port, err => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
