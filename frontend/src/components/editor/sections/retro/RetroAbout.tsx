"use client";

interface RetroAboutProps {
  bio: string;
}

export default function RetroAbout({ bio }: RetroAboutProps) {
  return (
    <section className="px-8 py-16 max-w-3xl mx-auto bg-[#1a1a1a] text-[#ff4d6d] font-retro border-y border-[#ff4d6d]/40">
      <h2 className="text-4xl font-bold mb-4 tracking-wider drop-shadow-[0_0_6px_#ff4d6d]">
        About Me
      </h2>

      <p className="text-lg leading-relaxed text-[#ffb3c1]">{bio}</p>
    </section>
  );
}
