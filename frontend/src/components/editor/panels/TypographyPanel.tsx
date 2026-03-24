"use client";

import { Dispatch } from "react";
import type { EditorAction, Section } from "@/types/editor";
import { FONT_OPTIONS } from "@/lib/styleUtils";
import ColorSwatch from "./ColorSwatch";

interface Props {
  section: Section;
  dispatch: Dispatch<EditorAction>;
}

export default function TypographyPanel({ section, dispatch }: Props) {
  const typo = section.style?.typography;

  function update(updates: Record<string, unknown>) {
    dispatch({
      type: "UPDATE_STYLE",
      sectionId: section.id,
      style: { typography: updates },
    });
  }

  const fontSize = typo?.fontSize ? parseInt(typo.fontSize) : 16;
  const fontWeight = typo?.fontWeight ?? 400;

  return (
    <div className="space-y-4">
      {/* Font Family */}
      <div>
        <label className="block text-xs font-medium text-brown/70 mb-1">
          Font Family
        </label>
        <select
          value={typo?.fontFamily ?? ""}
          onChange={(e) =>
            update({ fontFamily: e.target.value || undefined })
          }
          className="w-full text-xs bg-cream border border-dark-green/10 rounded px-2 py-1.5 text-dark-green"
        >
          <option value="">Default (inherit)</option>
          {FONT_OPTIONS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-xs font-medium text-brown/70 mb-1">
          Font Size: {fontSize}px
        </label>
        <input
          type="range"
          min={10}
          max={64}
          value={fontSize}
          onChange={(e) => update({ fontSize: `${e.target.value}px` })}
          className="w-full accent-gold"
        />
        <div className="flex justify-between text-[10px] text-brown/40 mt-0.5">
          <span>10px</span>
          <span>64px</span>
        </div>
      </div>

      {/* Font Weight */}
      <div>
        <label className="block text-xs font-medium text-brown/70 mb-1">
          Font Weight
        </label>
        <select
          value={fontWeight}
          onChange={(e) => update({ fontWeight: Number(e.target.value) })}
          className="w-full text-xs bg-cream border border-dark-green/10 rounded px-2 py-1.5 text-dark-green"
        >
          {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((w) => (
            <option key={w} value={w}>
              {w} {w === 400 ? "(Normal)" : w === 700 ? "(Bold)" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Text Color */}
      <ColorSwatch
        label="Text Color"
        value={typo?.color ?? "#1B4D3E"}
        onChange={(color) => update({ color })}
      />

      {/* Reset typography */}
      <button
        onClick={() =>
          dispatch({
            type: "UPDATE_STYLE",
            sectionId: section.id,
            style: { typography: {} },
          })
        }
        className="w-full text-xs py-1.5 text-brown/50 border border-dark-green/10 rounded hover:bg-beige transition-colors"
      >
        Reset Typography
      </button>
    </div>
  );
}
