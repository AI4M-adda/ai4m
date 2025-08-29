"use client";
import React, { useState } from "react";

const GeminiChat: React.FC = () => {
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: "user", text: input }]);
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((msgs) => [...msgs, { role: "bot", text: data.reply }]);
      } else {
        setError(data.error || "No response from Gemini.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error contacting Gemini API.");
      } else {
        setError("Error contacting Gemini API.");
      }
    }
    setInput("");
    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "2rem auto",
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 24,
        background: "#fff",
      }}
    >
      <h2>Daily Routine Manager</h2>
      <p style={{ color: "#555", marginBottom: 16 }}>
        This assistant helps you plan, organize, and manage your daily routine.{" "}
        <br />
        <b>Tip:</b> Start by telling Gemini your tasks, meetings, or goals for
        today. You can ask for suggestions, time blocking, or prioritization!
      </p>
      <div style={{ minHeight: 200, marginBottom: 16 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <span
              style={{ fontWeight: msg.role === "user" ? "bold" : "normal" }}
            >
              {msg.role === "user" ? "You" : "Gemini"}:
            </span>
            <span style={{ marginLeft: 8 }}>{msg.text}</span>
          </div>
        ))}
        {loading && <div>Gemini is typing...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
      <form onSubmit={sendMessage} style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. I have a meeting at 10am, gym at 6pm, and want to finish a report."
          style={{ flex: 1, padding: 8 }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{ padding: "8px 16px" }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default GeminiChat;
