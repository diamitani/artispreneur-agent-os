# Artispreneur Agent OS

**ROSTR-powered multi-agent operating system for music entrepreneurs**

A production-grade agentic platform built on the ROSTR framework (Runtime, Orchestration, State, Tools, Reference) with phase-aware workflow management and persistent knowledge compounding.

## 🎯 What is Artispreneur Agent OS?

Artispreneur Agent OS is an intelligent workspace where music entrepreneurs interact with specialized AI agents that handle the business side of their career:

- **Publishing Agent** — PRO registration, splits, royalties
- **Distribution Agent** — DSPs, releases, rollout planning
- **Licensing Agent** — Sync placement, film/TV/games
- **Business Agent** — LLC formation, EIN, banking
- **Accounting Agent** — Books, taxes, income tracking
- **Brand Agent** — EPK, trademark, social media

Each agent has customizable "souls" (personalities):
- **The Manager** — Direct, deadline-driven, keeps you on schedule
- **The Mentor** — Explains the why behind every step
- **The Executive** — Short reports, big picture, no fluff
- **The Hustler** — Aggressive outreach energy, always pitching

## 🏗️ Architecture

Built on the **ROSTR Framework**:

### PAL (Prompt Abstraction Layer)
Intent compilation transforms natural language into strict agent runtime manifests with:
- Intent extraction & semantic enhancement
- Context injection from Reference Hub
- Runtime compilation with tools, memory, and behavior profiles

### RAG DAL (Dynamic Acquisition Layer)
Multi-pass retrieval with 3-tier source credibility:
- **Tier 1** (1.0): Academic & authoritative sources
- **Tier 2** (0.75): Verified editorial & trade publications
- **Tier 3** (0.40): Community & user-generated content

### NPAO (Navigate, Prioritize, Allocate, Orchestrate)
5D phase taxonomy with 4D priority scoring:
- **Phases**: PreD → Design → Development → Deployment → Debugging
- **Priority**: Phase urgency × Dependency impact × Business impact × Resource efficiency

### Rostr Hub (Agent Operating System)
Persistent reference architecture with:
- Projects namespace (files, instructions, soul, conversations)
- Organizations namespace (ICP, positioning, playbooks)
- Teams namespace (agents, conventions, shared context)
- Global namespace (public knowledge base)

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- AWS Account with:
  - Cognito User Pool configured
  - DynamoDB tables
  - S3 bucket for Hub storage
  - Bedrock access (Claude Sonnet 4)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/artispreneur-agent-os.git
cd artispreneur-agent-os

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Configure your AWS credentials in .env

# Run development server
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
artispreneur-agent-os/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── workspace/          # Main workspace UI
│   │   ├── api/                # API routes
│   │   │   ├── auth/           # Authentication
│   │   │   ├── agents/         # Agent execution
│   │   │   ├── projects/       # Project management
│   │   │   └── pal/            # PAL compilation
│   │   └── layout.tsx
│   ├── components/
│   │   ├── workspace/          # Workspace UI components
│   │   ├── agents/             # Agent-specific components
│   │   └── ui/                 # Shared UI components
│   ├── lib/
│   │   ├── rostr/              # ROSTR framework core
│   │   │   ├── pal/            # Prompt Abstraction Layer
│   │   │   ├── rag-dal/        # RAG Dynamic Acquisition
│   │   │   ├── npao/           # Orchestration engine
│   │   │   └── hub/            # Reference Hub
│   │   ├── agents/             # Agent definitions & logic
│   │   ├── aws/                # AWS integrations
│   │   └── auth/               # Authentication utilities
│   └── types/                  # TypeScript types
├── .rostr/                     # ROSTR configuration
│   ├── agents/                 # Agent manifests
│   ├── decisions.md            # Key decisions log
│   ├── learnings.jsonl         # Agent learnings
│   └── knowledge-base/         # RAG outputs
├── infra/                      # Infrastructure as code
│   ├── cdk/                    # AWS CDK stacks
│   └── terraform/              # Terraform configs
└── docs/                       # Documentation
```

## 🎨 Design System

Artispreneur Brand Colors:
- **Crimson**: `#CC0000` (primary action)
- **Gold**: `#FED001` (accents, status)
- **Dark**: `#111111` (background)

Typography:
- **Serif**: Libre Baskerville (headings)
- **Sans**: Inter (body)
- **Mono**: IBM Plex Mono (code, labels)

## 🧠 Agent System

### Agent Lifecycle

1. **User Intent** → Natural language input
2. **PAL Compilation** → Structured manifest
3. **Phase Classification** → 5D taxonomy
4. **Priority Scoring** → 4D dimensions
5. **Agent Allocation** → Match capability to task
6. **Execution** → With RAG, tools, memory
7. **State Persistence** → Reference Hub update
8. **Learning** → Knowledge compounding

### Creating Custom Agents

```yaml
# .rostr/agents/custom-agent.yaml
agent_id: uuid-v4
name: Custom Agent
type: specialist
capabilities:
  - domain_expertise
  - workflow_automation
tools:
  allow:
    - web_search
    - file_system:read
phases:
  - development
  - deployment
model: claude-sonnet-4-6
max_parallel_tasks: 3
```

## 🔐 Authentication

OAuth 2.0 PKCE flow with AWS Cognito:
- Hosted UI for sign up/sign in
- JWT verification with JWKS
- Session management with httpOnly cookies
- Middleware-based route protection

## 📊 State Management

4-level state hierarchy:
1. **Session** — Active tasks, in-progress work (in-memory)
2. **Project** — Decisions, artifacts, learnings (DynamoDB + S3)
3. **Organization** — ICP, positioning, playbooks (S3, version-controlled)
4. **Agent** — Skills, calibration, performance (agent namespace)

## 🛠️ Development

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your GitHub repo to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main

### AWS (Self-hosted)

```bash
# Deploy infrastructure
cd infra/cdk
npm install
cdk deploy --all

# Build and deploy app
npm run build
# Upload to S3 or ECS
```

## 📚 Documentation

- [ROSTR Framework Guide](./docs/rostr-framework.md)
- [Agent Development](./docs/agent-development.md)
- [API Reference](./docs/api-reference.md)
- [AWS Setup Guide](./docs/aws-setup.md)
- [Contributing Guide](./CONTRIBUTING.md)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details

## 🙏 Acknowledgments

Built with:
- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [AWS SDK](https://aws.amazon.com/sdk-for-javascript/)
- [Claude by Anthropic](https://www.anthropic.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

Powered by the **ROSTR Framework** for production-grade multi-agent systems.

---

**Built by Artispreneur** — Run the business like you mean it.
