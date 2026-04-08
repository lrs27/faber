"use client";

interface CreativeHeroProps {
  name: string;
  tagline: string;
  bio: string;
  socials: { label: string; url: string }[];
}

export default function CreativeHero({ name, tagline, bio, socials }: CreativeHeroProps) {
  return (
    <header className="px-8 py-24 text-center relative overflow-hidden">
      {/* Floating playful blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-72 h-72 bg-pink-300/40 blur-[120px] rounded-full top-10 left-10 animate-pulse" />
        <div className="absolute w-80 h-80 bg-yellow-300/40 blur-[140px] rounded-full bottom-20 right-10 animate-pulse" />
        <div className="absolute w-64 h-64 bg-blue-300/40 blur-[100px] rounded-full top-1/2 left-1/3 animate-pulse" />
      </div>

      {/* Avatar */}
      <div className="mx-auto w-40 h-40 rounded-full bg-gradient-to-br from-pink-500 to-blue-400 flex items-center justify-center shadow-xl rotate-3 hover:rotate-0 transition-transform">
        <span className="text-5xl font-extrabold text-white tracking-wide">
          {name.split(" ").map((n) => n[0]).join("")}
        </span>
      </div>

      <h1
        className="text-6xl font-extrabold mt-6 text-dark-green drop-shadow-[0_0_20px_rgba(0,0,0,0.1)]"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {name}
      </h1>

      <p className="text-2xl text-pink-600 font-semibold mt-2">{tagline}</p>

      <p className="max-w-2xl mx-auto mt-6 text-brown/70 leading-relaxed text-lg">
        {bio}
      </p>

      {/* Socials */}
      <div className="flex justify-center gap-4 mt-8">
        {socials.map((s, i) => (
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
  );
}
