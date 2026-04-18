import { streamText } from "ai";
import { getModel } from "./provider";
import index from "../index.html";

type Message = { role: "user" | "assistant" | "system"; content: string };

export function createServer(options: { port: number }) {
  return Bun.serve({
    port: options.port,
    routes: {
      "/": index,
      "/api/chat": {
        GET: () => new Response("Method Not Allowed", { status: 405 }),
        POST: async (req) => {
          const body = await req.json().catch(() => ({}));
          const messages: Message[] = body?.messages;
          if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return new Response("messages required", { status: 400 });
          }
          const result = streamText({ model: getModel(), messages });
          return result.toTextStreamResponse();
        },
      },
    },
  });
}

if (import.meta.main) {
  const server = createServer({ port: 3000 });
  console.log(`Chat server running at http://localhost:${server.port}`);
}
