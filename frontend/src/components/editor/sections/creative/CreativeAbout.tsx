"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { AboutSection, EditorAction } from "@/types/editor";

interface Props {
  section: AboutSection;
  dispatch: Dispatch<EditorAction>;
  theme: any; // Creative theme object
}

export default function CreativeAbout({ section, dispatch, theme }: Props) {
  const { content } = section;

  return (
    <section
      className={`
        px-8 md:px-16 py-20 md:py-28 
        bg-gradient-to-br ${theme.gradient}
        rounded-3xl shadow-xl
      `}
    >
      <div className="max-w-3xl mx-auto text-center">
        <InlineEditable
          as="h2"
          value={content.bio || "About Me"}
          onChange={(heading) =>
            dispatch({
              type: "UPDATE_CONTENT",
              sectionId: section.id,
              content: { heading },
            })
          }
          className={`text-5xl font-extrabold mb-6 ${theme.accent}`}
        />

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
          className="
            text-lg leading-relaxed 
            max-w-xl mx-auto 
            text-black/70 
            bg-white/40 backdrop-blur-md 
            p-6 rounded-2xl border border-white/50
          "
          multiline
        />
      </div>
    </section>
  );
}
