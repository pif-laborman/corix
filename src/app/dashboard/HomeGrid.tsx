"use client";

import { useState, useEffect, useRef } from "react";
import { CreateComputerPopover } from "./CreateComputerPopover";

interface Computer {
  id: string;
  workspace_id: string;
  name: string;
  os: string;
  cpu: number;
  ram: number;
  status: string;
  created_at: string;
}

function LiveCard({ computer, onClick }: { computer: Computer; onClick: () => void }) {
  const [thumbUrl, setThumbUrl] = useState<string | null>(null);

  useEffect(() => {
    if (computer.status !== "running") return;
    let cancelled = false;

    async function fetchThumb() {
      try {
        const res = await fetch(`/api/computers/${computer.id}/screenshot`);
        if (res.ok && !cancelled) {
          const blob = await res.blob();
          setThumbUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(blob); });
        }
      } catch {}
    }

    fetchThumb();
    const interval = setInterval(fetchThumb, 6000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [computer.id, computer.status]);

  return (
    <button
      onClick={onClick}
      className="text-left transition-all hover:shadow-lg group"
      style={{
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--bg-page)",
      }}
    >
      {/* Screenshot preview */}
      <div
        className="w-full overflow-hidden flex items-center justify-center"
        style={{ aspectRatio: "16/10", background: "#1a1a2e", position: "relative" }}
      >
        {thumbUrl ? (
          <img src={thumbUrl} alt={computer.name} className="w-full h-full object-cover" draggable={false} />
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
            <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
          </svg>
        )}
      </div>
      {/* Info bar */}
      <div className="flex items-center justify-between" style={{ padding: "8px 12px" }}>
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
            {computer.name}
          </span>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", background: "var(--bg-surface)", padding: "1px 6px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
            Linux
          </span>
        </div>
        <span
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: "var(--text-tertiary)", fontSize: "var(--text-lg)", lineHeight: 1 }}
        >
          &#x2026;
        </span>
      </div>
    </button>
  );
}

function NewComputerCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center transition-all hover:shadow-md"
      style={{
        borderRadius: "var(--radius-md)",
        border: "1px dashed var(--border)",
        background: "var(--bg-page)",
        aspectRatio: "16/12",
        cursor: "pointer",
        gap: "var(--space-3)",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      <div className="flex items-center gap-2">
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
          New Computer
        </span>
        <kbd style={{ padding: "0px 5px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-tertiary)" }}>
          N
        </kbd>
      </div>
    </button>
  );
}

export function HomeGrid({
  computers,
  onSelectComputer,
  onCreated,
}: {
  computers: Computer[];
  onSelectComputer: (id: string) => void;
  onCreated: (c: Computer) => void;
}) {
  const [showCreate, setShowCreate] = useState(false);
  const [sortBy, setSortBy] = useState<"last_edited" | "name" | "created">("last_edited");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <>
      {/* Top bar */}
      <div
        className="shrink-0 flex items-center justify-between"
        style={{ padding: "10px 20px", borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round">
            <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "var(--text-sm)" }}>
            Computers
          </span>
          <span style={{ fontSize: "var(--text-sm)", color: "var(--text-tertiary)" }}>
            {computers.length}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-body)", color: "var(--text-primary)", background: "transparent", border: "none", cursor: "pointer", outline: "none" }}
            >
              <option value="last_edited">Last edited</option>
              <option value="name">Name</option>
              <option value="created">Created</option>
            </select>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>View</span>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setViewMode("grid")}
                style={{ padding: "4px", borderRadius: "var(--radius-sm)", color: viewMode === "grid" ? "var(--text-primary)" : "var(--text-tertiary)", background: viewMode === "grid" ? "var(--bg-surface)" : "transparent" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                style={{ padding: "4px", borderRadius: "var(--radius-sm)", color: viewMode === "list" ? "var(--text-primary)" : "var(--text-tertiary)", background: viewMode === "list" ? "var(--bg-surface)" : "transparent" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid content */}
      <div className="flex-1 overflow-auto" style={{ padding: "20px" }}>
        {computers.length === 0 && !showCreate ? (
          <div className="flex-1 flex items-center justify-center" style={{ minHeight: 300 }}>
            <div className="text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1" className="mx-auto" style={{ marginBottom: "var(--space-4)" }}>
                <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
              </svg>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "var(--text-lg)", marginBottom: "var(--space-2)" }}>
                Welcome to your workspace
              </h2>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginBottom: "var(--space-6)", maxWidth: 360 }}>
                Press <kbd style={{ padding: "1px 6px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>N</kbd> or click below to spin up your first computer.
              </p>
              <div className="relative inline-block">
                <button onClick={() => setShowCreate(true)} className="btn-primary" style={{ fontSize: "var(--text-sm)" }}>
                  New Computer
                </button>
                {showCreate && (
                  <CreateComputerPopover
                    onClose={() => setShowCreate(false)}
                    onCreated={(c) => { onCreated(c); setShowCreate(false); }}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: viewMode === "grid" ? "repeat(auto-fill, minmax(260px, 1fr))" : "1fr" }}
          >
            {computers.map((c) => (
              <LiveCard key={c.id} computer={c} onClick={() => onSelectComputer(c.id)} />
            ))}
            <div className="relative">
              <NewComputerCard onClick={() => setShowCreate(true)} />
              {showCreate && (
                <CreateComputerPopover
                  onClose={() => setShowCreate(false)}
                  onCreated={(c) => { onCreated(c); setShowCreate(false); }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
