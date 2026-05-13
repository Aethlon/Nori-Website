import { motion } from "framer-motion";

const stats = [
  { value: "18", unit: "ms", label: "Cold startup", detail: "From launch to first prompt" },
  { value: "14", unit: "MB", label: "Memory at rest", detail: "Single session, idle" },
  { value: "0", unit: "ms", label: "Block render", detail: "GPU-accelerated layout" },
  { value: "100", unit: "%", label: "Native Rust core", detail: "No runtime, no overhead" },
];

export function Performance() {
  return (
    <section id="performance" className="relative py-32 border-t hairline">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-jade">// Performance</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-balance">
              Engineered for speed you can feel.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">
              Nori is written in Rust with a RAM-only session cache and async-first execution model. The result is a terminal that disappears into your flow.
            </p>

            <div className="mt-8 space-y-3 text-sm font-mono text-muted-foreground">
              <Row label="Architecture" value="Native Rust" />
              <Row label="Execution" value="Async, non-blocking" />
              <Row label="Session cache" value="RAM-only" />
              <Row label="Render" value="GPU compositor" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-hairline border hairline rounded-2xl overflow-hidden">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="bg-background p-8 min-h-[180px] flex flex-col justify-between"
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  {s.label}
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-5xl font-semibold tracking-[-0.04em] text-gradient-jade tabular-nums">
                      {s.value}
                    </span>
                    <span className="text-lg font-mono text-jade">{s.unit}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{s.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b hairline pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground/90">{value}</span>
    </div>
  );
}
