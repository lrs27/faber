"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { AboutSection, EditorAction } from "@/types/editor";
import { sectionStyleToCSS } from "@/lib/styleUtils";

interface Props {
  section: AboutSection;
  dispatch: Dispatch<EditorAction>;
}

export default function AcademicAbout({ section, dispatch }: Props) {
  const { content, style } = section;
  return (
    <section style={sectionStyleToCSS(style)} className="px-8 md:px-16 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold/60 to-brown/40 border-2 border-dark-green/10 flex items-center justify-center">
          <InlineEditable
            value={content.avatarInitials || "JC"}
            onChange={(avatarInitials) =>
              dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { avatarInitials } })
            }
            className="text-2xl font-bold text-dark-green/80 tracking-wide text-center bg-transparent outline-none border-none"
            as="span"
          />
        </div>
        <InlineEditable
          as="p"
          value={content.bio}
          onChange={(bio) =>
            dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { bio } })
          }
          className="text-lg leading-relaxed max-w-xl mx-auto"
          multiline
        />
      </div>
    </section>
  );
}
