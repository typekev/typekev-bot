# [typekev-bot](https://typekev.com/) [![Build Status](https://travis-ci.com/typekev/typekev-bot.svg?branch=master)](https://travis-ci.org/typekev/typekev-bot) [![Coverage Status](https://coveralls.io/repos/github/typekev/typekev-bot/badge.svg?branch=master)](https://coveralls.io/github/typekev/typekev-bot?branch=master) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

The second iteration of my personal chatbot, based on [botframework-smalltalk](https://github.com/alyssaong1/botframework-smalltalk). See it live [here](https://typekev.com/).

## Training the bot

Run the `train` script to generate a `classifier.json` for each bot within the `src/bots` directory. Training is performed on each bot's associated `knowledgebase.tsv` file. Each bot corresponds to a single language, such as `en` or `fr`.

To support more languages, create a new folder (it's name should correspond to the language the bot will support) in the `src/bots` directory, and add the new bot/language to the `Bot` enum in `types.ts`. Remember to include a `knowledgebase.tsv` file in the new bot/language folder before running the `train` script.

Before testing a bot, make sure the bot's corresponding `responses.json` file exists and that all the possible `Answer`'s found in the bot's associated `knowledgebase.tsv` file are also included as keys in `responses.json`. 

`responses.json` is of type `Record<string, string[]>`. This allows for each bot to have multiple responses for each `Answer` in `knowledgebase.tsv`.

## Testing the chatbot

Run the `start` script to start the `fastify` server. 

Then make a `POST` request to `/{bot}` (where `{bot}` correlates to a value in the `Bot` enum found in `types.ts`) to test the bot on a specific language. It is also possible to test the bot without specifying a language, make a post request to `/`, at which point [`tinyld`](https://github.com/komodojp/tinyld) is used to detect the language of the input text before forwarding it to the bot correlating to the predicted language. If no bot correlates to the predicted language, the `en` bot is used for inference.

In either case, the input text should be provided as plain text in the `body` of the `POST` request.

Inference is performed using each bot's generated `classifier.json` with a [`natural`](https://github.com/NaturalNode/natural/) `BayesClassifier`. The classifier returns an intent corresponding to a key in `responses.json`. 

As each value of `responses.json` is of type `string[]`, a random response is selected from the string array corresponding to the predicted intent on each inference in order that only a single response is returned by each endpoint. This also has the effect that the same input text (i.e `Hello!`) correlating to the same intent (i.e `smalltalk.greetings.hello`) may yield a different response (i.e `Howdy!`, `Good day!`) on each request.