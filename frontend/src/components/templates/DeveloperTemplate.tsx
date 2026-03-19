"use client";

import Link from "next/link";

interface Project {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  stars?: number;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  tech?: string[];
}

interface DeveloperTemplateProps {
  name?: string;
  handle?: string;
  title?: string;
  bio?: string;
  location?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  projects?: Project[];
  experience?: Experience[];
  skills?: { category: string; items: string[] }[];
  openToWork?: boolean;
}

const defaultData: DeveloperTemplateProps = {
  name: "Alex Rivera",
  handle: "alexcodes",
  title: "Full Stack Engineer",
  bio: "Building tools that developers love. Passionate about clean code, great DX, and shipping fast. Currently exploring AI/ML integration in web apps.",
  location: "San Francisco, CA",
  email: "alex@rivera.dev",
  github: "github.com/alexcodes",
  linkedin: "linkedin.com/in/alexrivera",
  openToWork: true,
  projects: [
    {
      name: "devterm",
      description: "A modern terminal emulator built with Rust and WebGPU. Features GPU-accelerated rendering, split panes, and extensive customization.",
      tech: ["Rust", "WebGPU", "TypeScript"],
      github: "github.com/alexcodes/devterm",
      stars: 2847,
    },
    {
      name: "api-forge",
      description: "CLI tool for generating type-safe API clients from OpenAPI specs. Supports TypeScript, Go, and Python with customizable templates.",
      tech: ["Go", "OpenAPI", "Code Generation"],
      github: "github.com/alexcodes/api-forge",
      live: "api-forge.dev",
      stars: 1203,
    },
    {
      name: "react-motion-kit",
      description: "Lightweight React animation library with spring physics. Zero dependencies, tree-shakeable, and performance-focused.",
      tech: ["React", "TypeScript", "Animation"],
      github: "github.com/alexcodes/react-motion-kit",
      stars: 892,
    },
    {
      name: "gitgraph",
      description: "Visualize your git history as an interactive graph. Supports complex workflows, branch analysis, and team collaboration patterns.",
      tech: ["TypeScript", "D3.js", "Git"],
      github: "github.com/alexcodes/gitgraph",
      live: "gitgraph.app",
      stars: 567,
    },
  ],
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Vercel",
      period: "2024 – Present",
      description: [
        "Leading development of Next.js developer tooling",
        "Improved build times by 40% through caching optimizations",
        "Mentoring junior engineers and conducting technical interviews",
      ],
      tech: ["Next.js", "TypeScript", "Rust", "Turborepo"],
    },
    {
      title: "Software Engineer",
      company: "Stripe",
      period: "2022 – 2024",
      description: [
        "Built internal tools for payment processing pipelines",
        "Designed and implemented real-time fraud detection APIs",
        "Reduced API latency by 60% through query optimization",
      ],
      tech: ["Ruby", "Go", "PostgreSQL", "Kafka"],
    },
    {
      title: "Software Engineer Intern",
      company: "GitHub",
      period: "Summer 2021",
      description: [
        "Contributed to GitHub Actions CI/CD platform",
        "Implemented workflow visualization features",
        "Shipped features used by 10M+ repositories",
      ],
      tech: ["TypeScript", "React", "Rails"],
    },
  ],
  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "Rust", "Go", "Python", "Ruby"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Vue", "Tailwind CSS", "WebGL"],
    },
    {
      category: "Backend",
      items: ["Node.js", "PostgreSQL", "Redis", "GraphQL", "gRPC"],
    },
    {
      category: "DevOps",
      items: ["Docker", "Kubernetes", "AWS", "Terraform", "GitHub Actions"],
    },
  ],
};

