import Navbar from "@/components/Navbar";
import CheckeredBorder from "@/components/CheckeredBorder";
import Marquee from "@/components/Marquee";
import Link from "next/link";

const samplePortfolios = [
  {
    name: "My Main Portfolio",
    template: "Minimal",
    lastEdited: "2 hours ago",
    score: 92,
    gradient: "from-gold/30 to-orange/20",
  },
  {
    name: "Internship Portfolio",
    template: "Developer",
    lastEdited: "3 days ago",
    score: 78,
    gradient: "from-light-blue/30 to-blue/20",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      {/* ===== HEADER ===== */}
      <section className="px-8 md:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold text-dark-green"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Dashboard
            </h1>
            <p className="text-brown/60 mt-1">Welcome back, Myles. Here&apos;s your workspace.</p>
          </div>
          <Link
            href="/templates"
            className="px-6 py-2.5 bg-dark-green text-cream font-semibold rounded-full border-2 border-dark-green hover:bg-brown hover:border-brown transition-colors text-sm"
          >
            + New Portfolio
          </Link>
        </div>
      </section>

      <CheckeredBorder />

      {/* ===== STATS ROW ===== */}
      <section className="px-8 md:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border-2 border-dark-green/10 p-6 text-center">
            <p className="text-3xl font-bold text-gold">2</p>
            <p className="text-sm text-brown/60 mt-1">Portfolios</p>
          </div>
          <div className="bg-white rounded-2xl border-2 border-dark-green/10 p-6 text-center">
            <p className="text-3xl font-bold text-blue">85</p>
            <p className="text-sm text-brown/60 mt-1">Avg AI Score</p>
          </div>
          <div className="bg-white rounded-2xl border-2 border-dark-green/10 p-6 text-center">
            <p className="text-3xl font-bold text-dark-green">247</p>
            <p className="text-sm text-brown/60 mt-1">Total Views</p>
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIOS ===== */}
      <section className="px-8 md:px-16 py-4 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-2xl font-bold text-dark-green mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your Portfolios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {samplePortfolios.map((portfolio) => (
              <div
                key={portfolio.name}
                className="group bg-white rounded-2xl border-2 border-dark-green/10 overflow-hidden hover:border-gold transition-all hover:shadow-[6px_6px_0_rgba(0,0,0,0.08)] cursor-pointer"
              >
                <div className={`h-36 bg-gradient-to-br ${portfolio.gradient} relative`}>
                  <div className="absolute top-4 right-4 bg-gold rounded-full px-3 py-1.5 border-2 border-gold/80 shadow-sm">
                    <span className="text-xs font-bold text-dark-green">
                      AI Score: {portfolio.score}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-dark-green">{portfolio.name}</h3>
                  <p className="text-sm text-brown/50 mt-1">
                    {portfolio.template} template &middot; Edited {portfolio.lastEdited}
                  </p>
                  <div className="mt-4 flex gap-3">
                    <button className="px-4 py-2 bg-dark-green text-cream text-xs font-semibold rounded-full hover:bg-brown transition-colors">
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-transparent text-dark-green text-xs font-semibold rounded-full border-2 border-dark-green/20 hover:border-gold transition-colors">
                      Preview
                    </button>
                    <button className="px-4 py-2 bg-transparent text-dark-green text-xs font-semibold rounded-full border-2 border-dark-green/20 hover:border-gold transition-colors">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* New portfolio card */}
            <Link
              href="/templates"
              className="flex items-center justify-center rounded-2xl border-2 border-dashed border-dark-green/20 p-12 hover:border-gold transition-colors group min-h-[280px]"
            >
              <div className="text-center">
                <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/30 transition-colors">
                  <span className="text-2xl text-gold font-bold">+</span>
                </div>
                <p className="text-sm font-semibold text-dark-green">Create New Portfolio</p>
                <p className="text-xs text-brown/40 mt-1">Pick a template to get started</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <CheckeredBorder />
      <Marquee text="Keep Building" />
      <CheckeredBorder />

      {/* ===== RECENT ACTIVITY ===== */}
      <section className="px-8 md:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-2xl font-bold text-dark-green mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Recent Activity
          </h2>

          <div className="space-y-4">
            {[
              { action: "Updated project section", portfolio: "My Main Portfolio", time: "2 hours ago" },
              { action: "AI Score improved", portfolio: "My Main Portfolio", time: "5 hours ago" },
              { action: "Published portfolio", portfolio: "Internship Portfolio", time: "3 days ago" },
              { action: "Changed template to Developer", portfolio: "Internship Portfolio", time: "3 days ago" },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white rounded-xl border border-dark-green/10 p-4"
              >
                <div className="w-2 h-2 bg-gold rounded-full shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-dark-green">{activity.action}</p>
                  <p className="text-xs text-brown/50">{activity.portfolio}</p>
                </div>
                <span className="text-xs text-brown/40">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="px-8 md:px-16 py-8 border-t border-dark-green/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brown/50">
          <p>Faber — maker, craftsman.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-dark-green transition-colors">Home</Link>
            <Link href="/templates" className="hover:text-dark-green transition-colors">Templates</Link>
            <Link href="/portfolio" className="hover:text-dark-green transition-colors">Portfolio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
