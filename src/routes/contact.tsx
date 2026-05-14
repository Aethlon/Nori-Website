import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Nori" },
      { name: "description", content: "Get in touch with the Nori team." },
    ],
  }),
});

function ContactPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="// Contact"
        title="Get in touch."
        description="For preview access, partnerships, or anything that doesn't fit a form."
      />
      <section className="mx-auto max-w-2xl px-6 py-20">
        <div className="rounded-2xl border hairline bg-surface/40 backdrop-blur p-8 space-y-6">
          <a
            href="mailto:hello@nori.systems"
            className="flex items-center gap-4 rounded-xl border hairline bg-background/60 p-5 hover:bg-surface-elevated/40 transition-colors group"
          >
            <span className="size-10 rounded-lg border hairline bg-background grid place-items-center">
              <Mail className="size-4 text-jade" />
            </span>
            <span>
              <span className="block text-sm font-medium text-foreground">Email</span>
              <span className="block font-mono text-[13px] text-muted-foreground group-hover:text-foreground transition-colors">
                hello@nori.systems
              </span>
            </span>
          </a>
          <p className="text-sm text-muted-foreground leading-relaxed">
            For preview access requests, please use the{" "}
            <a href="/request-access" className="text-foreground underline-offset-4 hover:underline">
              request access
            </a>{" "}
            page so we can route them properly. For bugs, use{" "}
            <a href="/report" className="text-foreground underline-offset-4 hover:underline">
              report an issue
            </a>
            .
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
