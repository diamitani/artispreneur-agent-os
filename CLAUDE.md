# Artispreneur Agent OS — ROSTR Framework Implementation

**Production-grade multi-agent operating system for music entrepreneurs**

## Core Architecture: ROSTR Framework

This project implements the ROSTR framework for agentic systems:
- **PAL** (Prompt Abstraction Layer): Intent → Agent manifest compilation
- **RAG DAL** (Dynamic Acquisition Layer): Multi-pass hierarchical retrieval
- **NPAO** (Navigate, Prioritize, Allocate, Orchestrate): Phase-aware routing
- **Rostr Hub**: Persistent reference architecture with knowledge compounding

## Mandatory Principles

### 1. All Agent Invocations Flow Through PAL
- Never use raw prompts directly
- Always compile user intent through PAL pipeline
- Inject context from Reference Hub
- Generate runtime manifests with tools, memory, behavior profiles

### 2. Phase Classification Precedes Allocation
5D Phase Taxonomy (ALWAYS determine before routing):
- **Phase 0: PreD** — Is this worth building? (research only, NO code)
- **Phase 1: Design** — What to build & how it should behave
- **Phase 2: Development** — Implementation & testing
- **Phase 3: Deployment** — Ship it safely
- **Phase 4: Debugging** — Fix what's broken

### 3. Knowledge Retrieval Uses Hierarchical Credibility
3-tier source architecture:
- **Tier 1** (credibility=1.0): Academic, official docs, standards
- **Tier 2** (credibility=0.75): Major news, trade publications, analyst reports
- **Tier 3** (credibility=0.40): Blogs, social, forums, user reviews

Multi-pass until confidence ≥ 0.8 per topic.

### 4. State Updates Persist to Reference Hub
```
.rostr/
├── agents/          # Agent manifests
├── decisions.md     # Key decisions + rationale
├── learnings.jsonl  # Agent insights
└── knowledge-base/  # RAG DAL outputs
```

4-level state hierarchy:
1. Session (ephemeral, in-memory)
2. Project (persistent, DynamoDB + S3)
3. Organization (evolving, version-controlled)
4. Agent (portable, agent namespace)

### 5. Cross-Namespace Access Requires Permission
Scoped context prevents pollution. Explicit permissions required for:
- Reading from other projects
- Writing to organization namespace
- Accessing team shared context

## Agent System

### Six Specialized Agents

1. **Publishing Agent** (`key: 'pro'`)
   - PROs, splits, royalties, work registration
   - Icon: music
   - Phase focus: Development, Debugging

2. **Distribution Agent** (`key: 'dist'`)
   - Releases, DSPs, rollout planning
   - Icon: radio
   - Phase focus: Design, Development, Deployment

3. **Licensing Agent** (`key: 'lic'`)
   - Sync, film, TV, games placement
   - Icon: badge-dollar-sign
   - Phase focus: PreD, Development

4. **Business Agent** (`key: 'biz'`)
   - LLC, EIN, banking, entity formation
   - Icon: building-2
   - Phase focus: Design, Development

5. **Accounting Agent** (`key: 'tax'`)
   - Books, taxes, income tracking
   - Icon: calculator
   - Phase focus: Development, Debugging

6. **Brand Agent** (`key: 'brand'`)
   - EPK, trademark, socials
   - Icon: sparkles
   - Phase focus: PreD, Design

### Four Soul Personalities

Projects can configure agent personality:

1. **The Manager** — Direct, deadline-driven, keeps on schedule
2. **The Mentor** — Explains why behind every step (educational)
3. **The Executive** — Short reports, big picture, no fluff
4. **The Hustler** — Aggressive outreach energy, always pitching

## File Organization

```
src/
├── app/
│   ├── workspace/              # Main workspace UI
│   ├── api/
│   │   ├── auth/               # Cognito OAuth
│   │   ├── agents/execute/     # Agent execution endpoint
│   │   ├── pal/compile/        # PAL compilation
│   │   ├── projects/           # Project CRUD
│   │   └── skills/             # Skills marketplace
│   └── layout.tsx
├── components/
│   ├── workspace/
│   │   ├── WorkspaceSidebar.tsx
│   │   ├── ChatInterface.tsx
│   │   ├── ProjectsView.tsx
│   │   ├── SkillsView.tsx
│   │   └── OutputsView.tsx
│   └── ui/                     # Shared components
├── lib/
│   ├── rostr/
│   │   ├── pal/
│   │   │   ├── intent-extractor.ts
│   │   │   ├── context-injector.ts
│   │   │   ├── semantic-enhancer.ts
│   │   │   └── compiler.ts
│   │   ├── rag-dal/
│   │   │   ├── multi-pass-retrieval.ts
│   │   │   ├── source-tiers.ts
│   │   │   └── confidence-scorer.ts
│   │   ├── npao/
│   │   │   ├── phase-classifier.ts
│   │   │   ├── priority-scorer.ts
│   │   │   └── allocator.ts
│   │   └── hub/
│   │       ├── store.ts
│   │       ├── registry.ts
│   │       └── namespaces.ts
│   ├── agents/
│   │   ├── definitions.ts      # Agent configs
│   │   ├── souls.ts            # Personality profiles
│   │   └── executor.ts         # Bedrock execution
│   ├── aws/
│   │   ├── cognito.ts
│   │   ├── dynamodb.ts
│   │   ├── s3.ts
│   │   └── bedrock.ts
│   └── auth/
│       ├── middleware.ts
│       └── session.ts
└── types/
    ├── rostr.ts
    ├── agent.ts
    └── project.ts
```

