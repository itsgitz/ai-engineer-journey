import { streamText } from "ai";
import { getModel } from "@/lib/provider";

type Message = { role: "user" | "assistant" | "system"; content: string };

export async function POST(req: Request): Promise<Response> {
  const body = await req.json().catch(() => ({}));
  const messages: Message[] = body?.messages;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response("messages required", { status: 400 });
  }

  const result = streamText({ model: getModel(), messages });
  return result.toTextStreamResponse();
}
