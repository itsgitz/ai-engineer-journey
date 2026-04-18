import { test, expect } from "bun:test";

test("next package is available", async () => {
  const next = await import("next/package.json");
  expect(next.version).toMatch(/^\d+/);
});
