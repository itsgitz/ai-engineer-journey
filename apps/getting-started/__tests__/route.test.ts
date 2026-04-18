import { test, expect } from "bun:test";
import { POST } from "../app/api/chat/route";

test("POST /api/chat rejects calls with no body", async () => {
  const req = new Request("http://localhost:3000/api/chat", { method: "POST" });
  const res = await POST(req);
  expect(res.status).toBe(400);
});

test("POST /api/chat returns 400 for empty messages array", async () => {
  const req = new Request("http://localhost:3000/api/chat", {
    method: "POST",
    body: JSON.stringify({ messages: [] }),
  });
  const res = await POST(req);
  expect(res.status).toBe(400);
});

test("POST /api/chat returns 400 for missing messages key", async () => {
  const req = new Request("http://localhost:3000/api/chat", {
    method: "POST",
    body: JSON.stringify({ foo: "bar" }),
  });
  const res = await POST(req);
  expect(res.status).toBe(400);
});

test("POST /api/chat streams response when Ollama is running", async () => {
  const req = new Request("http://localhost:3000/api/chat", {
    method: "POST",
    body: JSON.stringify({
      messages: [{ role: "user", content: "hello" }],
    }),
  });
  const res = await POST(req);
  expect(res.status).toBe(200);
  expect(res.headers.get("content-type")).toMatch(/text\/event-stream|text\/plain/);
});
