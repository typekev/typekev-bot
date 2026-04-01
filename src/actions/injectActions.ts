import { actions } from '../config/actions';
import { generateMailtoLink } from '../config/emailTemplates';
import {
  fallbackActions,
  intentActionMappings,
  MAX_ACTIONS,
  persistentSuggestions,
} from '../config/intentActions';
import type { Action, StructuredResponse } from '../types';

function matchesPattern(intent: string, pattern: string): boolean {
  if (pattern === intent) return true;
  if (pattern.endsWith('.*')) {
    const prefix = pattern.slice(0, -2);
    return intent === prefix || intent.startsWith(prefix + '.');
  }
  return false;
}

function findMapping(intent: string) {
  return intentActionMappings.find(mapping => matchesPattern(intent, mapping.match));
}

function resolveActions(actionIds: string[]): Action[] {
  return actionIds
    .map((id, index) => {
      const definition = actions[id];
      if (!definition) return null;

      let payload = definition.payload ?? '';
      if (definition.type === 'email' && definition.emailTemplateId) {
        payload = generateMailtoLink(definition.emailTemplateId);
      }

      const action: Action = {
        label: definition.label,
        type: definition.type,
        payload,
        priority: index < 2 ? 'primary' : 'secondary',
      };

      if (definition.icon) {
        action.icon = definition.icon;
      }

      return action;
    })
    .filter((action): action is Action => action !== null)
    .slice(0, MAX_ACTIONS);
}

export function injectActions(
  intent: string,
  baseText: string,
): StructuredResponse {
  const mapping = findMapping(intent);
  const actionIds = mapping?.actions ?? fallbackActions;
  const suggestions = mapping?.suggestions ?? persistentSuggestions;

  return {
    type: 'response',
    intent,
    content: [{ text: baseText }],
    actions: resolveActions(actionIds),
    suggestions,
  };
}
