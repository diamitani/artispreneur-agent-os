/**
 * PAL (Prompt Abstraction Layer) Compiler
 * Transforms natural language intent into agent runtime manifests
 */

import {
  IntentExtraction,
  AgentManifest,
  AgentDomain,
  BehaviorProfile,
} from '@/types/rostr';
import { getAgentByKey } from '@/lib/agents/definitions';
import { getSoulByKey, buildSystemPromptWithSoul } from '@/lib/agents/souls';

// ============================================================================
// Stage 1: Intent Extraction
// ============================================================================

export function extractIntent(userInput: string): IntentExtraction {
  // Parse user input to extract structured intent
  const lowered = userInput.toLowerCase();

  // Domain detection
  let domain: AgentDomain = 'general';
  if (
    lowered.includes('pro') ||
    lowered.includes('bmi') ||
    lowered.includes('ascap') ||
    lowered.includes('royalt') ||
    lowered.includes('split')
  ) {
    domain = 'publishing';
  } else if (
    lowered.includes('release') ||
    lowered.includes('distribut') ||
    lowered.includes('spotify') ||
    lowered.includes('dsp')
  ) {
    domain = 'distribution';
  } else if (
    lowered.includes('sync') ||
    lowered.includes('licens') ||
    lowered.includes('film') ||
    lowered.includes('tv')
  ) {
    domain = 'licensing';
  } else if (
    lowered.includes('llc') ||
    lowered.includes('ein') ||
    lowered.includes('business') ||
    lowered.includes('entity')
  ) {
    domain = 'business';
  } else if (
    lowered.includes('tax') ||
    lowered.includes('book') ||
    lowered.includes('account') ||
    lowered.includes('income')
  ) {
    domain = 'accounting';
  } else if (
    lowered.includes('epk') ||
    lowered.includes('brand') ||
    lowered.includes('trademark') ||
    lowered.includes('press')
  ) {
    domain = 'brand';
  }

  // Urgency detection
  let urgency: 'immediate' | 'queued' | 'scheduled' = 'queued';
  if (lowered.includes('urgent') || lowered.includes('asap') || lowered.includes('now')) {
    urgency = 'immediate';
  } else if (lowered.includes('schedule') || lowered.includes('plan')) {
    urgency = 'scheduled';
  }

  // Extract primary verb and object
  const verbs = [
    'register',
    'create',
    'generate',
    'plan',
    'review',
    'draft',
    'file',
    'setup',
    'track',
    'analyze',
  ];
  let primary_intent = userInput.trim();
  for (const verb of verbs) {
    if (lowered.includes(verb)) {
      primary_intent = `${verb} ${extractSubject(lowered)}`;
      break;
    }
  }

  // Simple ambiguity scoring
  const ambiguity_score = calculateAmbiguity(userInput);

  return {
    primary_intent,
    domain,
    subject: extractSubject(userInput),
    constraints: extractConstraints(userInput),
    desired_output: extractDesiredOutput(userInput),
    urgency,
    ambiguity_score,
  };
}

function extractSubject(text: string): string {
  // Extract nouns/entities (simplified)
  const patterns = [
    /(?:register|create|file|setup)\s+(?:a|an|the)?\s*(\w+(?:\s+\w+)?)/i,
    /(\w+)\s+(?:registration|filing|application)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }

  return text.slice(0, 50);
}

function extractConstraints(text: string): string[] {
  const constraints: string[] = [];

  if (text.match(/deadline|by|before|due/i)) {
    const dateMatch = text.match(
      /(?:by|before|due)\s+([A-Za-z]+\s+\d+|this\s+week|next\s+month)/i
    );
    if (dateMatch) constraints.push(`deadline: ${dateMatch[1]}`);
  }

  if (text.match(/budget|cost|price/i)) {
    constraints.push('budget-conscious');
  }

  if (text.match(/simple|quick|fast/i)) {
    constraints.push('prioritize-speed');
  }

  return constraints;
}

function extractDesiredOutput(text: string): string {
  if (text.match(/draft|document|form/i)) return 'document';
  if (text.match(/plan|timeline|schedule/i)) return 'plan';
  if (text.match(/report|analysis|summary/i)) return 'report';
  if (text.match(/advice|help|guidance/i)) return 'guidance';
  return 'actionable response';
}

function calculateAmbiguity(text: string): number {
  let score = 0.0;

  // Vague language increases ambiguity
  if (text.match(/maybe|might|could|possibly/i)) score += 0.2;
  if (text.match(/something|anything|stuff/i)) score += 0.3;
  if (text.length < 20) score += 0.2;
  if (!text.match(/\b(register|create|file|setup|generate|plan)\b/i))
    score += 0.2;

  return Math.min(1.0, score);
}

// ============================================================================
// Stage 2: Context Injection
// ============================================================================

export interface ContextSources {
  projectContext?: string;
  organizationContext?: string;
  userPreferences?: string;
  recentDecisions?: string[];
}

export function injectContext(
  intent: IntentExtraction,
  sources: ContextSources
): string {
  let context = '';

  if (sources.projectContext) {
    context += `## Project Context\n${sources.projectContext}\n\n`;
  }

  if (sources.organizationContext) {
    context += `## Organization Context\n${sources.organizationContext}\n\n`;
  }

  if (sources.userPreferences) {
    context += `## User Preferences\n${sources.userPreferences}\n\n`;
  }

  if (sources.recentDecisions && sources.recentDecisions.length > 0) {
    context += `## Recent Decisions\n${sources.recentDecisions.join('\n')}\n\n`;
  }

  return context;
}

