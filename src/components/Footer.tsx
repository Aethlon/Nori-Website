import { Link } from "@tanstack/react-router";
import noriLogo from "@/assets/nori.png";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] py-8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left — brand */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={noriLogo} alt="Nori" className="size-5 rounded-md object-contain opacity-70" />
              <span className="text-[13px] font-medium text-white/50">Nori</span>
            </Link>
            <nav className="flex items-center gap-5 text-[12px] text-white/30">
              <Link to="/docs" className="hover:text-white/70 transition-colors">Docs</Link>
              <Link to="/changelog" className="hover:text-white/70 transition-colors">Changelog</Link>
              <Link to="/download" className="hover:text-white/70 transition-colors">Download</Link>
              <Link to="/feedback" className="hover:text-white/70 transition-colors">Feedback</Link>
            </nav>
          </div>

          {/* Right — attribution */}
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-white/20">
              A product of <span className="text-white/40 font-medium tracking-wide">AETHLON</span>
            </span>
            <span className="text-white/10">·</span>
            <span className="text-[11px] font-mono text-white/20">© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
