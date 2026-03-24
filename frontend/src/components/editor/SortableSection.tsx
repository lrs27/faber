"use client";

import { Dispatch } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Section, EditorAction, TemplateStyle } from "@/types/editor";

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

interface Props {
  section: Section;
  templateStyle: TemplateStyle;
  dispatch: Dispatch<EditorAction>;
}

export default function SortableSection({ section, templateStyle, dispatch }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.8 : 1,
  };

  const sectionComponent = renderSection(section, templateStyle, dispatch);

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Drag handle */}
      <div
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
      {/* Hover border */}
      <div
        className={`absolute inset-0 pointer-events-none border-2 ${
          isDragging ? "border-gold" : "border-transparent group-hover:border-gold/30"
        } transition-colors z-30`}
      />
      {sectionComponent}
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
  } else {
    switch (section.type) {
      case "hero": return <StartupHero {...props} section={section} />;
      case "about": return <StartupAbout {...props} section={section} />;
      case "skills": return <StartupSkills {...props} section={section} />;
      case "projects": return <StartupProjects {...props} section={section} />;
      case "contact": return <StartupContact {...props} section={section} />;
    }
  }
}
