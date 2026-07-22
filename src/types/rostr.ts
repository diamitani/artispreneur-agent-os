/**
 * ROSTR Framework Type Definitions
 * Runtime, Orchestration, State, Tools, Reference
 */

// ============================================================================
// PAL (Prompt Abstraction Layer) Types
// ============================================================================

export interface IntentExtraction {
  primary_intent: string;
  domain: AgentDomain;
  subject: string;
  constraints: string[];
  desired_output: string;
  urgency: 'immediate' | 'queued' | 'scheduled';
  ambiguity_score: number; // 0.0-1.0
}

export interface AgentManifest {
  runtime: {
    agent_type: AgentType;
    model: string;
    temperature: number;
    max_parallel_tasks: number;
    timeout_seconds: number;
  };
  instructions: {
    system: string;
    behavior_profile: BehaviorProfile;
    task_description: string;
    completion_criteria: string[];
    escalation_policy: 'auto-proceed' | 'require-approval' | 'human-in-loop';
  };
  tools_enabled: {
    allow: string[];
    deny: string[];
  };
  memory: {
    mode: 'session' | 'project' | 'persistent';
    context_sources: string[];
    save_triggers: string[];
  };
  output: {
    format: 'markdown' | 'json' | 'code' | 'action';
    destination: string;
    verification: 'none' | 'test' | 'human-review';
  };
}

export type AgentDomain =
  | 'publishing'
  | 'distribution'
  | 'licensing'
  | 'business'
  | 'accounting'
  | 'brand'
  | 'general';

export type AgentType =
  | 'builder'
  | 'researcher'
  | 'reviewer'
  | 'designer'
  | 'deployer'
  | 'debugger'
  | 'specialist';

export type BehaviorProfile =
  | 'analytical'
  | 'creative'
  | 'operational'
  | 'investigative';

// ============================================================================
// NPAO (Navigate, Prioritize, Allocate, Orchestrate) Types
// ============================================================================

export enum Phase {
  PreD = 0, // Pre-Development: Determine IF to build
  Design = 1, // Define WHAT to build and HOW
  Development = 2, // Build it
  Deployment = 3, // Ship it safely
  Debugging = 4, // Fix what's broken
}

export interface PriorityScore {
  phase_urgency: number; // 0-10
  dependency_impact: number; // 0-10
  business_impact: number; // 0-10
  resource_efficiency: number; // 0-10
  composite: number; // Weighted sum
}

export interface TaskClassification {
  phase: Phase;
  priority: PriorityScore;
  estimated_duration_minutes: number;
  dependencies: string[];
  required_tools: string[];
}

export interface AgentAllocation {
  agent_id: string;
  confidence_score: number;
  context_score: number;
  specialization_score: number;
  load_score: number;
}

// ============================================================================
// RAG DAL (Dynamic Acquisition Layer) Types
// ============================================================================

export enum SourceTier {
  Authoritative = 1, // credibility = 1.0
  Editorial = 2, // credibility = 0.75
  Community = 3, // credibility = 0.40
}

export interface RetrievalSource {
  url: string;
  title: string;
  published_date: string;
  tier: SourceTier;
  credibility_score: number;
  content: string;
  summary: string;
}

export interface KnowledgeEntry {
  entry_id: string;
  query_origin: string;
  content: string;
  summary: string;
  source: RetrievalSource;
  metadata: {
    topics: string[];
    entities: string[];
    data_type: 'factual' | 'opinion' | 'statistical' | 'procedural';
  };
  vector_embedding?: number[];
  confidence: number; // 0.0-1.0
  created_at: string;
}

export interface RetrievalPass {
  pass_number: number;
  queries: string[];
  sources_found: RetrievalSource[];
  confidence_by_topic: Record<string, number>;
  gaps_identified: string[];
}

export interface MultiPassResult {
  passes: RetrievalPass[];
  final_confidence: number;
  knowledge_entries: KnowledgeEntry[];
  unresolved_gaps: string[];
}

// ============================================================================
// Rostr Hub (Reference Architecture) Types
// ============================================================================

export interface Project {
  id: string;
  name: string;
  soul: SoulType;
  instructions: string;
  files: ProjectFile[];
  conversations: string[];
  created_at: string;
  updated_at: string;
  owner_id: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: string;
  size: number;
  s3_key?: string;
  uploaded_at: string;
}

export type SoulType = 'manager' | 'mentor' | 'executive' | 'hustler';

export interface Soul {
  key: SoulType;
  name: string;
  description: string;
  system_prompt_modifier: string;
  tone: string;
  verbosity: 'terse' | 'balanced' | 'verbose';
}

export interface AgentRegistration {
  agent_id: string;
  name: string;
  type: AgentType;
  capabilities: string[];
  tools: string[];
  phases: Phase[];
  model: string;
  max_parallel_tasks: number;
  performance_stats: {
    tasks_completed: number;
    avg_completion_time_minutes: number;
    success_rate: number;
  };
}

export interface Decision {
  id: string;
  timestamp: string;
  decision: string;
  rationale: string;
  context: string;
  phase: Phase;
  project_id?: string;
}

export interface Learning {
  id: string;
  timestamp: string;
  agent_id: string;
  insight: string;
  category: 'success' | 'failure' | 'optimization' | 'edge-case';
  context: string;
  applicability: string[];
}

// ============================================================================
// Agent Execution Types
// ============================================================================

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  agent_id?: string;
  metadata?: Record<string, unknown>;
}

export interface Conversation {
  id: string;
  project_id?: string;
  agent_id: string;
  messages: Message[];
  created_at: string;
  updated_at: string;
}

export interface AgentResponse {
  message: string;
  actions?: AgentAction[];
  artifacts?: Artifact[];
  state_updates?: StateUpdate[];
  thinking?: string;
}

export interface AgentAction {
  type: 'file_created' | 'file_updated' | 'task_created' | 'decision_made';
  label: string;
  payload: Record<string, unknown>;
}

export interface Artifact {
  type: 'document' | 'code' | 'filing' | 'report' | 'plan';
  title: string;
  content: string;
  format: string;
}

export interface StateUpdate {
  namespace: 'session' | 'project' | 'organization' | 'agent';
  key: string;
  value: unknown;
  operation: 'set' | 'append' | 'delete';
}

// ============================================================================
// Workspace UI Types
// ============================================================================

export interface NavItem {
  key: string;
  name: string;
  icon: string;
  count?: string;
}

export interface Task {
  id: string;
  name: string;
  status: string;
  dot_color: string;
  agent_id: string;
  phase: Phase;
}

export interface Skill {
  id: string;
  name: string;
  author: string;
  description: string;
  icon: string;
  price: string;
  installs: string;
  category: number;
  installed: boolean;
}

export interface OutputFolder {
  key: string;
  name: string;
  file_count: number;
  files: OutputFile[];
}

export interface OutputFile {
  id: string;
  name: string;
  type: string;
  icon: string;
  date: string;
  size?: number;
}
