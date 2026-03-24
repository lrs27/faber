"use client";

import { DESIGN_COLORS } from "@/lib/styleUtils";

interface Props {
  value: string;
  onChange: (hex: string) => void;
  label?: string;
}

export default function ColorSwatch({ value, onChange, label }: Props) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-medium text-brown/70 mb-1.5">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2 mb-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border border-dark-green/10 cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) {
              onChange(e.target.value);
            }
          }}
          className="w-20 text-xs font-mono bg-cream border border-dark-green/10 rounded px-2 py-1 text-dark-green"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {DESIGN_COLORS.map((c) => (
          <button
            key={c.hex}
            onClick={() => onChange(c.hex)}
            title={c.name}
            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
              value.toLowerCase() === c.hex.toLowerCase()
                ? "border-gold scale-110"
                : "border-dark-green/10"
            }`}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </div>
  );
}