export default function DeveloperTemplate(props: DeveloperTemplateProps) {
  const data = { ...defaultData, ...props };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Terminal-style header */}
      <header className="border-b border-[#30363d]">
        <div className="max-w-6xl mx-auto px-6 py-6">
          {/* Terminal window controls */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-4 text-xs text-[#8b949e] font-mono">~/portfolio</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-5">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#58a6ff] to-[#a371f7] flex items-center justify-center shrink-0">
                <span className="text-2xl font-bold text-white font-mono">
                  {data.name?.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold text-white">{data.name}</h1>
                  {data.openToWork && (
                    <span className="px-2.5 py-0.5 text-xs font-semibold bg-[#238636] text-white rounded-full">
                      Open to work
                    </span>
                  )}
                </div>
                <p className="text-[#58a6ff] font-mono text-sm mt-1">@{data.handle}</p>
                <p className="text-[#8b949e] mt-2 max-w-xl">{data.bio}</p>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-[#8b949e]">
                  {data.location && (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0a5 5 0 0 0-5 5c0 4.17 4.42 9.92 4.62 10.22a.5.5 0 0 0 .76 0C8.58 14.92 13 9.17 13 5a5 5 0 0 0-5-5zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                      </svg>
                      {data.location}
                    </span>
                  )}
                  {data.email && (
                    <a href={`mailto:${data.email}`} className="flex items-center gap-1.5 hover:text-[#58a6ff] transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zM1 5.383v5.722l4.708-2.897L1 5.383zm7 4.958-6.457-3.874L1 9.93V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.93l-.543-.463L8 10.341z" />
                      </svg>
                      {data.email}
                    </a>
                  )}
                  {data.github && (
                    <a href={`https://${data.github}`} className="flex items-center gap-1.5 hover:text-[#58a6ff] transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#27c93f] font-mono">$</span>
              <h2 className="text-xl font-bold text-white">projects --featured</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.projects.map((project, i) => (
                <div
                  key={i}
                  className="p-5 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#58a6ff]/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#8b949e]" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8.5V1.5zM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2v-3.25z" />
                      </svg>
                      <h3 className="font-semibold text-[#58a6ff] font-mono group-hover:underline">
                        {project.name}
                      </h3>
                    </div>
                    {project.stars && (
                      <span className="flex items-center gap-1 text-xs text-[#8b949e]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
                        </svg>
                        {project.stars.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#8b949e] mt-3 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((t, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-1 text-xs font-medium bg-[#388bfd]/10 text-[#58a6ff] rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-4 pt-4 border-t border-[#30363d]">
                    {project.github && (
                      <a href={`https://${project.github}`} className="text-xs text-[#8b949e] hover:text-[#58a6ff] transition-colors">
                        View Source →
                      </a>
                    )}
                    {project.live && (
                      <a href={`https://${project.live}`} className="text-xs text-[#8b949e] hover:text-[#58a6ff] transition-colors">
                        Live Demo →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#27c93f] font-mono">$</span>
              <h2 className="text-xl font-bold text-white">experience --list</h2>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg border border-[#30363d] bg-[#161b22]"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-white">{exp.title}</h3>
                      <p className="text-[#a371f7] font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-sm text-[#8b949e] font-mono">{exp.period}</span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, j) => (
                      <li key={j} className="text-sm text-[#8b949e] flex items-start gap-2">
                        <span className="text-[#27c93f] mt-1">▹</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {exp.tech && (
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t, j) => (
                        <span
                          key={j}
                          className="px-2 py-0.5 text-xs font-mono bg-[#30363d] text-[#8b949e] rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#27c93f] font-mono">$</span>
              <h2 className="text-xl font-bold text-white">skills --all</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.skills.map((skillGroup, i) => (
                <div key={i} className="p-4 rounded-lg border border-[#30363d] bg-[#161b22]">
                  <h3 className="text-sm font-bold text-[#a371f7] mb-3 uppercase tracking-wide">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-1 text-xs bg-[#30363d] text-[#c9d1d9] rounded hover:bg-[#3d444d] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <section className="text-center py-10">
          <div className="inline-block p-6 rounded-lg border border-[#30363d] bg-[#161b22]">
            <p className="font-mono text-sm text-[#8b949e] mb-4">
              <span className="text-[#27c93f]">$</span> echo &quot;Let&apos;s build something together&quot;
            </p>
            <a
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#238636] text-white font-semibold rounded-lg hover:bg-[#2ea043] transition-colors"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#30363d]">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center">
          <p className="text-xs text-[#8b949e]">
            Built with{" "}
            <Link href="/" className="text-[#58a6ff] hover:underline">
              Faber
            </Link>
            {" "}• Deployed with ☕
          </p>
        </div>
      </footer>
    </div>
  );
}
