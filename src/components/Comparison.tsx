import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const terminals = ["Nori", "iTerm2", "Windows Terminal", "Warp"] as const;

const metrics = [
  {
    label: "Cold start",
    values: ["18 ms", "~120 ms", "~80 ms", "~200 ms"],
    detail: "Time from launch to first prompt",
  },
  {
    label: "Memory at idle",
    values: ["14 MB", "~45 MB", "~35 MB", "~180 MB"],
    detail: "Single session, no workload",
  },
  {
    label: "Render pipeline",
    values: ["Native GPU", "CoreText", "DirectX/Atlas", "Electron GPU"],
    detail: "Text rendering architecture",
  },
  {
    label: "Native integration",
    values: ["Rust/Tauri", "Obj-C", "C++/WinUI", "Electron"],
    detail: "Runtime and system layer",
  },
] as const;

export function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      // Table rows slide in from the right with stagger
      gsap.utils.toArray<HTMLElement>(".comparison-reveal").forEach((el, i) => {
        gsap.from(el, {
          x: 20,
          y: 10,
          opacity: 0,
          duration: 0.8,
          ease: "expo.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="comparison" className="relative py-28 sm:py-36 border-t border-white/[0.04]">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        {/* Eyebrow + Headline */}
        <div className="comparison-reveal text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/50">
            Comparison
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.035em] text-balance leading-[1.05] text-gradient-soft">
            Measured, not marketed.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed max-w-md mx-auto text-[14.5px]">
            Real benchmarks on equivalent hardware. No synthetic scores — just the metrics developers feel every day.
          </p>
        </div>

        {/* Data Table */}
        <div className="comparison-reveal overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-4 pr-6 text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground/60 font-normal">
                  Metric
                </th>
                {terminals.map((terminal) => (
                  <th
                    key={terminal}
                    className={`pb-4 px-4 text-[10px] font-mono uppercase tracking-[0.22em] font-normal text-center ${
                      terminal === "Nori" ? "text-white/90" : "text-muted-foreground/60"
                    }`}
                  >
                    {terminal}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => (
                <tr key={metric.label} className="border-b border-white/5 group hover:bg-white/[0.01] transition-colors">
                  <td className="py-5 pr-6">
                    <span className="text-[13px] font-mono text-foreground/80">{metric.label}</span>
                    <span className="block mt-0.5 text-[11px] text-muted-foreground/50">{metric.detail}</span>
                  </td>
                  {metric.values.map((value, i) => (
                    <td
                      key={`${metric.label}-${terminals[i]}`}
                      className={`py-5 px-4 text-center text-[13px] font-mono ${
                        i === 0
                          ? "text-white font-medium"
                          : "text-muted-foreground/60"
                      }`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <p className="comparison-reveal mt-8 text-[11px] text-muted-foreground/40 text-center font-mono">
          Benchmarked on Apple M2, 16 GB RAM, macOS 14.2. Cold start measured with hyperfine (100 runs, warm cache).
        </p>
      </div>
    </section>
  );
}
