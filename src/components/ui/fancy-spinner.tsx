import { cn } from "../../lib/utils";

interface FancySpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  className?: string;
}

const sizeMap = {
  sm: { wrapper: "h-8 w-8", text: "text-xs" },
  md: { wrapper: "h-14 w-14", text: "text-sm" },
  lg: { wrapper: "h-20 w-20", text: "text-base" },
  xl: { wrapper: "h-28 w-28", text: "text-lg" },
};

export function FancySpinner({
  size = "md",
  label,
  className,
}: FancySpinnerProps) {
  const sizes = sizeMap[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <div className={cn("relative", sizes.wrapper)}>
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full opacity-60 blur-xl animate-pulse"
          style={{
            background:
              "conic-gradient(from 0deg, hsl(var(--neon-blue)), hsl(var(--neon-purple)), hsl(var(--neon-pink)), hsl(var(--neon-cyan)), hsl(var(--neon-blue)))",
          }}
        />

        {/* Rotating gradient ring */}
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, hsl(var(--neon-blue)) 25%, hsl(var(--neon-purple)) 50%, hsl(var(--neon-pink)) 75%, hsl(var(--neon-cyan)) 100%)",
            animationDuration: "1.8s",
          }}
        />

        {/* Inner glass cutout */}
        <div className="absolute inset-[3px] rounded-full glass-strong flex items-center justify-center">
          {/* Counter-rotating accent dot */}
          <div
            className="absolute inset-1 rounded-full animate-spin"
            style={{
              background:
                "conic-gradient(from 180deg, transparent 70%, hsl(var(--neon-cyan)) 90%, transparent 100%)",
              animationDuration: "1.2s",
              animationDirection: "reverse",
            }}
          />
          {/* Center pulsing core */}
          <div
            className="relative h-1/3 w-1/3 rounded-full pulse-glow"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--neon-blue)), hsl(var(--neon-purple)))",
              boxShadow:
                "0 0 20px hsla(230, 90%, 62%, 0.8), 0 0 40px hsla(270, 80%, 60%, 0.5)",
            }}
          />
        </div>
      </div>

      {label && (
        <div
          className={cn(
            "flex items-center gap-1.5 font-medium gradient-text",
            sizes.text,
          )}
        >
          <span>{label}</span>
          <span className="flex gap-0.5">
            <span
              className="typing-dot inline-block h-1 w-1 rounded-full"
              style={{ background: "hsl(var(--neon-blue))" }}
            />
            <span
              className="typing-dot inline-block h-1 w-1 rounded-full"
              style={{ background: "hsl(var(--neon-purple))" }}
            />
            <span
              className="typing-dot inline-block h-1 w-1 rounded-full"
              style={{ background: "hsl(var(--neon-cyan))" }}
            />
          </span>
        </div>
      )}
    </div>
  );
}

export default FancySpinner;
