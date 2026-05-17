import Link from "next/link";

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Vessel</span>
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          <Link href="/docs" className="text-[13px] text-zinc-400 hover:text-white transition-colors">Docs</Link>
          <Link href="/pricing" className="text-[13px] text-zinc-400 hover:text-white transition-colors">Pricing</Link>
          <Link href="https://github.com/pif-laborman/vessel" className="text-[13px] text-zinc-400 hover:text-white transition-colors">GitHub</Link>
          <Link href="/login" className="text-[13px] font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg transition-colors">
            Start building
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroCode() {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border border-white/[0.08] bg-[#111113] overflow-hidden shadow-2xl shadow-indigo-500/[0.04]">
      <div className="h-10 flex items-center px-4 gap-2 border-b border-white/[0.06] bg-[#0c0c0e]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]/80" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]/80" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]/80" />
        </div>
        <span className="text-[11px] text-zinc-500 ml-3 font-mono">quickstart.py</span>
      </div>
      <pre className="p-5 text-[13px] leading-[1.7] font-mono overflow-x-auto">
        <code>
          <span className="text-indigo-400">import</span> <span className="text-emerald-400">vessel</span>{"\n"}
          {"\n"}
          <span className="text-zinc-500"># Boot a desktop in &lt;500ms</span>{"\n"}
          <span className="text-zinc-300">computer</span> <span className="text-zinc-500">=</span> <span className="text-emerald-400">vessel</span>.<span className="text-blue-400">create</span>({"\n"}
          {"  "}<span className="text-orange-400">os</span><span className="text-zinc-500">=</span><span className="text-amber-300">&quot;linux&quot;</span>,{"\n"}
          {"  "}<span className="text-orange-400">cpu</span><span className="text-zinc-500">=</span><span className="text-purple-400">2</span>,{"\n"}
          {"  "}<span className="text-orange-400">ram</span><span className="text-zinc-500">=</span><span className="text-amber-300">&quot;8gb&quot;</span>{"\n"}
          ){"\n"}
          {"\n"}
          <span className="text-zinc-500"># Connect Claude to drive it</span>{"\n"}
          <span className="text-zinc-300">computer</span>.<span className="text-blue-400">prompt</span>({"\n"}
          {"  "}<span className="text-orange-400">model</span><span className="text-zinc-500">=</span><span className="text-amber-300">&quot;claude-sonnet-4-6&quot;</span>,{"\n"}
          {"  "}<span className="text-orange-400">task</span><span className="text-zinc-500">=</span><span className="text-amber-300">&quot;Open Firefox, go to HN, find the top post&quot;</span>{"\n"}
          ){"\n"}
          {"\n"}
          <span className="text-zinc-500"># Or control it directly</span>{"\n"}
          <span className="text-zinc-300">computer</span>.<span className="text-blue-400">screenshot</span>(){"\n"}
          <span className="text-zinc-300">computer</span>.<span className="text-blue-400">click</span>(<span className="text-purple-400">500</span>, <span className="text-purple-400">300</span>){"\n"}
          <span className="text-zinc-300">computer</span>.<span className="text-blue-400">type</span>(<span className="text-amber-300">&quot;Hello from Vessel&quot;</span>){"\n"}
          <span className="text-zinc-300">computer</span>.<span className="text-blue-400">bash</span>(<span className="text-amber-300">&quot;ls -la /home&quot;</span>)
        </code>
      </pre>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="group relative rounded-xl border border-white/[0.06] bg-[#111113] p-6 hover:border-indigo-500/20 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-400 group-hover:bg-indigo-500/15 transition-colors">
        {icon}
      </div>
      <h3 className="text-[15px] font-semibold mb-2">{title}</h3>
      <p className="text-[13px] text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}

function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Everything agents need to operate</h2>
        <p className="text-zinc-400 text-[15px] max-w-lg mx-auto">Full desktop control through a simple HTTP API. Screenshot, click, type, execute.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <FeatureCard
          title="Sub-500ms boot"
          description="Machines initialize in under half a second. No cold starts. No waiting. Your agent fleet scales instantly."
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>}
        />
        <FeatureCard
          title="Full desktop control"
          description="Mouse clicks, keyboard input, screenshots, bash commands, Python execution. Everything a human can do, your agent can do."
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>}
        />
        <FeatureCard
          title="Any model"
          description="Claude, GPT-4, Gemini, open-source. OpenAI-compatible endpoint included. Bring whatever model fits your task."
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>}
        />
        <FeatureCard
          title="Browser-native desktop"
          description="Not just VNC. A real desktop experience rendered in the browser. File manager, terminal, editor. Watch your agent work in real time."
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>}
        />
        <FeatureCard
          title="Persistent or ephemeral"
          description="Spin up throwaway sandboxes for one-off tasks, or keep persistent machines running with saved state across sessions."
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg>}
        />
        <FeatureCard
          title="SDK + raw API"
          description="Python and TypeScript SDKs for quick integration. Or use the plain HTTP API from any language with an HTTP client."
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>}
        />
      </div>
    </section>
  );
}

