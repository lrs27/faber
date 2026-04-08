"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { ContactSection, EditorAction } from "@/types/editor";
import { sectionStyleToCSS } from "@/lib/styleUtils";

interface Props {
  section: ContactSection;
  dispatch: Dispatch<EditorAction>;
}

export default function RetroContact({ section, dispatch }: Props) {
  const { content, style } = section;

  return (
    <footer
      style={sectionStyleToCSS(style)}
      className="px-8 py-20 text-center font-retro text-[#39ff14]"
    >
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
        className="text-4xl font-extrabold tracking-wider"
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
        className="mt-4 text-lg text-[#9aff9a]"
        multiline
      />

      <a
        href={`mailto:${content.email}`}
        className="inline-block mt-6 px-10 py-3 bg-[#39ff14] text-black font-bold rounded-md shadow-[0_0_10px_#39ff14] hover:bg-[#2cff0f] transition cursor-pointer"
      >
        <InlineEditable
          as="span"
          value={content.email}
          onChange={(email) =>
            dispatch({
              type: "UPDATE_CONTENT",
              sectionId: section.id,
              content: { email },
            })
          }
        />
      </a>
    </footer>
  );
}
