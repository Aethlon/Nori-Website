import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useReveal } from "@/hooks/use-reveal";
import { Sparkles, Wrench, Zap, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/changelog")({
  component: ChangelogPage,
  head: () => ({
    meta: [
      { title: "Changelog — Nori" },
      { name: "description", content: "Release notes for the Nori developer preview." },
      { property: "og:title", content: "Changelog — Nori" },
      { property: "og:description", content: "Release notes for the Nori developer preview." },
    ],
  }),
});

type Kind = "new" | "fix" | "perf";

const releases = [
  {
    version: "0.1.0",
    date: "May 2026",
    tag: "Initial Preview",
    items: [
      { kind: "new" as Kind, text: "Structured command execution with per-block timing and exit status" },
      { kind: "new" as Kind, text: "Git-aware prompt — live branch, dirty state, ahead/behind indicators" },
      { kind: "new" as Kind, text: "Interactive Git workspace panel — stage, unstage, diff, commit, branches" },
      { kind: "new" as Kind, text: "Docker panel with compose detection and container lifecycle management" },
      { kind: "new" as Kind, text: "File explorer with collapsible tree and per-file git status" },
      { kind: "new" as Kind, text: "System monitor — live CPU and RAM metrics" },
      { kind: "new" as Kind, text: "Slash commands (/git, /docker) with intelligent alias expansion" },
      { kind: "new" as Kind, text: "5 built-in themes — Jade, Ocean, Dracula, Nord, Gruvbox" },
      { kind: "new" as Kind, text: "Tauri-based GUI with native window management" },
      { kind: "new" as Kind, text: "Nerd Font auto-installation on Windows" },
      { kind: "perf" as Kind, text: "Async-first runtime — long tasks never block the prompt" },
      { kind: "perf" as Kind, text: "Smart render loop — 30fps active, 10fps idle, near-zero CPU at rest" },
      { kind: "perf" as Kind, text: "Native Rust binary — 6.4MB, 14MB RAM at rest" },
      { kind: "new" as Kind, text: "Text selection and clipboard support via arboard" },
      { kind: "new" as Kind, text: "Ctrl+Click URL opening in terminal output" },
      { kind: "new" as Kind, text: "Persistent command history across sessions" },
    ],
  },
];

const kindConfig: Record<Kind, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  new:  { label: "New",  icon: Sparkles, color: "text-emerald-400/70 bg-emerald-500/[0.06] border-emerald-500/[0.1]" },
  fix:  { label: "Fix",  icon: Wrench,   color: "text-amber-400/70 bg-amber-500/[0.06] border-amber-500/[0.1]" },
  perf: { label: "Perf", icon: Zap,      color: "text-blue-400/70 bg-blue-500/[0.06] border-blue-500/[0.1]" },
};

function ChangelogPage() {
  useReveal();
  return (
    <SiteLayout>
      {/* Header */}
      <section className="relative pt-36 sm:pt-44 pb-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="reveal text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 mb-4">
            Release Notes
          </p>
          <h1 className="reveal text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.04em] leading-[0.95] text-gradient-soft">
            Changelog
          </h1>
          <p className="reveal mt-5 text-white/40 max-w-md text-[15px] leading-relaxed">
            What's shipped in each release. Bug fixes install silently — larger updates are listed here.
          </p>
        </div>
      </section>

      {/* Releases */}
      <section className="mx-auto max-w-3xl px-5 sm:px-8 pb-32">
        <div className="space-y-16">
          {releases.map((release) => (
            <article key={release.version} className="reveal">
              {/* Release header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[20px] font-medium text-white/90">v{release.version}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-emerald-400/60 bg-emerald-500/[0.06] border border-emerald-500/[0.1] rounded-full px-2.5 py-0.5">
                    {release.tag}
                  </span>
                </div>
                <span className="flex-1 h-px bg-white/[0.04]" />
                <span className="font-mono text-[11px] text-white/25">{release.date}</span>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {release.items.map((item, i) => {
                  const config = kindConfig[item.kind];
                  const Icon = config.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 py-2.5 group">
                      <span className={`inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.15em] border rounded-full px-2 py-0.5 shrink-0 mt-0.5 ${config.color}`}>
                        <Icon className="size-2.5" />
                        {config.label}
                      </span>
                      <span className="text-[14px] text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/[0.04] flex items-center justify-between">
          <p className="font-mono text-[11px] text-white/20">More releases as the preview expands.</p>
          <Link to="/download" className="text-[12px] text-white/40 hover:text-white/70 transition-colors flex items-center gap-1">
            Download latest <ArrowUpRight className="size-3" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
