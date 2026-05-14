import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Field, Success, SharedFormStyles } from "./feedback";

export const Route = createFileRoute("/report")({
  component: ReportPage,
  head: () => ({
    meta: [
      { title: "Report an issue — Nori" },
      { name: "description", content: "Report a bug in the Nori developer preview." },
    ],
  }),
});

function ReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    steps: "",
    expected: "",
    actual: "",
    os: "macOS 14",
    shell: "zsh",
    email: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.steps.trim()) return;
    setSubmitted(true);
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="// Report an issue"
        title="Found a bug?"
        description="Reproducible details help us land a fix quickly. Include only what's relevant — short reports are great."
      />
      <section className="mx-auto max-w-2xl px-6 py-20">
        {submitted ? (
          <Success message="Issue logged. We'll look at it and follow up if we need more detail." />
        ) : (
          <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border hairline bg-surface/40 backdrop-blur p-8">
            <Field label="Issue title">
              <input
                required
                maxLength={120}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Prompt freezes after long git log"
                className="form-input"
              />
            </Field>
            <Field label="Steps to reproduce">
              <textarea
                required
                rows={4}
                maxLength={1000}
                value={form.steps}
                onChange={(e) => setForm({ ...form, steps: e.target.value })}
                placeholder={`1. Open Nori\n2. Run git log\n3. …`}
                className="form-input resize-none"
              />
            </Field>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Expected behavior">
                <textarea
                  rows={3}
                  maxLength={500}
                  value={form.expected}
                  onChange={(e) => setForm({ ...form, expected: e.target.value })}
                  className="form-input resize-none"
                />
              </Field>
              <Field label="Actual behavior">
                <textarea
                  rows={3}
                  maxLength={500}
                  value={form.actual}
                  onChange={(e) => setForm({ ...form, actual: e.target.value })}
                  className="form-input resize-none"
                />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Operating system">
                <input
                  maxLength={60}
                  value={form.os}
                  onChange={(e) => setForm({ ...form, os: e.target.value })}
                  className="form-input"
                />
              </Field>
              <Field label="Terminal / shell">
                <input
                  maxLength={60}
                  value={form.shell}
                  onChange={(e) => setForm({ ...form, shell: e.target.value })}
                  className="form-input"
                />
              </Field>
            </div>
            <Field label="Email (optional)">
              <input
                type="email"
                maxLength={120}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="form-input"
                placeholder="So we can ask follow-up questions"
              />
            </Field>
            <p className="text-[11px] font-mono text-muted-foreground/70">
              Screenshot upload coming in v0.2.
            </p>
            <div className="flex justify-end pt-2">
              <button className="rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:scale-[1.02] transition-transform">
                Submit report
              </button>
            </div>
          </form>
        )}
      </section>
      <SharedFormStyles />
    </SiteLayout>
  );
}
