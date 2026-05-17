import Link from "next/link";

const sections = [
  {
    title: "Getting started",
    items: [
      { label: "Introduction", href: "#introduction" },
      { label: "Quickstart", href: "#quickstart" },
      { label: "Authentication", href: "#authentication" },
    ],
  },
  {
    title: "Core concepts",
    items: [
      { label: "Computers", href: "#computers" },
      { label: "The agent loop", href: "#agent-loop" },
      { label: "Actions", href: "#actions" },
      { label: "Screenshots", href: "#screenshots" },
    ],
  },
  {
    title: "API reference",
    items: [
      { label: "Create computer", href: "#create-computer" },
      { label: "List computers", href: "#list-computers" },
      { label: "Take screenshot", href: "#take-screenshot" },
      { label: "Perform action", href: "#perform-action" },
      { label: "Execute bash", href: "#execute-bash" },
      { label: "Delete computer", href: "#delete-computer" },
    ],
  },
  {
    title: "SDKs",
    items: [
      { label: "Python", href: "#python-sdk" },
      { label: "TypeScript", href: "#typescript-sdk" },
    ],
  },
];

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-[#111113] overflow-hidden my-4">
      <div className="px-4 py-2 border-b border-white/[0.06] bg-[#0c0c0e]">
        <span className="text-[11px] text-zinc-500 font-mono">{title}</span>
      </div>
      <pre className="p-4 text-[13px] leading-[1.6] font-mono text-zinc-300 overflow-x-auto">
        {code}
      </pre>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Nav */}
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
            <span className="text-[13px] text-zinc-500 ml-1">Docs</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-20 flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0 sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto py-8">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <h4 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">{section.title}</h4>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-[13px] text-zinc-400 hover:text-white transition-colors block py-0.5">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 py-8 pb-24">
          <h1 id="introduction" className="text-3xl font-bold tracking-tight mb-4">Introduction</h1>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            Vessel provides cloud-based desktop infrastructure for AI agents. Spin up a virtual machine,
            connect any AI model, and let it autonomously control the computer through screenshots, mouse
            clicks, keyboard input, and shell commands.
          </p>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
            Vessel is a plain HTTP API. Any language with an HTTP client works. We also provide Python and
            TypeScript SDKs for convenience.
          </p>

          <h2 id="quickstart" className="text-2xl font-bold tracking-tight mb-4 mt-12 pt-8 border-t border-white/[0.04]">Quickstart</h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-4">
            Get a computer running in three lines of code:
          </p>

          <CodeBlock
            title="Python"
            code={`import vessel

# Create a computer (boots in <500ms)
computer = vessel.create(os="linux", cpu=2, ram="8gb")

# Let Claude handle a task autonomously
result = computer.prompt(
    model="claude-sonnet-4-6",
    task="Open the browser and search for 'Vessel AI'"
)

print(result.output)`}
          />

          <CodeBlock
            title="cURL"
            code={`# Create a computer
curl -X POST https://api.vessel.dev/v1/computers \\
  -H "Authorization: Bearer vsl_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"os": "linux", "cpu": 2, "ram": "8gb"}'

# Take a screenshot
curl https://api.vessel.dev/v1/computers/{id}/screenshot \\
  -H "Authorization: Bearer vsl_your_api_key" \\
  --output screenshot.png

# Click at coordinates
curl -X POST https://api.vessel.dev/v1/computers/{id}/actions \\
  -H "Authorization: Bearer vsl_your_api_key" \\
  -d '{"type": "click", "x": 500, "y": 300}'`}
          />

          <h2 id="authentication" className="text-2xl font-bold tracking-tight mb-4 mt-12 pt-8 border-t border-white/[0.04]">Authentication</h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-4">
            All API requests require a Bearer token. Get your API key from the dashboard after signing up.
          </p>
          <CodeBlock
            title="Header format"
            code={`Authorization: Bearer vsl_your_api_key`}
          />

          <h2 id="computers" className="text-2xl font-bold tracking-tight mb-4 mt-12 pt-8 border-t border-white/[0.04]">Computers</h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-4">
            A computer is a virtual machine with a full desktop environment. Each computer has its own
            filesystem, display, and network. Computers can be ephemeral (destroyed after use) or persistent
            (kept running with saved state).
          </p>
          <div className="rounded-lg border border-white/[0.08] bg-[#111113] p-4 my-4">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-zinc-500 border-b border-white/[0.06]">
                  <th className="pb-2 font-medium">Field</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/[0.04]"><td className="py-2 font-mono text-indigo-400">id</td><td className="py-2">string</td><td className="py-2">Unique identifier</td></tr>
                <tr className="border-b border-white/[0.04]"><td className="py-2 font-mono text-indigo-400">os</td><td className="py-2">string</td><td className="py-2">Operating system (linux)</td></tr>
                <tr className="border-b border-white/[0.04]"><td className="py-2 font-mono text-indigo-400">cpu</td><td className="py-2">integer</td><td className="py-2">vCPU count (1-16)</td></tr>
                <tr className="border-b border-white/[0.04]"><td className="py-2 font-mono text-indigo-400">ram</td><td className="py-2">string</td><td className="py-2">Memory (4gb-64gb)</td></tr>
                <tr className="border-b border-white/[0.04]"><td className="py-2 font-mono text-indigo-400">status</td><td className="py-2">string</td><td className="py-2">running, stopped, terminated</td></tr>
                <tr><td className="py-2 font-mono text-indigo-400">created_at</td><td className="py-2">string</td><td className="py-2">ISO 8601 timestamp</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="agent-loop" className="text-2xl font-bold tracking-tight mb-4 mt-12 pt-8 border-t border-white/[0.04]">The agent loop</h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-4">
            AI agents operate on computers in a cycle: <strong className="text-white">See</strong> (screenshot),{" "}
            <strong className="text-white">Decide</strong> (model inference),{" "}
            <strong className="text-white">Act</strong> (click/type/execute),{" "}
            <strong className="text-white">Repeat</strong>. The SDK handles this loop automatically with{" "}
            <code className="text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded text-[12px]">computer.prompt()</code>, or
            you can implement it yourself with the raw API.
          </p>

          <h2 id="create-computer" className="text-2xl font-bold tracking-tight mb-4 mt-12 pt-8 border-t border-white/[0.04]">Create computer</h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-2">
            <code className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[12px]">POST /v1/computers</code>
          </p>
          <CodeBlock
            title="Request"
            code={`{
  "os": "linux",
  "cpu": 2,
  "ram": "8gb",
  "persistent": false,
  "template": "default"
}`}
          />
          <CodeBlock
            title="Response (201)"
            code={`{
  "id": "cmp_a1b2c3d4",
  "os": "linux",
  "cpu": 2,
  "ram": "8gb",
  "status": "running",
  "created_at": "2026-05-17T12:00:00Z",
  "display": {
    "width": 1280,
    "height": 720
  }
}`}
          />

          <h2 id="take-screenshot" className="text-2xl font-bold tracking-tight mb-4 mt-12 pt-8 border-t border-white/[0.04]">Take screenshot</h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-2">
            <code className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[12px]">GET /v1/computers/:id/screenshot</code>
          </p>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-4">
            Returns a PNG image of the current desktop. Use this to feed visual context to your AI model.
          </p>

          <h2 id="perform-action" className="text-2xl font-bold tracking-tight mb-4 mt-12 pt-8 border-t border-white/[0.04]">Perform action</h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-2">
            <code className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[12px]">POST /v1/computers/:id/actions</code>
          </p>
          <CodeBlock
            title="Click"
            code={`{ "type": "click", "x": 500, "y": 300, "button": "left" }`}
          />
          <CodeBlock
            title="Type"
            code={`{ "type": "type", "text": "Hello from Vessel" }`}
          />
          <CodeBlock
            title="Key press"
            code={`{ "type": "key", "key": "Enter" }`}
          />
          <CodeBlock
            title="Scroll"
            code={`{ "type": "scroll", "x": 500, "y": 300, "direction": "down", "amount": 3 }`}
          />

          <h2 id="execute-bash" className="text-2xl font-bold tracking-tight mb-4 mt-12 pt-8 border-t border-white/[0.04]">Execute bash</h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-2">
            <code className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[12px]">POST /v1/computers/:id/bash</code>
          </p>
          <CodeBlock
            title="Request"
            code={`{ "command": "ls -la /home" }`}
          />
          <CodeBlock
            title="Response"
            code={`{
  "stdout": "total 4\\ndrwxr-xr-x 2 user user 4096 May 17 12:00 user\\n",
  "stderr": "",
  "exit_code": 0
}`}
          />

          <h2 id="python-sdk" className="text-2xl font-bold tracking-tight mb-4 mt-12 pt-8 border-t border-white/[0.04]">Python SDK</h2>
          <CodeBlock
            title="Install"
            code={`pip install vessel-sdk`}
          />
          <CodeBlock
            title="Usage"
            code={`import vessel

client = vessel.Client(api_key="vsl_your_api_key")

# Create and use a computer
computer = client.computers.create(os="linux", cpu=2, ram="8gb")

# Autonomous agent mode
result = computer.prompt(
    model="claude-sonnet-4-6",
    task="Download the CSV from example.com and summarize it"
)

# Manual control
screenshot = computer.screenshot()  # PIL Image
computer.click(500, 300)
computer.type("Hello")
output = computer.bash("cat /tmp/data.csv")

# Cleanup
computer.terminate()`}
          />

          <h2 id="typescript-sdk" className="text-2xl font-bold tracking-tight mb-4 mt-12 pt-8 border-t border-white/[0.04]">TypeScript SDK</h2>
          <CodeBlock
            title="Install"
            code={`npm install @vessel/sdk`}
          />
          <CodeBlock
            title="Usage"
            code={`import { Vessel } from "@vessel/sdk";

const client = new Vessel({ apiKey: "vsl_your_api_key" });

const computer = await client.computers.create({
  os: "linux",
  cpu: 2,
  ram: "8gb",
});

// Autonomous agent mode
const result = await computer.prompt({
  model: "claude-sonnet-4-6",
  task: "Open Firefox and take a screenshot of the homepage",
});

// Manual control
const screenshot = await computer.screenshot(); // Buffer
await computer.click(500, 300);
await computer.type("Hello from Vessel");
const output = await computer.bash("ls -la");

await computer.terminate();`}
          />
        </main>
      </div>
    </div>
  );
}
