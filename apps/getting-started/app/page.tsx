"use client";

import React, { useState, useRef, useEffect } from "react";

type Message = { id: string; role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next: Message[] = [...messages, { id: crypto.randomUUID(), role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next }),
    });

    if (!res.ok || !res.body) {
      setMessages([...next, { id: crypto.randomUUID(), role: "assistant", content: "[error]" }]);
      setLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let reply = "";
    const assistantId = crypto.randomUUID();
    setMessages([...next, { id: assistantId, role: "assistant", content: "" }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      reply += decoder.decode(value, { stream: true });
      setMessages([...next, { id: assistantId, role: "assistant", content: reply }]);
    }
    setLoading(false);
  }

  return (
    <>
      <div id="chat" ref={chatRef}>
        {messages.map((m) => (
          <div key={m.id} className={`msg ${m.role}`}>
            {m.content}
          </div>
        ))}
        {loading && messages.at(-1)?.role !== "assistant" && (
          <div className="msg assistant">…</div>
        )}
      </div>
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything…"
          autoComplete="off"
          disabled={loading}
        />
        <button id="send" type="submit" disabled={loading}>
          {loading ? "…" : "Send"}
        </button>
      </form>
    </>
  );
}
