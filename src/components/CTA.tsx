import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "@/hooks/use-magnetic";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);

  // Magnetic effect on primary CTA button
  useMagnetic(primaryBtnRef, 0.25);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      // Glow orb scales in with a smooth reveal
      gsap.fromTo(glowRef.current,
        { opacity: 0, scale: 0.6 },
        {
          opacity: 0.6,
          scale: 1,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );

      // Content slides up with stagger
      const elements = contentRef.current?.querySelectorAll(".cta-animate");
      if (elements) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: { trigger: contentRef.current, start: "top 82%", once: true },
          },
        );
      }

      // Parallax on the glow orb
      if (window.innerWidth >= 768) {
        gsap.to(glowRef.current, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-36 border-t border-white/[0.04] overflow-hidden">
      {/* Animated glow orb */}
      <div ref={glowRef} aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full opacity-0"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04), rgba(200,200,200,0.02) 40%, transparent 70%)", filter: "blur(50px)" }} />

      <div ref={contentRef} className="relative mx-auto max-w-3xl px-5 sm:px-6 text-center">
        <p className="cta-animate text-[11px] font-mono uppercase tracking-[0.22em] text-white/50" style={{ opacity: 0 }}>v0.1 · Developer preview</p>
        <h2 className="cta-animate mt-5 text-3xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.04] text-balance text-foreground" style={{ opacity: 0 }}>
          Built for developers<br />who live in the terminal.
        </h2>
        <p className="cta-animate mt-6 text-muted-foreground max-w-lg mx-auto leading-relaxed" style={{ opacity: 0 }}>
          Nori is in closed Developer Preview. Read the docs to get set up, or share what you'd like to see next.
        </p>
        <div className="cta-animate mt-10 flex flex-col sm:flex-row items-center justify-center gap-3" style={{ opacity: 0 }}>
          <Link to="/docs" ref={primaryBtnRef}
            className="group relative inline-flex items-center gap-2 rounded-full bg-white text-[#0A0A0A] px-5 py-2.5 text-[13.5px] font-medium transition-all duration-200 ease-out hover:opacity-90 hover:scale-[1.02] overflow-hidden">
            <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            Read the docs
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link to="/feedback"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-transparent px-5 py-2.5 text-[13.5px] text-foreground transition-all duration-200 ease-out hover:bg-white/[0.04] hover:border-white/[0.2] hover:scale-[1.02]">
            Send feedback
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
