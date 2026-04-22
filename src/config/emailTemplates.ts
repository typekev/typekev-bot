import type { EmailTemplate } from '../types';

const EMAIL_ADDRESS = 'hi@keving.me';

const templates: Record<string, EmailTemplate> = {
  hire: {
    to: EMAIL_ADDRESS,
    subject: 'Work Opportunity',
    body: "Hi Kevin,\n\nI visited keving.me and I'm interested in discussing a potential opportunity.\n\n",
  },
  mentor: {
    to: EMAIL_ADDRESS,
    subject: 'Mentorship Inquiry',
    body: 'Hi Kevin,\n\nI came across your profile and would love to learn more about mentorship opportunities.\n\n',
  },
  collaborate: {
    to: EMAIL_ADDRESS,
    subject: 'Collaboration Idea',
    body: "Hi Kevin,\n\nI visited your site and have a collaboration idea I'd love to discuss.\n\n",
  },
};

export function generateMailtoLink(templateId: string): string {
  const template = templates[templateId];
  if (!template) return `mailto:${EMAIL_ADDRESS}`;

  return `mailto:${template.to}?subject=${encodeURIComponent(template.subject)}&body=${encodeURIComponent(template.body)}`;
}
