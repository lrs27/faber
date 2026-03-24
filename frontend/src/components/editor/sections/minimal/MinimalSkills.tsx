"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { SkillsSection, EditorAction } from "@/types/editor";

interface Props {
  section: SkillsSection;
  dispatch: Dispatch<EditorAction>;
}

export default function MinimalSkills({ section, dispatch }: Props) {
  const { content } = section;
  return (
    <section className="px-8 md:px-16 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <InlineEditable
          as="h2"
          value={content.heading}
          onChange={(heading) =>
            dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { heading } })
          }
          className="text-3xl font-bold text-dark-green mb-10 text-center"
        />
        <div className="flex flex-wrap justify-center gap-3">
          {content.skills.map((skill) => (
            <div key={skill.id} className="group/skill relative">
              <InlineEditable
                value={skill.name}
                onChange={(name) =>
                  dispatch({ type: "UPDATE_SKILL", sectionId: section.id, skillId: skill.id, name })
                }
                className="text-sm text-brown/60 border border-brown/20 rounded-full px-4 py-2 inline-block"
              />
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_SKILL", sectionId: section.id, skillId: skill.id })
                }
                className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brown text-cream rounded-full text-[10px] leading-none flex items-center justify-center opacity-0 group-hover/skill:opacity-100 transition-opacity"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              dispatch({
                type: "ADD_SKILL",
                sectionId: section.id,
                skill: { id: crypto.randomUUID(), name: "New Skill" },
              })
            }
            className="text-sm rounded-full border border-dashed border-dark-green/20 px-4 py-2 text-brown/40 hover:border-gold hover:text-gold transition-colors"
          >
            + Add Skill
          </button>
        </div>
      </div>
    </section>
  );
}
