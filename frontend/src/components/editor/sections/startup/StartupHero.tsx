"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { HeroSection, EditorAction } from "@/types/editor";

interface Props {
  section: HeroSection;
  dispatch: Dispatch<EditorAction>;
}

export default function StartupHero({ section, dispatch }: Props) {
  const { content } = section;
  return (
    <section className="px-8 md:px-16 py-24 md:py-32 bg-gradient-to-br from-orange to-yellow relative overflow-hidden">
      <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-pink/20 rounded-full blur-3xl" />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <InlineEditable
          as="p"
          value={content.title}
          onChange={(title) =>
            dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { title } })
          }
          className="text-sm font-bold uppercase tracking-widest text-dark-green/60 mb-4"
        />
        <InlineEditable
          as="h1"
          value={content.name}
          onChange={(name) =>
            dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { name } })
          }
          className="text-5xl md:text-8xl font-black text-dark-green leading-tight"
        />
        <div className="mt-8 flex gap-4 justify-center">
          <span className="px-8 py-3 bg-dark-green text-cream font-bold rounded-full shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
            See My Work
          </span>
          <span className="px-8 py-3 bg-white/80 text-dark-green font-bold rounded-full shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
            Say Hello
          </span>
        </div>
      </div>
    </section>
  );
}
