export function GlowOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {/* Top orbs — combined top-left and top-right into single element with multiple gradients */}
      <div
        className="absolute inset-0 opacity-[0.04] blur-[120px]"
        style={{
          background: `
            radial-gradient(600px circle at -5% -10%, rgba(255,255,255,0.05) 0%, transparent 70%),
            radial-gradient(500px circle at 105% -5%, rgba(255,255,255,0.04) 0%, transparent 70%),
            radial-gradient(700px circle at -10% 33%, rgba(255,255,255,0.04) 0%, transparent 75%),
            radial-gradient(800px circle at 50% 110%, rgba(255,255,255,0.05) 0%, transparent 70%)
          `,
        }}
      />
    </div>
  );
}
