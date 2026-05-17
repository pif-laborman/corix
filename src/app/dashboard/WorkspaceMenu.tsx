"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

interface Props {
  displayName: string;
  initials: string;
  email: string;
  plan: string;
  onSettings: () => void;
}

export function WorkspaceMenu({ displayName, initials, email, plan, onSettings }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const itemStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    borderRadius: "var(--radius-sm)",
    fontSize: "var(--text-sm)",
    fontFamily: "var(--font-body)",
    color: "var(--text-primary)",
    background: "transparent",
    cursor: "pointer",
    border: "none",
    textAlign: "left" as const,
    transition: "background 0.1s ease",
  };

  return (
    <div ref={menuRef} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 transition-colors hover:opacity-80"
        style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", cursor: "pointer", background: "transparent", border: "none", textAlign: "left" }}
      >
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
          style={{ background: "var(--fill-action)", color: "var(--text-on-action)", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "var(--text-xs)" }}
        >
          {initials}
        </div>
        <span className="truncate flex-1" style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "var(--text-sm)" }}>
          {displayName}
        </span>
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s ease" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "8px",
            right: "8px",
            marginTop: "4px",
            background: "var(--bg-page)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            padding: "4px",
            zIndex: 50,
          }}
        >
          {/* Workspace section */}
          <div style={{ padding: "8px 12px 4px", fontSize: "var(--text-xs)", color: "var(--text-tertiary)", fontFamily: "var(--font-display)", fontWeight: 500 }}>
            Workspace
          </div>

          <button
            onClick={() => { setOpen(false); onSettings(); }}
            style={itemStyle}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-surface)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Settings
          </button>

          <button
            style={itemStyle}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-surface)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            Invite members
          </button>

          {/* Divider */}
          <div style={{ height: 1, background: "var(--border)", margin: "4px 0" }} />

          {/* Account section */}
          <div style={{ padding: "8px 12px 4px" }}>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", fontFamily: "var(--font-display)", fontWeight: 500 }}>
              {displayName}
            </div>
            <div style={{ fontSize: "10px", color: "var(--text-tertiary)", fontFamily: "var(--font-body)", marginTop: 2 }}>
              {email}
            </div>
          </div>

          <button
            onClick={() => { setOpen(false); onSettings(); }}
            style={itemStyle}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-surface)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            Profile settings
          </button>

          <button
            style={{ ...itemStyle, justifyContent: "space-between" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-surface)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              Subscription
            </span>
            <span className="flex items-center gap-1" style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>
              {plan}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </span>
          </button>

          {/* Divider */}
          <div style={{ height: 1, background: "var(--border)", margin: "4px 0" }} />

          <button
            onClick={() => { setOpen(false); handleSignOut(); }}
            style={{ ...itemStyle, color: "var(--text-secondary)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-surface)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
