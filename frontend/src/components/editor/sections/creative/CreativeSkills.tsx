"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { SkillsSection, EditorAction } from "@/types/editor";

interface Props {
  section: SkillsSection;
  dispatch: Dispatch<EditorAction>;
}

export default function CreativeSkills({ section, dispatch }: Props) {
  const { content } = section;

  return (
    <section className="px-8 py-20 max-w-6xl mx-auto">
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
        className="text-4xl font-bold mb-6 text-dark-green"
      />

      <div className="flex flex-wrap gap-3">
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
            className="px-4 py-2 bg-white rounded-full border border-orange-300 text-sm font-medium text-orange-600 hover:bg-orange-50 transition shadow-sm"
          />
        ))}
      </div>
    </section>
  );
}
