import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import noriLogo from "@/assets/nori.png";

const navItems = [
  { to: "/docs", label: "Docs" },
  { to: "/changelog", label: "Changelog" },
  { to: "/feedback", label: "Feedback" },
] as const;

export function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Nav entrance animation
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      navContentRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out" },
    );
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header ref={headerRef} className="fixed top-0 inset-x-0 z-50">
      <div className={`absolute inset-0 transition-all duration-700 ${
        scrolled ? "bg-[#060606]/85 backdrop-blur-2xl border-b border-white/[0.03]" : ""
      }`} />

      <div ref={navContentRef} className="relative mx-auto max-w-6xl px-5 sm:px-6" style={{ opacity: 0 }}>
        <div className="flex items-center justify-between h-[60px]">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5">
            <img src={noriLogo} alt="Nori" className="size-6 rounded-lg object-contain" />
            <span className="text-[14px] font-medium tracking-tight text-white/90">Nori</span>
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.to);
              return (
                <Link key={item.to} to={item.to}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] transition-all duration-200 ${
                    active ? "text-white/90 bg-white/[0.06]" : "text-white/40 hover:text-white/70"
                  }`}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link to="/download"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-white text-[#0A0A0A] px-4 py-1.5 text-[12.5px] font-medium hover:bg-white/90 transition-all duration-200">
              Download
            </Link>
            <button aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}
              className="md:hidden size-9 grid place-items-center rounded-full border border-white/[0.06] text-white/60">
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#060606]/95 backdrop-blur-2xl border-b border-white/[0.04] animate-mobile-nav-in">
          <nav className="mx-auto max-w-6xl px-5 py-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.to);
              return (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)}
                  className={`flex items-center min-h-[44px] px-4 py-2.5 rounded-xl text-[15px] transition-all ${
                    active ? "text-white bg-white/[0.04]" : "text-white/50"
                  }`}>
                  {item.label}
                </Link>
              );
            })}
            <Link to="/download" onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center rounded-xl bg-white text-[#0A0A0A] min-h-[44px] py-2.5 text-[14px] font-medium">
              Download
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
