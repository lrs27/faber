"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { AboutSection, EditorAction } from "@/types/editor";
import { sectionStyleToCSS } from "@/lib/styleUtils";

interface Props {
  section: AboutSection;
  dispatch: Dispatch<EditorAction>;
}

export default function DeveloperAbout({ section, dispatch }: Props) {
  const { content, style } = section;
  return (
    <section style={sectionStyleToCSS(style)} className="px-8 md:px-16 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <h3 className="text-2xl font-bold text-[#58a6ff] mb-2" style={{fontFamily: 'var(--font-playfair)'}}>About the Developer</h3>
        <InlineEditable
          as="p"
          value={content.bio}
          onChange={(bio) =>
            dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { bio } })
          }
          className="text-lg leading-relaxed max-w-xl mx-auto text-[#22223b] bg-white/60 px-4 py-2 rounded-xl shadow"
          multiline
        />
      </div>
    </section>
  );
}