## Design System

Artispreneur Brand (v1.0):
- **Crimson**: `#CC0000` (primary action, agent icons)
- **Gold**: `#FED001` (accents, status indicators, souls)
- **Dark**: `#111111` → `#333333` (backgrounds, surfaces)

Typography:
- **Serif**: Libre Baskerville (headings, branding)
- **Sans**: Inter (body, UI)
- **Mono**: IBM Plex Mono (code, technical labels)

Component patterns match `Agent Workspace.dc.html` reference:
- Dark sidebar (280px) with nav, tasks, conversation history
- Main content area with grid background + radial gradient overlay
- Message bubbles with rise-in animation
- Thinking indicator with dot pulse animation

## Development Workflow

### When Building Features

1. **Determine Phase** (PreD/Design/Dev/Deploy/Debug)
2. **If PreD**: Research only, document findings, NO implementation
3. **If Design**: Spec interfaces, data models, architecture
4. **If Development**: Write code, tests, documentation
5. **If Deployment**: CI/CD, staging, production verification
6. **If Debugging**: Root cause → Fix → Regression test → Post-mortem

### When Adding Agents

1. Create manifest in `.rostr/agents/{name}.yaml`
2. Define in `src/lib/agents/definitions.ts`
3. Add soul behavior profiles in `src/lib/agents/souls.ts`
4. Wire execution in `src/lib/agents/executor.ts`
5. Update workspace UI to include in agent selector

### When Implementing New Skills

1. Create skill definition with metadata
2. Implement skill handler (function or workflow)
3. Add to Skills Marketplace UI
4. Configure pricing (Free or paid via Stripe)
5. Wire installation flow to user profile

## AWS Integration

### Required Services

- **Cognito**: OAuth PKCE authentication
- **DynamoDB**: State persistence (users, projects, agents)
- **S3**: Hub storage (files, knowledge base)
- **Bedrock**: Claude Sonnet 4 execution

### Environment Configuration

All AWS credentials in `.env`:
```
COGNITO_DOMAIN=https://artispreneur-{env}.auth.{region}.amazoncognito.com
COGNITO_CLIENT_ID=...
DYNAMODB_INSTANCE_TABLE=artispreneur-instances
S3_HUB_BUCKET=artispreneur-hub
BEDROCK_MODEL_ID=us.anthropic.claude-sonnet-4-20250514-v1:0
```

## Testing Philosophy

- **Unit tests**: PAL compilation, phase classification, priority scoring
- **Integration tests**: Agent execution, RAG retrieval, Hub persistence
- **E2E tests**: Full user flows (create project → chat → output)
- **No mocks for external services**: Use test AWS accounts

## Performance Targets

- PAL compilation: <200ms
- Agent response (streaming): First token <800ms
- RAG retrieval pass: <500ms per pass
- Hub state write: <100ms (DynamoDB)
- Page load: <1s (workspace UI)

## Security Considerations

- All user input sanitized before PAL compilation
- Agent tools scoped to user permissions
- Hub namespaces enforce access control
- No secrets in client code (server-side only)
- CORS restricted to app domains
- Rate limiting on all API endpoints

## Anti-Patterns to Avoid

❌ **Prompting bottleneck**: User writes raw prompts (use PAL)
❌ **Retrieval brittleness**: Single-pass search (use multi-pass RAG DAL)
❌ **Context loss**: Agents restart from scratch (persist to Hub)
❌ **Naive routing**: Keyword matching (use NPAO phase classification)
❌ **Code in PreD**: Writing code before research phase completes

## Success Criteria

A properly implemented ROSTR system:
- ✅ Compiles ALL intents through PAL (no raw prompts)
- ✅ Classifies phase before agent allocation
- ✅ Retrieves knowledge with tier stratification
- ✅ Persists decisions, learnings, artifacts to Hub
- ✅ Compounds knowledge across conversations
- ✅ Matches agents to phases based on specialization

## References

**ROSTR Framework**: "A Unified Architecture for Production-Grade Multi-Agent Systems with Phase-Aware Orchestration and Persistent Knowledge Compounding" by Patrick Diamitani, April 2026

Components:
- **PAL**: Prompt Abstraction Layer (Intent Compiler)
- **RAG DAL**: Retrieval-Augmented Generation Dynamic Acquisition Layer
- **NPAO**: Navigate, Prioritize, Allocate, Orchestrate
- **Rostr Hub**: Agent Operating System with Persistent Reference Architecture

---

When Claude Code works on this project, follow these principles strictly. The ROSTR framework is not optional — it's the foundation of how this system operates.
