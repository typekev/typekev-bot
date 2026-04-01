type Question = string;
type Answer = string;

export enum Source {
  SmallTalk = 'Editorial.SmallTalk',
  Personal = 'Editorial.Personal',
}

export type KB = [Question, Answer, Source][];

export type ActionType = 'link' | 'email' | 'internal';

export interface Action {
  label: string;
  type: ActionType;
  payload: string;
  priority: 'primary' | 'secondary';
  icon?: string;
}

export interface ContentSection {
  title?: string;
  text: string;
}

export interface StructuredResponse {
  type: 'response';
  intent: string;
  content: ContentSection[];
  actions: Action[];
  suggestions: string[];
}

export interface EmailTemplate {
  to: string;
  subject: string;
  body: string;
}

export interface ActionDefinition {
  label: string;
  type: ActionType;
  payload?: string;
  icon?: string;
  emailTemplateId?: string;
}

export interface IntentActionMapping {
  match: string;
  actions: string[];
  suggestions?: string[];
}
