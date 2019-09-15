// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { LuisRecognizer } from 'botbuilder-ai';

class FlightBookingRecognizer {
  constructor(config) {
    const luisIsConfigured =
      config && config.applicationId && config.endpointKey && config.endpoint;
    if (luisIsConfigured) {
      this.recognizer = new LuisRecognizer(config, {}, true);
    }
  }

  get isConfigured() {
    return this.recognizer !== undefined;
  }

  /**
   * Returns an object with preformatted LUIS results for the bot's dialogs to consume.
   * @param {TurnContext} context
   */
  async executeLuisQuery(context) {
    return await this.recognizer.recognize(context);
  }

  getFromEntities({ entities }) {
    let fromValue;
    let fromAirportValue;
    if (entities.$instance.From) {
      fromValue = entities.$instance.From[0].text;
    }
    if (fromValue && entities.From[0].Airport) {
      fromAirportValue = entities.From[0].Airport[0][0];
    }

    return { from: fromValue, airport: fromAirportValue };
  }

  getToEntities({ entities }) {
    let toValue;
    let toAirportValue;
    if (entities.$instance.To) {
      toValue = entities.$instance.To[0].text;
    }
    if (toValue && entities.To[0].Airport) {
      toAirportValue = entities.To[0].Airport[0][0];
    }

    return { to: toValue, airport: toAirportValue };
  }

  /**
   * This value will be a TIMEX. And we are only interested in a Date so grab the first result and drop the Time part.
   * TIMEX is a format that represents DateTime expressions that include some ambiguity. e.g. missing a Year.
   */
  getTravelDate({ entities }) {
    const datetimeEntity = entities.datetime;
    if (!datetimeEntity || !datetimeEntity[0]) return undefined;

    const { timex } = datetimeEntity[0];
    if (!timex || !timex[0]) return undefined;

    const datetime = timex[0].split('T')[0];
    return datetime;
  }
}

export { FlightBookingRecognizer };
