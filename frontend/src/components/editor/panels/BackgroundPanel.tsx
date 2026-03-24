"use client";

import { Dispatch } from "react";
import type { EditorAction, Section, BackgroundConfig, GradientBackground } from "@/types/editor";
import { GRADIENT_DIRECTIONS } from "@/lib/styleUtils";
import ColorSwatch from "./ColorSwatch";

interface Props {
  section: Section;
  dispatch: Dispatch<EditorAction>;
}

export default function BackgroundPanel({ section, dispatch }: Props) {
  const bg = section.style?.background;
  const mode = bg?.type ?? "transparent";

  function updateBg(config: BackgroundConfig) {
    dispatch({
      type: "UPDATE_STYLE",
      sectionId: section.id,
      style: { background: config },
    });
  }

  return (
    <div className="space-y-4">
      {/* Mode selector */}
      <div className="flex rounded-lg border border-dark-green/10 overflow-hidden">
        {(["solid", "gradient", "transparent"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              if (m === "solid") updateBg({ type: "solid", color: "#FDF5EC" });
              else if (m === "gradient")
                updateBg({ type: "gradient", direction: "to-r", from: "#FF6B35", to: "#F7C948" });
              else updateBg({ type: "transparent" });
            }}
            className={`flex-1 text-xs py-2 font-medium capitalize transition-colors ${
              mode === m
                ? "bg-dark-green text-cream"
                : "bg-cream text-brown/60 hover:bg-beige"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Solid controls */}
      {mode === "solid" && bg?.type === "solid" && (
        <ColorSwatch
          label="Background Color"
          value={bg.color}
          onChange={(color) => updateBg({ type: "solid", color })}
        />
      )}

      {/* Gradient controls */}
      {mode === "gradient" && bg?.type === "gradient" && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-brown/70 mb-1">
              Direction
            </label>
            <select
              value={bg.direction}
              onChange={(e) =>
                updateBg({ ...bg, direction: e.target.value as GradientBackground["direction"] })
              }
              className="w-full text-xs bg-cream border border-dark-green/10 rounded px-2 py-1.5 text-dark-green"
            >
              {GRADIENT_DIRECTIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
          <ColorSwatch
            label="From Color"
            value={bg.from}
            onChange={(from) => updateBg({ ...bg, from })}
          />
          <ColorSwatch
            label="To Color"
            value={bg.to}
            onChange={(to) => updateBg({ ...bg, to })}
          />
        </div>
      )}

      {/* Transparent - just a note */}
      {mode === "transparent" && (
        <p className="text-xs text-brown/50 italic">
          No background applied. The section inherits the canvas background.
        </p>
      )}
    </div>
  );
}
