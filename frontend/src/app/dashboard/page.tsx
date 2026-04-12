"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import CheckeredBorder from "@/components/CheckeredBorder";
import Marquee from "@/components/Marquee";
import Link from "next/link";

interface User {
  userId: string;
  email: string;
  displayName: string;
}

interface Stats {
  portfolioCount: number;
  avgAiScore: number;
  totalViews: number;
}

interface Portfolio {
  portfolioId: string;
  name: string;
  slug: string;
  template: string;
  lastEdited: string;
  score: number;
  viewCount: number;
  isPublished: boolean;
}

interface Activity {
  action: string;
  portfolio: string;
  time: string;
}

// Color gradients for portfolio cards
const gradients = [
  "from-gold/30 to-orange/20",
  "from-light-blue/30 to-blue/20",
  "from-green/20 to-teal/20",
  "from-purple/20 to-pink/20",
];

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString();
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats>({ portfolioCount: 0, avgAiScore: 0, totalViews: 0 });
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      router.push("/login");
      return;
    }

    // Fetch dashboard stats
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/auth/dashboard-stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
          setPortfolios(data.portfolios);
          setRecentActivity(data.recentActivity || []);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="text-brown/60">Loading...</p>
      </div>
    );
  }

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
            <p className="text-brown/60 mt-1">Welcome back, {user?.displayName || "User"}. Here&apos;s your workspace.</p>
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
            <p className="text-3xl font-bold text-gold">{stats.portfolioCount}</p>
            <p className="text-sm text-brown/60 mt-1">Portfolios</p>
          </div>
          <div className="bg-white rounded-2xl border-2 border-dark-green/10 p-6 text-center">
            <p className="text-3xl font-bold text-blue">{stats.avgAiScore}</p>
            <p className="text-sm text-brown/60 mt-1">Avg AI Score</p>
          </div>
          <div className="bg-white rounded-2xl border-2 border-dark-green/10 p-6 text-center">
            <p className="text-3xl font-bold text-dark-green">{stats.totalViews}</p>
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

          {portfolios.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-dark-green/20 p-12 text-center">
              <p className="text-brown/60 mb-4">You haven&apos;t created any portfolios yet.</p>
              <Link
                href="/templates"
                className="inline-block px-6 py-2.5 bg-dark-green text-cream font-semibold rounded-full border-2 border-dark-green hover:bg-brown hover:border-brown transition-colors text-sm"
              >
                Create Your First Portfolio
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolios.map((portfolio, index) => (
                <div
                  key={portfolio.portfolioId}
                  className="group bg-white rounded-2xl border-2 border-dark-green/10 overflow-hidden hover:border-gold transition-all hover:shadow-[6px_6px_0_rgba(0,0,0,0.08)] cursor-pointer"
                >
                  <div className={`h-36 bg-gradient-to-br ${gradients[index % gradients.length]} relative`}>
                    <div className="absolute top-4 right-4 bg-gold rounded-full px-3 py-1.5 border-2 border-gold/80 shadow-sm">
                      <span className="text-xs font-bold text-dark-green">
                        AI Score: {portfolio.score}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-dark-green">{portfolio.name}</h3>
                    <p className="text-sm text-brown/50 mt-1">
                      {portfolio.template} template &middot; Edited {formatTimeAgo(portfolio.lastEdited)}
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
          )}
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

          {recentActivity.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-dark-green/20 p-8 text-center">
              <p className="text-brown/60">No recent activity yet. Start by creating a portfolio!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white rounded-xl border border-dark-green/10 p-4"
                >
                  <div className="w-2 h-2 bg-gold rounded-full shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-dark-green">{activity.action}</p>
                    <p className="text-xs text-brown/50">{activity.portfolio}</p>
                  </div>
                  <span className="text-xs text-brown/40">{formatTimeAgo(activity.time)}</span>
                </div>
              ))}
            </div>
          )}
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
