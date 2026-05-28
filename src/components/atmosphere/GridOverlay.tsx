interface GridOverlayProps {
  opacity?: number;
}

export function GridOverlay({ opacity = 0.04 }: GridOverlayProps) {
  // Cap opacity at 0.06 max per atmosphere layer requirements
  const clampedOpacity = Math.min(opacity, 0.06);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      style={{
        opacity: clampedOpacity,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "56px 56px",
      }}
    >
      {/* Volumetric guides — vertical and horizontal */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, transparent, rgba(255,255,255,0.04), transparent) no-repeat 15% 0 / 1px 100%,
            linear-gradient(to bottom, transparent, rgba(255,255,255,0.04), transparent) no-repeat 50% 0 / 1px 100%,
            linear-gradient(to bottom, transparent, rgba(255,255,255,0.04), transparent) no-repeat 85% 0 / 1px 100%,
            linear-gradient(to right, transparent, rgba(255,255,255,0.04), transparent) no-repeat 0 25% / 100% 1px,
            linear-gradient(to right, transparent, rgba(255,255,255,0.04), transparent) no-repeat 0 65% / 100% 1px
          `,
        }}
      />
    </div>
  );
}
