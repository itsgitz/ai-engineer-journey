# AGENTS.md

## Key Commands

```bash
# Install (root)
bun install

# Run Phase 0 CLI
ollama serve && bun apps/getting-started/src/cli.ts "your prompt"

# Run Phase 0 dev server
cd apps/getting-started && bun run dev

# Run all tests
bun test
```

## Environment

| Variable | Default | Description |
|----------|----------|-------------|
| `AI_PROVIDER` | `ollama` | Set to `openai` for OpenAI |
| `OLLAMA_MODEL` | `llama3.2` | Ollama model name |
| `OPENAI_MODEL` | `gpt-4o-mini` | OpenAI model name |

## Architecture

- **Monorepo**: Bun workspaces (`apps/*`, `libs/*`)
- **Phase 0 app**: `apps/getting-started/` — working AI chat
- **Provider**: `lib/provider.ts` abstracts Ollama/OpenAI
- **Fullstack**: Use Next.js (App Router), not Bun.serve()

## Gotchas

1. Run `ollama serve` before CLI or dev server
2. Each app has its own `package.json` with scripts — root has no scripts
3. Tests skip streaming checks without Ollama running
4. Root `package.json` only lists devDependencies — apps pull shared deps
5. Per-app `AGENTS.md` files exist but may be minimal — check root first