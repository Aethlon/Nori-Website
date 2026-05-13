import { motion } from "framer-motion";
import { ArrowDownToLine, Github } from "lucide-react";

export function CTA() {
  return (
    <section id="download" className="relative py-40 border-t hairline overflow-hidden">
      <div className="absolute inset-0 ambient-glow opacity-70 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.02] text-balance text-gradient-jade">
          Built for developers who live in the terminal.
        </h2>
        <p className="mt-6 text-muted-foreground">
          Join the developer preview and shape what a modern terminal feels like.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:scale-[1.02] transition-transform"
          >
            <ArrowDownToLine className="size-4" />
            Download Nori
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border hairline bg-surface/60 backdrop-blur px-5 py-2.5 text-sm hover:bg-surface-elevated transition-colors"
          >
            <Github className="size-4" />
            Star on GitHub
          </a>
        </div>
        <p className="mt-6 text-[11px] font-mono text-muted-foreground">v0.1 · Developer Preview</p>
      </motion.div>
    </section>
  );
}
