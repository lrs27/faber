"use client";

import { useCallback, useState, useEffect, useMemo } from "react";
import type {
  EditorState,
  EditorAction,
  TemplateStyle,
  SkillsSection,
  ProjectsSection,
  Section,
} from "@/types/editor";
import { getDefaultState } from "@/data/defaults";
import { useUndoReducer } from "@/hooks/useUndoReducer";
import { downloadHtml } from "@/lib/exportHtml";
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
    case "UPDATE_STYLE": {
      return {
        ...state,
        sections: state.sections.map((s) => {
          if (s.id !== action.sectionId) return s;
          const existing = s.style || {};
          return {
            ...s,
            style: {
              background: action.style.background ?? existing.background,
              typography: { ...existing.typography, ...action.style.typography },
              spacing: { ...existing.spacing, ...action.style.spacing },
            },
          };
        }) as EditorState["sections"],
      };
    }
    case "DUPLICATE_SECTION": {
      const idx = state.sections.findIndex((s) => s.id === action.sectionId);
      if (idx === -1) return state;
      const original = state.sections[idx];
      const clone: Section = {
        ...JSON.parse(JSON.stringify(original)),
        id: `${original.type}-copy-${Date.now()}`,
      };
      const sections = [...state.sections];
      sections.splice(idx + 1, 0, clone);
      return { ...state, sections };
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
  const { state, dispatch, canUndo, canRedo } = useUndoReducer(
    editorReducer,
    defaultState
  );

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );

  const selectedSection = useMemo(
    () =>
      selectedSectionId
        ? state.sections.find((s) => s.id === selectedSectionId) ?? null
        : null,
    [selectedSectionId, state.sections]
  );

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET", defaultState: getDefaultState(templateStyle) });
    setSelectedSectionId(null);
  }, [templateStyle, dispatch]);

  const handleExport = useCallback(() => {
    downloadHtml(templateStyle);
  }, [templateStyle]);

  // Keyboard shortcuts
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        dispatch({ type: "UNDO" });
      }
      if (mod && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        dispatch({ type: "REDO" });
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch]);

  return (
    <div className="flex h-screen overflow-hidden">
      <EditorSidebar
        sections={state.sections}
        templateName={templateStyle === "minimal" ? "Minimal" : "Startup"}
        dispatch={dispatch}
        onReset={handleReset}
        selectedSection={selectedSection}
        onSelectSection={setSelectedSectionId}
        canUndo={canUndo}
        canRedo={canRedo}
        onExport={handleExport}
      />
      <main className="flex-1 overflow-y-auto bg-beige/30">
        <EditorCanvas
          state={state}
          dispatch={dispatch}
          selectedSectionId={selectedSectionId}
          onSelectSection={setSelectedSectionId}
        />
      </main>
    </div>
  );
}
