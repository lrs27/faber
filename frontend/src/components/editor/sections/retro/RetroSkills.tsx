"use client";

interface RetroSkillsProps {
  heading: string;
  skills: string[];
}

export default function RetroSkills({ heading, skills }: RetroSkillsProps) {
  return (
    <section className="px-8 py-20 max-w-5xl mx-auto bg-[#111827] text-[#facc15] font-retro border-y border-[#facc15]/40">
      <h2 className="text-4xl font-bold mb-6 tracking-wider drop-shadow-[0_0_6px_#facc15]">
        {heading}
      </h2>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-4 py-2 bg-[#0f0f0f] border border-[#facc15] text-[#facc15] rounded-md text-sm tracking-wide shadow-[0_0_6px_#facc15]"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
