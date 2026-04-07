"use client";

import { useRef, useState, useCallback, type KeyboardEvent } from "react";

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  placeholder?: string;
  multiline?: boolean;
}

export default function InlineEditable({
  value,
  onChange,
  as: Tag = "span",
  className = "",
  placeholder = "",
  multiline = false,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    const text = ref.current?.innerText?.trim() ?? "";
    if (text !== value) {
      onChange(text);
    }
  }, [value, onChange]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && !multiline) {
        e.preventDefault();
        ref.current?.blur();
      }
      if (e.key === "Escape") {
        if (ref.current) ref.current.innerText = value;
        ref.current?.blur();
      }
    },
    [value, multiline]
  );

  const handleClick = useCallback(() => {
    if (isEditing) return;
    setIsEditing(true);
    requestAnimationFrame(() => {
      ref.current?.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      if (ref.current && selection) {
        range.selectNodeContents(ref.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
  }, [isEditing]);

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${className} outline-none transition-shadow ${
        isEditing
          ? "ring-2 ring-gold/50 rounded-md px-1 -mx-1"
          : "cursor-pointer hover:ring-1 hover:ring-gold/30 hover:rounded-md"
      } ${!value ? "text-brown/40 italic" : ""}`}
      style={{ minWidth: "1ch" }}
    >
      {value || placeholder}
    </Tag>
  );
}
