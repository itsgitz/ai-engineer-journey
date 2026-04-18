import { test, expect } from "bun:test";
import { POST } from "../app/api/chat/route";

test("POST /api/chat rejects GET-like calls with no body", async () => {
  const req = new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const res = await POST(req);
  expect(res.status).toBe(400);
});

test("POST /api/chat returns 400 for empty messages array", async () => {
  const req = new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [] }),
  });
  const res = await POST(req);
  expect(res.status).toBe(400);
});

test("POST /api/chat returns 400 for missing messages key", async () => {
  const req = new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: "hello" }),
  });
  const res = await POST(req);
  expect(res.status).toBe(400);
});

test("POST /api/chat streams response when Ollama is running", async () => {
  const ollamaRunning = await fetch("http://localhost:11434/api/tags")
    .then(() => true)
    .catch(() => false);

  if (!ollamaRunning) {
    console.log("Skipping: Ollama not running");
    return;
  }

  const req = new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: "Say: hello" }],
    }),
  });
  const res = await POST(req);
  expect(res.status).toBe(200);
  expect(res.headers.get("content-type")).toContain("text");
  const text = await res.text();
  expect(text.length).toBeGreaterThan(0);
});
