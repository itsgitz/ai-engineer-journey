# AI Engineer Journey

A structured monorepo for learning AI Engineering — building production-grade applications on foundation models (LLMs).

## Structure

```
ai-engineer-journey/
├── apps/
│   ├── getting-started/   # Phase 0 — Vercel AI SDK + Ollama
│   ├── 01-prompting/
│   ├── 02-rag-basic/
│   └── ...
├── libs/                  # Shared primitives (added as needed)
├── docs/                  # Learning notes & roadmap
└── infra/                 # Docker Compose (added at phase 2/5)
```

## Getting Started

See [docs/README.md](docs/README.md) for the full roadmap and [apps/getting-started](apps/getting-started/README.md) to run Phase 0.

## Prerequisites

- [Bun](https://bun.sh) ≥ 1.3
- [Ollama](https://ollama.com) with `llama3.2` pulled (`ollama pull llama3.2`)

## Install

```bash
bun install
```
