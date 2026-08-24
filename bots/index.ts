import { de } from './de';
import { en } from './en';
import { fr } from './fr';
import { lu } from './lu';
import { Bot } from './types';

export const bots: Record<Bot, typeof en> = {
  de,
  en,
  fr,
  lu,
};
