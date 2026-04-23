"use client";

import { useCallback, useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
import { downloadPdf } from "@/lib/exportPDF";
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const portfolioId = searchParams?.get('portfolioId');
  
  const defaultState = getDefaultState(templateStyle);
  const { state, dispatch, canUndo, canRedo } = useUndoReducer(
    editorReducer,
    defaultState
  );

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [currentSlug, setCurrentSlug] = useState<string>('');
  const [currentIsMainPortfolio, setCurrentIsMainPortfolio] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load existing portfolio if editing
  useEffect(() => {
    if (!portfolioId) {
      console.log('[Editor] No portfolioId, using default state');
      return;
    }

    const loadPortfolio = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('[Editor] No token found');
          setIsLoading(false);
          return;
        }

        console.log('[Editor] Loading portfolio:', portfolioId);
        const response = await fetch(`/api/portfolios/${portfolioId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('[Editor] Response status:', response.status);

        if (response.ok) {
          const portfolio = await response.json();
          console.log('[Editor] Loaded portfolio:', portfolio);
          console.log('[Editor] Portfolio sections:', portfolio.sections);
          
          setCurrentTitle(portfolio.title);
          setCurrentSlug(portfolio.slug);
          setCurrentIsMainPortfolio(portfolio.isMainPortfolio || false);
          console.log('[Editor] Loaded isMainPortfolio:', portfolio.isMainPortfolio);
          
          // Convert portfolio sections to editor state format
          if (portfolio.sections && portfolio.sections.length > 0) {
            const editorSections = portfolio.sections.map((section: any) => {
              const mapped = {
                id: section.sectionId,
                type: section.type,
                title: section.title || section.type,
                visible: section.isVisible !== false,
                content: section.content,
                style: section.settings || undefined,
              };
              console.log('[Editor] Mapped section:', section.type, mapped);
              return mapped;
            });
            
            console.log('[Editor] Final editor sections:', editorSections);
            
            // Create proper EditorState with templateStyle
            const loadedState = {
              templateStyle: templateStyle,
              sections: editorSections
            };
            
            console.log('[Editor] Dispatching state:', loadedState);
            dispatch({ type: 'RESET', defaultState: loadedState });
            console.log('[Editor] Dispatched RESET action');
          } else {
            console.warn('[Editor] No sections found in portfolio');
          }
        } else {
          console.error('[Editor] Failed to load portfolio, status:', response.status);
        }
      } catch (error) {
        console.error('[Editor] Error loading portfolio:', error);
      } finally {
        console.log('[Editor] Setting isLoading to false');
        setIsLoading(false);
      }
    };

    loadPortfolio();
  }, [portfolioId, dispatch]);

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

  const handleExportPdf = useCallback(() => {
    downloadPdf(templateStyle);
  }, [templateStyle]);

  const handleSave = useCallback(async (isMainPortfolio: boolean = false) => {
    try {
      setIsSaving(true);

      console.log('[EditorShell] handleSave called with isMainPortfolio:', isMainPortfolio);

      // Get user from localStorage
      const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      console.log('Save initiated - has user:', !!userStr, 'has token:', !!token, 'editing:', !!portfolioId);

      if (!userStr || !token) {
        alert('Please log in to save your portfolio');
        window.location.href = '/login';
        return;
      }

      const user = JSON.parse(userStr);

      let title: string;
      let slug: string;

      // If editing, use current title/slug (don't prompt)
      // If creating new, prompt for title
      if (portfolioId) {
        // Editing existing portfolio - use current values
        title = currentTitle;
        slug = currentSlug;
        console.log('[EditorShell] Updating existing portfolio:', { portfolioId, title, slug });
      } else {
        // Creating new portfolio - prompt for title
        const defaultTitle = `My ${templateStyle.charAt(0).toUpperCase() + templateStyle.slice(1)} Portfolio`;
        const promptedTitle = prompt('Enter a title for your portfolio:', defaultTitle);
        if (!promptedTitle) {
          setIsSaving(false);
          return;
        }
        title = promptedTitle;
        
        // Generate slug from title
        slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        console.log('[EditorShell] Creating new portfolio:', { title, slug });
      }

      console.log('Portfolio metadata:', { title, slug, templateId: templateStyle, isMainPortfolio, isEditing: !!portfolioId });

      // Prepare portfolio data
      const portfolioData = {
        title,
        slug,
        templateId: templateStyle,
        sections: state.sections,
        isMainPortfolio,
      };

      console.log('Sections to save:', state.sections.length);

      // Save to API - use PUT if editing, POST if creating
      try {
        const url = portfolioId 
          ? `/api/portfolios/${portfolioId}`
          : `/api/users/${user.userId}/portfolios`;
        const method = portfolioId ? 'PUT' : 'POST';
        
        console.log('API request:', method, url);

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(portfolioData),
        });

        console.log('Response status:', response.status);
        
        const contentType = response.headers.get('content-type');
        let data;
        if (contentType?.includes('application/json')) {
          data = await response.json();
        } else {
          const text = await response.text();
          console.error('Non-JSON response:', text);
          throw new Error(`Server returned non-JSON response: ${text.substring(0, 200)}`);
        }

        console.log('Response data:', data);

        if (!response.ok) {
          console.error('Save portfolio error:', data);
          throw new Error(data.error || data.details || 'Failed to save portfolio');
        }

        const wasCreating = !portfolioId;
        alert(portfolioId ? 'Portfolio updated successfully!' : 'Portfolio saved successfully!');
        
        // Update current title/slug
        setCurrentTitle(title);
        setCurrentSlug(slug);
        
        // Redirect to dashboard after saving (both create and update)
        setTimeout(() => {
          router.push('/dashboard');
        }, 100);
      } catch (fetchError) {
        console.error('Fetch error details:', fetchError);
        throw fetchError;
      }
      
    } catch (error) {
      console.error('Save error:', error);
      alert(error instanceof Error ? error.message : 'Failed to save portfolio. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [state.sections, templateStyle, portfolioId, currentTitle]);

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

  // Capitalize first letter for display
  const displayName = templateStyle.charAt(0).toUpperCase() + templateStyle.slice(1);
  
  // Show loading state while portfolio is being loaded
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-cream">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
          <p className="mt-4 text-brown/60">Loading portfolio...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen overflow-hidden">
      <EditorSidebar
        sections={state.sections}
        templateName={displayName}
        dispatch={dispatch}
        onReset={handleReset}
        selectedSection={selectedSection}
        onSelectSection={setSelectedSectionId}
        canUndo={canUndo}
        canRedo={canRedo}
        onExport={handleExport}
        onExportPdf={handleExportPdf}
        onSave={handleSave}
        isSaving={isSaving}
        initialIsMainPortfolio={currentIsMainPortfolio}
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
