import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Performance } from "@/components/Performance";
import { Experience } from "@/components/Experience";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Nori — Developer terminal. Reimagined." },
      {
        name: "description",
        content:
          "Nori is a fast, context-aware terminal focused on performance, workflow clarity, and premium developer experience.",
      },
      { property: "og:title", content: "Nori — Developer terminal. Reimagined." },
      {
        property: "og:description",
        content:
          "A fast, context-aware terminal focused on performance and premium developer experience.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <SmoothScroll />
      <Nav />
      <Hero />
      <Features />
      <Performance />
      <Experience />
      <CTA />
      <Footer />
    </main>
  );
}
