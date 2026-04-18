import { streamText } from "ai";
import { getModel } from "../lib/provider";

const prompt = process.argv.slice(2).join(" ").trim();
if (!prompt) {
  console.error("Usage: bun src/cli.ts <your prompt>");
  process.exit(1);
}

console.error(`[provider: ${process.env.AI_PROVIDER ?? "ollama"}] streaming...`);

const { textStream } = streamText({
  model: getModel(),
  messages: [{ role: "user", content: prompt }],
});

for await (const chunk of textStream) {
  process.stdout.write(chunk);
}
process.stdout.write("\n");
