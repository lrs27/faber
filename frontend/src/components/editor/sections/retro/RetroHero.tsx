"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { HeroSection, EditorAction } from "@/types/editor";
import { sectionStyleToCSS } from "@/lib/styleUtils";

interface Props {
  section: HeroSection;
  dispatch: Dispatch<EditorAction>;
}

export default function RetroHero({ section, dispatch }: Props) {
  const { content, style } = section;

  return (
    <section
      style={sectionStyleToCSS(style)}
      className="px-8 py-24 text-center relative bg-[#0f0f0f] text-[#39ff14] font-retro"
    >
      {/* Avatar */}
      <div className="mx-auto w-32 h-32 bg-[#39ff14] text-black flex items-center justify-center border-4 border-[#1f1f1f] shadow-[4px_4px_0_#39ff14]">
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
          className="text-4xl font-extrabold tracking-widest"
        />
      </div>

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
        className="text-5xl font-extrabold mt-6 tracking-widest"
      />

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
        className="text-xl text-[#00eaff] mt-2 font-bold"
      />
    </section>
  );
}
