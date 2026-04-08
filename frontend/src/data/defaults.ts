import type { EditorState } from "@/types/editor";

export function getDefaultState(
  template: "minimal" | "startup" | "academic" | "developer" | "creative" | "retro"

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
  if (template === "creative") {
  return {
    templateStyle: template,
    sections: [
      {
        id: "section-hero",
        type: "hero",
        visible: true,
        style: {
          background: {
            type: "gradient",
            direction: "to-br",
            from: "#ff9ecb",
            to: "#8ae8fb",
          },
          typography: {
            fontFamily: "var(--font-playfair)",
            fontWeight: 800,
            color: "#c1fc81",
          },
          spacing: {
            paddingTop: "6rem",
            paddingBottom: "6rem",
          },
        },
        content: {
          name: "Zara Bloom",
          title: "Creative Coder • Visual Thinker • Color Enthusiast",
          avatarInitials: "ZB",
        },
      },
      {
        id: "section-about",
        type: "about",
        visible: true,
        style: {
          background: { type: "solid", color: "#fadddd" },
          typography: {
            fontFamily: "var(--font-playfair)",
            color: "#3b2f2f",
          },
          spacing: {
            paddingTop: "4rem",
            paddingBottom: "4rem",
          },
        },
        content: {
          bio: "I create vibrant, expressive digital experiences that mix art, code, and storytelling. My work is bold, colorful, and full of personality — just like me. I love creating playful, personality‑driven interfaces with bold colors, expressive layouts, and delightful interactions.",
        },
      },
      {
        id: "section-skills",
        type: "skills",
        visible: true,
        style: {
          background: { type: "solid", color: "#c6eafd" },
          typography: {
            fontFamily: "var(--font-playfair)",
            color: "#b91c1c",
          },
          spacing: {
            paddingTop: "4rem",
            paddingBottom: "4rem",
          },
        },
        content: {
          heading: "Creative Skills",
          skills: [
            { id: "s1", name: "Creative Coding" },
            { id: "s2", name: "WebGL" },
            { id: "s3", name: "Animation" },
            { id: "s4", name: "Figma" },
            { id: "s5", name: "TypeScript" },
            { id: "s6", name: "Brand Design" },
            { id: "s7", name: "Illustration" },
          ],
        },
      },
      {
        id: "section-projects",
        type: "projects",
        visible: true,
        style: {
          background: { type: "solid", color: "#fcfe97" },
          typography: {
            fontFamily: "var(--font-playfair)",
            color: "#1e3a8a",
          },
          spacing: {
            paddingTop: "4rem",
            paddingBottom: "4rem",
          },
        },
        content: {
          heading: "Featured Projects",
          projects: [
            {
              id: "p1",
              title: "ColorBurst",
              description:
                "A chaotic, joyful color generator that reacts to sound and movement.",
              tags: ["Creative Coding", "WebGL", "Motion"],
              gradient: " bg-gradient-to-br from-fuchsia-500 to-orange-400",
            },
            {
              id: "p2",
              title: "BubbleBeats",
              description:
                "A playful music visualizer where bubbles dance to your playlist.",
              tags: ["Audio", "Canvas", "Animation"],
              gradient: " bg-gradient-to-br from-cyan-400 to-blue-500",
            },
            {
              id: "p3",
              title: "DreamDoodles",
              description:
                "A generative art tool that turns your sketches into neon dreamscapes.",
              tags: ["AI", "Art", "UX"],
              gradient: " bg-gradient-to-br from-lime-400 to-yellow-400",
            },
          ],
        },
      },
      {
        id: "section-contact",
        type: "contact",
        visible: true,
        style: {
          background: { type: "solid", color: "#f79eca" },
          typography: {
            fontFamily: "var(--font-playfair)",
            color: "#f389b3",
          },
          spacing: {
            paddingTop: "4rem",
            paddingBottom: "4rem",
          },
        },
        content: {
          heading: "Let’s Make Something Fun",
          subheading:
            "I love collaborating on playful, expressive, colorful digital experiences.",
          email: "zara@example.com",
        },
      },
    ],
  };
}
  if (template === "retro") {
  return {
    templateStyle: template,
    sections: [
      {
        id: "section-hero",
        type: "hero",
        visible: true,
        style: {
          background: {
            type: "solid",
            color: "#0f0f0f", // CRT black
          },
          typography: {
            fontFamily: "var(--font-retro)",
            fontWeight: 800,
            color: "#39ff14", // neon green
          },
          spacing: {
            paddingTop: "5rem",
            paddingBottom: "5rem",
          },
        },
        content: {
          name: "Pixel Pioneer",
          title: "Building Worlds • One Pixel at a Time",
          avatarInitials: "PP",
        },
      },

      {
        id: "section-about",
        type: "about",
        visible: true,
        style: {
          background: { type: "solid", color: "#1a1a1a" },
          typography: {
            fontFamily: "var(--font-retro)",
            color: "#ff4d6d", // cherry red
          },
          spacing: {
            paddingTop: "3rem",
            paddingBottom: "3rem",
          },
        },
        content: {
          bio: "Retro‑inspired developer crafting nostalgic, low‑fi, pixel‑perfect digital experiences with modern functionality. Inspired by classic arcade cabinets, Game Boy palettes, and early web aesthetics. I blend nostalgia with modern code to create playful, expressive interfaces.",
        },
      },

      {
        id: "section-skills",
        type: "skills",
        visible: true,
        style: {
          background: { type: "solid", color: "#111827" }, // deep retro navy
          typography: {
            fontFamily: "var(--font-retro)",
            color: "#facc15", // Game Boy yellow
          },
          spacing: {
            paddingTop: "3rem",
            paddingBottom: "3rem",
          },
        },
        content: {
          heading: "Retro Skills",
          skills: [
            { id: "s1", name: "Pixel Art" },
            { id: "s2", name: "8‑Bit Animation" },
            { id: "s3", name: "Retro UI Design" },
            { id: "s4", name: "JavaScript" },
            { id: "s5", name: "TypeScript" },
            { id: "s6", name: "React" },
            { id: "s7", name: "Shader Effects" },
          ],
        },
      },

      {
        id: "section-projects",
        type: "projects",
        visible: true,
        style: {
          background: { type: "solid", color: "#0d0d0d" },
          typography: {
            fontFamily: "var(--font-retro)",
            color: "#00eaff", // mint teal
          },
          spacing: {
            paddingTop: "3rem",
            paddingBottom: "3rem",
          },
        },
        content: {
          heading: "Retro Projects",
          projects: [
            {
              id: "p1",
              title: "CRT Dashboard",
              description:
                "A glowing CRT‑style dashboard with scanlines, bloom effects, and pixel fonts.",
              tags: ["CSS", "Retro UI", "Animation"],
              gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
            },
            {
              id: "p2",
              title: "PixelQuest",
              description:
                "A tiny RPG engine inspired by Game Boy classics with tilemaps and chiptune audio.",
              tags: ["Canvas", "Game Dev", "Pixel Art"],
              gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
            },
            {
              id: "p3",
              title: "ArcadeHub",
              description:
                "A collection of mini retro‑style web games built with modern JavaScript.",
              tags: ["JavaScript", "Games", "Retro"],
              gradient: "bg-gradient-to-br from-pink-500 to-red-500",
            },
          ],
        },
      },

      {
        id: "section-contact",
        type: "contact",
        visible: true,
        style: {
          background: { type: "solid", color: "#1f1f1f" },
          typography: {
            fontFamily: "var(--font-retro)",
            color: "#39ff14",
          },
          spacing: {
            paddingTop: "3rem",
            paddingBottom: "3rem",
          },
        },
        content: {
          heading: "Insert Coin to Start",
          subheading:
            "Let’s build something nostalgic, pixel‑perfect, and full of character.",
          email: "retro@example.com",
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
