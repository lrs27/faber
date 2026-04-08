"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { AboutSection, EditorAction } from "@/types/editor";
import { sectionStyleToCSS } from "@/lib/styleUtils";

interface Props {
  section: AboutSection;
  dispatch: Dispatch<EditorAction>;
}

export default function RetroAbout({ section, dispatch }: Props) {
  const { content, style } = section;

  return (
    <section
      style={sectionStyleToCSS(style)}
      className="px-8 py-20 max-w-4xl mx-auto text-[#ff4d6d] font-retro"
    >
      <h2 className="text-4xl font-extrabold mb-6 tracking-wider text-center">
        About Me
      </h2>

      <InlineEditable
        as="p"
        value={content.bio}
        onChange={(bio) =>
          dispatch({
            type: "UPDATE_CONTENT",
            sectionId: section.id,
            content: { bio },
          })
        }
        className="text-lg leading-relaxed text-[#ffb3c1] bg-[#1a1a1a] p-6 rounded-lg border border-[#ff4d6d]/40"
        multiline
      />
    </section>
  );
}
