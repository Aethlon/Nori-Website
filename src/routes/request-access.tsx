import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { BetaForm } from "@/components/BetaForm";

export const Route = createFileRoute("/request-access")({
  component: RequestAccessPage,
  head: () => ({
    meta: [
      { title: "Request access — Nori" },
      {
        name: "description",
        content:
          "Nori is in closed Developer Preview. Request access — selected developers are invited as new waves open.",
      },
      { property: "og:title", content: "Request access — Nori" },
      {
        property: "og:description",
        content: "Closed Developer Preview. Request access to try Nori.",
      },
    ],
  }),
});

function RequestAccessPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="// Developer preview"
        title="Request access."
        description="Nori is in closed Developer Preview. Selected developers are invited when new access waves open. No spam — invites only."
      />
      <BetaForm />
    </SiteLayout>
  );
}
