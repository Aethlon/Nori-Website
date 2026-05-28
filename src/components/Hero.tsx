import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Terminal } from "./Terminal";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { NoiseLayer, ParticleField, GridOverlay, Vignette, AmbientFog, GlowOrbs, SilkBackground } from "./atmosphere";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

/** Detect touch device — disables mouse-tracking parallax on mobile */
function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

/* ─── Stat chips ──────────────────────────────────────────────────────────── */
function StatChips() {
  const chips = [
    { val: "6.4MB", label: "binary" },
    { val: "14MB",  label: "at rest" },
    { val: "100%",  label: "native rust" },
    { val: "0.4ms", label: "block render" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-start gap-2 mt-7">
      {chips.map((c, i) => (
        <div key={c.val}
          className="reveal inline-flex items-center gap-2.5 rounded-full border border-white/6 bg-white/[0.02] px-3.5 py-1.5 hover:border-white/12 hover:bg-white/[0.04] transition-all duration-300 cursor-default group shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
          style={{ animationDelay: `${i * 0.08}s` }}>
          <span className="font-mono text-[12px] font-normal text-white/80">{c.val}</span>
          <span className="font-mono text-[9px] text-muted-foreground/50 uppercase tracking-[0.18em]">{c.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Hero ───────────────────────────────────────────────────────────── */
export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const pillRef     = useRef<HTMLDivElement>(null);
  const h1Ref       = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);
  const termRef     = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isTouch] = useState(() => isTouchDevice());

  // Entrance timeline
  useEffect(() => {
    if (typeof window === "undefined") return;

    // When reduced motion is preferred, set elements to final state immediately
    if (reducedMotion) {
      const elements = [pillRef.current, subRef.current, ctaRef.current, platformRef.current, termRef.current];
      elements.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" });
      });
      if (h1Ref.current) {
        gsap.set(h1Ref.current, { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" });
      }
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      // Reduce stagger on mobile/touch for smoother performance
      const mobileStagger = isTouch ? 0.018 : 0.012;

      // Pill
      tl.fromTo(pillRef.current,
        { opacity: 0, y: 10, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        0.1
      );

      // Headline split — simpler reveal on mobile (no rotateX/blur)
      if (h1Ref.current) {
        const split = new SplitText(h1Ref.current, { type: "chars,words" });
        if (isTouch) {
          // Simpler fade/slide on mobile — no 3D rotation or blur for performance
          tl.fromTo(split.chars,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, stagger: mobileStagger },
            0.2
          );
        } else {
          tl.fromTo(split.chars,
            { opacity: 0, y: 40, rotateX: -50, filter: "blur(4px)" },
            { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", duration: 0.9, stagger: mobileStagger, transformOrigin: "0% 50% -30px" },
            0.2
          );
        }
      }

      // Sub + CTA + platforms
      tl.fromTo([subRef.current, ctaRef.current, platformRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        0.6
      );

      // Terminal
      tl.fromTo(termRef.current,
        { opacity: 0, y: 60, scale: 0.96, rotateX: 8 },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.2, ease: "expo.out", transformPerspective: 1000 },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Terminal parallax on mouse — disabled on touch devices and when reduced motion is preferred
  useEffect(() => {
    if (reducedMotion || isTouch) return;
    const el = termRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      gsap.to(el, {
        rotateY: dx * 3,
        rotateX: -dy * 2,
        transformPerspective: 1400,
        duration: 1.4,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion, isTouch]);

  return (
    <section ref={sectionRef} className="relative pt-32 pb-24 sm:pt-40 sm:pb-36 overflow-hidden min-h-screen flex flex-col items-center justify-center">
      {/* Silk flowing background */}
      <SilkBackground />
      
      {/* Overlay to darken center for text readability */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,0,0,0.6), transparent 80%)" }} />
      
      {/* Subtle noise texture on top */}
      <NoiseLayer />
      <Vignette />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 w-full flex flex-col items-center text-center select-none gap-0 portrait:gap-6">
        
        {/* Status pill */}
        <div ref={pillRef} style={{ opacity: 0 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0A0A0A]/80 px-4 py-1.5 text-[11px] font-mono text-white/90 mb-7">
          <span className="size-2 rounded-full bg-white/60" />
          v0.1 Developer preview
        </div>

        {/* Headline — minimum 32px on mobile with appropriate line-height */}
        <h1 ref={h1Ref} style={{ opacity: 0, perspective: "1000px" }}
          className="text-[2rem] xs:text-[3.5rem] sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] font-medium tracking-[-0.04em] leading-[1.1] sm:leading-[1.0] text-balance bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent mb-6">
          A terminal,<br/>
          <span className="font-semibold">engineered.</span>
        </h1>

        {/* Sub */}
        <p ref={subRef} style={{ opacity: 0 }}
          className="max-w-xl text-[16px] sm:text-[18px] text-muted-foreground/80 leading-relaxed text-balance font-normal mb-8">
          A calmer surface for serious work. Async-first, and deeply integrated with your repos.
        </p>

        {/* CTA */}
        <div ref={ctaRef} style={{ opacity: 0 }}
          className="flex flex-wrap items-center justify-center gap-4 w-full mb-16">
          <Link to="/download"
            className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white text-black px-7 py-3.5 sm:px-8 text-[14px] sm:text-[14.5px] font-normal transition-all duration-300 hover:bg-neutral-200 hover:-translate-y-0.5 min-h-[48px]">
            Download Nori
            <svg viewBox="0 0 12 12" className="size-3.5 text-black transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2v8M2.5 6.5L6 10l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link to="/docs"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-transparent hover:bg-white/[0.03] px-5 py-3.5 sm:px-6 text-[14px] sm:text-[14.5px] text-foreground/80 transition-all duration-300 hover:text-foreground font-normal min-h-[48px]">
            Read docs
            <svg viewBox="0 0 12 12" className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Centered Terminal Mockup */}
        <div ref={termRef} style={{ opacity: 0 }} className="relative z-10 w-full max-w-3xl mx-auto mb-14">
          <Terminal size="lg" variant="flat" branch="main" path="~/nori/core" />
        </div>

        {/* Platform badges */}
        <div ref={platformRef} style={{ opacity: 0 }}
          className="flex flex-col items-center gap-3">
          <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.25em]">Available on</span>
          <div className="flex flex-wrap items-center justify-center gap-7 font-mono text-[10.5px] text-muted-foreground tracking-[0.1em]">
            <PlatformGlyph label="macOS" icon={<AppleIcon />} />
            <PlatformGlyph label="Windows" icon={<WindowsIcon />} />
            <PlatformGlyph label="Linux" icon={<LinuxIcon />} />
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function Divider() {
  return <span className="text-white/10 select-none">|</span>;
}

function PlatformGlyph({ label, icon, muted }: { label: string; icon: React.ReactNode; muted?: boolean }) {
  return (
    <span className={`flex items-center gap-2 transition-colors duration-300 ${muted ? "text-muted-foreground/30" : "text-muted-foreground hover:text-foreground"}`}>
      {icon}
      <span>{label}</span>
    </span>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.18.67-2.9 1.49-.61.7-1.14 1.83-1 2.96 1.08.08 2.21-.57 2.91-1.39z" />
    </svg>
  );
}

function LinuxIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden="true">
      <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 2c1.4 0 2.7.4 3.9 1.1-.3.5-.7 1.2-.7 2 0 1.1.9 2 2 2 .5 0 1-.2 1.3-.5.4.9.7 1.9.9 3H12V4m7.5 7.1c.1.3.1.6.1.9 0 4.1-3.4 7.5-7.6 7.5-1.9 0-3.6-.7-4.9-1.9l2.8-2.8c.4.2.8.3 1.2.3.8 0 1.5-.3 2.1-.8l2.9 2.9c.7-1.1 1.1-2.4 1.1-3.8 0-.9-.2-1.7-.5-2.5l-2.8-2.8c.4-.4.6-.9.6-1.5 0-1.1-.9-2-2-2-.6 0-1.1.3-1.5.7L9.2 5.6C10 5.2 11 5 12 5c3.9 0 7 3.1 7.5 7.1z" />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden="true">
      <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.95 1.937L24 0v11.55H10.95V1.937zM10.95 12.45H24v11.55l-13.05-1.937v-9.613z" />
    </svg>
  );
}
