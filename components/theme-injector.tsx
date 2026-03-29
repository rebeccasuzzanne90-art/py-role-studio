import type { SiteSettingsData } from "@/types/content";

function hexToHslColor(hex: string): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return `hsl(${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
}

function autoForeground(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "hsl(0 0% 100%)";
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "hsl(0 0% 5%)" : "hsl(0 0% 98%)";
}

const FONT_STACKS: Record<string, string> = {
  "Inter": "'Inter', sans-serif",
  "Geist": "var(--font-geist-sans), sans-serif",
  "Poppins": "'Poppins', sans-serif",
  "DM Sans": "var(--font-dm-sans), 'DM Sans', sans-serif",
  "Montserrat": "'Montserrat', sans-serif",
  "Playfair Display": "var(--font-playfair), 'Playfair Display', serif",
  "Merriweather": "'Merriweather', serif",
  "Open Sans": "'Open Sans', sans-serif",
  "Lato": "'Lato', sans-serif",
  "Source Sans 3": "'Source Sans 3', sans-serif",
};

const RADIUS_MAP: Record<string, string> = {
  none: "0",
  small: "0.25rem",
  medium: "0.5rem",
  large: "0.75rem",
  full: "9999px",
};

interface ThemeInjectorProps {
  settings: SiteSettingsData | null;
}

export function ThemeInjector({ settings }: ThemeInjectorProps) {
  if (!settings) return null;

  const vars: Record<string, string> = {};

  if (settings.primaryColor) {
    const c = hexToHslColor(settings.primaryColor);
    if (c) {
      vars["--primary"] = c;
      vars["--primary-foreground"] = autoForeground(settings.primaryColor);
    }
  }
  if (settings.secondaryColor) {
    const c = hexToHslColor(settings.secondaryColor);
    if (c) {
      vars["--secondary"] = c;
      vars["--secondary-foreground"] = autoForeground(settings.secondaryColor);
    }
  }
  if (settings.accentColor) {
    const c = hexToHslColor(settings.accentColor);
    if (c) {
      vars["--accent"] = c;
      vars["--accent-foreground"] = autoForeground(settings.accentColor);
    }
  }
  if (settings.backgroundColor) {
    const c = hexToHslColor(settings.backgroundColor);
    if (c) vars["--background"] = c;
  }
  if (settings.borderRadius) {
    vars["--radius"] = RADIUS_MAP[settings.borderRadius] ?? "0.5rem";
  }
  if (settings.fontHeading) {
    const stack = FONT_STACKS[settings.fontHeading];
    if (stack) vars["--font-heading"] = stack;
  }
  if (settings.fontBody) {
    const stack = FONT_STACKS[settings.fontBody];
    if (stack) vars["--font-sans"] = stack;
  }

  if (Object.keys(vars).length === 0) return null;

  const cssText = Object.entries(vars)
    .map(([k, v]) => `${k}: ${v};`)
    .join("\n  ");

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `:root {\n  ${cssText}\n}`,
      }}
    />
  );
}
