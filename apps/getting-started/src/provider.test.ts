import { test, expect, describe } from "bun:test";
import { getModel } from "./provider";

describe("getModel", () => {
  test("returns ollama model by default", () => {
    delete process.env.AI_PROVIDER;
    const model = getModel();
    expect(model.provider).toBe("ollama.responses");
  });

  test("returns openai model when AI_PROVIDER=openai", () => {
    process.env.AI_PROVIDER = "openai";
    const model = getModel();
    expect(model.provider).toBe("openai.chat");
    delete process.env.AI_PROVIDER;
  });

  test("defaults to llama3.2 for ollama", () => {
    delete process.env.AI_PROVIDER;
    const model = getModel();
    expect(model.modelId).toBe("llama3.2");
  });

  test("uses OLLAMA_MODEL env var when set", () => {
    delete process.env.AI_PROVIDER;
    process.env.OLLAMA_MODEL = "qwen2.5";
    const model = getModel();
    expect(model.modelId).toBe("qwen2.5");
    delete process.env.OLLAMA_MODEL;
  });
});
