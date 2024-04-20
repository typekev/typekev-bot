import { Bot } from '../types';
import { en } from './en';
import { fr } from './fr';

export const bots: Record<Bot, typeof en> = {
  en,
  fr,
};
