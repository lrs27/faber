"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { AboutSection, EditorAction } from "@/types/editor";

interface Props {
  section: AboutSection;
  dispatch: Dispatch<EditorAction>;
}

export default function RetroAbout({ section, dispatch }: Props) {
  const { content } = section;
  return (
    <section className="px-8 md:px-16 py-16 md:py-24">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="shrink-0">
          <div className="w-36 h-36 rounded-2xl bg-gradient-to-br from-pink/60 to-orange/40 border-4 border-blue flex items-center justify-center shadow-[6px_6px_0_rgba(0,0,0,0.15)] rotate-[-3deg]">
            <span className="text-3xl font-bold text-white/80 tracking-widest">MM</span>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h2
            className="text-3xl md:text-4xl font-bold text-dark-green mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            About Me
          </h2>
          <InlineEditable
            as="p"
            value={content.bio}
            onChange={(bio) =>
              dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { bio } })
            }
            className="text-brown/60 leading-relaxed max-w-lg"
            multiline
          />
        </div>
      </div>
    </section>
  );
}
