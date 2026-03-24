"use client";

import Link from "next/link";

interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  link?: string;
}

interface Course {
  code: string;
  name: string;
  grade?: string;
  description?: string;
}

interface ResearchExperience {
  title: string;
  lab: string;
  institution: string;
  period: string;
  description: string;
  advisor?: string;
}

interface AcademicTemplateProps {
  name?: string;
  title?: string;
  institution?: string;
  department?: string;
  email?: string;
  bio?: string;
  avatar?: string;
  publications?: Publication[];
  courses?: Course[];
  research?: ResearchExperience[];
  skills?: string[];
  awards?: string[];
  cvLink?: string;
}

const defaultData: AcademicTemplateProps = {
  name: "Jordan Chen",
  title: "PhD Candidate in Computer Science",
  institution: "Georgia Institute of Technology",
  department: "College of Computing",
  email: "jchen@gatech.edu",
  bio: "Third-year PhD candidate researching human-computer interaction and accessible computing. My work focuses on developing AI-powered assistive technologies for users with visual impairments. Previously, I completed my BS in Computer Science at UC Berkeley where I developed an interest in accessibility research.",
  publications: [
    {
      title: "Accessible Voice Interfaces for Visually Impaired Users: A Systematic Review",
      authors: "Chen, J., Williams, A., & Park, S.",
      venue: "CHI '26: ACM Conference on Human Factors in Computing Systems",
      year: 2026,
      link: "#",
    },
    {
      title: "VoiceNav: An AI-Powered Navigation System for Indoor Environments",
      authors: "Chen, J., & Park, S.",
      venue: "ASSETS '25: ACM SIGACCESS Conference on Computers and Accessibility",
      year: 2025,
      link: "#",
    },
    {
      title: "Understanding Screen Reader Usage Patterns in Web Navigation",
      authors: "Chen, J., Martinez, L., & Williams, A.",
      venue: "UIST '25: ACM Symposium on User Interface Software and Technology",
      year: 2025,
      link: "#",
    },
  ],
  courses: [
    { code: "CS 6750", name: "Human-Computer Interaction", grade: "A" },
    { code: "CS 7650", name: "Natural Language Processing", grade: "A" },
    { code: "CS 6601", name: "Artificial Intelligence", grade: "A" },
    { code: "CS 7643", name: "Deep Learning", grade: "A-" },
    { code: "CS 6476", name: "Computer Vision", grade: "A" },
    { code: "PSYC 6011", name: "Cognitive Psychology", grade: "A" },
  ],
  research: [
    {
      title: "Graduate Research Assistant",
      lab: "Accessibility & AI Lab",
      institution: "Georgia Tech",
      period: "Aug 2024 – Present",
      description: "Developing machine learning models for real-time audio description generation. Leading a team of 3 undergraduate researchers on a NSF-funded project.",
      advisor: "Dr. Sarah Park",
    },
    {
      title: "Undergraduate Researcher",
      lab: "Berkeley HCI Group",
      institution: "UC Berkeley",
      period: "Jan 2022 – May 2024",
      description: "Conducted user studies on screen reader interfaces. Contributed to open-source accessibility tools used by over 10,000 users.",
      advisor: "Dr. Amanda Williams",
    },
  ],
  skills: [
    "Python", "R", "JavaScript", "PyTorch", "TensorFlow",
    "User Studies", "Statistical Analysis", "LaTeX", "Figma",
    "Qualitative Research", "Accessibility Testing", "ARIA",
  ],
  awards: [
    "NSF Graduate Research Fellowship (2024)",
    "Georgia Tech Presidential Fellowship (2024)",
    "UC Berkeley CS Department Citation (2024)",
    "ACM SIGCHI Student Research Competition — 2nd Place (2025)",
  ],
  cvLink: "#",
};

