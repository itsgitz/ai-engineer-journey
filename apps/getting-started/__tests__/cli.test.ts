import { test, expect } from "bun:test";

test("lib/provider is importable from cli path", async () => {
  const module = await import("../lib/provider");
  expect(module.getModel).toBeDefined();
});
