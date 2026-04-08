"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { HeroSection, EditorAction } from "@/types/editor";
import { sectionStyleToCSS } from "@/lib/styleUtils";

interface Props {
  section: HeroSection;
  dispatch: Dispatch<EditorAction>;
  theme: any;
}

export default function CreativeHero({ section, dispatch, theme }: Props) {
  const { content, style } = section;

  return (
    <section
      style={sectionStyleToCSS(style)}
      className="relative px-8 py-24 text-center overflow-hidden rounded-3xl shadow-xl"
    >
      {/* Floating colorful blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-72 h-72 bg-pink-300/40 blur-[120px] rounded-full top-10 left-10 animate-pulse" />
        <div className="absolute w-80 h-80 bg-yellow-300/40 blur-[140px] rounded-full bottom-20 right-10 animate-pulse" />
        <div className="absolute w-64 h-64 bg-blue-300/40 blur-[100px] rounded-full top-1/2 left-1/3 animate-pulse" />
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center shadow-xl rotate-3 hover:rotate-0 transition-transform">
          <InlineEditable
            as="span"
            value={content.avatarInitials}
            onChange={(avatarInitials) =>
              dispatch({
                type: "UPDATE_CONTENT",
                sectionId: section.id,
                content: { avatarInitials },
              })
            }
            className="text-4xl font-extrabold text-white tracking-wide"
          />
        </div>

        {/* Name */}
        <div style={{ fontFamily: "var(--font-playfair)" }}>
          <InlineEditable
            as="h1"
            value={content.name}
            onChange={(name) =>
              dispatch({
                type: "UPDATE_CONTENT",
                sectionId: section.id,
                content: { name },
              })
            }
            className="text-6xl font-extrabold text-dark-green drop-shadow-[0_0_20px_rgba(0,0,0,0.1)]"
          />
        </div>

        {/* Tagline */}
        <InlineEditable
          as="p"
          value={content.title}
          onChange={(title) =>
            dispatch({
              type: "UPDATE_CONTENT",
              sectionId: section.id,
              content: { title },
            })
          }
          className="text-2xl text-pink-600 font-semibold max-w-xl"
          multiline
        />
      </div>
    </section>
  );
}
