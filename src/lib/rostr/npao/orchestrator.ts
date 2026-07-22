/**
 * NPAO Orchestrator
 * Navigate, Prioritize, Allocate, Orchestrate
 */

import {
  Phase,
  PriorityScore,
  TaskClassification,
  AgentAllocation,
  IntentExtraction,
} from '@/types/rostr';
import { getAgentsByPhase } from '@/lib/agents/definitions';

// ============================================================================
// Phase Classification (5D Taxonomy)
// ============================================================================

export function classifyPhase(intent: IntentExtraction): Phase {
  const text = `${intent.primary_intent} ${intent.subject}`.toLowerCase();

  // Phase 0: PreD (Pre-Development) - Research before building
  if (
    text.match(/research|investigate|should i|feasibility|compare|analyze options/i) ||
    text.match(/what.*best|which.*choose|evaluate/i)
  ) {
    return Phase.PreD;
  }

  // Phase 4: Debugging - Fix what's broken
  if (
    text.match(/fix|debug|broken|error|issue|problem|not working/i) ||
    text.match(/why.*fail|diagnose/i)
  ) {
    return Phase.Debugging;
  }

  // Phase 3: Deployment - Ship it
  if (
    text.match(/deploy|release|publish|launch|submit|file|send/i) ||
    text.match(/go live|ship/i)
  ) {
    return Phase.Deployment;
  }

  // Phase 1: Design - Define what to build
  if (
    text.match(/design|plan|architect|spec|define|outline/i) ||
    text.match(/how should|what structure|blueprint/i)
  ) {
    return Phase.Design;
  }

  // Phase 2: Development - Build it (default)
  return Phase.Development;
}

// ============================================================================
// Priority Scoring (4D Dimensions)
// ============================================================================

export function calculatePriority(
  intent: IntentExtraction,
  phase: Phase,
  context: {
    blockedTasks?: number;
    revenueImpact?: boolean;
    estimatedHours?: number;
  } = {}
): PriorityScore {
  // Dimension 1: Phase Urgency (0-10)
  const phaseUrgencyBase: Record<Phase, number> = {
    [Phase.Debugging]: 10, // Production issues
    [Phase.Deployment]: 8, // Active releases
    [Phase.Development]: 6, // Blocked sprints
    [Phase.Design]: 4, // Pre-development
    [Phase.PreD]: 2, // Research
  };

  let phaseUrgency = phaseUrgencyBase[phase];

  // Modifiers
  if (intent.urgency === 'immediate') phaseUrgency += 2;
  if (context.revenueImpact) phaseUrgency += 2;
  phaseUrgency = Math.min(10, phaseUrgency);

  // Dimension 2: Dependency Impact (0-10)
  const blockedTasks = context.blockedTasks || 0;
  let dependencyImpact = 0;
  if (blockedTasks === 0) dependencyImpact = 0;
  else if (blockedTasks <= 2) dependencyImpact = 3;
  else if (blockedTasks <= 5) dependencyImpact = 6;
  else dependencyImpact = 10;

  // Dimension 3: Business Impact (0-10)
  let businessImpact = 5; // default
  if (context.revenueImpact) businessImpact = 9;
  else if (intent.domain === 'accounting' || intent.domain === 'business') {
    businessImpact = 7;
  } else if (intent.domain === 'brand') {
    businessImpact = 4;
  }

  // Dimension 4: Resource Efficiency (0-10)
  const estimatedHours = context.estimatedHours || 4;
  let resourceEfficiency = 10;
  if (estimatedHours < 1) resourceEfficiency = 10;
  else if (estimatedHours <= 4) resourceEfficiency = 7;
  else if (estimatedHours <= 8) resourceEfficiency = 4;
  else resourceEfficiency = 2;

  // Composite Score
  const composite =
    phaseUrgency * 0.35 +
    dependencyImpact * 0.3 +
    businessImpact * 0.25 +
    resourceEfficiency * 0.1;

  return {
    phase_urgency: phaseUrgency,
    dependency_impact: dependencyImpact,
    business_impact: businessImpact,
    resource_efficiency: resourceEfficiency,
    composite: Math.round(composite * 10) / 10,
  };
}

