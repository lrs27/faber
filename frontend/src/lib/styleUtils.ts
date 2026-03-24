import type { SectionStyle, GradientBackground } from "@/types/editor";
import type { CSSProperties } from "react";

const GRADIENT_MAP: Record<GradientBackground["direction"], string> = {
  "to-r": "to right",
  "to-l": "to left",
  "to-t": "to top",
  "to-b": "to bottom",
  "to-br": "to bottom right",
  "to-bl": "to bottom left",
  "to-tr": "to top right",
  "to-tl": "to top left",
};

export function sectionStyleToCSS(style?: SectionStyle): CSSProperties {
  if (!style) return {};
  const css: CSSProperties = {};

  if (style.background) {
    switch (style.background.type) {
      case "solid":
        css.backgroundColor = style.background.color;
        break;
      case "gradient":
        css.background = `linear-gradient(${GRADIENT_MAP[style.background.direction]}, ${style.background.from}, ${style.background.to})`;
        break;
      case "transparent":
        css.backgroundColor = "transparent";
        break;
    }
  }

  if (style.typography) {
    const t = style.typography;
    if (t.fontFamily) css.fontFamily = t.fontFamily;
    if (t.fontSize) css.fontSize = t.fontSize;
    if (t.fontWeight) css.fontWeight = t.fontWeight;
    if (t.color) css.color = t.color;
  }

  if (style.spacing) {
    const s = style.spacing;
    if (s.paddingTop) css.paddingTop = s.paddingTop;
    if (s.paddingBottom) css.paddingBottom = s.paddingBottom;
    if (s.paddingLeft) css.paddingLeft = s.paddingLeft;
    if (s.paddingRight) css.paddingRight = s.paddingRight;
    if (s.marginTop) css.marginTop = s.marginTop;
    if (s.marginBottom) css.marginBottom = s.marginBottom;
    if (s.borderRadius) {
      css.borderRadius = s.borderRadius;
      css.overflow = "hidden";
    }
  }

  return css;
}

export const DESIGN_COLORS = [
  { name: "Cream", hex: "#FDF5EC" },
  { name: "Gold", hex: "#C8963E" },
  { name: "Brown", hex: "#8B5E3C" },
  { name: "Dark Green", hex: "#1B4D3E" },
  { name: "Beige", hex: "#E8DDD3" },
  { name: "Orange", hex: "#FF6B35" },
  { name: "Yellow", hex: "#F7C948" },
  { name: "Blue", hex: "#4169E1" },
  { name: "Light Blue", hex: "#A8D5E5" },
  { name: "Pink", hex: "#FFB5C2" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
] as const;

export const FONT_OPTIONS = [
  "Inter",
  "Playfair Display",
  "Georgia",
  "Merriweather",
  "Roboto Mono",
  "system-ui",
] as const;

export const GRADIENT_DIRECTIONS: { value: GradientBackground["direction"]; label: string }[] = [
  { value: "to-r", label: "→ Right" },
  { value: "to-l", label: "← Left" },
  { value: "to-b", label: "↓ Down" },
  { value: "to-t", label: "↑ Up" },
  { value: "to-br", label: "↘ Bottom Right" },
  { value: "to-bl", label: "↙ Bottom Left" },
  { value: "to-tr", label: "↗ Top Right" },
  { value: "to-tl", label: "↖ Top Left" },
];
