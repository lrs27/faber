import Navbar from "@/components/Navbar";
import CheckeredBorder from "@/components/CheckeredBorder";
import Marquee from "@/components/Marquee";
import Link from "next/link";

const projects = [
  {
    title: "Faber — Portfolio Builder",
    description: "A Next.js web app that helps CS students build bold portfolios with drag-and-drop editing and AI scoring.",
    tags: ["Next.js", "Firebase", "TypeScript"],
    gradient: "from-gold/30 to-orange/20",
  },
  {
    title: "StudySync",
    description: "Real-time collaborative study tool with shared notes, flashcards, and video rooms for students.",
    tags: ["React", "WebRTC", "Node.js"],
    gradient: "from-light-blue/30 to-blue/20",
  },
  {
    title: "Budget Tracker CLI",
    description: "Command-line budgeting tool that tracks expenses, generates reports, and visualizes spending.",
    tags: ["Python", "SQLite", "Click"],
    gradient: "from-pink/30 to-orange/20",
  },
];

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Python", "Firebase", "PostgreSQL", "Git", "Figma",
  "Tailwind CSS", "REST APIs",
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      {/* ===== HERO / ABOUT ===== */}
      <section className="px-8 md:px-16 py-16 md:py-24">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Avatar */}
          <div className="shrink-0">
            <div
              className="w-40 h-40 rounded-2xl border-[5px] border-blue bg-gradient-to-br from-pink/60 to-orange/40 flex items-center justify-center shadow-[6px_6px_0_rgba(0,0,0,0.15)]"
              style={{ transform: "rotate(-3deg)" }}
            >
              <span className="text-4xl font-bold text-white/80 tracking-widest">MM</span>
            </div>
          </div>

          {/* Info */}
          <div className="text-center md:text-left">
            <h1
              className="text-4xl md:text-5xl font-bold text-dark-green"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Myles Miller
            </h1>
            <p className="text-lg text-gold font-semibold mt-2">Full Stack Developer</p>
            <p className="text-brown/60 mt-4 max-w-lg leading-relaxed">
              Computer Science student at Georgia State University passionate about building tools
              that help people. Focused on web development, UI/UX design, and creating delightful
              user experiences.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="#projects"
                className="px-6 py-2.5 bg-dark-green text-cream font-semibold rounded-full border-2 border-dark-green hover:bg-brown hover:border-brown transition-colors text-sm"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 bg-transparent text-dark-green font-semibold rounded-full border-2 border-dark-green hover:bg-dark-green hover:text-cream transition-colors text-sm"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>

      <Marquee text="Full Stack Developer" />
      <CheckeredBorder />

      {/* ===== SKILLS ===== */}
      <section className="px-8 md:px-16 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-dark-green text-center mb-10"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Skills &amp; Tools
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-5 py-2.5 bg-white rounded-full border-2 border-dark-green/10 text-sm font-semibold text-dark-green hover:border-gold hover:bg-gold/10 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CheckeredBorder />
      <Marquee text="Projects" />
      <CheckeredBorder />

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="px-8 md:px-16 py-16 md:py-24 bg-dark-green text-cream">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-cream text-center mb-16"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Featured Projects
          </h2>

          <div className="space-y-8">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className="flex flex-col md:flex-row gap-6 bg-cream/5 rounded-2xl border border-cream/10 overflow-hidden hover:border-gold/40 transition-colors"
              >
                <div className={`md:w-72 h-48 md:h-auto bg-gradient-to-br ${project.gradient} shrink-0 flex items-center justify-center`}>
                  <span className="text-5xl font-bold text-white/30">0{i + 1}</span>
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-cream mb-2">{project.title}</h3>
                  <p className="text-sm text-cream/60 leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-bold text-gold bg-gold/10 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CheckeredBorder />

      {/* ===== CONTACT ===== */}
      <section id="contact" className="px-8 md:px-16 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-dark-green mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Get In Touch
          </h2>
          <p className="text-brown/60 mb-10">
            Interested in working together? Drop me a message and I&apos;ll get back to you.
          </p>

          <form className="space-y-5 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-dark-green mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-green/10 bg-white text-dark-green placeholder:text-brown/40 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark-green mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-green/10 bg-white text-dark-green placeholder:text-brown/40 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-green mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-xl border-2 border-dark-green/10 bg-white text-dark-green placeholder:text-brown/40 focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-dark-green text-cream font-semibold rounded-full border-2 border-dark-green hover:bg-brown hover:border-brown transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      <Marquee text="Build Bold, Get Hired." />
      <CheckeredBorder />

      {/* ===== FOOTER ===== */}
      <footer className="px-8 md:px-16 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brown/50">
          <p>Faber — maker, craftsman.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-dark-green transition-colors">Home</Link>
            <Link href="/templates" className="hover:text-dark-green transition-colors">Templates</Link>
            <Link href="/dashboard" className="hover:text-dark-green transition-colors">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
