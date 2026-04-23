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
  feedback?: {
    reasoning?: string;
    strengths?: string[];
    suggestions?: string[];
    rawResponse?: string;
  };
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
  const [evaluatingId, setEvaluatingId] = useState<string | null>(null);
  const [hoveredPortfolio, setHoveredPortfolio] = useState<string | null>(null);
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    let currentUser: User;
    try {
      currentUser = JSON.parse(storedUser);
      setUser(currentUser);
    } catch {
      router.push("/login");
      return;
    }

    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // Fetch portfolios from the correct endpoint
        const response = await fetch(`/api/users/${currentUser.userId}/portfolios`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const portfoliosData = await response.json();
          const mappedPortfolios = portfoliosData.map((p: any) => {
            const latestFeedback = p.aiFeedback?.[0];
            let feedbackData = null;
            
            if (latestFeedback) {
              // Try to parse the raw response to get full feedback
              try {
                const jsonMatch = latestFeedback.rawResponse?.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                  const parsedFeedback = JSON.parse(jsonMatch[0]);
                  feedbackData = {
                    reasoning: parsedFeedback.reasoning,
                    strengths: parsedFeedback.strengths || latestFeedback.strengths,
                    suggestions: parsedFeedback.suggestions || latestFeedback.suggestions,
                    rawResponse: latestFeedback.rawResponse,
                  };
                }
              } catch (e) {
                console.error('Failed to parse feedback:', e);
              }
            }

            return {
              portfolioId: p.portfolioId,
              name: p.title,
              slug: p.slug,
              template: p.templateId || 'unknown',
              lastEdited: p.updatedAt,
              score: p.aiScore || 0,
              viewCount: p.viewCount || 0,
              isPublished: p.isPublished || false,
              feedback: feedbackData,
            };
          });

          setPortfolios(mappedPortfolios);
          
          // Calculate stats
          const evaluatedPortfolios = mappedPortfolios.filter((p: any) => p.score > 0);
          setStats({
            portfolioCount: mappedPortfolios.length,
            avgAiScore: evaluatedPortfolios.length > 0 
              ? Math.round(evaluatedPortfolios.reduce((sum: number, p: any) => sum + p.score, 0) / evaluatedPortfolios.length)
              : 0,
            totalViews: mappedPortfolios.reduce((sum: number, p: any) => sum + p.viewCount, 0),
          });
        } else {
          console.error('Failed to fetch portfolios:', response.status);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  const handleEvaluate = async (portfolioId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setEvaluatingId(portfolioId);
    try {
      const response = await fetch(`/api/portfolios/${portfolioId}/evaluate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Refresh portfolio data
        const currentUser = user;
        if (currentUser) {
          const portfoliosResponse = await fetch(`/api/users/${currentUser.userId}/portfolios`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (portfoliosResponse.ok) {
            const portfoliosData = await portfoliosResponse.json();
            const mappedPortfolios = portfoliosData.map((p: any) => {
              const latestFeedback = p.aiFeedback?.[0];
              let feedbackData = null;
              
              if (latestFeedback) {
                try {
                  const jsonMatch = latestFeedback.rawResponse?.match(/\{[\s\S]*\}/);
                  if (jsonMatch) {
                    const parsedFeedback = JSON.parse(jsonMatch[0]);
                    feedbackData = {
                      reasoning: parsedFeedback.reasoning,
                      strengths: parsedFeedback.strengths || latestFeedback.strengths,
                      suggestions: parsedFeedback.suggestions || latestFeedback.suggestions,
                      rawResponse: latestFeedback.rawResponse,
                    };
                  }
                } catch (e) {
                  console.error('Failed to parse feedback:', e);
                }
              }

              return {
                portfolioId: p.portfolioId,
                name: p.title,
                slug: p.slug,
                template: p.templateId || 'unknown',
                lastEdited: p.updatedAt,
                score: p.aiScore || 0,
                viewCount: p.viewCount || 0,
                isPublished: p.isPublished || false,
                feedback: feedbackData,
              };
            });

            setPortfolios(mappedPortfolios);
            
            // Update stats
            const evaluatedPortfolios = mappedPortfolios.filter((p: any) => p.score > 0);
            setStats({
              portfolioCount: mappedPortfolios.length,
              avgAiScore: evaluatedPortfolios.length > 0 
                ? Math.round(evaluatedPortfolios.reduce((sum: number, p: any) => sum + p.score, 0) / evaluatedPortfolios.length)
                : 0,
              totalViews: mappedPortfolios.reduce((sum: number, p: any) => sum + p.viewCount, 0),
            });
          }
        }
        alert('Portfolio evaluated successfully!');
      } else {
        const data = await response.json();
        alert(`Evaluation failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Evaluation error:', error);
      alert('Failed to evaluate portfolio');
    } finally {
      setEvaluatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="text-brown/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Copied-to-clipboard toast */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-100 px-5 py-3 bg-dark-green text-cream text-sm font-semibold rounded-full shadow-lg transition-all duration-300 pointer-events-none ${
          showCopiedToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
        }`}
      >
        Copied to Clipboard!
      </div>

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
            <p className="text-brown/60 mt-1">Welcome back, {user?.displayName?.split(' ')[0] || "User"}.</p>
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
                  className="group bg-white rounded-2xl border-2 border-dark-green/10 overflow-hidden hover:border-gold transition-all hover:shadow-[6px_6px_0_rgba(0,0,0,0.08)] relative"
                >
                  <div className={`h-36 bg-gradient-to-br ${gradients[index % gradients.length]} relative`}>
                    {/* AI Score Badge with Hover Modal */}
                    <div 
                      className="absolute top-4 right-4 cursor-help"
                      onMouseEnter={() => setHoveredPortfolio(portfolio.portfolioId)}
                      onMouseLeave={() => setHoveredPortfolio(null)}
                    >
                      <div className="bg-gold rounded-full px-3 py-1.5 border-2 border-gold/80 shadow-sm">
                        <span className="text-xs font-bold text-dark-green">
                          {portfolio.score > 0 ? portfolio.score : 'Not scored'}
                        </span>
                      </div>
                      
                      {/* Hover Modal */}
                      {hoveredPortfolio === portfolio.portfolioId && portfolio.feedback && (
                        <div className="absolute top-full right-0 mt-2 w-80 max-h-96 bg-white rounded-xl border-2 border-dark-green/20 shadow-[8px_8px_0_rgba(0,0,0,0.1)] z-50 animate-fadeIn overflow-hidden">
                          <div className="p-4 max-h-96 overflow-y-auto">
                            <h4 className="text-sm font-bold text-dark-green mb-2">AI Evaluation</h4>
                            <div className="text-xs text-brown/80 space-y-2">
                              <div>
                                <strong className="text-dark-green">Reasoning:</strong>
                                <p className="mt-1">{portfolio.feedback.reasoning}</p>
                              </div>
                              {portfolio.feedback.strengths && portfolio.feedback.strengths.length > 0 && (
                                <div>
                                  <strong className="text-green">Strengths:</strong>
                                  <ul className="mt-1 list-disc list-inside">
                                    {portfolio.feedback.strengths.map((s, i) => (
                                      <li key={i}>{s}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {portfolio.feedback.suggestions && portfolio.feedback.suggestions.length > 0 && (
                                <div>
                                  <strong className="text-orange">Suggestions:</strong>
                                  <ul className="mt-1 list-disc list-inside">
                                    {portfolio.feedback.suggestions.map((s, i) => (
                                      <li key={i}>{s}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {portfolio.isPublished && (
                      <div className="absolute top-4 left-4 bg-green/90 rounded-full px-3 py-1.5 border-2 border-green shadow-sm">
                        <span className="text-xs font-bold text-white">Published</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-dark-green">{portfolio.name}</h3>
                    <p className="text-sm text-brown/50 mt-1">
                      {portfolio.template} template &middot; Edited {formatTimeAgo(portfolio.lastEdited)}
                    </p>
                    <p className="text-xs text-brown/40 mt-1">
                      {portfolio.viewCount} {portfolio.viewCount === 1 ? 'view' : 'views'}
                    </p>
                    <div className="mt-4 flex gap-2 flex-wrap">
                      <Link
                        href={`/editor/${portfolio.template}?portfolioId=${portfolio.portfolioId}`}
                        className="px-4 py-2 bg-dark-green text-cream text-xs font-semibold rounded-full hover:bg-brown transition-colors"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => {
                          console.log('[Dashboard] Opening preview for portfolio:', portfolio.portfolioId, 'slug:', portfolio.slug);
                          window.open(`/portfolio/${portfolio.slug}`, '_blank');
                        }}
                        className="px-4 py-2 bg-transparent text-dark-green text-xs font-semibold rounded-full border-2 border-dark-green/20 hover:border-gold transition-colors"
                      >
                        Preview
                      </button>
                      <button 
                        onClick={() => handleEvaluate(portfolio.portfolioId)}
                        disabled={evaluatingId === portfolio.portfolioId}
                        className="px-4 py-2 bg-blue text-white text-xs font-semibold rounded-full hover:bg-blue/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {evaluatingId === portfolio.portfolioId ? 'Evaluating...' : portfolio.score > 0 ? 'Re-evaluate' : 'Evaluate with AI'}
                      </button>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/portfolio/${portfolio.slug}`);
                          setShowCopiedToast(true);
                          setTimeout(() => setShowCopiedToast(false), 2500);
                        }}
                        className="px-4 py-2 bg-transparent text-dark-green text-xs font-semibold rounded-full border-2 border-dark-green/20 hover:border-gold transition-colors"
                      >
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
