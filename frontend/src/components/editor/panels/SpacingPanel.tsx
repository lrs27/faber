"use client";

import { Dispatch, useState } from "react";
import type { EditorAction, Section } from "@/types/editor";

interface Props {
  section: Section;
  dispatch: Dispatch<EditorAction>;
}

export default function SpacingPanel({ section, dispatch }: Props) {
  const spacing = section.style?.spacing;
  const [linked, setLinked] = useState(false);

  function update(updates: Record<string, string | undefined>) {
    dispatch({
      type: "UPDATE_STYLE",
      sectionId: section.id,
      style: { spacing: updates },
    });
  }

  function parsePx(val?: string): number {
    return val ? parseInt(val) || 0 : 0;
  }

  const pt = parsePx(spacing?.paddingTop);
  const pr = parsePx(spacing?.paddingRight);
  const pb = parsePx(spacing?.paddingBottom);
  const pl = parsePx(spacing?.paddingLeft);
  const mt = parsePx(spacing?.marginTop);
  const mb = parsePx(spacing?.marginBottom);
  const br = parsePx(spacing?.borderRadius);

  function handlePadding(side: string, value: number) {
    const v = `${value}px`;
    if (linked) {
      update({
        paddingTop: v,
        paddingRight: v,
        paddingBottom: v,
        paddingLeft: v,
      });
    } else {
      update({ [side]: v });
    }
  }

  return (
    <div className="space-y-4">
      {/* Padding */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-brown/70">Padding</label>
          <button
            onClick={() => setLinked(!linked)}
            title={linked ? "Unlink sides" : "Link all sides"}
            className={`text-xs px-2 py-0.5 rounded border transition-colors ${
              linked
                ? "bg-gold/20 border-gold text-gold"
                : "border-dark-green/10 text-brown/40 hover:bg-beige"
            }`}
          >
            {linked ? "Linked" : "Link"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Top", key: "paddingTop", val: pt },
            { label: "Right", key: "paddingRight", val: pr },
            { label: "Bottom", key: "paddingBottom", val: pb },
            { label: "Left", key: "paddingLeft", val: pl },
          ].map((item) => (
            <div key={item.key} className="flex items-center gap-1.5">
              <label className="text-[10px] text-brown/40 w-8">
                {item.label}
              </label>
              <input
                type="number"
                min={0}
                max={200}
                value={item.val}
                onChange={(e) =>
                  handlePadding(item.key, Number(e.target.value))
                }
                className="w-full text-xs bg-cream border border-dark-green/10 rounded px-2 py-1 text-dark-green"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Margin */}
      <div>
        <label className="block text-xs font-medium text-brown/70 mb-2">
          Margin
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5">
            <label className="text-[10px] text-brown/40 w-8">Top</label>
            <input
              type="number"
              min={0}
              max={200}
              value={mt}
              onChange={(e) =>
                update({ marginTop: `${e.target.value}px` })
              }
              className="w-full text-xs bg-cream border border-dark-green/10 rounded px-2 py-1 text-dark-green"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <label className="text-[10px] text-brown/40 w-8">Btm</label>
            <input
              type="number"
              min={0}
              max={200}
              value={mb}
              onChange={(e) =>
                update({ marginBottom: `${e.target.value}px` })
              }
              className="w-full text-xs bg-cream border border-dark-green/10 rounded px-2 py-1 text-dark-green"
            />
          </div>
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <label className="block text-xs font-medium text-brown/70 mb-1">
          Border Radius: {br}px
        </label>
        <input
          type="range"
          min={0}
          max={48}
          value={br}
          onChange={(e) =>
            update({ borderRadius: `${e.target.value}px` })
          }
          className="w-full accent-gold"
        />
      </div>

      {/* Reset spacing */}
      <button
        onClick={() =>
          dispatch({
            type: "UPDATE_STYLE",
            sectionId: section.id,
            style: { spacing: {} },
          })
        }
        className="w-full text-xs py-1.5 text-brown/50 border border-dark-green/10 rounded hover:bg-beige transition-colors"
      >
        Reset Spacing
      </button>
    </div>
  );
}
