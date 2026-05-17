import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For experimenting and prototyping",
    features: [
      "2 concurrent computers",
      "1 vCPU / 4 GB RAM each",
      "10 GB storage",
      "1,000 API calls/day",
      "Community support",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For teams shipping agents to production",
    features: [
      "20 concurrent computers",
      "4 vCPU / 16 GB RAM each",
      "100 GB storage",
      "Unlimited API calls",
      "Persistent machines",
      "Environment templates",
      "Priority support",
    ],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Scale",
    price: "$199",
    period: "/mo",
    description: "For high-volume agent fleets",
    features: [
      "100 concurrent computers",
      "8 vCPU / 32 GB RAM each",
      "500 GB storage",
      "Unlimited API calls",
      "Custom templates",
      "WebSocket streaming",
      "Dedicated support",
      "99.9% SLA",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
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
            <Link href="/pricing" className="text-[13px] text-white font-medium">Pricing</Link>
            <Link href="/login" className="text-[13px] font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg transition-colors">
              Start building
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Simple, transparent pricing</h1>
          <p className="text-zinc-400 text-[15px]">Start free. Scale as your agent fleet grows.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 flex flex-col ${
                plan.highlight
                  ? "border-indigo-500/40 bg-indigo-500/[0.03] ring-1 ring-indigo-500/20"
                  : "border-white/[0.06] bg-[#111113]"
              }`}
            >
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <p className="text-[13px] text-zinc-500 mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-zinc-500 text-[14px]">{plan.period}</span>}
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[13px] text-zinc-300">
                    <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className={`text-center text-[13px] font-medium py-2.5 rounded-lg transition-colors ${
                  plan.highlight
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                    : "border border-white/[0.1] hover:border-white/[0.2] text-zinc-300"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
