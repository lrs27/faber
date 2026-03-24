"use client";

import { useReducer, useCallback } from "react";
import type {
  EditorState,
  EditorAction,
  TemplateStyle,
  SkillsSection,
  ProjectsSection,
} from "@/types/editor";
import { getDefaultState } from "@/data/defaults";
import EditorSidebar from "./EditorSidebar";
import EditorCanvas from "./EditorCanvas";

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "REORDER_SECTIONS": {
      const sections = [...state.sections];
      const [moved] = sections.splice(action.fromIndex, 1);
      sections.splice(action.toIndex, 0, moved);
      return { ...state, sections };
    }
    case "TOGGLE_VISIBILITY": {
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === action.sectionId ? { ...s, visible: !s.visible } : s
        ),
      };
    }
    case "UPDATE_CONTENT": {
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === action.sectionId
            ? { ...s, content: { ...s.content, ...action.content } }
            : s
        ) as EditorState["sections"],
      };
    }
    case "ADD_SKILL": {
      return {
        ...state,
        sections: state.sections.map((s) => {
          if (s.id !== action.sectionId || s.type !== "skills") return s;
          return {
            ...s,
            content: {
              ...s.content,
              skills: [...(s as SkillsSection).content.skills, action.skill],
            },
          };
        }) as EditorState["sections"],
      };
    }
    case "REMOVE_SKILL": {
      return {
        ...state,
        sections: state.sections.map((s) => {
          if (s.id !== action.sectionId || s.type !== "skills") return s;
          return {
            ...s,
            content: {
              ...s.content,
              skills: (s as SkillsSection).content.skills.filter(
                (sk) => sk.id !== action.skillId
              ),
            },
          };
        }) as EditorState["sections"],
      };
    }
    case "UPDATE_SKILL": {
      return {
        ...state,
        sections: state.sections.map((s) => {
          if (s.id !== action.sectionId || s.type !== "skills") return s;
          return {
            ...s,
            content: {
              ...s.content,
              skills: (s as SkillsSection).content.skills.map((sk) =>
                sk.id === action.skillId ? { ...sk, name: action.name } : sk
              ),
            },
          };
        }) as EditorState["sections"],
      };
    }
    case "ADD_PROJECT": {
      return {
        ...state,
        sections: state.sections.map((s) => {
          if (s.id !== action.sectionId || s.type !== "projects") return s;
          return {
            ...s,
            content: {
              ...s.content,
              projects: [
                ...(s as ProjectsSection).content.projects,
                action.project,
              ],
            },
          };
        }) as EditorState["sections"],
      };
    }
    case "REMOVE_PROJECT": {
      return {
        ...state,
        sections: state.sections.map((s) => {
          if (s.id !== action.sectionId || s.type !== "projects") return s;
          return {
            ...s,
            content: {
              ...s.content,
              projects: (s as ProjectsSection).content.projects.filter(
                (p) => p.id !== action.projectId
              ),
            },
          };
        }) as EditorState["sections"],
      };
    }
    case "UPDATE_PROJECT": {
      return {
        ...state,
        sections: state.sections.map((s) => {
          if (s.id !== action.sectionId || s.type !== "projects") return s;
          return {
            ...s,
            content: {
              ...s.content,
              projects: (s as ProjectsSection).content.projects.map((p) =>
                p.id === action.projectId ? { ...p, ...action.updates } : p
              ),
            },
          };
        }) as EditorState["sections"],
      };
    }
    case "RESET":
      return action.defaultState;
    default:
      return state;
  }
}

interface Props {
  templateStyle: TemplateStyle;
}

export default function EditorShell({ templateStyle }: Props) {
  const defaultState = getDefaultState(templateStyle);
  const [state, dispatch] = useReducer(editorReducer, defaultState);

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET", defaultState: getDefaultState(templateStyle) });
  }, [templateStyle]);

  return (
    <div className="flex h-screen overflow-hidden">
      <EditorSidebar
        sections={state.sections}
        templateName={templateStyle === "minimal" ? "Minimal" : "Startup"}
        dispatch={dispatch}
        onReset={handleReset}
      />
      <main className="flex-1 overflow-y-auto bg-beige/30">
        <EditorCanvas
          state={state}
          dispatch={dispatch}
        />
      </main>
    </div>
  );
}
