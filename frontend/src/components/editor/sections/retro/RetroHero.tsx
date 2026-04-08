"use client";

interface RetroHeroProps {
  name: string;
  tagline: string;
  bio: string;
}

export default function RetroHero({ name, tagline, bio }: RetroHeroProps) {
  return (
    <header className="px-8 py-24 text-center bg-[#0f0f0f] text-[#39ff14] relative overflow-hidden font-retro">
      {/* CRT Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:100%_3px]" />

      <h1 className="text-6xl font-extrabold tracking-widest drop-shadow-[0_0_10px_#39ff14]">
        {name}
      </h1>

      <p className="text-2xl mt-4 text-[#00ffea] drop-shadow-[0_0_6px_#00ffea]">
        {tagline}
      </p>

      <p className="max-w-2xl mx-auto mt-6 text-[#d1ffd1] leading-relaxed text-lg">
        {bio}
      </p>
    </header>
  );
}
