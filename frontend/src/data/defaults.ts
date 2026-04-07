import type { EditorState } from "@/types/editor";

export function getDefaultState(
  template: "minimal" | "startup" | "academic" | "developer" | "creative"
): EditorState {
  if (template === "minimal" || template === "startup") {
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
  if (template === "academic") {
    return {
      templateStyle: template,
      sections: [
        {
          id: "section-hero",
          type: "hero",
          visible: true,
          style: {
            background: { type: "solid", color: "#f5f7fa" },
            typography: { fontFamily: "serif", fontWeight: 700, color: "#234d20" },
            spacing: { paddingTop: "4rem", paddingBottom: "4rem" },
          },
          content: {
            name: "Jordan Lee",
            title: "Undergraduate Researcher",
            avatarInitials: "JL",
          },
        },
        {
          id: "section-about",
          type: "about",
          visible: true,
          style: {
            background: { type: "solid", color: "#f9fafb" },
            typography: { fontFamily: "serif", color: "#234d20" },
          },
          content: {
            bio: "Aspiring scientist and honors student passionate about research, data, and discovery.",
          },
        },
        {
          id: "section-skills",
          type: "skills",
          visible: true,
          style: {
            background: { type: "solid", color: "#e9f5e1" },
            typography: { fontFamily: "serif", color: "#234d20" },
          },
          content: {
            heading: "Academic Skills",
            skills: [
              { id: "s1", name: "Research" },
              { id: "s2", name: "Data Analysis" },
              { id: "s3", name: "Scientific Writing" },
              { id: "s4", name: "Public Speaking" },
              { id: "s5", name: "Python" },
            ],
          },
        },
        {
          id: "section-projects",
          type: "projects",
          visible: true,
          style: {
            background: { type: "solid", color: "#f5f7fa" },
            typography: { fontFamily: "serif", color: "#234d20" },
          },
          content: {
            heading: "Research Projects",
            projects: [
              {
                id: "p1",
                title: "Genomics Data Visualization",
                description: "Developed a tool for visualizing large-scale genomics data sets.",
                tags: ["Python", "Bioinformatics"],
                gradient: "from-dark-green/20 to-gold/15",
              },
              {
                id: "p2",
                title: "Student Conference Presentation",
                description: "Presented findings on climate data trends at a national conference.",
                tags: ["Research", "Presentation"],
                gradient: "from-gold/20 to-dark-green/10",
              },
            ],
          },
        },
        {
          id: "section-contact",
          type: "contact",
          visible: true,
          style: {
            background: { type: "solid", color: "#e9f5e1" },
            typography: { fontFamily: "serif", color: "#234d20" },
          },
          content: {
            heading: "Contact",
            subheading: "Let's connect about research or opportunities!",
            email: "jordan.lee@email.edu",
          },
        },
      ],
    };
  }
  if (template === "developer") {
    return {
      templateStyle: template,
      sections: [
        {
          id: "section-hero",
          type: "hero",
          visible: true,
          style: {
            background: { type: "gradient", direction: "to-br", from: "#23272f", to: "#161b22" },
            typography: { fontFamily: "monospace", fontWeight: 700, color: "#c9d1d9" },
            spacing: { paddingTop: "4rem", paddingBottom: "4rem" },
          },
          content: {
            name: "Alex Rivera",
            title: "Full Stack Developer",
            avatarInitials: "AR",
          },
        },
        {
          id: "section-about",
          type: "about",
          visible: true,
          style: {
            background: { type: "solid", color: "#161b22" },
            typography: { fontFamily: "monospace", color: "#c9d1d9" },
          },
          content: {
            bio: "Building tools that developers love. Passionate about clean code, great DX, and shipping fast.",
          },
        },
        {
          id: "section-skills",
          type: "skills",
          visible: true,
          style: {
            background: { type: "solid", color: "#23272f" },
            typography: { fontFamily: "monospace", color: "#58a6ff" },
          },
          content: {
            heading: "Tech Stack",
            skills: [
              { id: "s1", name: "JavaScript" },
              { id: "s2", name: "TypeScript" },
              { id: "s3", name: "React" },
              { id: "s4", name: "Node.js" },
              { id: "s5", name: "Next.js" },
              { id: "s6", name: "Docker" },
              { id: "s7", name: "AWS" },
            ],
          },
        },
        {
          id: "section-projects",
          type: "projects",
          visible: true,
          style: {
            background: { type: "solid", color: "#161b22" },
            typography: { fontFamily: "monospace", color: "#c9d1d9" },
          },
          content: {
            heading: "Projects",
            projects: [
              {
                id: "p1",
                title: "Next.js Developer Tools",
                description: "Open source CLI and VS Code extension for Next.js workflows.",
                tags: ["Next.js", "CLI", "VS Code"],
                gradient: "from-blue/30 to-dark/80",
              },
              {
                id: "p2",
                title: "Realtime Chat App",
                description: "Socket.io chat app with dark mode and emoji reactions.",
                tags: ["Node.js", "Socket.io"],
                gradient: "from-dark/80 to-blue/30",
              },
            ],
          },
        },
        {
          id: "section-contact",
          type: "contact",
          visible: true,
          style: {
            background: { type: "solid", color: "#23272f" },
            typography: { fontFamily: "monospace", color: "#58a6ff" },
          },
          content: {
            heading: "Contact",
            subheading: "Let's build something together!",
            email: "alex.rivera@devmail.com",
          },
        },
      ],
    };
  }
  // Fallback to minimal if template is unknown
  return {
    templateStyle: "minimal",
    sections: [
      {
        id: "section-hero",
        type: "hero",
        visible: true,
        style: {
          background: { type: "solid", color: "#ffffff" },
          typography: { fontFamily: "sans-serif", fontWeight: 700, color: "#222" },
          spacing: { paddingTop: "4rem", paddingBottom: "4rem" },
        },
        content: {
          name: "Casey Smith",
          title: "Product Designer",
          avatarInitials: "CS",
        },
      },
      {
        id: "section-about",
        type: "about",
        visible: true,
        style: {
          background: { type: "solid", color: "#f7f7f7" },
          typography: { fontFamily: "sans-serif", color: "#222" },
        },
        content: {
          bio: "Designing simple, beautiful products. Focused on usability and clarity.",
        },
      },
      {
        id: "section-skills",
        type: "skills",
        visible: true,
        style: {
          background: { type: "solid", color: "#f0f0f0" },
          typography: { fontFamily: "sans-serif", color: "#222" },
        },
        content: {
          heading: "Skills",
          skills: [
            { id: "s1", name: "UI Design" },
            { id: "s2", name: "Prototyping" },
            { id: "s3", name: "Figma" },
            { id: "s4", name: "User Research" },
          ],
        },
      },
      {
        id: "section-projects",
        type: "projects",
        visible: true,
        style: {
          background: { type: "solid", color: "#ffffff" },
          typography: { fontFamily: "sans-serif", color: "#222" },
        },
        content: {
          heading: "Projects",
          projects: [
            {
              id: "p1",
              title: "Mobile Banking App",
              description: "Designed a clean, intuitive mobile banking experience.",
              tags: ["UI", "Mobile"],
              gradient: "from-gray/10 to-blue/10",
            },
            {
              id: "p2",
              title: "E-commerce Redesign",
              description: "Led redesign for a major online retailer, improving conversion by 20%.",
              tags: ["E-commerce", "UX"],
              gradient: "from-blue/10 to-gray/10",
            },
          ],
        },
      },
      {
        id: "section-contact",
        type: "contact",
        visible: true,
        style: {
          background: { type: "solid", color: "#f0f0f0" },
          typography: { fontFamily: "sans-serif", color: "#222" },
        },
        content: {
          heading: "Contact",
          subheading: "Let's work together!",
          email: "casey.smith@email.com",
        },
      },
    ],
  };
}
