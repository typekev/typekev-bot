import { detect } from 'tinyld';
import { Bot } from '../types';

const isLanguageSupported = (language: string): language is Bot =>
  language in Bot;

export const detectLanguage = (text: string): Bot => {
  const language = detect(text);

  if (isLanguageSupported(language)) {
    return language;
  }

  return Bot.en;
};
