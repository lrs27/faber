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

export default function DeveloperHero({ section, dispatch, theme }: Props) {
  const { content, style } = section;
  const accent = theme && theme.accent ? theme.accent : "text-blue-400";
  const hoverBorder = theme && theme.hoverBorder ? theme.hoverBorder : "hover:border-blue";
  return (
    <section
      style={sectionStyleToCSS(style)}
      className={`min-h-[70vh] flex flex-col justify-center items-center text-center px-8 py-24 rounded-3xl shadow-xl`}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold bg-white/60 border ${hoverBorder}`}
        >
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
            className="text-dark-green"
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
          className={`text-6xl font-extrabold mb-2 ${accent}`}
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
          className="text-lg max-w-xl opacity-80"
          multiline
        />
      </div>
    </section>
  );
}
