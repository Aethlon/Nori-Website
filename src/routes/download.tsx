import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDownToLine, ArrowLeft, Terminal as TerminalIcon, Apple, MonitorCog } from "lucide-react";
import { SmoothScroll } from "@/components/SmoothScroll";

export const Route = createFileRoute("/download")({
  component: DownloadPage,
  head: () => ({
    meta: [
      { title: "Nori — Developer Preview Download" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Private developer preview builds for Nori. Approved users only." },
    ],
  }),
});

const builds = [
  { os: "macOS", arch: "Apple Silicon", size: "8.2 MB", file: "nori-0.1.0-darwin-arm64.dmg", icon: Apple },
  { os: "macOS", arch: "Intel", size: "8.6 MB", file: "nori-0.1.0-darwin-x64.dmg", icon: Apple },
  { os: "Linux", arch: "x86_64", size: "7.9 MB", file: "nori-0.1.0-linux-x64.tar.gz", icon: TerminalIcon },
  { os: "Windows", arch: "x86_64", size: "—", file: "planned", icon: MonitorCog, soon: true },
];

const notes = [
  "Structured execution blocks with per-command timing",
  "Git-aware prompt with branch, dirty state, and ahead/behind",
  "Repo-scoped navigation across sessions, blocks, and outputs",
  "Async-first runtime: long tasks never block the prompt",
  "Lightweight runtime — RAM-only session cache",
];

function DownloadPage() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <SmoothScroll />

      <div className="absolute inset-x-0 top-0 h-[40rem] ambient-glow opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-[0.25] mix-blend-overlay pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 py-20">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back to product
          </Link>
          <span className="font-mono text-[11px] text-muted-foreground/70">
            private · developer preview
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border hairline bg-surface/60 backdrop-blur px-3 py-1 text-[11px] font-mono text-muted-foreground">
            <span className="size-1.5 rounded-full bg-jade shadow-[0_0_10px_var(--jade)]" />
            v0.1.0 · approved users only
          </div>
          <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] text-gradient-jade">
            Download Nori.
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl leading-relaxed">
            These builds are part of the closed Developer Preview. Please don't share them outside the
            preview group.
          </p>
        </motion.div>

        <section className="mt-16">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-jade">// Builds</p>
          <div className="mt-5 rounded-2xl border hairline bg-surface/40 backdrop-blur-xl overflow-hidden divide-y divide-[var(--hairline)]">
            {builds.map((b) => (
              <div
                key={b.file}
                className="group flex items-center justify-between gap-4 px-5 py-4 hover:bg-surface-elevated/40 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="size-9 rounded-lg border hairline bg-background grid place-items-center shrink-0">
                    <b.icon className="size-4 text-jade" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium">
                      {b.os} <span className="text-muted-foreground font-normal">· {b.arch}</span>
                    </div>
                    <div className="font-mono text-[11px] text-muted-foreground/70 truncate">{b.file}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-mono text-[11px] text-muted-foreground">{b.size}</span>
                  {b.soon ? (
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full border hairline text-muted-foreground">
                      planned
                    </span>
                  ) : (
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background text-[12.5px] px-3 py-1.5 hover:opacity-90 transition-opacity"
                    >
                      <ArrowDownToLine className="size-3.5" />
                      Download
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-jade">// Install</p>
            <div className="mt-5 rounded-xl border hairline bg-background/60 font-mono text-[12.5px] overflow-hidden">
              <div className="px-4 py-2 border-b hairline text-muted-foreground/80 text-[11px]">macOS · zsh</div>
              <pre className="px-4 py-3 text-foreground/90 leading-relaxed">
{`hdiutil attach nori-0.1.0-darwin-arm64.dmg
cp -R /Volumes/Nori/Nori.app /Applications
nori --version`}
              </pre>
            </div>
            <p className="mt-4 text-[12.5px] text-muted-foreground">
              Full setup guide lives in{" "}
              <Link to="/docs" className="text-foreground underline-offset-4 hover:underline">
                Docs
              </Link>
              .
            </p>
          </div>

          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-jade">// In this build</p>
            <ul className="mt-5 space-y-3 text-sm">
              {notes.map((n) => (
                <li key={n} className="flex gap-3 items-start">
                  <span className="mt-1.5 size-1.5 rounded-full bg-jade shrink-0" />
                  <span className="text-foreground/90">{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <p className="mt-20 font-mono text-[11px] text-muted-foreground/60 text-center">
          © 2026 Nori Systems · do not redistribute
        </p>
      </div>
    </main>
  );
}
