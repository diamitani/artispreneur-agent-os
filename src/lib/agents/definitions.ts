/**
 * Agent Definitions — Six specialized agents for music entrepreneurs
 */

import { Phase, AgentType } from '@/types/rostr';

export interface AgentDefinition {
  key: string;
  name: string;
  icon: string;
  description: string;
  domain: string;
  phases: Phase[];
  capabilities: string[];
  tools: string[];
  model: string;
  temperature: number;
  max_parallel_tasks: number;
}

export const AGENTS: AgentDefinition[] = [
  {
    key: 'pro',
    name: 'Publishing Agent',
    icon: 'music',
    description: 'PROs · splits · royalties',
    domain: 'publishing',
    phases: [Phase.Development, Phase.Debugging],
    capabilities: [
      'pro_registration',
      'split_sheet_generation',
      'royalty_tracking',
      'copyright_registration',
      'publisher_administration',
    ],
    tools: [
      'web_search',
      'document_generation',
      'form_filling',
      'data_extraction',
    ],
    model: 'us.anthropic.claude-sonnet-4-20250514-v1:0',
    temperature: 0.2,
    max_parallel_tasks: 3,
  },
  {
    key: 'dist',
    name: 'Distribution Agent',
    icon: 'radio',
    description: 'releases · DSPs · rollout',
    domain: 'distribution',
    phases: [Phase.Design, Phase.Development, Phase.Deployment],
    capabilities: [
      'release_planning',
      'distributor_selection',
      'dsp_pitching',
      'metadata_management',
      'release_timeline',
    ],
    tools: [
      'web_search',
      'calendar_management',
      'document_generation',
      'data_validation',
    ],
    model: 'us.anthropic.claude-sonnet-4-20250514-v1:0',
    temperature: 0.3,
    max_parallel_tasks: 2,
  },
  {
    key: 'lic',
    name: 'Licensing Agent',
    icon: 'badge-dollar-sign',
    description: 'sync · film · TV · games',
    domain: 'licensing',
    phases: [Phase.PreD, Phase.Development],
    capabilities: [
      'sync_opportunity_matching',
      'pitch_writing',
      'metadata_optimization',
      'licensing_negotiation',
      'clearance_management',
    ],
    tools: [
      'web_search',
      'document_generation',
      'email_drafting',
      'data_analysis',
    ],
    model: 'us.anthropic.claude-sonnet-4-20250514-v1:0',
    temperature: 0.4,
    max_parallel_tasks: 3,
  },
  {
    key: 'biz',
    name: 'Business Agent',
    icon: 'building-2',
    description: 'LLC · EIN · banking',
    domain: 'business',
    phases: [Phase.Design, Phase.Development],
    capabilities: [
      'entity_formation',
      'ein_application',
      'business_banking',
      'registered_agent',
      'operating_agreements',
    ],
    tools: [
      'web_search',
      'form_filling',
      'document_generation',
      'legal_research',
    ],
    model: 'us.anthropic.claude-sonnet-4-20250514-v1:0',
    temperature: 0.1,
    max_parallel_tasks: 2,
  },
  {
    key: 'tax',
    name: 'Accounting Agent',
    icon: 'calculator',
    description: 'books · taxes · income',
    domain: 'accounting',
    phases: [Phase.Development, Phase.Debugging],
    capabilities: [
      'bookkeeping',
      'tax_estimation',
      'income_tracking',
      'expense_categorization',
      'quarterly_filing',
    ],
    tools: [
      'data_analysis',
      'spreadsheet_generation',
      'calculation',
      'report_generation',
    ],
    model: 'us.anthropic.claude-sonnet-4-20250514-v1:0',
    temperature: 0.1,
    max_parallel_tasks: 3,
  },
  {
    key: 'brand',
    name: 'Brand Agent',
    icon: 'sparkles',
    description: 'EPK · trademark · socials',
    domain: 'brand',
    phases: [Phase.PreD, Phase.Design],
    capabilities: [
      'epk_creation',
      'trademark_search',
      'brand_strategy',
      'social_media_planning',
      'press_kit_assembly',
    ],
    tools: [
      'web_search',
      'document_generation',
      'image_analysis',
      'content_writing',
    ],
    model: 'us.anthropic.claude-sonnet-4-20250514-v1:0',
    temperature: 0.5,
    max_parallel_tasks: 2,
  },
];

export function getAgentByKey(key: string): AgentDefinition | undefined {
  return AGENTS.find((a) => a.key === key);
}

export function getAgentsByPhase(phase: Phase): AgentDefinition[] {
  return AGENTS.filter((a) => a.phases.includes(phase));
}

export function getAgentsByDomain(domain: string): AgentDefinition[] {
  return AGENTS.filter((a) => a.domain === domain);
}
