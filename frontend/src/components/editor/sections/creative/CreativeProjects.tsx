"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { ProjectsSection, EditorAction } from "@/types/editor";

interface Props {
  section: ProjectsSection;
  dispatch: Dispatch<EditorAction>;
}

export default function CreativeProjects({ section, dispatch }: Props) {
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
        className="text-4xl font-bold mb-4 text-blue-800 text-center"
      />
      <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mx-auto mb-10" />

      <div className="grid md:grid-cols-2 gap-10">
        {content.projects.map((project) => (
          <div
            key={project.id}
            className={`p-6 rounded-3xl ${project.gradient} text-black shadow-xl`}
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
              className="text-3xl font-extrabold"
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
              className="mt-3 opacity-90 text-lg"
              multiline
            />

            <div className="flex flex-wrap gap-2 mt-5">
              {project.tags.map((tag, index) => (
                <InlineEditable
                  key={index}
                  as="span"
                  value={tag}
                  onChange={(newTag) => {
                    const updatedTags = [...project.tags];
                    updatedTags[index] = newTag;
                    dispatch({
                      type: "UPDATE_PROJECT",
                      sectionId: section.id,
                      projectId: project.id,
                      updates: { tags: updatedTags },
                    });
                  }}
                  className="px-3 py-1 bg-white/30 rounded-full text-xs font-semibold"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
