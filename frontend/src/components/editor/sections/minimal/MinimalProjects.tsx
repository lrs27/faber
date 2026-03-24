"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { ProjectsSection, EditorAction } from "@/types/editor";

interface Props {
  section: ProjectsSection;
  dispatch: Dispatch<EditorAction>;
}

export default function MinimalProjects({ section, dispatch }: Props) {
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
          className="text-3xl font-bold text-dark-green mb-12 text-center"
        />
        <div className="space-y-8">
          {content.projects.map((project) => (
            <div
              key={project.id}
              className="group/project border-b border-dark-green/10 pb-8 last:border-b-0 relative"
            >
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_PROJECT", sectionId: section.id, projectId: project.id })
                }
                className="absolute top-0 right-0 w-6 h-6 bg-brown text-cream rounded-full text-xs flex items-center justify-center opacity-0 group-hover/project:opacity-100 transition-opacity"
              >
                &times;
              </button>
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
                className="text-xl font-bold text-dark-green"
              />
              <div className="mt-2">
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
                  className="text-brown/60 leading-relaxed"
                  multiline
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs text-brown/50 border border-brown/20 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={() =>
              dispatch({
                type: "ADD_PROJECT",
                sectionId: section.id,
                project: {
                  id: crypto.randomUUID(),
                  title: "New Project",
                  description: "Describe your project here.",
                  tags: ["Tag"],
                  gradient: "from-gold/30 to-orange/20",
                },
              })
            }
            className="w-full py-6 border-2 border-dashed border-dark-green/15 rounded-xl text-sm font-semibold text-brown/40 hover:border-gold hover:text-gold transition-colors"
          >
            + Add Project
          </button>
        </div>
      </div>
    </section>
  );
}
