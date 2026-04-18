# Phase 0 — Getting Started

Proves the full loop: **Bun → Vercel AI SDK v5 → Ollama → streamed tokens** in the terminal and browser.

## Prerequisites

1. **Ollama** installed and running: https://ollama.com
2. Pull the default model:
   ```bash
   ollama pull llama3.2
   ollama serve   # keep this running in a separate terminal
   ```

## Install

From the repo root:

```bash
bun install
```

## Usage

### CLI (terminal streaming)

```bash
bun apps/getting-started/src/cli.ts "explain RAG in 2 sentences"
```

### HTTP server (browser chat UI)

```bash
bun run dev   # from apps/getting-started/
# open http://localhost:3000
```

### Swap provider (OpenAI)

```bash
AI_PROVIDER=openai OPENAI_API_KEY=sk-... bun apps/getting-started/src/cli.ts "explain RAG in 2 sentences"
```

Set `OLLAMA_MODEL` or `OPENAI_MODEL` env vars to change the model.

## Tests

```bash
bun test   # from apps/getting-started/
```

> The streaming integration test auto-skips when Ollama isn't running.

---

## Exercises

Work through these before moving to Phase 1. Write your answers in `docs/01-getting-started.md`.

### 1. Three prompts

Send these three prompts and observe the output quality and latency:

- `"What is a transformer architecture? Answer in 3 bullet points."`
- `"Write a haiku about vector databases."`
- `"What's the difference between RAG and fine-tuning? One sentence each."`

### 2. Temperature tweak

Edit `src/provider.ts` to add a `temperature` option (start at `0.2`, try `1.0`). Run the same prompt twice at each setting. What changes?

### 3. Provider swap

Run one prompt against Ollama (`llama3.2`) and the same prompt with `AI_PROVIDER=openai` (requires `OPENAI_API_KEY`). Compare quality and first-token latency.

### 4. Measure first-token latency

Time the CLI:

```bash
time bun src/cli.ts "hello"
```

Add `performance.now()` timestamps before and after the first `chunk` arrives. What's the first-token latency locally vs hosted?

---

## Key Files

| File | Purpose |
|------|---------|
| `lib/provider.ts` | Env-switched model factory (ollama default, openai via `AI_PROVIDER=openai`) |
| `src/cli.ts` | Terminal streaming via `streamText` |
| `app/page.tsx` | Browser chat UI (React, App Router) |
| `app/api/chat/route.ts` | Next.js API route with streaming |
| `src/provider.test.ts` | Unit tests for provider factory |
