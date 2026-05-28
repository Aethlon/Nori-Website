interface GradientBloomProps {
  className?: string;
  color?: string;
  size?: string;
  opacity?: number;
}

const MAX_OPACITY = 0.15;

export function GradientBloom({
  className = "",
  color = "radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 70%)",
  size = "600px",
  opacity = 0.12,
}: GradientBloomProps) {
  const clampedOpacity = Math.min(opacity, MAX_OPACITY);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute blur-[120px] rounded-full mix-blend-screen select-none ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        opacity: clampedOpacity,
      }}
    />
  );
}
