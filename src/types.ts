export enum Bot {
  // de = 'de',
  en = 'en',
  fr = 'fr',
  // lu = 'lu',
}

type Question = string;
type Answer = string;

export enum Source {
  SmallTalk = 'Editorial.SmallTalk',
  Personal = 'Editorial.Personal',
}

export type KB = [Question, Answer, Source][];
