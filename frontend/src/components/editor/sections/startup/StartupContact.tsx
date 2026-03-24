"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { ContactSection, EditorAction } from "@/types/editor";

interface Props {
  section: ContactSection;
  dispatch: Dispatch<EditorAction>;
}

export default function StartupContact({ section, dispatch }: Props) {
  const { content } = section;
  return (
    <section className="px-8 md:px-16 py-20 md:py-28 bg-gradient-to-br from-blue to-light-blue relative overflow-hidden">
      <div className="absolute top-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <InlineEditable
          as="h2"
          value={content.heading}
          onChange={(heading) =>
            dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { heading } })
          }
          className="text-3xl md:text-5xl font-bold text-white mb-4"
        />
        <InlineEditable
          as="p"
          value={content.subheading}
          onChange={(subheading) =>
            dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { subheading } })
          }
          className="text-white/70 mb-10"
          multiline
        />
        <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder:text-white/50 border-2 border-white/20 focus:outline-none focus:border-white/50 transition-colors backdrop-blur-sm"
            />
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder:text-white/50 border-2 border-white/20 focus:outline-none focus:border-white/50 transition-colors backdrop-blur-sm"
            />
          </div>
          <textarea
            rows={4}
            placeholder="Your message..."
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder:text-white/50 border-2 border-white/20 focus:outline-none focus:border-white/50 transition-colors resize-none backdrop-blur-sm"
          />
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-white text-blue font-bold rounded-full shadow-[4px_4px_0_rgba(0,0,0,0.15)]"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
