import { test, expect, describe, beforeAll, afterAll } from "bun:test";
import { createServer } from "./server";

async function isOllamaRunning(): Promise<boolean> {
  try {
    const res = await fetch("http://127.0.0.1:11434/api/tags");
    return res.ok;
  } catch {
    return false;
  }
}

let server: ReturnType<typeof createServer>;

beforeAll(() => {
  server = createServer({ port: 0 });
});

afterAll(() => {
  server.stop();
});

describe("POST /api/chat", () => {
  test("rejects GET requests with 405", async () => {
    const port = server.port;
    const res = await fetch(`http://localhost:${port}/api/chat`, {
      method: "GET",
    });
    expect(res.status).toBe(405);
  });

  test("rejects missing messages with 400", async () => {
    const port = server.port;
    const res = await fetch(`http://localhost:${port}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
  });

  test("returns a streaming text response for valid messages", async () => {
    const ollamaUp = await isOllamaRunning();
    if (!ollamaUp) {
      console.log("  [skipped] Ollama not running — start with: ollama serve");
      return;
    }
    const port = server.port;
    const res = await fetch(`http://localhost:${port}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Say just the word hello." }],
      }),
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/plain");
    const text = await res.text();
    expect(text.length).toBeGreaterThan(0);
  }, 30000);
});