export default function AcademicTemplate(props: AcademicTemplateProps) {
  const data = { ...defaultData, ...props };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header with institution colors feel */}
      <header className="bg-dark-green text-cream">
        <div className="max-w-5xl mx-auto px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-32 h-32 rounded-full border-4 border-cream/20 bg-gradient-to-br from-gold/60 to-brown/40 flex items-center justify-center">
                <span className="text-3xl font-bold text-cream/90 tracking-wide">
                  {data.name?.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1
                className="text-3xl md:text-4xl font-bold text-cream"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {data.name}
              </h1>
              <p className="text-gold font-semibold mt-2 text-lg">{data.title}</p>
              <p className="text-cream/70 mt-1">
                {data.department} • {data.institution}
              </p>
              <p className="text-cream/60 mt-1 text-sm">{data.email}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#publications"
                  className="px-5 py-2 bg-gold text-dark-green font-semibold rounded-full text-sm hover:bg-gold/80 transition-colors"
                >
                  Publications
                </a>
                {data.cvLink && (
                  <a
                    href={data.cvLink}
                    className="px-5 py-2 bg-transparent text-cream font-semibold rounded-full border-2 border-cream/30 text-sm hover:bg-cream/10 transition-colors"
                  >
                    Download CV
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative border */}
        <div className="h-2 bg-gold" />
      </header>

      <main className="max-w-5xl mx-auto px-8 py-12">
        {/* About */}
        <section className="mb-16">
          <h2
            className="text-2xl font-bold text-dark-green mb-4 pb-2 border-b-2 border-dark-green/10"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            About
          </h2>
          <p className="text-brown/80 leading-relaxed text-base">{data.bio}</p>
        </section>

        {/* Research Experience */}
        {data.research && data.research.length > 0 && (
          <section className="mb-16">
            <h2
              className="text-2xl font-bold text-dark-green mb-6 pb-2 border-b-2 border-dark-green/10"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Research Experience
            </h2>
            <div className="space-y-8">
              {data.research.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-gold/40">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gold" />
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-dark-green">{exp.title}</h3>
                      <p className="text-gold font-semibold">{exp.lab} • {exp.institution}</p>
                    </div>
                    <span className="text-sm text-brown/60 shrink-0">{exp.period}</span>
                  </div>
                  <p className="text-brown/70 text-sm leading-relaxed">{exp.description}</p>
                  {exp.advisor && (
                    <p className="text-sm text-brown/50 mt-2 italic">Advisor: {exp.advisor}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Publications */}
        {data.publications && data.publications.length > 0 && (
          <section id="publications" className="mb-16">
            <h2
              className="text-2xl font-bold text-dark-green mb-6 pb-2 border-b-2 border-dark-green/10"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Publications
            </h2>
            <div className="space-y-6">
              {data.publications.map((pub, i) => (
                <div
                  key={i}
                  className="p-5 bg-white rounded-xl border-2 border-dark-green/10 hover:border-gold/30 transition-colors"
                >
                  <h3 className="text-base font-bold text-dark-green leading-snug">
                    {pub.link ? (
                      <a href={pub.link} className="hover:text-gold transition-colors">
                        {pub.title}
                      </a>
                    ) : (
                      pub.title
                    )}
                  </h3>
                  <p className="text-sm text-brown/70 mt-1">{pub.authors}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
                      {pub.year}
                    </span>
                    <span className="text-sm text-brown/60 italic">{pub.venue}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Coursework */}
        {data.courses && data.courses.length > 0 && (
          <section className="mb-16">
            <h2
              className="text-2xl font-bold text-dark-green mb-6 pb-2 border-b-2 border-dark-green/10"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Graduate Coursework
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.courses.map((course, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-dark-green/10"
                >
                  <div>
                    <span className="text-xs font-bold text-gold">{course.code}</span>
                    <p className="text-sm font-semibold text-dark-green">{course.name}</p>
                  </div>
                  {course.grade && (
                    <span className="text-sm font-bold text-dark-green bg-dark-green/5 px-3 py-1 rounded">
                      {course.grade}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {data.awards && data.awards.length > 0 && (
          <section className="mb-16">
            <h2
              className="text-2xl font-bold text-dark-green mb-6 pb-2 border-b-2 border-dark-green/10"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Honors & Awards
            </h2>
            <ul className="space-y-3">
              {data.awards.map((award, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold mt-1">★</span>
                  <span className="text-brown/80">{award}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="mb-16">
            <h2
              className="text-2xl font-bold text-dark-green mb-6 pb-2 border-b-2 border-dark-green/10"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Skills & Methods
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white rounded-full border border-dark-green/10 text-sm font-medium text-dark-green hover:border-gold hover:bg-gold/5 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-dark-green/5 border-t border-dark-green/10">
        <div className="max-w-5xl mx-auto px-8 py-8 text-center">
          <p className="text-sm text-brown/60">
            Built with{" "}
            <Link href="/" className="text-gold font-semibold hover:underline">
              Faber
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
