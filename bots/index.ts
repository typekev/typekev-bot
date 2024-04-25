import { Bot } from './types';
import { de } from './de';
import { en } from './en';
import { fr } from './fr';
import { lu } from './lu';

export const bots: Record<Bot, typeof en> = {
  de,
  en,
  fr,
  lu,
};
