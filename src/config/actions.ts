import type { ActionDefinition } from '../types';

export const actions: Record<string, ActionDefinition> = {
  'email.hire': {
    label: 'Work with Kevin',
    type: 'email',
    icon: 'mail',
    emailTemplateId: 'hire',
  },
  'email.mentor': {
    label: 'Request Mentorship',
    type: 'email',
    icon: 'mail',
    emailTemplateId: 'mentor',
  },
  'email.collaborate': {
    label: 'Collaborate',
    type: 'email',
    icon: 'mail',
    emailTemplateId: 'collaborate',
  },
  'link.github': {
    label: 'View GitHub',
    type: 'link',
    payload: 'https://github.com/typekev',
    icon: 'github',
  },
  'link.linkedin': {
    label: 'Connect on LinkedIn',
    type: 'link',
    payload: 'https://linkedin.com/in/typekev',
    icon: 'linkedin',
  },
  'link.symphonee': {
    label: 'Explore Symphonee',
    type: 'link',
    payload: 'https://symphonee.ai/',
    icon: 'external-link',
  },
  'link.scaletiny': {
    label: 'Explore Scale Tiny',
    type: 'link',
    payload: 'https://scaletiny.com/',
    icon: 'external-link',
  },
  'link.npm.reactmk': {
    label: 'react-mk on npm',
    type: 'link',
    payload: 'https://www.npmjs.com/package/react-mk',
    icon: 'package',
  },
  'link.blobgame': {
    label: 'Play Blob Game',
    type: 'link',
    payload: 'https://blob-game.vercel.app/',
    icon: 'gamepad',
  },
  'link.site.source': {
    label: 'Site Source Code',
    type: 'link',
    payload: 'https://github.com/typekev/typekev-site',
    icon: 'code',
  },
  'internal.ventures': {
    label: 'View Ventures',
    type: 'internal',
    payload: '#ventures-heading',
    icon: 'rocket',
  },
  'internal.career': {
    label: 'View Career',
    type: 'internal',
    payload: '#career-heading',
    icon: 'briefcase',
  },
  'internal.connect': {
    label: 'Get in Touch',
    type: 'internal',
    payload: '#connect-heading',
    icon: 'send',
  },
};
