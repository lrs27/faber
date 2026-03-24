import type { EditorState } from "@/types/editor";

export function getDefaultState(template: "minimal" | "startup"): EditorState {
  return {
    templateStyle: template,
    sections: [
      {
        id: "section-hero",
        type: "hero",
        visible: true,
        content: {
          name: "Myles Miller",
          title: "Full Stack Developer",
          avatarInitials: "MM",
        },
      },
      {
        id: "section-about",
        type: "about",
        visible: true,
        content: {
          bio: "Computer Science student at Georgia State University passionate about building tools that help people. Focused on web development, UI/UX design, and creating delightful user experiences.",
        },
      },
      {
        id: "section-skills",
        type: "skills",
        visible: true,
        content: {
          heading: "Skills & Tools",
          skills: [
            { id: "s1", name: "JavaScript" },
            { id: "s2", name: "TypeScript" },
            { id: "s3", name: "React" },
            { id: "s4", name: "Next.js" },
            { id: "s5", name: "Node.js" },
            { id: "s6", name: "Python" },
            { id: "s7", name: "Firebase" },
            { id: "s8", name: "PostgreSQL" },
            { id: "s9", name: "Git" },
            { id: "s10", name: "Figma" },
            { id: "s11", name: "Tailwind CSS" },
            { id: "s12", name: "REST APIs" },
          ],
        },
      },
      {
        id: "section-projects",
        type: "projects",
        visible: true,
        content: {
          heading: "Featured Projects",
          projects: [
            {
              id: "p1",
              title: "Faber — Portfolio Builder",
              description: "A Next.js web app that helps CS students build bold portfolios with drag-and-drop editing and AI scoring.",
              tags: ["Next.js", "Firebase", "TypeScript"],
              gradient: "from-gold/30 to-orange/20",
            },
            {
              id: "p2",
              title: "StudySync",
              description: "Real-time collaborative study tool with shared notes, flashcards, and video rooms for students.",
              tags: ["React", "WebRTC", "Node.js"],
              gradient: "from-light-blue/30 to-blue/20",
            },
            {
              id: "p3",
              title: "Budget Tracker CLI",
              description: "Command-line budgeting tool that tracks expenses, generates reports, and visualizes spending.",
              tags: ["Python", "SQLite", "Click"],
              gradient: "from-pink/30 to-orange/20",
            },
          ],
        },
      },
      {
        id: "section-contact",
        type: "contact",
        visible: true,
        content: {
          heading: "Get In Touch",
          subheading: "Interested in working together? Drop me a message and I'll get back to you.",
          email: "myles@example.com",
        },
      },
    ],
  };
}
