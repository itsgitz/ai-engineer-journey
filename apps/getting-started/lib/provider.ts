import { createOllama } from "ollama-ai-provider-v2";
import { openai } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";

export function getModel(): LanguageModel {
  if (process.env.AI_PROVIDER === "openai") {
    return openai(process.env.OPENAI_MODEL ?? "gpt-4o-mini") as unknown as LanguageModel;
  }
  const ollama = createOllama();
  return ollama(process.env.OLLAMA_MODEL ?? "llama3.2") as unknown as LanguageModel;
}
