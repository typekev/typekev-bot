/**
 * Client-side bot entry point that uses the lightweight classifier
 * instead of the `natural` npm package. Import this from the site,
 * not the server-side bots/index.ts.
 */
import { injectActions } from '../actions/injectActions';
import { LightBayesClassifier } from '../classifier';
import type { StructuredResponse } from '../types';
import enClassifierData from './en/classifier.json';
import enResponses from './en/responses.json';
import { suggestions as enSuggestions } from './en/suggestions.json';

type Responses = typeof enResponses;

const doesIntentExist = (
  intent: string,
  responses: Responses,
): intent is keyof typeof enResponses => intent in responses;

function createBot(
  classifierData: unknown,
  responses: Responses,
  suggestions: string[],
) {
  const classifier = new LightBayesClassifier(
    classifierData as { classifier: { classFeatures: Record<string, Record<string, number>>; classTotals: Record<string, number>; totalExamples: number; smoothing: number }; features: Record<string, number> },
  );

  return {
    getBotReply(text: string): StructuredResponse | undefined {
      const intent = classifier.classify(text);
      const validIntent = doesIntentExist(intent, responses) ? intent : undefined;

      if (validIntent) {
        const responseOptions = responses[validIntent];
        const baseText = responseOptions[Math.floor(Math.random() * responseOptions.length)];
        return injectActions(validIntent, baseText);
      }
    },

    getChatSuggestion(text: string): string | undefined {
      const lowerTexts = text.toLowerCase().split(' ');

      return suggestions.find(suggestion => {
        const lowerSuggestionWords = suggestion.toLowerCase().split(' ');
        let suggestionIndex = 0;
        let textIndex = 0;

        while (
          suggestionIndex < lowerSuggestionWords.length &&
          textIndex < lowerTexts.length
        ) {
          if (
            lowerSuggestionWords[suggestionIndex].startsWith(lowerTexts[textIndex])
          ) {
            if (
              suggestionIndex < lowerSuggestionWords.length - 1 &&
              textIndex < lowerTexts.length - 1
            ) {
              const nextSuggestionWord = lowerSuggestionWords[suggestionIndex + 1];
              const nextTextWord = lowerTexts[textIndex + 1];
              if (!nextSuggestionWord.startsWith(nextTextWord)) {
                return false;
              }
            }
            textIndex++;
          }
          suggestionIndex++;
        }

        return textIndex === lowerTexts.length;
      });
    },
  };
}

export const en = createBot(enClassifierData, enResponses, enSuggestions);
