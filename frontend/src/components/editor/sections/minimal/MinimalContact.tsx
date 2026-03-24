"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { ContactSection, EditorAction } from "@/types/editor";

interface Props {
  section: ContactSection;
  dispatch: Dispatch<EditorAction>;
}

export default function MinimalContact({ section, dispatch }: Props) {
  const { content } = section;
  return (
    <section className="px-8 md:px-16 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <InlineEditable
          as="h2"
          value={content.heading}
          onChange={(heading) =>
            dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { heading } })
          }
          className="text-3xl font-bold text-dark-green mb-4"
        />
        <InlineEditable
          as="p"
          value={content.subheading}
          onChange={(subheading) =>
            dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { subheading } })
          }
          className="text-brown/60 mb-8"
          multiline
        />
        <InlineEditable
          value={content.email}
          onChange={(email) =>
            dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { email } })
          }
          className="text-lg font-semibold text-gold underline underline-offset-4"
        />
      </div>
    </section>
  );
}
