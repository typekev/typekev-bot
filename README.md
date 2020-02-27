# The witty chatbot running on [typekev.com](https://typekev.com/) [![Build Status](https://travis-ci.org/typekev/typekev-bot.svg?branch=master)](https://travis-ci.org/typekev/typekev-bot) [![Coverage Status](https://coveralls.io/repos/github/typekev/typekev-bot/badge.svg?branch=master)](https://coveralls.io/github/typekev/typekev-bot?branch=master) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> The first iteration of my autonomous assistant, built&mdash;of course&mdash;with Node.js and the Microsoft Bot Framework.

## A live demo is running on [typekev.com](https://typekev.com/)

<br/>
<a href="https://typekev.com">
  <div align="center">
    <img alt="Logo" src="https://raw.githubusercontent.com/typekev/material-ui/typekev/update-showcase/docs/static/images/showcase/typekev.jpg" width="100%" />
  </div>
</a>
<br/>

## Running locally

### :robot: Setup the [Microsoft Bot Framework Emulator](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-debug-emulator?view=azure-bot-service-4.0&tabs=csharp)

This makes it easier to interact with the bot locally.

### :hammer_and_wrench: Use `npm run build` to generate a local `build` folder

The code in `src` is written in es6 and needs to be compiled before running.

### :hammer_and_wrench: Use `npm start` or `npm run watch` to run locally

Runs the bot on [http://localhost:3978/](http://localhost:3978/).

`npm run watch` runs the bot with `nodemon` on the `build` directory. So you'll still need to build to see any changes made in the `src` directory.