// ============================================================================
// Stage 3: Semantic Enhancement
// ============================================================================

export function enhanceSemantics(intent: IntentExtraction): string {
  let enhanced = intent.primary_intent;

  // Expand ambiguous verbs
  enhanced = enhanced.replace(/improve/gi, 'identify top 3 issues and propose specific fixes for');
  enhanced = enhanced.replace(/help with/gi, 'provide step-by-step guidance for');
  enhanced = enhanced.replace(/fix/gi, 'diagnose root cause and resolve');

  // Add precision
  if (intent.constraints.length > 0) {
    enhanced += ` with constraints: ${intent.constraints.join(', ')}`;
  }

  if (intent.desired_output !== 'actionable response') {
    enhanced += `. Output format: ${intent.desired_output}`;
  }

  // Add verification requirement
  if (['document', 'filing', 'registration'].some((t) => enhanced.toLowerCase().includes(t))) {
    enhanced += '. Include verification checklist.';
  }

  return enhanced;
}

// ============================================================================
// Stage 4: Runtime Compilation
// ============================================================================

export function compileManifest(
  intent: IntentExtraction,
  enhancedDescription: string,
  contextInjected: string,
  agentKey: string,
  soulKey: string = 'manager'
): AgentManifest {
  const agent = getAgentByKey(agentKey);
  if (!agent) {
    throw new Error(`Agent not found: ${agentKey}`);
  }

  // Determine behavior profile based on domain and soul
  const behaviorProfile: BehaviorProfile = determineBehaviorProfile(
    intent.domain,
    soulKey
  );

  // Build system prompt with soul
  const baseSystemPrompt = buildAgentSystemPrompt(agent.name, agent.description, agent.domain);
  const systemPrompt = buildSystemPromptWithSoul(baseSystemPrompt, soulKey as any);

  const manifest: AgentManifest = {
    runtime: {
      agent_type: determineAgentType(intent.domain),
      model: agent.model,
      temperature: agent.temperature,
      max_parallel_tasks: agent.max_parallel_tasks,
      timeout_seconds: 300,
    },
    instructions: {
      system: systemPrompt,
      behavior_profile: behaviorProfile,
      task_description: `${contextInjected}\n## Task\n${enhancedDescription}`,
      completion_criteria: generateCompletionCriteria(intent),
      escalation_policy: intent.urgency === 'immediate' ? 'auto-proceed' : 'require-approval',
    },
    tools_enabled: {
      allow: agent.tools,
      deny: ['file_system:write:production', 'api:financial:write'],
    },
    memory: {
      mode: 'project',
      context_sources: [`projects/${intent.domain}`, 'user/preferences'],
      save_triggers: ['decisions', 'learnings', 'artifacts'],
    },
    output: {
      format: intent.desired_output === 'document' ? 'markdown' : 'json',
      destination: 'return',
      verification: 'none',
    },
  };

  return manifest;
}

function buildAgentSystemPrompt(name: string, description: string, domain: string): string {
  return `You are the ${name}, a specialized AI agent for music entrepreneurs.

**Your Domain**: ${domain}
**Your Role**: ${description}

You help artists and music entrepreneurs handle the business side of their career with expertise, clarity, and efficiency.

**Core Principles**:
1. Be specific and actionable
2. Cite sources when making claims
3. Flag risks and edge cases
4. Provide clear next steps
5. Save important decisions to memory

When working with users:
- Ask clarifying questions if intent is unclear
- Provide options when multiple paths exist
- Explain trade-offs transparently
- Track progress and deadlines
- Celebrate wins, diagnose blockers`;
}

function determineBehaviorProfile(
  domain: AgentDomain,
  soulKey: string
): BehaviorProfile {
  if (soulKey === 'mentor') return 'investigative';
  if (soulKey === 'executive') return 'analytical';
  if (soulKey === 'hustler') return 'creative';

  // Domain-based defaults
  switch (domain) {
    case 'business':
    case 'accounting':
      return 'analytical';
    case 'brand':
    case 'licensing':
      return 'creative';
    case 'publishing':
    case 'distribution':
      return 'operational';
    default:
      return 'operational';
  }
}

function determineAgentType(domain: AgentDomain): any {
  switch (domain) {
    case 'publishing':
    case 'distribution':
      return 'builder';
    case 'licensing':
    case 'brand':
      return 'designer';
    case 'business':
    case 'accounting':
      return 'specialist';
    default:
      return 'specialist';
  }
}

function generateCompletionCriteria(intent: IntentExtraction): string[] {
  const criteria: string[] = [];

  if (intent.desired_output === 'document') {
    criteria.push('Document is complete with all required sections');
    criteria.push('Format is clear and professional');
  }

  if (intent.desired_output === 'plan') {
    criteria.push('Timeline includes all major milestones');
    criteria.push('Dependencies are identified');
    criteria.push('Deadlines are explicit');
  }

  criteria.push('User question is fully answered');
  criteria.push('Next steps are clear');

  return criteria;
}

// ============================================================================
// Stage 5: Full Compilation Pipeline
// ============================================================================

export async function compilePAL(
  userInput: string,
  agentKey: string,
  soulKey: string = 'manager',
  contextSources: ContextSources = {}
): Promise<AgentManifest> {
  // Stage 1: Extract intent
  const intent = extractIntent(userInput);

  // Stage 2: Inject context
  const context = injectContext(intent, contextSources);

  // Stage 3: Enhance semantics
  const enhanced = enhanceSemantics(intent);

  // Stage 4: Compile manifest
  const manifest = compileManifest(intent, enhanced, context, agentKey, soulKey);

  return manifest;
}
