interface EyebrowProps {
  text?: string;
  className?: string;
  color?: string;
}

export function Eyebrow({ text, className, color }: EyebrowProps) {
  if (!text) return null;

  const c = color || "#c9963e";

  return (
    <div className={className ?? "mb-6 flex items-center gap-3"}>
      <span className="block h-px w-8" style={{ backgroundColor: c }} />
      <span
        className="text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: c }}
      >
        {text}
      </span>
    </div>
  );
}
