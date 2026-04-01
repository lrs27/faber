export type SectionType = "hero" | "about" | "skills" | "projects" | "contact";
export type TemplateStyle = "minimal" | "startup" | "creative" | "academic" | "developer";

export interface HeroContent {
  name: string;
  title: string;
  avatarInitials: string;
}

export interface AboutContent {
  bio: string;
  avatarInitials?: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface SkillsContent {
  heading: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
}

export interface ProjectsContent {
  heading: string;
  projects: Project[];
}

export interface ContactContent {
  heading: string;
  subheading: string;
  email: string;
}

// --- Style types ---
export interface SolidBackground {
  type: "solid";
  color: string;
}
export interface GradientBackground {
  type: "gradient";
  direction: "to-r" | "to-l" | "to-t" | "to-b" | "to-br" | "to-bl" | "to-tr" | "to-tl";
  from: string;
  to: string;
}
export interface TransparentBackground {
  type: "transparent";
}
export type BackgroundConfig = SolidBackground | GradientBackground | TransparentBackground;

export interface TypographyConfig {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number;
  color?: string;
}

export interface SpacingConfig {
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  marginTop?: string;
  marginBottom?: string;
  borderRadius?: string;
}

export interface SectionStyle {
  background?: BackgroundConfig;
  typography?: TypographyConfig;
  spacing?: SpacingConfig;
}

// Discriminated union for sections
interface SectionBase {
  id: string;
  type: SectionType;
  visible: boolean;
  style?: SectionStyle;
}

export interface HeroSection extends SectionBase {
  type: "hero";
  content: HeroContent;
}
export interface AboutSection extends SectionBase {
  type: "about";
  content: AboutContent;
}
export interface SkillsSection extends SectionBase {
  type: "skills";
  content: SkillsContent;
}
export interface ProjectsSection extends SectionBase {
  type: "projects";
  content: ProjectsContent;
}
export interface ContactSection extends SectionBase {
  type: "contact";
  content: ContactContent;
}

export type Section =
  | HeroSection
  | AboutSection
  | SkillsSection
  | ProjectsSection
  | ContactSection;

export interface EditorState {
  templateStyle: TemplateStyle;
  sections: Section[];
}

// Actions
export type EditorAction =
  | { type: "REORDER_SECTIONS"; fromIndex: number; toIndex: number }
  | { type: "TOGGLE_VISIBILITY"; sectionId: string }
  | { type: "UPDATE_CONTENT"; sectionId: string; content: Record<string, unknown> }
  | { type: "ADD_SKILL"; sectionId: string; skill: Skill }
  | { type: "REMOVE_SKILL"; sectionId: string; skillId: string }
  | { type: "UPDATE_SKILL"; sectionId: string; skillId: string; name: string }
  | { type: "ADD_PROJECT"; sectionId: string; project: Project }
  | { type: "REMOVE_PROJECT"; sectionId: string; projectId: string }
  | { type: "UPDATE_PROJECT"; sectionId: string; projectId: string; updates: Partial<Project> }
  | { type: "RESET"; defaultState: EditorState }
  | { type: "UPDATE_STYLE"; sectionId: string; style: Partial<SectionStyle> }
  | { type: "DUPLICATE_SECTION"; sectionId: string };
