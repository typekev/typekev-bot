import { Bot } from '../types';
import { de } from './de';
import { en } from './en';
import { fr } from './fr';

export const bots: Record<Bot, typeof en> = {
  de,
  en,
  fr,
};
