import { test, expect } from "bun:test";
import { getModel } from "../lib/provider";

test("getModel returns ollama model by default", () => {
  const model = getModel();
  expect(model).toBeDefined();
});

test("getModel returns openai model when AI_PROVIDER=openai", () => {
  const prev = process.env.AI_PROVIDER;
  process.env.AI_PROVIDER = "openai";
  process.env.OPENAI_API_KEY = "test-key";

  const model = getModel();
  expect(model).toBeDefined();

  process.env.AI_PROVIDER = prev;
  delete process.env.OPENAI_API_KEY;
});

test("getModel respects OLLAMA_MODEL env var", () => {
  const prev = process.env.OLLAMA_MODEL;
  process.env.OLLAMA_MODEL = "mistral";

  const model = getModel();
  expect(model).toBeDefined();

  process.env.OLLAMA_MODEL = prev;
});

test("getModel respects OPENAI_MODEL env var", () => {
  const prevProvider = process.env.AI_PROVIDER;
  const prevModel = process.env.OPENAI_MODEL;
  process.env.AI_PROVIDER = "openai";
  process.env.OPENAI_API_KEY = "test-key";
  process.env.OPENAI_MODEL = "gpt-4";

  const model = getModel();
  expect(model).toBeDefined();

  process.env.AI_PROVIDER = prevProvider;
  process.env.OPENAI_MODEL = prevModel;
  delete process.env.OPENAI_API_KEY;
});
