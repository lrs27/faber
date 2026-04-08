"use client";

interface RetroContactProps {
  heading: string;
  subheading: string;
  email: string;
}

export default function RetroContact({ heading, subheading, email }: RetroContactProps) {
  return (
    <footer className="px-8 py-20 text-center bg-[#1f1f1f] text-[#39ff14] font-retro border-t border-[#39ff14]/40">
      <h2 className="text-4xl font-bold tracking-wider drop-shadow-[0_0_6px_#39ff14]">
        {heading}
      </h2>

      <p className="mt-4 text-lg text-[#9aff9a]">{subheading}</p>

      <a
        href={`mailto:${email}`}
        className="inline-block mt-6 px-10 py-3 bg-[#39ff14] text-black font-bold rounded-md shadow-[0_0_10px_#39ff14] hover:bg-[#2cff0f] transition"
      >
        {email}
      </a>
    </footer>
  );
}
