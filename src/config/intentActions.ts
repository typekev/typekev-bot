import type { IntentActionMapping } from '../types';

export const intentActionMappings: IntentActionMapping[] = [
  {
    match: 'services.professional',
    actions: ['email.hire', 'email.mentor', 'internal.connect'],
    suggestions: [
      'When should a team bring Kevin in?',
      'How does Kevin take an AI prototype to production?',
      'Does Kevin mentor engineers?',
    ],
  },
  {
    match: 'ventures.symphonee',
    actions: ['link.symphonee', 'email.collaborate'],
    suggestions: [
      'What is Kevin building with agentic workflows?',
      'What does Kevin build with LangChain and LangGraph?',
    ],
  },
  {
    match: 'ventures.scaletiny',
    actions: ['link.scaletiny', 'link.pollsexporter'],
    suggestions: ['What is Polls Exporter?'],
  },
  {
    match: 'ventures.react_mk',
    actions: ['link.npm.reactmk', 'link.github'],
    suggestions: [],
  },
  {
    match: 'ventures.blob_game',
    actions: ['link.blobgame', 'link.github'],
    suggestions: [],
  },
  {
    match: 'ventures.polls_exporter',
    actions: ['link.pollsexporter', 'link.scaletiny'],
    suggestions: [],
  },
  {
    match: 'work.ses.strategy',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [
      'What work did Kevin do at SES related to innovation?',
      'What did Kevin achieve at SES related to outcomes?',
    ],
  },
  {
    match: 'work.ses.innovation',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: ['What did Kevin achieve at SES related to outcomes?'],
  },
  {
    match: 'work.ses.outcomes',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'work.emailtree.delivery',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: ['How did Kevin help move EmailTree AI toward Azure Marketplace?'],
  },
  {
    match: 'work.emailtree.migration',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: ['How did Kevin help move EmailTree AI toward Azure Marketplace?'],
  },
  {
    match: 'work.emailtree.program',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'work.devoteam.transformation',
    actions: ['email.mentor', 'internal.career'],
    suggestions: ['What was the AI Academy?'],
  },
  {
    match: 'work.devoteam.academy',
    actions: ['email.mentor', 'internal.career'],
    suggestions: [],
  },
  {
    match: 'work.deloitte.expansion',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'work.eib.leader',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'work.eib.technical',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: ['What did Kevin do on the lending app at the EIB?'],
  },
  {
    match: 'work.pwc.engineer',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: ['What did Kevin build at PwC?'],
  },
  {
    match: 'context.projects_overview',
    actions: ['internal.ventures', 'internal.career'],
    suggestions: [
      'What is Kevin working on right now?',
      'What kinds of things does Kevin build?',
      "Can I see Kevin's open-source work?",
    ],
  },
  {
    match: 'context.when_to_involve',
    actions: ['email.hire', 'internal.connect'],
    suggestions: [
      'How does Kevin take an AI prototype to production?',
      'What kinds of projects does Kevin usually work on?',
      'How does Kevin approach legacy code?',
    ],
  },
  {
    match: 'context.prototype_to_production',
    actions: ['email.hire', 'internal.career'],
    suggestions: [
      'How does Kevin help teams become more autonomous?',
      'How does Kevin work on large-scale systems?',
      'How does Kevin balance speed and compliance?',
    ],
  },
  {
    match: 'context.scaling_teams',
    actions: ['email.hire', 'email.mentor', 'internal.career'],
    suggestions: [],
  },
  {
    match: 'context.enterprise_scale',
    actions: ['email.hire', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'context.legacy_modernization',
    actions: ['email.hire', 'internal.career'],
    suggestions: [],
  },
  {
    match: 'context.fintech_and_compliance',
    actions: ['email.hire', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'context.deloitte_kyc',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'context.eib_lending',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'context.pwc_architecture',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'context.emailtree_marketplace',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'context.hyperautomation',
    actions: ['link.symphonee', 'email.collaborate'],
    suggestions: [
      'What is Kevin building with agentic workflows?',
      'What does Kevin build with LangChain and LangGraph?',
    ],
  },
  {
    match: 'context.agentic_systems',
    actions: ['link.symphonee', 'email.collaborate'],
    suggestions: [],
  },
  {
    match: 'context.team_upskilling',
    actions: ['email.mentor', 'internal.career'],
    suggestions: ['Was Kevin involved in the AI Academy at Microsoft?'],
  },
  {
    match: 'context.early_consulting',
    actions: ['email.hire', 'internal.career'],
    suggestions: [],
  },
  {
    match: 'context.networking_roots',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'context.rapid_prototyping',
    actions: ['link.scaletiny', 'email.collaborate'],
    suggestions: [
      'What does Kevin build at Scale Tiny?',
      'What is Polls Exporter?',
      'What is Blob Game?',
    ],
  },
  {
    match: 'context.open_source',
    actions: ['link.github', 'link.npm.reactmk'],
    suggestions: ['What is react-mk?', 'What GitHub achievements does Kevin have?'],
  },
  {
    match: 'context.mobile_cross_platform',
    actions: ['link.blobgame', 'link.github'],
    suggestions: [],
  },
  {
    match: 'approach.tech_stack_selection',
    actions: ['link.github', 'internal.career'],
    suggestions: [],
  },
  {
    match: 'approach.agentic_tools',
    actions: ['link.symphonee', 'email.collaborate'],
    suggestions: [],
  },
  {
    match: 'approach.delivery_velocity',
    actions: ['link.github', 'email.hire'],
    suggestions: [],
  },
  {
    match: 'approach.frontend_architecture',
    actions: ['link.github', 'link.npm.reactmk'],
    suggestions: [],
  },
  {
    match: 'approach.databases',
    actions: ['link.github', 'internal.career'],
    suggestions: [],
  },
  {
    match: 'approach.cloud_platforms',
    actions: ['link.linkedin', 'internal.career'],
    suggestions: [],
  },
  {
    match: 'approach.design_and_3d',
    actions: ['link.github', 'internal.career'],
    suggestions: [],
  },
  {
    match: 'approach.delegation_and_mentorship',
    actions: ['email.mentor', 'internal.career'],
    suggestions: [],
  },
  {
    match: 'domain.space_tech',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'domain.deep_tech_credentials',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'skills.international_experience',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'skills.leadership_and_management',
    actions: ['email.mentor', 'internal.career'],
    suggestions: [],
  },
  {
    match: 'skills.impactful_projects',
    actions: ['internal.career', 'internal.ventures'],
    suggestions: [],
  },
  {
    match: 'skills.industry_expertise',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'skills.professional_development',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [],
  },
  {
    match: 'skills.programming_languages',
    actions: ['link.github', 'internal.career'],
    suggestions: [],
  },
  {
    match: 'skills.frameworks_libraries',
    actions: ['link.github', 'internal.career'],
    suggestions: [
      'What languages does Kevin use most?',
      'How does Kevin think about UX?',
      'What does Kevin build with LangChain and LangGraph?',
    ],
  },
  {
    match: 'skills.databases',
    actions: ['internal.career', 'link.github'],
    suggestions: ['How does Kevin choose a database?'],
  },
  {
    match: 'skills.development_tools_platforms',
    actions: ['internal.career', 'link.github'],
    suggestions: [
      'What CI/CD tools does Kevin use?',
      'What testing tools does Kevin use?',
      'What planning and design tools does Kevin use?',
    ],
  },
  {
    match: 'skills.ci_cd',
    actions: ['internal.career', 'link.github'],
    suggestions: ['How does Kevin ship code?'],
  },
  {
    match: 'skills.testing_linting',
    actions: ['internal.career', 'link.github'],
    suggestions: [],
  },
  {
    match: 'skills.cloud_platforms.azure',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [
      'What Azure certifications does Kevin hold?',
      'What other cloud platforms does Kevin use?',
    ],
  },
  {
    match: 'skills.cloud_platforms.other',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: ['How does Kevin work across AWS and Google Cloud?'],
  },
  {
    match: 'skills.planning_design',
    actions: ['internal.career', 'link.github'],
    suggestions: ['What does Kevin use Figma and Blender for?'],
  },
  {
    match: 'certifications.azure',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: [
      'What deep learning certifications does Kevin have?',
      'What MIT program did Kevin complete?',
    ],
  },
  {
    match: 'certifications.deep_learning',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: ['What MIT program did Kevin complete?'],
  },
  {
    match: 'certifications.mit',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: ['What has Kevin done in space tech?'],
  },
  {
    match: 'education.mit',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: ['What has Kevin done in space tech?'],
  },
  {
    match: 'education.tci_college',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: ['What was Kevin doing before software?'],
  },
  {
    match: 'awards.recognition',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: ['Has Kevin spoken at events?'],
  },
  {
    match: 'reputation.recognition',
    actions: ['internal.career', 'link.linkedin'],
    suggestions: ['Has Kevin spoken at events?'],
  },
  {
    match: 'reputation.github_achievements',
    actions: ['link.github', 'internal.career'],
    suggestions: [],
  },
  {
    match: 'interviews.participation',
    actions: ['link.linkedin', 'internal.career'],
    suggestions: ['Where has Kevin talked about AI?'],
  },
  {
    match: 'smalltalk.greetings.*',
    actions: [],
    suggestions: [
      'What kind of work does Kevin usually do?',
      'What is Kevin building right now?',
      'Does Kevin do consulting or fractional CTO work?',
    ],
  },
  {
    match: 'fallback',
    actions: ['internal.connect', 'internal.career'],
    suggestions: [
      'What kind of work does Kevin usually do?',
      'What is Kevin building right now?',
      'Does Kevin do consulting or fractional CTO work?',
    ],
  },
];

export const fallbackActions = [];

export const persistentSuggestions = [];

export const MAX_ACTIONS = 4;

export const MAX_SUGGESTIONS = 3;
