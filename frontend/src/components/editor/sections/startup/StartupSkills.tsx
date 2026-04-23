"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { SkillsSection, EditorAction } from "@/types/editor";

const skillColors = [
  "bg-gold/20 text-gold border-gold/30",
  "bg-blue/20 text-blue border-blue/30",
  "bg-pink/20 text-pink border-pink/30",
  "bg-orange/20 text-orange border-orange/30",
  "bg-dark-green/10 text-dark-green border-dark-green/20",
  "bg-light-blue/20 text-blue border-light-blue/30",
];

interface Props {
  section: SkillsSection;
  dispatch: Dispatch<EditorAction>;
}

export default function StartupSkills({ section, dispatch }: Props) {
  const { content } = section;
  return (
    <section className="px-8 md:px-16 py-16 md:py-24 bg-beige/50">
      <div className="max-w-5xl mx-auto">
        <InlineEditable
          as="h2"
          value={content.heading}
          onChange={(heading) =>
            dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { heading } })
          }
          className="text-3xl md:text-4xl font-bold text-dark-green text-center mb-12"
        />
        <div className="flex flex-wrap justify-center items-center gap-7">
          {content.skills.map((skill, i) => (
            <div key={skill.id} className="group/skill relative">
              <InlineEditable
                value={skill.name}
                onChange={(name) =>
                  dispatch({ type: "UPDATE_SKILL", sectionId: section.id, skillId: skill.id, name })
                }
                className={`px-5 py-2.5 rounded-full border-2 text-sm font-bold ${skillColors[i % skillColors.length]}`}
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

          <div className="group/add-skill relative">
            <span className="px-5 py-2.5 rounded-full border-2 border-dashed border-dark-green/20 text-sm font-bold text-brown/40 group-hover/add-skill:border-gold group-hover/add-skill:text-gold transition-colors">+ Add Skill</span>
            <button
              onClick={() =>
                dispatch({
                  type: "ADD_SKILL",
                  sectionId: section.id,
                  skill: { id: crypto.randomUUID(), name: "New Skill" },
                })
              }
              className="absolute h-11 w-full -top-2.5 left-0"
            >
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
