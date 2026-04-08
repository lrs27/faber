"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { ContactSection, EditorAction } from "@/types/editor";

interface Props {
  section: ContactSection;
  dispatch: Dispatch<EditorAction>;
}

export default function CreativeContact({ section, dispatch }: Props) {
  const { content } = section;

  return (
    <footer className="px-8 py-20 text-center bg-white/70 backdrop-blur-sm border-t border-pink-200">
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
        className="text-4xl font-bold text-dark-green"
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
        className="mt-4 text-brown/70 text-lg"
        multiline
      />

      <a
        href={`mailto:${content.email}`}
        className="inline-block mt-6 px-10 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-md hover:bg-pink-600 transition text-lg cursor-pointer"
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
          className="text-white"
        />
      </a>
    </footer>
  );
}
