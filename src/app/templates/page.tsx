import Navbar from "@/components/Navbar";
import CheckeredBorder from "@/components/CheckeredBorder";
import Marquee from "@/components/Marquee";
import Link from "next/link";

const templates = [
  {
    name: "Minimal",
    description: "Clean, typographic, timeless. Perfect for those who let their work speak.",
    gradient: "from-gold/30 to-orange/20",
    hoverBorder: "hover:border-gold",
    tags: ["Clean", "Typography"],
  },
  {
    name: "Developer",
    description: "Terminal-inspired, dark mode ready. Built for devs who live in the command line.",
    gradient: "from-light-blue/30 to-blue/20",
    hoverBorder: "hover:border-blue",
    tags: ["Dark Mode", "Code"],
  },
  {
    name: "Creative",
    description: "Bold colors, playful layout. Stand out from the crowd with personality.",
    gradient: "from-pink/30 to-orange/20",
    hoverBorder: "hover:border-pink",
    tags: ["Colorful", "Fun"],
  },
  {
    name: "Academic",
    description: "Research-focused, publication ready. Showcase your papers and coursework.",
    gradient: "from-dark-green/20 to-gold/15",
    hoverBorder: "hover:border-dark-green",
    tags: ["Research", "Papers"],
  },
  {
    name: "Startup",
    description: "Bold and modern. For builders who want to show off side projects and MVPs.",
    gradient: "from-orange/30 to-yellow/20",
    hoverBorder: "hover:border-orange",
    tags: ["Modern", "Projects"],
  },
  {
    name: "Retro",
    description: "Nostalgic vibes, pixel-perfect. A throwback aesthetic with modern functionality.",
    gradient: "from-brown/20 to-gold/20",
    hoverBorder: "hover:border-brown",
    tags: ["Vintage", "Playful"],
  },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="px-8 md:px-16 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-4xl md:text-6xl font-bold text-dark-green mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Templates
          </h1>
          <p className="text-lg text-brown/70 max-w-xl mx-auto">
            Start with a design that fits your vibe. Every template is responsive, fully customizable, and built for CS students.
          </p>
        </div>
      </section>

      <Marquee text="Pick Your Style" />
      <CheckeredBorder />

      {/* ===== TEMPLATE GRID ===== */}
      <section className="px-8 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div
                key={template.name}
                className={`group rounded-2xl border-2 border-dark-green/10 overflow-hidden bg-white ${template.hoverBorder} transition-all hover:shadow-[6px_6px_0_rgba(0,0,0,0.1)] cursor-pointer`}
              >
                <div className={`h-52 bg-gradient-to-br ${template.gradient} flex items-end p-5`}>
                  <div className="flex gap-2">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-bold text-dark-green bg-cream/80 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-green mb-2">{template.name}</h3>
                  <p className="text-sm text-brown/60 leading-relaxed mb-4">
                    {template.description}
                  </p>
                  <button className="text-sm font-semibold text-gold hover:text-brown transition-colors">
                    Preview &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CheckeredBorder />
      <Marquee text="Build Bold, Get Hired." />
      <CheckeredBorder />

      {/* ===== CTA SECTION ===== */}
      <section className="px-8 md:px-16 py-16 md:py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-dark-green mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Don&apos;t see what you need?
          </h2>
          <p className="text-brown/70 mb-8">
            New templates are added regularly. Sign up to get notified when new designs drop.
          </p>
          <Link
            href="/login"
            className="px-8 py-3 bg-dark-green text-cream font-semibold rounded-full border-2 border-dark-green hover:bg-brown hover:border-brown transition-colors inline-block"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="px-8 md:px-16 py-8 border-t border-dark-green/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brown/50">
          <p>Faber — maker, craftsman.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-dark-green transition-colors">Home</Link>
            <Link href="/templates" className="hover:text-dark-green transition-colors">Templates</Link>
            <Link href="/login" className="hover:text-dark-green transition-colors">Login</Link>
            <Link href="/dashboard" className="hover:text-dark-green transition-colors">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
