"use client";

import type { ChatSession } from "@/types";

export default function ChatSidebar({
  sessions,
  activeId,
  onSelect,
  onNew,
}: {
  sessions: ChatSession[];
  activeId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
}) {
  return (
    <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-line shrink-0">
      <button
        onClick={onNew}
        className="w-full flex items-center gap-2 px-5 py-4 border-b border-line font-mono text-xs hover:bg-panel transition-colors"
      >
        <span className="w-5 h-5 rounded-full border border-line flex items-center justify-center">+</span>
        NEW SESSION
      </button>

      <div className="px-5 py-3 font-mono text-[10px] tracking-[0.2em] text-ink-dim">
        CONVERSATIONS
      </div>

      <div className="max-h-[300px] md:max-h-none overflow-y-auto">
        {sessions.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`w-full text-left px-5 py-3 border-b border-line font-mono text-xs flex justify-between items-center transition-colors ${
              s.id === activeId ? "text-accent bg-panel" : "text-ink-dim hover:text-ink"
            }`}
          >
            <span className="truncate">{s.title}</span>
            <span className="shrink-0 ml-2 text-[10px]">{s.messages.length}</span>
          </button>
        ))}
      </div>
    </div>
  );
}