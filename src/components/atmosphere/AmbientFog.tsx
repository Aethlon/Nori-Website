export function AmbientFog() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2]"
      style={{
        background: `
          linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 40%, transparent 70%, rgba(255,255,255,0.01) 100%),
          radial-gradient(ellipse 60% 40% at 15% 80%, rgba(255,255,255,0.03) 0%, transparent 70%),
          radial-gradient(ellipse 70% 35% at 85% 75%, rgba(255,255,255,0.02) 0%, transparent 70%)
        `,
      }}
    />
  );
}
