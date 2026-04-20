"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import CheckeredBorder from "@/components/CheckeredBorder";
import Marquee from "@/components/Marquee";
import type { TemplateStyle } from "@/types/editor";
import { sectionStyleToCSS } from "@/lib/styleUtils";

// Creative sections
import CreativeHero from "@/components/editor/sections/creative/CreativeHero";
import CreativeAbout from "@/components/editor/sections/creative/CreativeAbout";
import CreativeSkills from "@/components/editor/sections/creative/CreativeSkills";
import CreativeProjects from "@/components/editor/sections/creative/CreativeProjects";
import CreativeContact from "@/components/editor/sections/creative/CreativeContact";

// Retro sections
import RetroHero from "@/components/editor/sections/retro/RetroHero";
import RetroAbout from "@/components/editor/sections/retro/RetroAbout";
import RetroSkills from "@/components/editor/sections/retro/RetroSkills";
import RetroProjects from "@/components/editor/sections/retro/RetroProjects";
import RetroContact from "@/components/editor/sections/retro/RetroContact";

// Academic sections
import AcademicHero from "@/components/editor/sections/academic/AcademicHero";
import AcademicAbout from "@/components/editor/sections/academic/AcademicAbout";
import AcademicSkills from "@/components/editor/sections/academic/AcademicSkills";
import AcademicProjects from "@/components/editor/sections/academic/AcademicProjects";
import AcademicContact from "@/components/editor/sections/academic/AcademicContact";

// Developer sections
import DeveloperHero from "@/components/editor/sections/developer/DeveloperHero";
import DeveloperAbout from "@/components/editor/sections/developer/DeveloperAbout";
import DeveloperSkills from "@/components/editor/sections/developer/DeveloperSkills";
import DeveloperProjects from "@/components/editor/sections/developer/DeveloperProjects";
import DeveloperContact from "@/components/editor/sections/developer/DeveloperContact";

// Minimal sections
import MinimalHero from "@/components/editor/sections/minimal/MinimalHero";
import MinimalAbout from "@/components/editor/sections/minimal/MinimalAbout";
import MinimalSkills from "@/components/editor/sections/minimal/MinimalSkills";
import MinimalProjects from "@/components/editor/sections/minimal/MinimalProjects";
import MinimalContact from "@/components/editor/sections/minimal/MinimalContact";

// Startup sections
import StartupHero from "@/components/editor/sections/startup/StartupHero";
import StartupAbout from "@/components/editor/sections/startup/StartupAbout";
import StartupSkills from "@/components/editor/sections/startup/StartupSkills";
import StartupProjects from "@/components/editor/sections/startup/StartupProjects";
import StartupContact from "@/components/editor/sections/startup/StartupContact";

interface PortfolioData {
  portfolioId: string;
  title: string;
  slug: string;
  templateId: string;
  userId: string;
  sections: Array<{
    sectionId: string;
    type: string;
    content: any;
    order: number;
  }>;
  user: {
    displayName: string;
    email: string;
    username?: string;
    profileImageUrl?: string;
  };
}

export default function PortfolioPreviewPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        console.log('[Portfolio Preview] Fetching portfolio with slug:', slug);
        const response = await fetch(`/api/portfolios/slug/${slug}`);
        
        console.log('[Portfolio Preview] Response status:', response.status);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Portfolio not found');
          } else {
            setError('Failed to load portfolio');
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log('[Portfolio Preview] Portfolio data:', data);
        setPortfolio(data);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError('Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPortfolio();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
            <p className="mt-4 text-brown/60">Loading portfolio...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h1 className="text-4xl font-bold text-dark-green mb-4">Portfolio Not Found</h1>
            <p className="text-brown/60 mb-6">
              {error || `No portfolio found with slug: ${slug}`}
            </p>
            <a
              href="/dashboard"
              className="inline-block px-6 py-3 bg-dark-green text-cream font-semibold rounded-full hover:bg-brown transition-colors"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Render portfolio sections
  const renderSection = (section: any, templateStyle: TemplateStyle) => {
    // No-op dispatch for preview mode (sections are read-only)
    const dispatch = () => {};
    
    // Map database section to editor section format
    const editorSection = {
      ...section,
      id: section.sectionId,
      visible: section.isVisible,
      style: section.settings,
    };
    
    const props = { section: editorSection, dispatch, theme: templateStyle };
    
    // Apply custom section styles if they exist
    const customCSS = section.settings ? sectionStyleToCSS(section.settings) : {};
    const sectionComponent = renderTemplateSection(editorSection, templateStyle, props);
    
    return Object.keys(customCSS).length > 0 ? (
      <div key={section.sectionId} style={customCSS}>{sectionComponent}</div>
    ) : (
      sectionComponent
    );
  };
  
  const renderTemplateSection = (section: any, templateStyle: TemplateStyle, props: any) => {

    if (templateStyle === "minimal") {
      switch (section.type) {
        case "hero": return <MinimalHero key={section.id} {...props} />;
        case "about": return <MinimalAbout key={section.id} {...props} />;
        case "skills": return <MinimalSkills key={section.id} {...props} />;
        case "projects": return <MinimalProjects key={section.id} {...props} />;
        case "contact": return <MinimalContact key={section.id} {...props} />;
      }
    } else if (templateStyle === "startup") {
      switch (section.type) {
        case "hero": return <StartupHero key={section.id} {...props} />;
        case "about": return <StartupAbout key={section.id} {...props} />;
        case "skills": return <StartupSkills key={section.id} {...props} />;
        case "projects": return <StartupProjects key={section.id} {...props} />;
        case "contact": return <StartupContact key={section.id} {...props} />;
      }
    } else if (templateStyle === "academic") {
      switch (section.type) {
        case "hero": return <AcademicHero key={section.id} {...props} />;
        case "about": return <AcademicAbout key={section.id} {...props} />;
        case "skills": return <AcademicSkills key={section.id} {...props} />;
        case "projects": return <AcademicProjects key={section.id} {...props} />;
        case "contact": return <AcademicContact key={section.id} {...props} />;
      }
    } else if (templateStyle === "developer") {
      switch (section.type) {
        case "hero": return <DeveloperHero key={section.id} {...props} />;
        case "about": return <DeveloperAbout key={section.id} {...props} />;
        case "skills": return <DeveloperSkills key={section.id} {...props} />;
        case "projects": return <DeveloperProjects key={section.id} {...props} />;
        case "contact": return <DeveloperContact key={section.id} {...props} />;
      }
    } else if (templateStyle === "creative") {
      switch (section.type) {
        case "hero": return <CreativeHero key={section.id} {...props} />;
        case "about": return <CreativeAbout key={section.id} {...props} />;
        case "skills": return <CreativeSkills key={section.id} {...props} />;
        case "projects": return <CreativeProjects key={section.id} {...props} />;
        case "contact": return <CreativeContact key={section.id} {...props} />;
      }
    } else if (templateStyle === "retro") {
      switch (section.type) {
        case "hero": return <RetroHero key={section.id} {...props} />;
        case "about": return <RetroAbout key={section.id} {...props} />;
        case "skills": return <RetroSkills key={section.id} {...props} />;
        case "projects": return <RetroProjects key={section.id} {...props} />;
        case "contact": return <RetroContact key={section.id} {...props} />;
      }
    }
    
    return null;
  };

  // Get the template style from templateId
  const templateStyle = portfolio.templateId as TemplateStyle;

  return (
    <div className="min-h-screen bg-cream">
      {portfolio.sections
        .sort((a, b) => a.order - b.order)
        .map((section) => renderSection(section, templateStyle))}
    </div>
  );
}
