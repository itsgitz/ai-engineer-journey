import { test, expect, beforeEach } from "bun:test";

beforeEach(() => {
  delete process.env.AI_PROVIDER;
  delete process.env.OLLAMA_MODEL;
  delete process.env.OPENAI_MODEL;
});

test("getModel returns ollama model by default", async () => {
  const { getModel } = await import("../lib/provider");
  const model = getModel();
  expect(model).toBeDefined();
  expect(model.provider).toContain("ollama");
});

test("getModel returns openai model when AI_PROVIDER=openai", async () => {
  process.env.AI_PROVIDER = "openai";
  process.env.OPENAI_API_KEY = "sk-test";
  const { getModel } = await import("../lib/provider");
  const model = getModel();
  expect(model).toBeDefined();
  expect(model.provider).toContain("openai");
});

test("getModel respects OLLAMA_MODEL env var", async () => {
  process.env.OLLAMA_MODEL = "mistral";
  const { getModel } = await import("../lib/provider");
  const model = getModel();
  expect(model.modelId).toBe("mistral");
});

test("getModel respects OPENAI_MODEL env var", async () => {
  process.env.AI_PROVIDER = "openai";
  process.env.OPENAI_API_KEY = "sk-test";
  process.env.OPENAI_MODEL = "gpt-4o";
  const { getModel } = await import("../lib/provider");
  const model = getModel();
  expect(model.modelId).toBe("gpt-4o");
});
