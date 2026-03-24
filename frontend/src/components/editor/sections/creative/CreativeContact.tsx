"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { ContactSection, EditorAction } from "@/types/editor";

interface Props {
  section: ContactSection;
  dispatch: Dispatch<EditorAction>;
  theme: any;
}

export default function CreativeContact({ section, dispatch, theme }: Props) {
  const { content } = section;

  return (
    <section className="px-8 md:px-16 py-20">
      <InlineEditable
        as="h2"
        value={content.heading}
        onChange={(heading) =>
          dispatch({
            type: "UPDATE_CONTENT",
            sectionId: section.id,
            content: { heading },
          })
        }
        className={`text-4xl font-bold mb-6 text-center ${theme.accent}`}
      />

      <InlineEditable
        as="p"
        value={content.subheading}
        onChange={(subheading) =>
          dispatch({
            type: "UPDATE_CONTENT",
            sectionId: section.id,
            content: { subheading },
          })
        }
        className="text-center mb-6 opacity-80 max-w-xl mx-auto"
        multiline
      />

      <div
        className={`
          max-w-xl mx-auto p-8 rounded-2xl border
          ${theme.cardStyle}
        `}
      >
        <InlineEditable
          as="p"
          value={content.email}
          onChange={(email) =>
            dispatch({
              type: "UPDATE_CONTENT",
              sectionId: section.id,
              content: { email },
            })
          }
          className={`text-center font-semibold ${theme.accent}`}
        />
      </div>
    </section>
  );
}
