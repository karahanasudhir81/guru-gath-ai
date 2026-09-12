import { cn } from "@/lib/utils";
import lotusLogo from "@/assets/lotus-logo.png";

/** Fine line lotus icon (inline SVG so it inherits currentColor). */
export function LotusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" className={cn("size-6", className)} aria-hidden>
      <path d="M32 54c-8-6-12-14-12-24 4 2 8 6 12 12 4-6 8-10 12-12 0 10-4 18-12 24Z" />
      <path d="M32 54c-12-2-20-8-24-16 6-1 12 1 18 5" />
      <path d="M32 54c12-2 20-8 24-16-6-1-12 1-18 5" />
      <path d="M32 42c-2-8-1-16 0-24 1 8 2 16 0 24Z" />
      <path d="M8 56c8 2 16 3 24 3s16-1 24-3" strokeLinecap="round" />
    </svg>
  );
}

export function BrandMark({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <img
      src={lotusLogo}
      alt="VidyaAI lotus mark"
      width={size}
      height={size}
      className={cn("object-contain drop-shadow-[0_0_12px_oklch(0.82_0.12_88_/_0.45)]", className)}
    />
  );
}

/** Concentric mandala watermark, meant to sit at low opacity behind content. */
export function Mandala({ className }: { className?: string }) {
  const rings = [60, 90, 120, 150, 180, 210];
  return (
    <svg
      viewBox="0 0 480 480"
      className={cn("pointer-events-none select-none text-gold", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden
    >
      <g transform="translate(240 240)">
        {rings.map((r) => (
          <circle key={r} r={r} />
        ))}
        {Array.from({ length: 24 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 15})`}>
            <path d="M0 -60 C 14 -90, 14 -120, 0 -150 C -14 -120, -14 -90, 0 -60Z" />
            <path d="M0 -150 C 10 -170, 10 -190, 0 -210 C -10 -190, -10 -170, 0 -150Z" />
            <line x1="0" y1="-210" x2="0" y2="-230" />
          </g>
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={`p${i}`} transform={`rotate(${i * 30 + 15})`}>
            <path d="M0 -20 C 12 -34, 12 -48, 0 -60 C -12 -48, -12 -34, 0 -20Z" />
          </g>
        ))}
        <circle r="8" />
      </g>
    </svg>
  );
}

/** Traditional toran (welcome banner) — scalloped marigold garland strip. */
export function Toran({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-6 w-full overflow-hidden", className)} aria-hidden>
      <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="toranGold" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.9 0.08 92)" />
            <stop offset="1" stopColor="oklch(0.74 0.17 58)" />
          </linearGradient>
        </defs>
        <path
          d="M0 0 H400 V4 Q390 20 380 4 Q370 20 360 4 Q350 20 340 4 Q330 20 320 4 Q310 20 300 4 Q290 20 280 4 Q270 20 260 4 Q250 20 240 4 Q230 20 220 4 Q210 20 200 4 Q190 20 180 4 Q170 20 160 4 Q150 20 140 4 Q130 20 120 4 Q110 20 100 4 Q90 20 80 4 Q70 20 60 4 Q50 20 40 4 Q30 20 20 4 Q10 20 0 4 Z"
          fill="url(#toranGold)"
          opacity="0.9"
        />
        {Array.from({ length: 20 }).map((_, i) => (
          <circle key={i} cx={i * 20 + 10} cy="16" r="2.4" fill="oklch(0.64 0.19 45)" />
        ))}
      </svg>
    </div>
  );
}

/** Animated audio wave bars. */
export function AudioWave({ bars = 24, className, active = true }: { bars?: number; className?: string; active?: boolean }) {
  return (
    <div className={cn("flex h-10 items-center gap-[3px]", className)} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "block w-[3px] origin-center rounded-full bg-gradient-to-t from-saffron-deep via-saffron to-gold",
            active ? "animate-wave" : "scale-y-[0.25]",
          )}
          style={{
            height: `${30 + Math.abs(Math.sin(i * 0.9)) * 70}%`,
            animationDelay: `${(i % 8) * 0.09}s`,
            animationDuration: `${0.9 + (i % 5) * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  onIvory = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  onIvory?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn("mb-3 text-xs font-semibold uppercase tracking-[0.28em]", onIvory ? "text-saffron-deep" : "text-gold")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("font-display text-4xl font-semibold leading-[1.1] md:text-5xl", onIvory ? "text-navy-deep" : "text-foreground")}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-base leading-relaxed md:text-lg", onIvory ? "text-ink-muted" : "text-muted-foreground")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
