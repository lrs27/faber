"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { HeroSection, EditorAction } from "@/types/editor";

interface Props {
  section: HeroSection;
  dispatch: Dispatch<EditorAction>;
}

export default function MinimalHero({ section, dispatch }: Props) {
  const { content } = section;
  return (
    <section className="px-8 md:px-16 py-24 md:py-32">
      <div className="max-w-3xl mx-auto text-center">
        <InlineEditable
          as="h1"
          value={content.name}
          onChange={(name) =>
            dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { name } })
          }
          className="text-5xl md:text-7xl font-bold text-dark-green tracking-tight"
        />
        <div className="mt-4">
          <InlineEditable
            as="p"
            value={content.title}
            onChange={(title) =>
              dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { title } })
            }
            className="text-lg text-brown/50 font-medium tracking-wide uppercase"
          />
        </div>
        <hr className="mt-8 mx-auto w-16 border-t-2 border-dark-green/20" />
      </div>
    </section>
  );
}
