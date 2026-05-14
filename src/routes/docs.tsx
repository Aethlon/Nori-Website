import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Check, Info, AlertTriangle, Type } from "lucide-react";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
  head: () => ({
    meta: [
      { title: "Docs & Setup — Nori" },
      {
        name: "description",
        content: "Install Nori, configure your Nerd Font, and launch the developer preview.",
      },
      { property: "og:title", content: "Docs & Setup — Nori" },
      {
        property: "og:description",
        content: "Install Nori, configure your Nerd Font, and launch the developer preview.",
      },
    ],
  }),
});

function DocsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="// Docs"
        title="Setup & first run."
        description="Get Nori installed and configured. A few small steps make a noticeable difference in how the terminal renders."
      />

      <section className="mx-auto max-w-3xl px-6 py-20 space-y-20">
        <Section number="01" title="What Nori is">
          <p>
            Nori is a fast, modern terminal built around structured execution blocks, a context-aware prompt,
            and a calm, keyboard-first interface. It is currently in closed Developer Preview.
          </p>
        </Section>

        <Section number="02" title="Install">
          <p>
            Approved preview users receive a private link to the download page with signed builds for macOS
            (Apple Silicon, Intel) and Linux x86_64. Windows is planned.
          </p>
          <CodeBlock label="macOS · zsh">
{`# install
hdiutil attach nori-0.1.0-darwin-arm64.dmg
cp -R /Volumes/Nori/Nori.app /Applications

# verify
nori --version`}
          </CodeBlock>
        </Section>

        <Section number="03" title="Configure your Nerd Font" icon={Type}>
          <p>
            Nori uses a small set of glyphs for status indicators, branch icons, and structured block markers.
            These glyphs come from a <strong className="text-foreground">Nerd Font</strong>. If your terminal
            isn't using a Nerd Font, some symbols will render as boxes or missing characters.
          </p>
          <Checklist
            items={[
              "Install a Nerd Font (e.g. JetBrainsMono Nerd Font, FiraCode Nerd Font, Hack Nerd Font).",
              "Open Nori → Settings → Appearance → Font, and select the Nerd Font variant.",
              "Confirm the test row of glyphs renders correctly in the preview panel.",
            ]}
          />
          <Callout tone="info" icon={Info} title="Why this matters">
            The glyphs aren't decorative — they encode Git state, block status, and prompt context.
            Without a Nerd Font, you'll still see commands and output, but state indicators will be missing.
          </Callout>
        </Section>

        <Section number="04" title="Launch the preview">
          <p>
            Open <span className="font-mono text-foreground">Nori.app</span> from
            <span className="font-mono text-foreground"> /Applications</span> (macOS) or run
            <span className="font-mono text-foreground"> nori</span> from your shell (Linux).
            The first launch will create a profile and walk through keymap setup.
          </p>
        </Section>

        <Section number="05" title="Troubleshooting" icon={AlertTriangle}>
          <Checklist
            items={[
              "Glyphs render as boxes → font isn't a Nerd Font; reselect under Settings → Appearance.",
              "Slow first launch → first-run cache build; subsequent launches are sub-50ms.",
              "Prompt feels off → confirm shell integration is enabled in Settings → Shell.",
            ]}
          />
        </Section>
      </section>
    </SiteLayout>
  );
}

function Section({
  number,
  title,
  icon: Icon,
  children,
}: {
  number: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] text-jade tracking-widest">{number}</span>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
          {Icon && <Icon className="size-5 text-jade" />}
          {title}
        </h2>
      </div>
      <div className="mt-5 space-y-5 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

function CodeBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border hairline bg-background/60 font-mono text-[12.5px] overflow-hidden">
      <div className="px-4 py-2 border-b hairline text-muted-foreground/80 text-[11px]">{label}</div>
      <pre className="px-4 py-3 text-foreground/90 leading-relaxed overflow-x-auto">{children}</pre>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3 items-start">
          <Check className="size-4 text-jade mt-0.5 shrink-0" />
          <span className="text-foreground/85">{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({
  tone,
  icon: Icon,
  title,
  children,
}: {
  tone: "info" | "warn";
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border hairline p-5 bg-surface/50 ${
        tone === "warn" ? "border-l-2 border-l-jade" : "border-l-2 border-l-jade"
      }`}
    >
      <div className="flex items-center gap-2 text-foreground">
        <Icon className="size-4 text-jade" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{children}</div>
    </div>
  );
}
