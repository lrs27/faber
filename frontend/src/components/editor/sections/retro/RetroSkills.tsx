"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { SkillsSection, EditorAction } from "@/types/editor";
import { sectionStyleToCSS } from "@/lib/styleUtils";

interface Props {
  section: SkillsSection;
  dispatch: Dispatch<EditorAction>;
}

export default function RetroSkills({ section, dispatch }: Props) {
  const { content, style } = section;

  return (
    <section
      style={sectionStyleToCSS(style)}
      className="px-8 py-20 max-w-6xl mx-auto text-[#facc15] font-retro"
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
        className="text-4xl font-extrabold mb-6 tracking-wider text-center"
      />

      <div className="flex flex-wrap gap-3 justify-center">
        {content.skills.map((skill) => (
          <InlineEditable
            key={skill.id}
            as="span"
            value={skill.name}
            onChange={(name) =>
              dispatch({
                type: "UPDATE_SKILL",
                sectionId: section.id,
                skillId: skill.id,
                name,
              })
            }
            className="px-4 py-2 bg-[#0f0f0f] border border-[#facc15] text-[#facc15] rounded-md text-sm tracking-wide shadow-[0_0_6px_#facc15]"
          />
        ))}
      </div>
    </section>
  );
}
