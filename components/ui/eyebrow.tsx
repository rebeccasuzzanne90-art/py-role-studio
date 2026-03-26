interface EyebrowProps {
  text?: string;
  className?: string;
  color?: string;
  inspectorProps?: Record<string, string> | null;
}

export function Eyebrow({ text, className, color, inspectorProps }: EyebrowProps) {
  if (!text) return null;

  const c = color || "#c9963e";

  return (
    <div className={className ?? "mb-6 flex items-center gap-3"}>
      <span className="block h-px w-8" style={{ backgroundColor: c }} />
      <span
        {...(inspectorProps ?? {})}
        className="text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: c }}
      >
        {text}
      </span>
    </div>
  );
}
