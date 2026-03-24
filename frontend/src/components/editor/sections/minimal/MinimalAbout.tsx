"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { AboutSection, EditorAction } from "@/types/editor";

interface Props {
  section: AboutSection;
  dispatch: Dispatch<EditorAction>;
}

export default function MinimalAbout({ section, dispatch }: Props) {
  const { content } = section;
  return (
    <section className="px-8 md:px-16 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <InlineEditable
          as="p"
          value={content.bio}
          onChange={(bio) =>
            dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { bio } })
          }
          className="text-lg text-brown/60 leading-relaxed max-w-xl mx-auto"
          multiline
        />
      </div>
    </section>
  );
}
