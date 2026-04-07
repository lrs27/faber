"use client";

// Academic sections
import AcademicHero from "./sections/academic/AcademicHero";
import AcademicAbout from "./sections/academic/AcademicAbout";
import AcademicSkills from "./sections/academic/AcademicSkills";
import AcademicProjects from "./sections/academic/AcademicProjects";
import AcademicContact from "./sections/academic/AcademicContact";

// Developer sections
import DeveloperHero from "./sections/developer/DeveloperHero";
import DeveloperAbout from "./sections/developer/DeveloperAbout";
import DeveloperSkills from "./sections/developer/DeveloperSkills";
import DeveloperProjects from "./sections/developer/DeveloperProjects";
import DeveloperContact from "./sections/developer/DeveloperContact";

import { Dispatch } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Section, EditorAction, TemplateStyle } from "@/types/editor";
import { sectionStyleToCSS } from "@/lib/styleUtils";

// Minimal sections
import MinimalHero from "./sections/minimal/MinimalHero";
import MinimalAbout from "./sections/minimal/MinimalAbout";
import MinimalSkills from "./sections/minimal/MinimalSkills";
import MinimalProjects from "./sections/minimal/MinimalProjects";
import MinimalContact from "./sections/minimal/MinimalContact";

// Startup sections
import StartupHero from "./sections/startup/StartupHero";
import StartupAbout from "./sections/startup/StartupAbout";
import StartupSkills from "./sections/startup/StartupSkills";
import StartupProjects from "./sections/startup/StartupProjects";
import StartupContact from "./sections/startup/StartupContact";

// Retro sections
import RetroHero from "./sections/retro/RetroHero";
import RetroAbout from "./sections/retro/RetroAbout";
import RetroSkills from "./sections/retro/RetroSkills";
import RetroProjects from "./sections/retro/RetroProjects";
import RetroContact from "./sections/retro/RetroContact";

interface Props {
  section: Section;
  templateStyle: TemplateStyle;
  dispatch: Dispatch<EditorAction>;
  isSelected: boolean;
  onSelectSection: (id: string | null) => void;
}

export default function SortableSection({ section, templateStyle, dispatch, isSelected, onSelectSection }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const dndStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.8 : 1,
  };

  const customCSS = sectionStyleToCSS(section.style);
  const sectionComponent = renderSection(section, templateStyle, dispatch);

  return (
    <div
      ref={setNodeRef}
      style={dndStyle}
      className="relative group"
      onClick={(e) => {
        // Don't select if clicking a drag handle or interactive element
        const target = e.target as HTMLElement;
        if (target.closest("[data-drag-handle]") || target.closest("input") || target.closest("select")) return;
        onSelectSection(section.id);
      }}
    >
      {/* Drag handle */}
      <div
        data-drag-handle
        {...attributes}
        {...listeners}
        className="absolute left-3 top-3 z-40 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-dark-green/10 shadow-sm cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-brown/50">
          <circle cx="5" cy="3" r="1.5" />
          <circle cx="11" cy="3" r="1.5" />
          <circle cx="5" cy="8" r="1.5" />
          <circle cx="11" cy="8" r="1.5" />
          <circle cx="5" cy="13" r="1.5" />
          <circle cx="11" cy="13" r="1.5" />
        </svg>
        <span className="text-xs font-semibold text-brown/50 uppercase tracking-wide">
          {section.type}
        </span>
      </div>
      {/* Selection / hover border */}
      <div
        className={`absolute inset-0 pointer-events-none border-2 transition-colors z-30 ${
          isDragging
            ? "border-gold"
            : isSelected
            ? "border-gold border-2"
            : "border-transparent group-hover:border-gold/30"
        }`}
      />
      {/* Style wrapper applies user customizations */}
      {Object.keys(customCSS).length > 0 ? (
        <div style={customCSS}>{sectionComponent}</div>
      ) : (
        sectionComponent
      )}
    </div>
  );
}

function renderSection(section: Section, style: TemplateStyle, dispatch: Dispatch<EditorAction>) {
  const props = { section, dispatch };

  if (style === "minimal") {
    switch (section.type) {
      case "hero": return <MinimalHero {...props} section={section} />;
      case "about": return <MinimalAbout {...props} section={section} />;
      case "skills": return <MinimalSkills {...props} section={section} />;
      case "projects": return <MinimalProjects {...props} section={section} />;
      case "contact": return <MinimalContact {...props} section={section} />;
    }
  } else if (style === "startup" || style === "creative") {
    switch (section.type) {
      case "hero": return <StartupHero {...props} section={section} />;
      case "about": return <StartupAbout {...props} section={section} />;
      case "skills": return <StartupSkills {...props} section={section} />;
      case "projects": return <StartupProjects {...props} section={section} />;
      case "contact": return <StartupContact {...props} section={section} />;
    }
  } else if (style === "academic") {
    switch (section.type) {
      case "hero": return <AcademicHero {...props} section={section} />;
      case "about": return <AcademicAbout {...props} section={section} />;
      case "skills": return <AcademicSkills {...props} section={section} />;
      case "projects": return <AcademicProjects {...props} section={section} />;
      case "contact": return <AcademicContact {...props} section={section} />;
    }
  } else if (style === "developer") {
    switch (section.type) {
      case "hero": return <DeveloperHero {...props} section={section} />;
      case "about": return <DeveloperAbout {...props} section={section} />;
      case "skills": return <DeveloperSkills {...props} section={section} />;
      case "projects": return <DeveloperProjects {...props} section={section} />;
      case "contact": return <DeveloperContact {...props} section={section} />;
    }
  }
}
