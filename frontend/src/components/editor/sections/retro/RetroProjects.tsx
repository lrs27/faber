"use client";

import { Dispatch } from "react";
import InlineEditable from "../../InlineEditable";
import type { ProjectsSection, EditorAction } from "@/types/editor";
import { sectionStyleToCSS } from "@/lib/styleUtils";

interface Props {
  section: ProjectsSection;
  dispatch: Dispatch<EditorAction>;
}

export default function RetroProjects({ section, dispatch }: Props) {
  const { content, style } = section;

  return (
    <section
      style={sectionStyleToCSS(style)}
      className="px-8 py-20 max-w-6xl mx-auto text-[#00eaff] font-retro"
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
        className="text-4xl font-extrabold mb-10 tracking-wider text-center"
      />

      <div className="grid md:grid-cols-2 gap-10">
        {content.projects.map((project) => (
          <div
            key={project.id}
            className={`p-6 rounded-xl bg-gradient-to-br ${project.gradient} text-black shadow-[0_0_10px_rgba(0,0,0,0.4)]`}
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
              className="text-3xl font-extrabold tracking-wide"
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
                  className="px-3 py-1 bg-black/40 text-white rounded-md text-xs font-semibold tracking-wide"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