function AgentLoop() {
  const steps = [
    { label: "See", desc: "Capture a screenshot of the desktop", color: "text-blue-400" },
    { label: "Decide", desc: "AI model analyzes and plans next action", color: "text-indigo-400" },
    { label: "Act", desc: "Click, type, scroll, or run a command", color: "text-emerald-400" },
    { label: "Repeat", desc: "Loop until the task is complete", color: "text-amber-400" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 border-t border-white/[0.04]">
      <div className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">The agent loop</h2>
        <p className="text-zinc-400 text-[15px] max-w-lg mx-auto">Four steps. Infinite capability. Your agent sees the screen, decides what to do, acts, and repeats.</p>
      </div>
      <div className="grid sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
        {steps.map((step, i) => (
          <div key={step.label} className="text-center">
            <div className="w-12 h-12 rounded-full border border-white/[0.08] bg-[#111113] flex items-center justify-center mx-auto mb-3">
              <span className={`text-lg font-bold ${step.color}`}>{i + 1}</span>
            </div>
            <h3 className={`text-[15px] font-semibold mb-1 ${step.color}`}>{step.label}</h3>
            <p className="text-[12px] text-zinc-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 border-t border-white/[0.04]">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Give your agents a body</h2>
        <p className="text-zinc-400 text-[15px] max-w-md mx-auto mb-8">Start building in minutes. Free tier included.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/login" className="text-[14px] font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 rounded-lg transition-colors">
            Start building
          </Link>
          <Link href="/docs" className="text-[14px] font-medium text-zinc-300 border border-white/[0.1] hover:border-white/[0.2] px-6 py-2.5 rounded-lg transition-colors">
            Read the docs
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.04] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <span className="text-[12px] text-zinc-600">Vessel</span>
        <div className="flex items-center gap-5">
          <Link href="/docs" className="text-[12px] text-zinc-500 hover:text-zinc-300 transition-colors">Docs</Link>
          <Link href="/pricing" className="text-[12px] text-zinc-500 hover:text-zinc-300 transition-colors">Pricing</Link>
          <Link href="/privacy" className="text-[12px] text-zinc-500 hover:text-zinc-300 transition-colors">Privacy</Link>
          <Link href="/terms" className="text-[12px] text-zinc-500 hover:text-zinc-300 transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 pt-32 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[12px] text-indigo-300 font-medium">Now in public beta</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            Cloud desktops for{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">AI agents</span>
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Spin up a virtual machine in milliseconds. Connect any AI model.
            Let it see, click, type, and execute. Production-grade infrastructure
            for computer-use agents.
          </p>
          <div className="flex items-center justify-center gap-3 mb-16">
            <Link href="/login" className="text-[14px] font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 rounded-lg transition-colors">
              Start building
            </Link>
            <Link href="/docs" className="text-[14px] font-medium text-zinc-300 border border-white/[0.1] hover:border-white/[0.2] px-6 py-2.5 rounded-lg transition-colors">
              Read the docs
            </Link>
          </div>
          <HeroCode />
        </section>
        <Features />
        <AgentLoop />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
