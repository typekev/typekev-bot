import type { ActionDefinition } from '../types';

export const actions: Record<string, ActionDefinition> = {
  'email.hire': {
    label: 'Work together',
    type: 'email',
    icon: 'mail',
    emailTemplateId: 'hire',
  },
  'email.mentor': {
    label: 'Ask about mentorship',
    type: 'email',
    icon: 'mail',
    emailTemplateId: 'mentor',
  },
  'email.collaborate': {
    label: 'Discuss collaboration',
    type: 'email',
    icon: 'mail',
    emailTemplateId: 'collaborate',
  },
  'link.github': {
    label: 'GitHub',
    type: 'link',
    payload: 'https://github.com/typekev',
    icon: 'github',
  },
  'link.linkedin': {
    label: 'LinkedIn',
    type: 'link',
    payload: 'https://linkedin.com/in/typekev',
    icon: 'linkedin',
  },
  'link.symphonee': {
    label: 'Symphonee AI',
    type: 'link',
    payload: 'https://symphonee.ai/',
    icon: 'external-link',
  },
  'link.scaletiny': {
    label: 'Scale Tiny',
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
    label: 'Blob Game',
    type: 'link',
    payload: 'https://blob-game.vercel.app/',
    icon: 'gamepad',
  },
  'link.pollsexporter': {
    label: 'Polls Exporter',
    type: 'link',
    payload:
      'https://chromewebstore.google.com/detail/plhhcimiiomhjmdamdodhihhglifdpem?utm_source=item-share-cb',
    icon: 'external-link',
  },
  'link.site.source': {
    label: 'Site source',
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
    label: 'View Career History',
    type: 'internal',
    payload: '#career-heading',
    icon: 'briefcase',
  },
  'internal.connect': {
    label: 'Connect with Kevin',
    type: 'internal',
    payload: '#connect-heading',
    icon: 'send',
  },
};
