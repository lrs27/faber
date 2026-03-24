"use client";

import Link from "next/link";
import { useState, Dispatch } from "react";
import type { Section, EditorAction } from "@/types/editor";
import BackgroundPanel from "./panels/BackgroundPanel";
import TypographyPanel from "./panels/TypographyPanel";
import SpacingPanel from "./panels/SpacingPanel";

const sectionLabels: Record<string, string> = {
  hero: "Hero",
  about: "About",
  skills: "Skills",
  projects: "Projects",
  contact: "Contact",
};

type StyleTab = "background" | "typography" | "spacing";

interface Props {
  sections: Section[];
  templateName: string;
  dispatch: Dispatch<EditorAction>;
  onReset: () => void;
  selectedSection: Section | null;
  onSelectSection: (id: string | null) => void;
  canUndo: boolean;
  canRedo: boolean;
  onExport: () => void;
}

export default function EditorSidebar({
  sections,
  templateName,
  dispatch,
  onReset,
  selectedSection,
  onSelectSection,
  canUndo,
  canRedo,
  onExport,
}: Props) {
  const [activeTab, setActiveTab] = useState<StyleTab>("background");

  // Style panel view (when a section is selected)
  if (selectedSection) {
    return (
      <aside className="w-72 shrink-0 bg-white border-r-2 border-dark-green/10 flex flex-col h-full">
        {/* Header with back button */}
        <div className="p-4 border-b border-dark-green/10">
          <button
            onClick={() => onSelectSection(null)}
            className="text-xs font-semibold text-brown/50 hover:text-dark-green transition-colors"
          >
            &larr; Back to Sections
          </button>
          <h2
            className="text-lg font-bold text-dark-green mt-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {sectionLabels[selectedSection.type] || selectedSection.type} Settings
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-dark-green/10">
          {(["background", "typography", "spacing"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-xs py-2.5 font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? "text-gold border-b-2 border-gold"
                  : "text-brown/40 hover:text-brown/60"
              }`}
            >
              {tab === "spacing" ? "Size" : tab}
            </button>
          ))}
        </div>

        {/* Active panel */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "background" && (
            <BackgroundPanel section={selectedSection} dispatch={dispatch} />
          )}
          {activeTab === "typography" && (
            <TypographyPanel section={selectedSection} dispatch={dispatch} />
          )}
          {activeTab === "spacing" && (
            <SpacingPanel section={selectedSection} dispatch={dispatch} />
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-dark-green/10 space-y-2">
          <button
            onClick={() =>
              dispatch({
                type: "DUPLICATE_SECTION",
                sectionId: selectedSection.id,
              })
            }
            className="w-full px-4 py-2 text-xs font-semibold text-dark-green border border-dark-green/10 rounded-lg hover:bg-beige transition-colors"
          >
            Duplicate Section
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch({ type: "UNDO" })}
              disabled={!canUndo}
              className="flex-1 px-3 py-2 text-xs font-semibold border border-dark-green/10 rounded-lg transition-colors disabled:opacity-30 hover:bg-beige"
              title="Undo (Ctrl+Z)"
            >
              Undo
            </button>
            <button
              onClick={() => dispatch({ type: "REDO" })}
              disabled={!canRedo}
              className="flex-1 px-3 py-2 text-xs font-semibold border border-dark-green/10 rounded-lg transition-colors disabled:opacity-30 hover:bg-beige"
              title="Redo (Ctrl+Shift+Z)"
            >
              Redo
            </button>
            <button
              onClick={onExport}
              className="flex-1 px-3 py-2 text-xs font-semibold text-cream bg-dark-green rounded-lg hover:bg-dark-green/80 transition-colors"
              title="Export as HTML"
            >
              Export
            </button>
          </div>
        </div>
      </aside>
    );
  }

  // Default section list view
  return (
    <aside className="w-72 shrink-0 bg-white border-r-2 border-dark-green/10 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-dark-green/10">
        <Link
          href="/templates"
          className="text-xs font-semibold text-brown/50 hover:text-dark-green transition-colors"
        >
          &larr; Back to Templates
        </Link>
        <h1
          className="text-xl font-bold text-dark-green mt-3"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {templateName} Editor
        </h1>
        <p className="text-xs text-brown/40 mt-1">
          Click a section to customize its style
        </p>
      </div>

      {/* Section list */}
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-xs font-semibold text-brown/40 uppercase tracking-wide mb-3 px-2">
          Sections
        </p>
        <div className="space-y-1">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                section.visible
                  ? "bg-cream/50 text-dark-green hover:bg-cream"
                  : "text-brown/30"
              }`}
              onClick={() => onSelectSection(section.id)}
            >
              {/* Grip icon */}
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="shrink-0 opacity-40">
                <circle cx="5" cy="3" r="1.5" />
                <circle cx="11" cy="3" r="1.5" />
                <circle cx="5" cy="8" r="1.5" />
                <circle cx="11" cy="8" r="1.5" />
                <circle cx="5" cy="13" r="1.5" />
                <circle cx="11" cy="13" r="1.5" />
              </svg>

              {/* Name */}
              <span className={`text-sm font-semibold flex-1 ${!section.visible ? "line-through" : ""}`}>
                {sectionLabels[section.type] || section.type}
              </span>

              {/* Visibility toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: "TOGGLE_VISIBILITY", sectionId: section.id });
                }}
                className="p-1 rounded hover:bg-dark-green/5 transition-colors"
                title={section.visible ? "Hide section" : "Show section"}
              >
                {section.visible ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-dark-green/10 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={() => dispatch({ type: "UNDO" })}
            disabled={!canUndo}
            className="flex-1 px-3 py-2 text-xs font-semibold border border-dark-green/10 rounded-lg transition-colors disabled:opacity-30 hover:bg-beige"
          >
            Undo
          </button>
          <button
            onClick={() => dispatch({ type: "REDO" })}
            disabled={!canRedo}
            className="flex-1 px-3 py-2 text-xs font-semibold border border-dark-green/10 rounded-lg transition-colors disabled:opacity-30 hover:bg-beige"
          >
            Redo
          </button>
          <button
            onClick={onExport}
            className="flex-1 px-3 py-2 text-xs font-semibold text-cream bg-dark-green rounded-lg hover:bg-dark-green/80 transition-colors"
          >
            Export
          </button>
        </div>
        <button
          onClick={onReset}
          className="w-full px-4 py-2.5 text-sm font-semibold text-brown/60 border-2 border-dark-green/10 rounded-full hover:border-gold hover:text-gold transition-colors"
        >
          Reset to Defaults
        </button>
      </div>
    </aside>
  );
}
