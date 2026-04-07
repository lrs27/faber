"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { ProjectsSection, EditorAction } from "@/types/editor";

interface Props {
  section: ProjectsSection;
  dispatch: Dispatch<EditorAction>;
}

export default function RetroProjects({ section, dispatch }: Props) {
  const { content } = section;
  return (
    <section className="px-8 md:px-16 py-20 md:py-28 bg-dark-green">
      <div className="max-w-5xl mx-auto">
        <InlineEditable
          as="h2"
          value={content.heading}
          onChange={(heading) =>
            dispatch({ type: "UPDATE_CONTENT", sectionId: section.id, content: { heading } })
          }
          className="text-4xl md:text-5xl font-bold text-cream text-center mb-16"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.projects.map((project, i) => (
            <div
              key={project.id}
              className="group/project bg-cream/5 rounded-2xl border border-cream/10 overflow-hidden hover:border-gold/40 transition-all relative"
            >
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_PROJECT", sectionId: section.id, projectId: project.id })
                }
                className="absolute top-3 right-3 z-10 w-6 h-6 bg-cream/20 text-cream rounded-full text-xs flex items-center justify-center opacity-0 group-hover/project:opacity-100 transition-opacity"
              >
                &times;
              </button>
              <div className={`h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <span className="text-6xl font-black text-white/20">0{i + 1}</span>
              </div>
              <div className="p-6">
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
                  className="text-xl font-bold text-cream"
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
                    className="text-sm text-cream/60 leading-relaxed"
                    multiline
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs font-bold text-gold bg-gold/10 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
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
          className="w-full mt-8 py-8 border-2 border-dashed border-cream/20 rounded-2xl text-sm font-semibold text-cream/40 hover:border-gold hover:text-gold transition-colors"
        >
          + Add Project
        </button>
      </div>
    </section>
  );
}
