import Fastify from 'fastify';

import { detectLanguage } from './utils/detectLanguage';
import { bots } from './bots';
import { Bot } from './types';

const server = Fastify({ logger: true });
const port = parseInt(process.env.PORT || '3000');

server.post('/', async ({ body: inputText }) =>
  typeof inputText === 'string'
    ? bots[detectLanguage(inputText)].getBotReply(inputText)
    : `Body was of type '${typeof inputText}', expected 'string'.`,
);

Object.values(Bot).forEach(bot => {
  server.post(`/${bot}`, async ({ body: inputText }) =>
    typeof inputText === 'string'
      ? bots[bot].getBotReply(inputText)
      : `Body was of type '${typeof inputText}', expected 'string'.`,
  );
});

Object.values(Bot).forEach(bot => {
  server.post(`/${bot}/suggestion`, async ({ body: inputText }) =>
    typeof inputText === 'string'
      ? bots[bot].getChatSuggestion(inputText)
      : `Body was of type '${typeof inputText}', expected 'string'.`,
  );
});

server.listen({ port }, err => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
