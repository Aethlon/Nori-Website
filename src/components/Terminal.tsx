import { motion } from "framer-motion";
import { GitBranch, Folder, Check, Clock, Sparkles } from "lucide-react";

type Block = {
  prompt: string;
  command: string;
  duration: string;
  output?: React.ReactNode;
  status?: "ok" | "running";
};

interface TerminalProps {
  size?: "sm" | "lg";
  blocks?: Block[];
  branch?: string;
  path?: string;
}

const defaultBlocks: Block[] = [
  {
    prompt: "~/nori/core",
    command: "cargo build --release",
    duration: "1.42s",
    status: "ok",
    output: (
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Sparkles className="size-3 text-jade" />
          <span>Compiling 14 crates · cached 9</span>
        </div>
        <div className="text-foreground/80">Finished <span className="text-jade">release</span> [optimized] target(s)</div>
      </div>
    ),
  },
  {
    prompt: "~/nori/core",
    command: "git status",
    duration: "8ms",
    status: "ok",
    output: (
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-[13px]">
        <span className="text-jade">M</span><span className="font-mono text-foreground/80">src/runtime/exec.rs</span>
        <span className="text-cyan-muted">M</span><span className="font-mono text-foreground/80">src/ui/blocks.tsx</span>
        <span className="text-muted-foreground">?</span><span className="font-mono text-muted-foreground">notes/perf.md</span>
      </div>
    ),
  },
];

export function Terminal({
  size = "sm",
  blocks = defaultBlocks,
  branch = "main",
  path = "~/nori/core",
}: TerminalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl border hairline bg-surface/80 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b hairline bg-surface-elevated/60">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-foreground/10" />
            <span className="size-2.5 rounded-full bg-foreground/10" />
            <span className="size-2.5 rounded-full bg-foreground/10" />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground ml-2">
            <Folder className="size-3" />
            <span>{path}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <GitBranch className="size-3 text-jade" />
            <span className="text-foreground/80">{branch}</span>
          </span>
          <span className="hidden sm:inline">nori · 0.1.0</span>
        </div>
      </div>

      {/* Body */}
      <div className={`p-5 ${size === "lg" ? "min-h-[420px]" : "min-h-[300px]"} font-mono text-[13px] leading-relaxed`}>
        <div className="space-y-5">
          {blocks.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-lg border hairline bg-background/40"
            >
              <div className="flex items-center justify-between px-3.5 py-2 border-b hairline">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-jade">›</span>
                  <span className="text-muted-foreground truncate">{b.prompt}</span>
                  <span className="text-foreground/90 truncate">{b.command}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground shrink-0">
                  <span className="flex items-center gap-1"><Clock className="size-3" />{b.duration}</span>
                  {b.status === "ok" && <Check className="size-3 text-jade" />}
                </div>
              </div>
              {b.output && <div className="px-3.5 py-3">{b.output}</div>}
            </motion.div>
          ))}

          <div className="flex items-center gap-2 pt-1">
            <span className="text-jade">›</span>
            <span className="text-muted-foreground">{path}</span>
            <span className="text-foreground/60">$</span>
            <span className="inline-block w-1.5 h-4 bg-jade cursor-blink translate-y-[2px]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
