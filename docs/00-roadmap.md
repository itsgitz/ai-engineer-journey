# AI Engineer Journey — 10-Phase Roadmap

**Context:** Senior Fullstack Developer (6y TS/Node, Laravel/PHP; AWS CDK/SDK, Docker, CI/CD) transitioning into AI Engineering — building production-grade LLM applications. Gaps to close: LLM mechanics, prompting, RAG, agents, evals, observability, cost/latency/safety.

## Phases

| # | Phase | Duration | Key Deliverable |
|---|-------|----------|-----------------|
| 0 | **Getting Started** | 3–5 days | CLI + HTTP chatbot, streaming, multi-provider |
| 1 | **Prompt Engineering & Structured Outputs** | 1 wk | Zod-typed extraction, `generateObject`, tool calling |
| 2 | **RAG Fundamentals** | 1–2 wks | pgvector-backed Q&A over your own docs |
| 3 | **Advanced RAG** | 1–2 wks | Hybrid search, reranking, query rewriting, eval harness |
| 4 | **Agents & Tool Use** | 2 wks | Multi-step agent + MCP server (your own tool) |
| 5 | **Evaluation & Observability** | 1 wk | Langfuse tracing + Promptfoo eval suite in CI |
| 6 | **Multi-modal** | 1 wk | Vision + audio (Whisper) + image generation |
| 7 | **Local Models & Fine-tuning (intro)** | 1–2 wks | Ollama model comparison + 1 LoRA in Python |
| 8 | **Production Hardening** | 1–2 wks | Rate limits, caching, guardrails, Docker, GH Actions |
| 9 | **Capstone** | 2 wks | End-to-end app deployed (your choice of domain) |

## Tooling

| Concern | Pick | Why |
|---------|------|-----|
| LLM SDK | **Vercel AI SDK v5** (`ai`, `@ai-sdk/*`) | OSS, provider-agnostic, first-class TS, streaming/tools/agents built-in |
| Local inference | **Ollama** (Llama 3.x, Qwen 2.5, Nomic embed) | Free, offline, matches production API surface |
| Hosted comparison | OpenAI / Anthropic / Groq | Quality/latency delta — keep usage small |
| Vector store | **pgvector** (Postgres) | SQL-fluent; production-viable; Docker Compose friendly |
| Alt vector | Qdrant (optional, phase 3) | Dedicated store option |
| Observability | **Langfuse** (self-hosted via Docker) | OSS, traces + prompt mgmt + evals |
| Evaluation | **Promptfoo** | OSS, runs in CI, YAML-driven |
| Agent protocol | **MCP** (Model Context Protocol) | OSS standard, growing ecosystem |
| Fine-tuning | HuggingFace Transformers + PEFT (Python) | Phase 7 only; industry standard for LoRA |
| HTTP | `Bun.serve()` native | No Express/Vite |
| Package mgr | **Bun workspaces** | No Turbo/Nx until needed |
| Container | Docker Compose (Postgres+pgvector, Langfuse, Qdrant) | Added at phases 2/5 |
| CI | GitHub Actions | Familiar |

## Production Mindset (every phase)

Each `docs/<phase>.md` answers these six questions:

1. **Cost** — tokens in/out, $/request at scale, caching opportunities
2. **Latency** — p50/p95 first-token and total; streaming correctness
3. **Reliability** — retries, timeouts, fallback models, graceful degradation
4. **Safety** — input sanitization, output validation (Zod), PII, prompt injection
5. **Observability** — is this request traceable end-to-end?
6. **Evaluability** — can I regression-test this behavior?
