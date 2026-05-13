import { motion } from "framer-motion";
import {
  GitBranch,
  Layers,
  Zap,
  Timer,
  Cpu,
  FolderTree,
  Compass,
  Sparkles,
} from "lucide-react";

const features = [
  { icon: GitBranch, title: "Git-aware workflows", desc: "Live branch, diff, and status surfaced in every prompt and block." },
  { icon: Layers, title: "Structured execution blocks", desc: "Each command is a discrete, navigable unit with output, timing, and exit state." },
  { icon: Zap, title: "Async command execution", desc: "Run long tasks in the background. Keep typing. Nothing blocks you." },
  { icon: Timer, title: "Fast startup", desc: "Cold start under 20ms. Ready before your fingers settle." },
  { icon: Cpu, title: "Minimal memory footprint", desc: "Native Rust core stays under 15MB at rest, even with sessions open." },
  { icon: FolderTree, title: "Repo awareness", desc: "Project context loads with the working directory — env, scripts, history." },
  { icon: Compass, title: "Smart navigation", desc: "Jump between blocks, files, and processes with a keystroke." },
  { icon: Sparkles, title: "Modern terminal UX", desc: "Typography, spacing, and motion engineered like a product, not a relic." },
];

export function Features() {
  return (
    <section id="features" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-jade">// Features</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-balance">
            Built around the way you actually work.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
            A terminal that respects your flow — structured, fast, and quietly powerful.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border hairline rounded-2xl overflow-hidden">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 4) * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 bg-background hover:bg-surface transition-colors duration-500"
            >
              <div className="flex flex-col h-full min-h-[180px]">
                <div className="size-9 rounded-lg border hairline bg-surface grid place-items-center mb-5 group-hover:border-jade/40 group-hover:shadow-[0_0_24px_-6px_var(--jade)] transition-all duration-500">
                  <f.icon className="size-4 text-jade" />
                </div>
                <h3 className="text-[15px] font-medium tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
