"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { AboutSection, EditorAction } from "@/types/editor";

interface Props {
  section: AboutSection;
  dispatch: Dispatch<EditorAction>;
}

export default function CreativeAbout({ section, dispatch }: Props) {
  const { content } = section;

  return (
    <section className="relative px-8 py-28 max-w-4xl mx-auto">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-72 h-72 bg-pink-300/40 blur-[120px] rounded-full top-0 left-0 animate-pulse" />
        <div className="absolute w-64 h-64 bg-yellow-300/40 blur-[120px] rounded-full bottom-10 right-10 animate-pulse" />
      </div>

      {/* Section Header */}
      <h2
        className="text-5xl font-extrabold mb-4 text-dark-green text-center drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        About Me
      </h2>

      {/* Decorative underline */}
      <div className="w-32 h-2 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mx-auto" />

      {/* Extra spacing before bio box */}
      <div className="mt-12 bg-white/70 backdrop-blur-md border border-pink-200 rounded-3xl p-8 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-shadow">
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
          className="text-lg leading-relaxed text-brown/80"
          multiline
        />
      </div>
    </section>
  );
}
