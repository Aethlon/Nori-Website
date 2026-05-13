import { motion } from "framer-motion";
import { ArrowDownToLine, Github } from "lucide-react";
import { Terminal } from "./Terminal";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-28 overflow-hidden">
      <div className="absolute inset-0 ambient-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-[0.35] pointer-events-none mix-blend-overlay" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex items-center gap-2 rounded-full border hairline bg-surface/60 backdrop-blur px-3 py-1 text-[11px] font-mono text-muted-foreground"
        >
          <span className="size-1.5 rounded-full bg-jade shadow-[0_0_10px_var(--jade)]" />
          v0.1 · Developer Preview
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.9, ease }}
          className="mt-7 text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] leading-[0.95] text-balance text-gradient-jade"
        >
          Developer terminal.
          <br />
          Reimagined.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.9, ease }}
          className="mx-auto mt-6 max-w-xl text-[15px] sm:text-base text-muted-foreground leading-relaxed text-balance"
        >
          Nori is a fast, context-aware terminal focused on performance, workflow clarity, and premium developer experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.9, ease }}
          className="mt-9 flex items-center justify-center gap-3"
        >
          <a
            href="#download"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)]"
          >
            <ArrowDownToLine className="size-4" />
            Download v0.1
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border hairline bg-surface/60 backdrop-blur px-5 py-2.5 text-sm text-foreground/90 hover:bg-surface-elevated transition-colors"
          >
            <Github className="size-4" />
            View GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1.1, ease }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
