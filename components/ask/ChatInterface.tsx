
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ChatMessage, ChatSession } from "@/types";
import ChatSidebar from "./ChatSidebar";

const STORAGE_KEY = "ask-sessions";

const quickActions = [
  { label: "Projects", query: "What projects has Hritik built?" },
  { label: "Tech Stack", query: "What's his tech stack?" },
  { label: "Experience", query: "Tell me about his work experience" },
  { label: "Contact", query: "How can I get in touch?" },
];

function makeSession(): ChatSession {
  return {
    id: crypto.randomUUID(),
    title: "New conversation",
    messages: [],
  };
}

export default function ChatInterface() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeId, setActiveId] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const hydrated = useRef(false);

  // Load saved conversations
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const stored: ChatSession[] = raw ? JSON.parse(raw) : [];

        if (stored.length > 0) {
          setSessions(stored);
          setActiveId(stored[0].id);
        } else {
          const first = makeSession();
          setSessions([first]);
          setActiveId(first.id);
        }
      } catch {
        const first = makeSession();
        setSessions([first]);
        setActiveId(first.id);
      }

      hydrated.current = true;
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  // Persist conversations
  useEffect(() => {
    if (!hydrated.current) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, activeId, loading]);

  const active = sessions.find((session) => session.id === activeId);

  // Update a specific conversation
  function updateSession(
    sessionId: string,
    updater: (session: ChatSession) => ChatSession
  ) {
    setSessions((previous) =>
      previous.map((session) =>
        session.id === sessionId ? updater(session) : session
      )
    );
  }

  // Send message and stream the response
  async function send(text: string) {
    if (!text.trim() || loading || !active) return;

    const sessionId = active.id;

    const userMessage: ChatMessage = {
      role: "user",
      content: text.trim(),
    };

    const nextMessages = [...active.messages, userMessage];
    const isFirstMessage = active.messages.length === 0;

    updateSession(sessionId, (session) => ({
      ...session,
      messages: nextMessages,
      title: isFirstMessage ? text.trim().slice(0, 40) : session.title,
    }));

    setInput("");
    setLoading(true);

    let assistantIndex: number | null = null;
    let assistantContent = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
          data?.error ?? "The request failed. Please try again."
        );
      }

      if (!response.body) {
        throw new Error("Streaming is not supported by this response.");
      }

      // Create an empty assistant message
      assistantIndex = nextMessages.length;

      updateSession(sessionId, (session) => ({
        ...session,
        messages: [
          ...session.messages,
          {
            role: "assistant",
            content: "",
          },
        ],
      }));

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // Read response chunks as they arrive
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        if (!chunk) continue;

        assistantContent += chunk;

        updateSession(sessionId, (session) => ({
          ...session,
          messages: session.messages.map((message, index) =>
            index === assistantIndex
              ? {
                  ...message,
                  content: assistantContent,
                }
              : message
          ),
        }));
      }

      // Flush remaining characters
      assistantContent += decoder.decode();

      updateSession(sessionId, (session) => ({
        ...session,
        messages: session.messages.map((message, index) =>
          index === assistantIndex
            ? {
                ...message,
                content:
                  assistantContent ||
                  "I couldn't generate a response. Please try again.",
              }
            : message
        ),
      }));
    } catch (error) {
      console.error("ARYA chat error:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      if (assistantIndex !== null) {
        updateSession(sessionId, (session) => ({
          ...session,
          messages: session.messages.map((message, index) =>
            index === assistantIndex
              ? {
                  ...message,
                  content: assistantContent || errorMessage,
                }
              : message
          ),
        }));
      } else {
        updateSession(sessionId, (session) => ({
          ...session,
          messages: [
            ...session.messages,
            {
              role: "assistant",
              content: errorMessage,
            },
          ],
        }));
      }
    } finally {
      setLoading(false);
    }
  }

  // Create a new conversation
  function newSession() {
    const fresh = makeSession();

    setSessions((previous) => [fresh, ...previous]);
    setActiveId(fresh.id);
  }

  if (!active) return null;

  return (
    <section className="w-full">
      <div className="border border-line bg-bg overflow-hidden">

        {/* APPLICATION BODY */}
        <div className="flex min-h-[680px] lg:min-h-[720px]">

          {/* LEFT SESSION PANEL */}
          <ChatSidebar
            sessions={sessions}
            activeId={activeId}
            onSelect={setActiveId}
            onNew={newSession}
          />

          {/* MAIN CHAT WORKSPACE */}
          <div className="flex-1 min-w-0 flex flex-col">

            {/* WORKSPACE */}
            <div className="relative flex-1 overflow-hidden">

              {active.messages.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6">

                  {/* HERO */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-center"
                  >
                    <h1 className="font-display uppercase text-[clamp(64px,9vw,130px)] leading-[0.8] tracking-[-0.04em]">
                      ARYA
                    </h1>

                    <p className="font-mono text-[10px] md:text-xs text-ink-dim mt-7 tracking-[0.08em]">
                      Ask anything about Hritik&apos;s work, stack, or experience.
                    </p>
                  </motion.div>

                  {/* QUICK ACTIONS */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-wrap justify-center gap-2 mt-7"
                  >
                    {quickActions.map((action) => (
                      <button
                        key={action.label}
                        type="button"
                        onClick={() => send(action.query)}
                        className="group border border-line rounded-full px-4 py-2 font-mono text-[10px] tracking-wide text-ink-dim hover:text-ink hover:border-ink transition-colors"
                      >
                        <span className="mr-2 opacity-40 group-hover:opacity-100">
                          →
                        </span>
                        {action.label}
                      </button>
                    ))}
                  </motion.div>
                </div>
              ) : (
                <div className="h-full overflow-y-auto px-6 md:px-10 py-10">
                  <div className="max-w-3xl mx-auto space-y-8">

                    {active.messages.map((message, index) => (
                      <motion.div
                        key={`${active.id}-${index}`}
                        initial={{
                          opacity: 0,
                          y: 12,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.35,
                        }}
                        className={
                          message.role === "user"
                            ? "ml-auto max-w-[80%]"
                            : "max-w-[90%]"
                        }
                      >
                        <div className="font-mono text-[9px] tracking-[0.18em] text-ink-dim mb-2">
                          {message.role === "user" ? "YOU" : "ARYA"}
                        </div>

                        {/* MESSAGE CONTENT */}
                        <div
                          className={
                            message.role === "user"
                              ? "border border-line bg-panel px-4 py-3 font-mono text-xs leading-relaxed"
                              : "font-mono text-xs leading-[1.8] text-ink break-words"
                          }
                        >
                          {message.role === "user" ? (
                            message.content
                          ) : (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                h1: ({ children }) => (
                                  <h1 className="text-2xl font-bold mt-6 mb-3">
                                    {children}
                                  </h1>
                                ),

                                h2: ({ children }) => (
                                  <h2 className="text-xl font-bold mt-5 mb-3">
                                    {children}
                                  </h2>
                                ),

                                h3: ({ children }) => (
                                  <h3 className="text-base font-bold mt-4 mb-2">
                                    {children}
                                  </h3>
                                ),

                                p: ({ children }) => (
                                  <p className="mb-3 last:mb-0">
                                    {children}
                                  </p>
                                ),

                                strong: ({ children }) => (
                                  <strong className="font-bold text-ink">
                                    {children}
                                  </strong>
                                ),

                                em: ({ children }) => (
                                  <em className="italic">
                                    {children}
                                  </em>
                                ),

                                ul: ({ children }) => (
                                  <ul className="list-disc pl-6 mb-4 space-y-1">
                                    {children}
                                  </ul>
                                ),

                                ol: ({ children }) => (
                                  <ol className="list-decimal pl-6 mb-4 space-y-1">
                                    {children}
                                  </ol>
                                ),

                                li: ({ children }) => (
                                  <li className="pl-1">{children}</li>
                                ),

                                blockquote: ({ children }) => (
                                  <blockquote className="border-l-2 border-line pl-4 my-4 text-ink-dim">
                                    {children}
                                  </blockquote>
                                ),

                                code: ({ className, children }) => {
                                  const isBlock = Boolean(
                                    className?.includes("language-")
                                  );

                                  return (
                                    <code
                                      className={
                                        isBlock
                                          ? "block font-mono text-xs"
                                          : "bg-panel px-1.5 py-0.5 rounded text-ink font-mono"
                                      }
                                    >
                                      {children}
                                    </code>
                                  );
                                },

                                pre: ({ children }) => (
                                  <pre className="bg-panel border border-line rounded-md p-4 my-4 overflow-x-auto text-xs leading-relaxed">
                                    {children}
                                  </pre>
                                ),

                                a: ({ href, children }) => (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-4 hover:opacity-70"
                                  >
                                    {children}
                                  </a>
                                ),

                                hr: () => (
                                  <hr className="border-line my-5" />
                                ),

                                table: ({ children }) => (
                                  <div className="overflow-x-auto my-4">
                                    <table className="w-full border-collapse text-left">
                                      {children}
                                    </table>
                                  </div>
                                ),

                                th: ({ children }) => (
                                  <th className="border border-line bg-panel px-3 py-2 font-bold">
                                    {children}
                                  </th>
                                ),

                                td: ({ children }) => (
                                  <td className="border border-line px-3 py-2">
                                    {children}
                                  </td>
                                ),
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {loading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-mono text-[10px] text-ink-dim"
                      >
                        ARYA IS THINKING...
                      </motion.div>
                    )}

                    <div ref={bottomRef} />
                  </div>
                </div>
              )}
            </div>

            {/* INPUT AREA */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
              className="border-t border-line p-4 md:p-5"
            >
              <div className="border border-line bg-panel/40 rounded-sm overflow-hidden">

                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey
                    ) {
                      event.preventDefault();
                      send(input);
                    }
                  }}
                  rows={2}
                  placeholder="Ask about Hritik's work..."
                  className="w-full resize-none bg-transparent px-4 py-4 font-mono text-xs outline-none placeholder:text-ink-dim"
                />

                <div className="border-t border-line px-3 py-2 flex items-center justify-between">

                  <div className="font-mono text-[9px] tracking-[0.15em] text-ink-dim">
                    ENTER TO SEND · SHIFT + ENTER FOR NEW LINE
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="w-8 h-8 rounded-full bg-ink text-bg flex items-center justify-center text-sm transition-opacity disabled:opacity-30"
                  >
                    ↑
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
}
