# Phase 0: AI Chat App

A full-stack AI chat application built with Next.js 16, Vercel AI SDK v5, and Bun. Supports local inference (Ollama) and cloud providers (OpenAI).

## Quick Start

### Prerequisites
- Bun installed
- (Optional) Ollama running locally for `llama3.2` or another model

### Setup

```bash
# Install dependencies
bun install

# Copy and configure environment
cp .env.example .env.local
# Edit .env.local:
# - AI_PROVIDER=ollama (default) or openai
# - OLLAMA_MODEL=llama3.2 (if using Ollama)
# - OPENAI_API_KEY=sk-... (if using OpenAI)
```

### Run

**Web UI:**
```bash
bun run dev
# Open http://localhost:3000
```

**CLI:**
```bash
bun src/cli.ts "What is AI?"
```

## Architecture

| Component | File | Purpose |
|-----------|------|---------|
| Provider Factory | `lib/provider.ts` | Switches between Ollama / OpenAI |
| API Route | `app/api/chat/route.ts` | POST /api/chat → streaming text |
| Web UI | `app/page.tsx` | React chat component with streaming |
| CLI | `src/cli.ts` | Command-line interface |

## Testing

```bash
# Run all tests
bun test

# Watch mode
bun test --watch

# Specific file
bun test __tests__/provider.test.ts
```

All code written test-first (TDD). 9 tests covering provider factory, API validation, and smoke tests.

## Environment Variables

| Variable | Default | Example |
|----------|---------|---------|
| `AI_PROVIDER` | `ollama` | `openai` |
| `OLLAMA_MODEL` | `llama3.2` | `mistral`, `neural-chat` |
| `OPENAI_API_KEY` | — | `sk-proj-...` |
| `OPENAI_MODEL` | `gpt-4o-mini` | `gpt-4` |

## Stack

- **Framework:** Next.js 16 (App Router)
- **AI SDK:** Vercel AI SDK v5
- **Providers:** `ollama-ai-provider-v2`, `@ai-sdk/openai`
- **Runtime:** Bun (package manager + test runner)
- **Styling:** Tailwind v4 + custom CSS
- **Validation:** Zod

## Development

### Type Checking
```bash
bunx tsc --noEmit
```

### Linting
```bash
bunx eslint . --fix
```

### Building
```bash
bun run build
bun run start
```

## Troubleshooting

**"model not found" error:**
- Ensure Ollama is running: `ollama serve`
- Pull model: `ollama pull llama3.2`

**API 400 errors:**
- Check request body has `messages` array
- Each message needs `{ role: "user" | "assistant", content: string }`

**Dev server won't start:**
- Kill existing process: `lsof -ti:3000 | xargs kill -9`
- Clear `.next`: `rm -rf .next && bun run dev`
