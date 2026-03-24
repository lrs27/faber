"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { SkillsSection, EditorAction } from "@/types/editor";

interface Props {
  section: SkillsSection;
  dispatch: Dispatch<EditorAction>;
  theme: any;
}

export default function CreativeSkills({ section, dispatch, theme }: Props) {
  const { content } = section;

  return (
    <section className="px-8 md:px-16 py-20">
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
        className={`text-4xl font-bold mb-10 text-center ${theme.accent}`}
      />

      <div className="flex flex-wrap gap-4 justify-center">
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
            className={`
              px-5 py-2 rounded-full border text-sm font-medium
              ${theme.cardStyle} ${theme.hoverBorder}
              transition-all hover:scale-105
            `}
          />
        ))}
      </div>
    </section>
  );
}
