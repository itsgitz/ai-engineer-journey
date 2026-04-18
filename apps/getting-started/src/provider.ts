import { createOllama } from "ollama-ai-provider-v2";
import { openai } from "@ai-sdk/openai";
import type { LanguageModelV1 } from "ai";

export function getModel(): LanguageModelV1 {
  if (process.env.AI_PROVIDER === "openai") {
    return openai(process.env.OPENAI_MODEL ?? "gpt-4o-mini");
  }
  const ollama = createOllama();
  return ollama(process.env.OLLAMA_MODEL ?? "llama3.2");
}
