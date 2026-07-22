# Key Decisions Log

This file tracks important architectural and design decisions made during the development of Artispreneur Agent OS.

## Format
Each decision should include:
- **Date**: When the decision was made
- **Decision**: What was decided
- **Rationale**: Why this approach was chosen
- **Context**: Circumstances that influenced the decision
- **Alternatives Considered**: Other options that were evaluated
- **Phase**: Which ROSTR phase this relates to

---

## 2026-07-21: Initial Architecture — ROSTR Framework

**Decision**: Build the entire system on the ROSTR framework (PAL, RAG DAL, NPAO, Hub)

**Rationale**: 
- Need production-grade multi-agent orchestration with phase-aware routing
- Knowledge compounding across conversations is critical for music business workflows
- Intent compilation prevents prompt brittleness
- Hierarchical retrieval ensures source credibility for legal/financial decisions

**Context**: Music entrepreneurs need reliable, verifiable information for PRO registrations, business formation, tax filings, and contracts. Naive prompting creates liability risks.

**Alternatives Considered**:
1. Simple RAG + single agent (rejected: no phase awareness, context loss)
2. LangChain agents (rejected: not music-industry-specific, heavy abstractions)
3. Custom from scratch (rejected: reinventing proven patterns)

**Phase**: PreD (Pre-Development research phase)

---

## 2026-07-21: Six-Agent Specialization Model

**Decision**: Create six domain-specific agents rather than one general-purpose agent

**Rationale**:
- Publishing, distribution, licensing, business, accounting, and brand each require deep domain knowledge
- Specialized system prompts and tools per domain improve accuracy
- Users can switch agents based on current need (PRO registration vs. LLC formation)
- Reduces token usage by loading only relevant context

**Context**: Music entrepreneurs juggle multiple distinct workflows (creative vs. administrative vs. legal)

**Alternatives Considered**:
1. Single generalist agent (rejected: too broad, context pollution)
2. Agent per task type (rejected: too granular, decision fatigue)
3. Eight+ hyper-specialized agents (rejected: overwhelming UI, redundant capabilities)

**Phase**: Design

---

## 2026-07-21: Soul Personality System

**Decision**: Implement four behavioral profiles (Manager, Mentor, Executive, Hustler) that modify agent communication style

**Rationale**:
- Different users prefer different communication styles (terse vs. verbose, strategic vs. tactical)
- Learning stage matters: beginners need explanation, veterans need efficiency
- Personality creates user affinity and trust
- System prompt modifiers are lightweight (no separate models needed)

**Context**: User research shows artists range from "tell me what to do" to "teach me how it works" to "just the bottom line"

**Alternatives Considered**:
1. Fixed communication style per agent (rejected: not adaptable to user preferences)
2. User chooses per message (rejected: too much friction)
3. AI detects and adapts automatically (rejected: added complexity, user wants control)

**Phase**: Design

---

## 2026-07-21: Next.js 15 + React 19 + TypeScript

**Decision**: Use Next.js App Router with React Server Components and TypeScript

**Rationale**:
- Next.js 15 provides production-ready SSR, streaming, and API routes
- React 19 improves concurrent rendering for agent streaming responses
- TypeScript ensures type safety across ROSTR framework boundaries
- Vercel deployment is seamless
- Large ecosystem and community support

**Context**: Need fast iteration, production-grade performance, and AWS integration

**Alternatives Considered**:
1. Remix (rejected: smaller ecosystem, less AWS integration examples)
2. SvelteKit (rejected: team less familiar, fewer enterprise examples)
3. Pure React SPA (rejected: need SSR for SEO and initial load performance)

**Phase**: Development

---

## 2026-07-21: AWS Cognito for Authentication

**Decision**: Use AWS Cognito with OAuth 2.0 PKCE flow for authentication

**Rationale**:
- Hosted UI reduces custom auth code and security surface area
- Integrates natively with other AWS services (DynamoDB, S3, Bedrock)
- PKCE prevents authorization code interception attacks
- Supports social logins (future: Google, Apple)
- Handles password reset, email verification, MFA out of the box

**Context**: Need secure, production-ready auth without building from scratch

**Alternatives Considered**:
1. Auth0 (rejected: adds third-party dependency outside AWS)
2. NextAuth.js (rejected: requires more custom code, session management complexity)
3. Custom JWT auth (rejected: high security risk, reinventing the wheel)

**Phase**: Development

---

Add new decisions below following the same format.
