import { test, expect } from "bun:test";

test("lib/provider is importable from cli path", async () => {
  const { getModel } = await import("../lib/provider");
  expect(typeof getModel).toBe("function");
});
