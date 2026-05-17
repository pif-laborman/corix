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
    ],
  },
  {
    title: "API reference",
    items: [
      { label: "Create computer", href: "#create-computer" },
      { label: "Take screenshot", href: "#take-screenshot" },
      { label: "Perform action", href: "#perform-action" },
      { label: "Execute bash", href: "#execute-bash" },
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
    <div style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)', overflow: 'hidden' }}>
      <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{title}</span>
      </div>
      <pre style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', lineHeight: 1.6, fontFamily: 'var(--font-mono)', background: 'var(--bg-page)', overflowX: 'auto', color: 'var(--text-primary)' }}>
        {code}
      </pre>
    </div>
  );
}

function Endpoint({ method, path }: { method: string; path: string }) {
  return (
    <code style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 'var(--text-sm)',
      fontFamily: 'var(--font-mono)',
      background: 'var(--bg-surface)',
      padding: '2px 8px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border)',
    }}>
      <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>{method}</span>
      <span style={{ color: 'var(--text-primary)' }}>{path}</span>
    </code>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-sm)' }}>
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'var(--fill-action)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            Vessel
          </Link>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginLeft: 'var(--space-2)' }}>Docs</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 flex gap-12" style={{ paddingTop: 80 }}>
        {/* Sidebar */}
        <aside className="hidden lg:block w-48 shrink-0 sticky top-20 self-start overflow-y-auto" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)', maxHeight: 'calc(100vh - 5rem)' }}>
          {sections.map((section) => (
            <div key={section.title} style={{ marginBottom: 'var(--space-6)' }}>
              <h4 style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-2)', fontFamily: 'var(--font-display)' }}>
                {section.title}
              </h4>
              <ul>
                {section.items.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="block hover:opacity-70 transition-opacity" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', padding: '2px 0' }}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>
          <h1 id="introduction" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-3xl)', letterSpacing: '-0.02em', marginBottom: 'var(--space-4)' }}>
            Introduction
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
            Vessel provides cloud-based desktop infrastructure for AI agents. Spin up a virtual machine,
            connect any AI model, and let it autonomously control the computer through screenshots, mouse
            clicks, keyboard input, and shell commands.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.7, marginBottom: 'var(--space-8)' }}>
            Vessel is a plain HTTP API. Any language with an HTTP client works. We also provide Python and
            TypeScript SDKs for convenience.
          </p>

          <h2 id="quickstart" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)', marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border)' }}>
            Quickstart
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
            Get a computer running in three lines of code:
          </p>
          <CodeBlock title="Python" code={`import vessel

# Create a computer (boots in <500ms)
computer = vessel.create(os="linux", cpu=2, ram="8gb")

# Let Claude handle a task autonomously
result = computer.prompt(
    model="claude-sonnet-4-6",
    task="Open the browser and search for 'Vessel AI'"
)

print(result.output)`} />
          <CodeBlock title="cURL" code={`# Create a computer
curl -X POST https://api.vessel.dev/v1/computers \\
  -H "Authorization: Bearer vsl_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"os": "linux", "cpu": 2, "ram": "8gb"}'

# Take a screenshot
curl https://api.vessel.dev/v1/computers/{id}/screenshot \\
  -H "Authorization: Bearer vsl_your_api_key" \\
  --output screenshot.png`} />

          <h2 id="authentication" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)', marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border)' }}>
            Authentication
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
            All API requests require a Bearer token. Get your API key from the dashboard after signing up.
          </p>
          <CodeBlock title="Header format" code={`Authorization: Bearer vsl_your_api_key`} />

          <h2 id="computers" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)', marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border)' }}>
            Computers
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
            A computer is a virtual machine with a full desktop environment. Each computer has its own
            filesystem, display, and network.
          </p>
          <div className="card" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)', overflowX: 'auto' }}>
            <table className="w-full" style={{ fontSize: 'var(--text-sm)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--text-tertiary)' }}>
                  <th style={{ paddingBottom: 'var(--space-2)', fontWeight: 500 }}>Field</th>
                  <th style={{ paddingBottom: 'var(--space-2)', fontWeight: 500 }}>Type</th>
                  <th style={{ paddingBottom: 'var(--space-2)', fontWeight: 500 }}>Description</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-secondary)' }}>
                <tr style={{ borderBottom: '1px solid var(--border)' }}><td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>id</td><td style={{ padding: '8px 0' }}>string</td><td style={{ padding: '8px 0' }}>Unique identifier</td></tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}><td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>os</td><td style={{ padding: '8px 0' }}>string</td><td style={{ padding: '8px 0' }}>Operating system</td></tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}><td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>cpu</td><td style={{ padding: '8px 0' }}>integer</td><td style={{ padding: '8px 0' }}>vCPU count (1-16)</td></tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}><td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>ram</td><td style={{ padding: '8px 0' }}>string</td><td style={{ padding: '8px 0' }}>Memory (4gb-64gb)</td></tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}><td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>status</td><td style={{ padding: '8px 0' }}>string</td><td style={{ padding: '8px 0' }}>running, stopped, terminated</td></tr>
                <tr><td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>created_at</td><td style={{ padding: '8px 0' }}>string</td><td style={{ padding: '8px 0' }}>ISO 8601 timestamp</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="agent-loop" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)', marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border)' }}>
            The agent loop
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.7 }}>
            AI agents operate on computers in a cycle: <strong style={{ color: 'var(--text-primary)' }}>See</strong> (screenshot),{" "}
            <strong style={{ color: 'var(--text-primary)' }}>Decide</strong> (model inference),{" "}
            <strong style={{ color: 'var(--text-primary)' }}>Act</strong> (click/type/execute),{" "}
            <strong style={{ color: 'var(--text-primary)' }}>Repeat</strong>. The SDK handles this loop automatically with{" "}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', background: 'var(--bg-surface)', padding: '2px 6px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>computer.prompt()</code>.
          </p>

          <h2 id="create-computer" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)', marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border)' }}>
            Create computer
          </h2>
          <p style={{ marginBottom: 'var(--space-3)' }}><Endpoint method="POST" path="/v1/computers" /></p>
          <CodeBlock title="Request" code={`{
  "os": "linux",
  "cpu": 2,
  "ram": "8gb",
  "persistent": false
}`} />
          <CodeBlock title="Response (201)" code={`{
  "id": "cmp_a1b2c3d4",
  "os": "linux",
  "cpu": 2,
  "ram": "8gb",
  "status": "running",
  "created_at": "2026-05-17T12:00:00Z",
  "display": { "width": 1280, "height": 720 }
}`} />

          <h2 id="take-screenshot" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)', marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border)' }}>
            Take screenshot
          </h2>
          <p style={{ marginBottom: 'var(--space-3)' }}><Endpoint method="GET" path="/v1/computers/:id/screenshot" /></p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.7 }}>
            Returns a PNG image of the current desktop.
          </p>

          <h2 id="perform-action" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)', marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border)' }}>
            Perform action
          </h2>
          <p style={{ marginBottom: 'var(--space-3)' }}><Endpoint method="POST" path="/v1/computers/:id/actions" /></p>
          <CodeBlock title="Click" code={`{ "type": "click", "x": 500, "y": 300, "button": "left" }`} />
          <CodeBlock title="Type" code={`{ "type": "type", "text": "Hello from Vessel" }`} />
          <CodeBlock title="Key press" code={`{ "type": "key", "key": "Enter" }`} />

          <h2 id="execute-bash" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)', marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border)' }}>
            Execute bash
          </h2>
          <p style={{ marginBottom: 'var(--space-3)' }}><Endpoint method="POST" path="/v1/computers/:id/bash" /></p>
          <CodeBlock title="Request" code={`{ "command": "ls -la /home" }`} />
          <CodeBlock title="Response" code={`{
  "stdout": "total 4\\ndrwxr-xr-x 2 user user 4096 May 17 12:00 user\\n",
  "stderr": "",
  "exit_code": 0
}`} />

          <h2 id="python-sdk" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)', marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border)' }}>
            Python SDK
          </h2>
          <CodeBlock title="Install" code={`pip install vessel-sdk`} />
          <CodeBlock title="Usage" code={`import vessel

client = vessel.Client(api_key="vsl_your_api_key")
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

computer.terminate()`} />

          <h2 id="typescript-sdk" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)', marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border)' }}>
            TypeScript SDK
          </h2>
          <CodeBlock title="Install" code={`npm install @vessel/sdk`} />
          <CodeBlock title="Usage" code={`import { Vessel } from "@vessel/sdk";

const client = new Vessel({ apiKey: "vsl_your_api_key" });
const computer = await client.computers.create({
  os: "linux", cpu: 2, ram: "8gb",
});

const result = await computer.prompt({
  model: "claude-sonnet-4-6",
  task: "Open Firefox and screenshot the homepage",
});

await computer.click(500, 300);
await computer.type("Hello from Vessel");
const output = await computer.bash("ls -la");

await computer.terminate();`} />
        </main>
      </div>
    </div>
  );
}
