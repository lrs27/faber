"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { ProjectsSection, EditorAction } from "@/types/editor";

interface Props {
  section: ProjectsSection;
  dispatch: Dispatch<EditorAction>;
  theme: any;
}

export default function CreativeProjects({ section, dispatch, theme }: Props) {
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

      <div className="grid md:grid-cols-2 gap-6">
        {content.projects.map((project) => (
          <div
            key={project.id}
            draggable
            className={`
              p-6 rounded-2xl border cursor-grab active:cursor-grabbing
              transition-all hover:scale-[1.03] hover:shadow-xl
              ${theme.cardStyle} ${theme.hoverBorder}
            `}
          >
            <InlineEditable
              as="h3"
              value={project.title}
              onChange={(title) =>
                dispatch({
                  type: "UPDATE_PROJECT",
                  sectionId: section.id,
                  projectId: project.id,
                  updates: { title },
                })
              }
              className={`text-2xl font-semibold ${theme.accent}`}
            />

            <InlineEditable
              as="p"
              value={project.description}
              onChange={(description) =>
                dispatch({
                  type: "UPDATE_PROJECT",
                  sectionId: section.id,
                  projectId: project.id,
                  updates: { description },
                })
              }
              className="mt-2 opacity-80"
              multiline
            />

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-white/60 border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
