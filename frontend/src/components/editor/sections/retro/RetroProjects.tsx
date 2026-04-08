"use client";

interface RetroProject {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
}

interface RetroProjectsProps {
  heading: string;
  projects: RetroProject[];
}

export default function RetroProjects({ heading, projects }: RetroProjectsProps) {
  return (
    <section className="px-8 py-20 max-w-6xl mx-auto bg-[#0d0d0d] text-[#00eaff] font-retro border-y border-[#00eaff]/40">
      <h2 className="text-4xl font-bold mb-10 tracking-wider drop-shadow-[0_0_6px_#00eaff]">
        {heading}
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl bg-gradient-to-br ${project.gradient} text-black shadow-[0_0_10px_rgba(0,0,0,0.4)]`}
          >
            <h3 className="text-3xl font-extrabold tracking-wide">{project.title}</h3>
            <p className="mt-3 opacity-90 text-lg">{project.description}</p>

            <div className="flex flex-wrap gap-2 mt-5">
              {project.tags.map((tag, j) => (
                <span
                  key={j}
                  className="px-3 py-1 bg-black/40 text-white rounded-md text-xs font-semibold tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
