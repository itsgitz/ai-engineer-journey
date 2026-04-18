# Progress

| Phase | Status | Notes |
|-------|--------|-------|
| 0 — Getting Started | ⬜ | CLI streaming, chat UI, provider switch |
| 1 — Prompt Engineering | ⬜ | |
| 2 — RAG Fundamentals | ⬜ | |
| 3 — Advanced RAG | ⬜ | |
| 4 — Agents & Tool Use | ⬜ | |
| 5 — Evals & Observability | ⬜ | |
| 6 — Multi-modal | ⬜ | |
| 7 — Local Models | ⬜ | |
| 8 — Production Hardening | ⬜ | |
| 9 — Capstone | ⬜ | |

## Phase 0 Checklist

- [ ] `bun install` at root succeeds; workspaces recognized
- [ ] `ollama serve` running + `ollama pull llama3.2` done
- [ ] `bun apps/getting-started/src/cli.ts "explain RAG in 2 sentences"` streams tokens
- [ ] `bun --hot apps/getting-started/src/server.ts` → chat UI streams in browser
- [ ] (optional) `AI_PROVIDER=openai OPENAI_API_KEY=... bun apps/getting-started/src/cli.ts "..."` works
- [ ] `docs/progress.md` updated; `docs/00-roadmap.md` populated
- [ ] Exercises completed (see `apps/getting-started/README.md`)
- [ ] `docs/01-getting-started.md` filled in with your own notes