// ============================================================================
// Agent Allocation
// ============================================================================

export function allocateAgent(
  task: TaskClassification,
  availableAgents: string[]
): AgentAllocation | null {
  // Get agents that support this phase
  const eligibleAgents = getAgentsByPhase(task.phase).filter((a) =>
    availableAgents.includes(a.key)
  );

  if (eligibleAgents.length === 0) return null;

  // Score each eligible agent
  const scored = eligibleAgents.map((agent) => {
    // Context score (simplified - would use vector similarity in production)
    const contextScore = 0.8;

    // Specialization score (capability overlap)
    const specializationScore = task.required_tools.filter((tool) =>
      agent.tools.includes(tool)
    ).length / Math.max(1, task.required_tools.length);

    // Load score (assume all agents have capacity for now)
    const loadScore = 1.0;

    // Composite confidence
    const confidence =
      contextScore * 0.5 +
      specializationScore * 0.35 +
      loadScore * 0.15;

    return {
      agent_id: agent.key,
      confidence_score: confidence,
      context_score: contextScore,
      specialization_score: specializationScore,
      load_score: loadScore,
    };
  });

  // Return highest scoring agent
  scored.sort((a, b) => b.confidence_score - a.confidence_score);
  return scored[0];
}

// ============================================================================
// Full NPAO Pipeline
// ============================================================================

export interface NPAOResult {
  classification: TaskClassification;
  priority: PriorityScore;
  allocation: AgentAllocation | null;
  recommendation: string;
}

export function orchestrate(
  intent: IntentExtraction,
  context: {
    blockedTasks?: number;
    revenueImpact?: boolean;
    estimatedHours?: number;
    availableAgents?: string[];
  } = {}
): NPAOResult {
  // 1. Navigate: Classify phase
  const phase = classifyPhase(intent);

  // 2. Prioritize: Calculate multi-dimensional score
  const priority = calculatePriority(intent, phase, context);

  // 3. Classify: Build task classification
  const classification: TaskClassification = {
    phase,
    priority,
    estimated_duration_minutes: (context.estimatedHours || 4) * 60,
    dependencies: [],
    required_tools: determineRequiredTools(intent),
  };

  // 4. Allocate: Match to agent
  const availableAgents = context.availableAgents || [
    'pro',
    'dist',
    'lic',
    'biz',
    'tax',
    'brand',
  ];
  const allocation = allocateAgent(classification, availableAgents);

  // 5. Orchestrate: Generate recommendation
  const recommendation = generateRecommendation(
    classification,
    priority,
    allocation
  );

  return {
    classification,
    priority,
    allocation,
    recommendation,
  };
}

function determineRequiredTools(intent: IntentExtraction): string[] {
  const tools: string[] = [];

  if (intent.domain === 'publishing' || intent.domain === 'business') {
    tools.push('form_filling', 'document_generation');
  }

  if (intent.domain === 'licensing' || intent.domain === 'brand') {
    tools.push('web_search', 'content_writing');
  }

  if (intent.domain === 'distribution') {
    tools.push('calendar_management', 'data_validation');
  }

  if (intent.domain === 'accounting') {
    tools.push('calculation', 'data_analysis');
  }

  return tools;
}

function generateRecommendation(
  classification: TaskClassification,
  priority: PriorityScore,
  allocation: AgentAllocation | null
): string {
  const urgency = priority.composite >= 7.0 ? 'immediate' : priority.composite >= 4.0 ? 'queued' : 'backlog';

  let rec = `Phase: ${Phase[classification.phase]} | Priority: ${priority.composite}/10 (${urgency})`;

  if (allocation) {
    rec += ` | Allocated to: ${allocation.agent_id} (confidence: ${Math.round(allocation.confidence_score * 100)}%)`;
  } else {
    rec += ` | No eligible agent available`;
  }

  return rec;
}
