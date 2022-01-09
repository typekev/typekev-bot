export enum Bot {
  en = 'en',
}

type Question = string;
type Answer = string;

export enum Source {
  SmallTalk = 'Editorial.SmallTalk',
  Personal = 'Editorial.Personal',
}

export type KB = [Question, Answer, Source][];
