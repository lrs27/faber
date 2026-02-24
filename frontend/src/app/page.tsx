import Navbar from "@/components/Navbar";
import CheckeredBorder from "@/components/CheckeredBorder";
import Marquee from "@/components/Marquee";
import PortfolioCard from "@/components/PortfolioCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="flex items-center justify-center px-8 md:px-16 py-20 md:py-28 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl w-full">
          {/* Left side — branding */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/FaberLogo.png"
              alt="Faber"
              width={450}
              height={175}
              className="select-none"
            />

            <p
              className="mt-4 text-xl md:text-2xl font-bold text-dark-green tracking-tight italic"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Build Bold, Get Hired.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/templates"
                className="px-8 py-3 bg-dark-green text-cream font-semibold rounded-full border-2 border-dark-green hover:bg-brown hover:border-brown transition-colors text-center"
              >
                Browse Templates
              </Link>
              <Link
                href="/login"
                className="px-8 py-3 bg-transparent text-dark-green font-semibold rounded-full border-2 border-dark-green hover:bg-dark-green hover:text-cream transition-colors text-center"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Right side — portfolio card preview */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <PortfolioCard />
          </div>
        </div>
      </section>

      {/* Marquee divider */}
      <Marquee />
      <CheckeredBorder />

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className="px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-5xl font-bold text-dark-green text-center mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            How It Works
          </h2>
          <p className="text-center text-brown/70 mb-16 max-w-lg mx-auto">
            Build a standout portfolio in minutes — no coding required.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl border-2 border-dark-green/10 p-8 text-center hover:border-gold transition-colors">
              <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl font-bold text-gold">1</span>
              </div>
              <h3 className="text-lg font-bold text-dark-green mb-2">
                Pick a Template
              </h3>
              <p className="text-sm text-brown/70 leading-relaxed">
                Browse our curated gallery of professionally designed templates built for CS students.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl border-2 border-dark-green/10 p-8 text-center hover:border-gold transition-colors">
              <div className="w-14 h-14 bg-pink/30 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl font-bold text-pink">2</span>
              </div>
              <h3 className="text-lg font-bold text-dark-green mb-2">
                Drag &amp; Drop
              </h3>
              <p className="text-sm text-brown/70 leading-relaxed">
                Customize your sections, add projects, and upload media with our intuitive editor.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl border-2 border-dark-green/10 p-8 text-center hover:border-gold transition-colors">
              <div className="w-14 h-14 bg-light-blue/30 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl font-bold text-blue">3</span>
              </div>
              <h3 className="text-lg font-bold text-dark-green mb-2">
                Publish &amp; Share
              </h3>
              <p className="text-sm text-brown/70 leading-relaxed">
                Go live instantly. Link a custom domain and share your portfolio with recruiters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checkered + Marquee divider */}
      <CheckeredBorder />
      <Marquee text="For Computer Science Folks" />
      <CheckeredBorder />

      {/* ===== FEATURES SECTION ===== */}
      <section className="px-8 md:px-16 py-20 md:py-28 bg-dark-green text-cream">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-5xl font-bold text-cream text-center mb-16"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Built for builders.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex gap-5">
              <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-gold">AI</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cream mb-1">AI Portfolio Score</h3>
                <p className="text-sm text-cream/60 leading-relaxed">
                  Get feedback on your portfolio with our AI-powered scoring system. Know exactly where to improve.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-12 h-12 bg-pink/20 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-pink">D</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cream mb-1">Custom Domains</h3>
                <p className="text-sm text-cream/60 leading-relaxed">
                  Link your own domain and make your portfolio truly yours. Professional URLs, zero hassle.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-12 h-12 bg-light-blue/20 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-light-blue">T</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cream mb-1">Template Library</h3>
                <p className="text-sm text-cream/60 leading-relaxed">
                  Choose from a growing library of templates designed specifically for CS portfolios.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-12 h-12 bg-orange/20 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-orange">E</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cream mb-1">Export as Static</h3>
                <p className="text-sm text-cream/60 leading-relaxed">
                  Download your portfolio as static files and host it anywhere you want.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEMPLATE PREVIEW SECTION ===== */}
      <section className="px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-5xl font-bold text-dark-green text-center mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Templates
          </h2>
          <p className="text-center text-brown/70 mb-16 max-w-lg mx-auto">
            Start with a design that fits your vibe. Every template is responsive and fully customizable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Template card 1 */}
            <div className="group rounded-2xl border-2 border-dark-green/10 overflow-hidden bg-white hover:border-gold transition-colors">
              <div className="h-48 bg-gradient-to-br from-gold/30 to-orange/20" />
              <div className="p-5">
                <h3 className="font-bold text-dark-green">Minimal</h3>
                <p className="text-xs text-brown/60 mt-1">Clean, typographic, timeless</p>
              </div>
            </div>

            {/* Template card 2 */}
            <div className="group rounded-2xl border-2 border-dark-green/10 overflow-hidden bg-white hover:border-blue transition-colors">
              <div className="h-48 bg-gradient-to-br from-light-blue/30 to-blue/20" />
              <div className="p-5">
                <h3 className="font-bold text-dark-green">Developer</h3>
                <p className="text-xs text-brown/60 mt-1">Terminal-inspired, dark mode ready</p>
              </div>
            </div>

            {/* Template card 3 */}
            <div className="group rounded-2xl border-2 border-dark-green/10 overflow-hidden bg-white hover:border-pink transition-colors">
              <div className="h-48 bg-gradient-to-br from-pink/30 to-orange/20" />
              <div className="p-5">
                <h3 className="font-bold text-dark-green">Creative</h3>
                <p className="text-xs text-brown/60 mt-1">Bold colors, playful layout</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/templates"
              className="px-8 py-3 bg-dark-green text-cream font-semibold rounded-full border-2 border-dark-green hover:bg-brown hover:border-brown transition-colors inline-block"
            >
              View All Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee divider */}
      <Marquee />
      <CheckeredBorder />

      {/* ===== CTA / FOOTER SECTION ===== */}
      <footer className="px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/FaberLogo.png"
            alt="Faber"
            width={200}
            height={80}
            className="select-none mx-auto mb-6 opacity-60"
          />
          <h2
            className="text-3xl md:text-4xl font-bold text-dark-green mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ready to build your portfolio?
          </h2>
          <p className="text-brown/70 mb-8 max-w-md mx-auto">
            Join Computer Science students who are building bold portfolios and landing their dream jobs.
          </p>
          <Link
            href="/login"
            className="px-10 py-4 bg-dark-green text-cream font-semibold rounded-full border-2 border-dark-green hover:bg-brown hover:border-brown transition-colors inline-block text-lg"
          >
            Get Started Free
          </Link>

          <div className="mt-16 pt-8 border-t border-dark-green/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brown/50">
            <p>Faber — maker, craftsman.</p>
            <div className="flex gap-6">
              <Link href="/templates" className="hover:text-dark-green transition-colors">Templates</Link>
              <Link href="/login" className="hover:text-dark-green transition-colors">Login</Link>
              <Link href="/dashboard" className="hover:text-dark-green transition-colors">Dashboard</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
