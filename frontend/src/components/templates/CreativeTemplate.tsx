"use client";

import Link from "next/link";

interface CreativeProject {
  title: string;
  description: string;
  tags: string[];
  color: string;
}

interface CreativeTemplateProps {
  name?: string;
  tagline?: string;
  bio?: string;
  projects?: CreativeProject[];
  skills?: string[];
  email?: string;
  socials?: { label: string; url: string }[];
}

const defaultData: CreativeTemplateProps = {
  name: "Zara Bloom",
  tagline: "Creative Coder • Visual Thinker • Color Enthusiast",
  bio: "I create vibrant, expressive digital experiences that mix art, code, and storytelling. My work is bold, colorful, and full of personality — just like me.",
  projects: [
    {
      title: "ColorBurst",
      description: "A chaotic, joyful color generator that reacts to sound and movement.",
      tags: ["Creative Coding", "WebGL", "Motion"],
      color: "bg-gradient-to-br from-fuchsia-500 to-orange-400",
    },
    {
      title: "BubbleBeats",
      description: "A playful music visualizer where bubbles dance to your playlist.",
      tags: ["Audio", "Canvas", "Animation"],
      color: "bg-gradient-to-br from-cyan-400 to-blue-500",
    },
    {
      title: "DreamDoodles",
      description: "A generative art tool that turns your sketches into neon dreamscapes.",
      tags: ["AI", "Art", "UX"],
      color: "bg-gradient-to-br from-lime-400 to-yellow-400",
    },
  ],
  skills: [
    "Creative Coding",
    "WebGL",
    "Animation",
    "Figma",
    "TypeScript",
    "Brand Design",
    "Illustration",
  ],
  email: "zara@example.com",
  socials: [
    { label: "Instagram", url: "#" },
    { label: "Dribbble", url: "#" },
    { label: "GitHub", url: "#" },
  ],
};

export default function CreativeTemplate(props: CreativeTemplateProps) {
  const data = { ...defaultData, ...props };

  return (
    <div className="min-h-screen bg-white text-dark-green relative overflow-hidden">
      {/* Floating playful blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-72 h-72 bg-pink-300/40 blur-[120px] rounded-full top-10 left-10 animate-pulse" />
        <div className="absolute w-80 h-80 bg-yellow-300/40 blur-[140px] rounded-full bottom-20 right-10 animate-pulse" />
        <div className="absolute w-64 h-64 bg-blue-300/40 blur-[100px] rounded-full top-1/2 left-1/3 animate-pulse" />
      </div>

      {/* HERO */}
      <header className="px-8 py-24 text-center">
        <div className="mx-auto w-40 h-40 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center shadow-xl rotate-3 hover:rotate-0 transition-transform">
          <span className="text-5xl font-extrabold text-white tracking-wide">
            {data.name?.split(" ").map((n) => n[0]).join("")}
          </span>
        </div>

        <h1
          className="text-6xl font-extrabold mt-6 text-dark-green drop-shadow-[0_0_20px_rgba(0,0,0,0.1)]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {data.name}
        </h1>

        <p className="text-2xl text-pink-600 font-semibold mt-2">
          {data.tagline}
        </p>

        <p className="max-w-2xl mx-auto mt-6 text-brown/70 leading-relaxed text-lg">
          {data.bio}
        </p>

        {/* Socials */}
        <div className="flex justify-center gap-4 mt-8">
          {data.socials?.map((s, i) => (
            <a
              key={i}
              href={s.url}
              className="px-5 py-2 bg-white rounded-full border border-pink-300 text-sm font-semibold text-pink-600 hover:bg-pink-50 transition shadow-sm"
            >
              {s.label}
            </a>
          ))}
        </div>
      </header>

      {/* PROJECTS */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <h2
          className="text-4xl font-bold mb-10 text-dark-red"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {data.projects?.map((project, i) => (
            <div
              key={i}
              className={`p-6 rounded-3xl ${project.color} text-white shadow-xl hover:scale-[1.03] transition-transform`}
            >
              <h3 className="text-3xl font-extrabold">{project.title}</h3>
              <p className="mt-3 opacity-90 text-lg">{project.description}</p>

              <div className="flex flex-wrap gap-2 mt-5">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 bg-white/30 rounded-full text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <h2
          className="text-4xl font-bold mb-6 text-dark-green"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {data.skills?.map((skill, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-white rounded-full border border-orange-300 text-sm font-medium text-orange-600 hover:bg-orange-50 transition shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <footer className="px-8 py-20 text-center bg-white/70 backdrop-blur-sm border-t border-pink-200">
        <h2
          className="text-4xl font-bold text-dark-green"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Let’s Make Something Fun
        </h2>

        <p className="mt-4 text-brown/70 text-lg">
          I love collaborating on playful, expressive, colorful digital experiences.
        </p>

        <a
          href={`mailto:${data.email}`}
          className="inline-block mt-6 px-10 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-md hover:bg-pink-600 transition text-lg"
        >
          {data.email}
        </a>

        <p className="text-xs text-brown/50 mt-8">
          Built with <Link href="/" className="text-pink-600 font-semibold">Faber</Link>
        </p>
      </footer>
    </div>
  );
}
