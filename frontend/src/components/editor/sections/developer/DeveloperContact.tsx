"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { ContactSection, EditorAction } from "@/types/editor";
import { sectionStyleToCSS } from "@/lib/styleUtils";

interface Props {
  section: ContactSection;
  dispatch: Dispatch<EditorAction>;
  theme: any;
}

export default function DeveloperContact({ section, dispatch, theme }: Props) {
  const { content, style } = section;
  const accent = theme && theme.accent ? theme.accent : "text-blue-400";
  const cardStyle = theme && theme.cardStyle ? theme.cardStyle : "border-blue";
  return (
    <section style={sectionStyleToCSS(style)} className="px-8 md:px-16 py-20">
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
        className={`text-4xl font-bold mb-6 text-center ${accent}`}
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
          ${cardStyle}
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
          className="text-lg font-semibold text-gold underline underline-offset-4 text-center"
        />
      </div>
    </section>
  );
}
