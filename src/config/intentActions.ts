import type { IntentActionMapping } from '../types';

export const intentActionMappings: IntentActionMapping[] = [
  {
    match: 'work.*',
    actions: ['email.hire', 'link.linkedin', 'internal.career'],
    suggestions: ['What are Kevin\'s skills?', 'What certifications does Kevin hold?'],
  },
  {
    match: 'skills.programming_languages',
    actions: ['link.github', 'link.npm.reactmk', 'email.hire'],
    suggestions: ['What frameworks does Kevin use?', 'What work does Kevin do?'],
  },
  {
    match: 'skills.frameworks_libraries',
    actions: ['link.github', 'link.npm.reactmk', 'email.hire'],
    suggestions: ['What programming languages does Kevin know?', 'What work does Kevin do?'],
  },
  {
    match: 'skills.*',
    actions: ['email.hire', 'link.github'],
    suggestions: ['What work does Kevin do?', 'What certifications does Kevin hold?'],
  },
  {
    match: 'certifications.*',
    actions: ['link.linkedin', 'email.hire'],
    suggestions: ['What are Kevin\'s skills?', 'What work does Kevin do?'],
  },
  {
    match: 'education.*',
    actions: ['link.linkedin'],
    suggestions: ['What certifications does Kevin hold?', 'What are Kevin\'s skills?'],
  },
  {
    match: 'awards.*',
    actions: ['link.linkedin', 'email.hire'],
    suggestions: ['What work does Kevin do?', 'What are Kevin\'s skills?'],
  },
  {
    match: 'interviews.*',
    actions: ['link.linkedin'],
    suggestions: ['What work does Kevin do?', 'What are Kevin\'s skills?'],
  },
  {
    match: 'smalltalk.greetings.hello',
    actions: ['internal.ventures', 'internal.career'],
    suggestions: ['What does Kevin do?', 'What are Kevin\'s skills?', 'What are Kevin\'s ventures?'],
  },
  {
    match: 'smalltalk.greetings.*',
    actions: [],
    suggestions: ['What does Kevin do?', 'What are Kevin\'s skills?'],
  },
  {
    match: 'smalltalk.agent.can_you_help',
    actions: ['internal.ventures', 'email.hire'],
    suggestions: ['What does Kevin do?', 'What are Kevin\'s skills?'],
  },
  {
    match: 'smalltalk.agent.acquaintance',
    actions: ['internal.ventures', 'internal.career'],
    suggestions: ['What does Kevin do?', 'What are Kevin\'s skills?'],
  },
  {
    match: 'fallback',
    actions: ['internal.connect', 'email.hire'],
    suggestions: ['What does Kevin do?', 'What are Kevin\'s skills?', 'What are Kevin\'s ventures?'],
  },
];

export const fallbackActions = ['internal.connect', 'email.hire'];

export const persistentSuggestions = [
  'What does Kevin do?',
  'What are Kevin\'s skills?',
  'What are Kevin\'s ventures?',
  'What certifications does Kevin hold?',
];

export const MAX_ACTIONS = 4;
