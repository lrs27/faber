"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import CheckeredBorder from "@/components/CheckeredBorder";

interface PortfolioData {
  portfolioId: string;
  title: string;
  slug: string;
  templateId: string;
  userId: string;
  sections: Array<{
    sectionId: string;
    type: string;
    content: any;
    order: number;
  }>;
  user: {
    displayName: string;
    email: string;
    username?: string;
    profileImageUrl?: string;
  };
}

export default function UserPortfolioPage() {
  const params = useParams();
  const username = params?.username as string;
  
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`/api/portfolio/user/${username}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Portfolio not found');
          } else {
            setError('Failed to load portfolio');
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        setPortfolio(data);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError('Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPortfolio();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
            <p className="mt-4 text-brown/60">Loading portfolio...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h1 className="text-4xl font-bold text-dark-green mb-4">Portfolio Not Found</h1>
            <p className="text-brown/60 mb-6">
              {error || `No portfolio found for @${username}`}
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-dark-green text-cream font-semibold rounded-full hover:bg-brown transition-colors"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Render portfolio based on sections
  const getSectionContent = (section: any) => {
    const content = section.content;
    
    switch (section.type) {
      case 'about':
        return (
          <section key={section.sectionId} className="px-8 md:px-16 py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-dark-green mb-4">About</h2>
              <p className="text-lg text-brown/80 leading-relaxed">{content.bio || 'No bio provided'}</p>
            </div>
          </section>
        );
        
      case 'skills':
        return (
          <section key={section.sectionId} className="px-8 md:px-16 py-16 bg-beige/30">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-dark-green mb-6">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {content.skills?.map((skill: any, idx: number) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-white border-2 border-dark-green/10 rounded-full text-sm font-semibold text-dark-green"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        );
        
      case 'projects':
        return (
          <section key={section.sectionId} className="px-8 md:px-16 py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-dark-green mb-8">Projects</h2>
              <div className="grid gap-6">
                {content.projects?.map((project: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-6 bg-white rounded-xl border-2 border-dark-green/10 hover:border-gold transition-all"
                  >
                    <h3 className="text-xl font-bold text-dark-green mb-2">{project.title}</h3>
                    <p className="text-brown/70 mb-4">{project.description}</p>
                    {project.tags && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string, tagIdx: number) => (
                          <span
                            key={tagIdx}
                            className="px-3 py-1 bg-gold/10 text-xs font-semibold text-brown rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
        
      case 'experience':
        return (
          <section key={section.sectionId} className="px-8 md:px-16 py-16 bg-beige/30">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-dark-green mb-8">Experience</h2>
              <div className="space-y-6">
                {content.experiences?.map((exp: any, idx: number) => (
                  <div key={idx} className="border-l-4 border-gold pl-6">
                    <h3 className="text-xl font-bold text-dark-green">{exp.title}</h3>
                    <p className="text-brown/60 mb-2">{exp.company} • {exp.duration}</p>
                    <p className="text-brown/80">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <CheckeredBorder />
      
      {/* Hero Section */}
      <section className="px-8 md:px-16 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {portfolio.user.profileImageUrl && (
            <img
              src={portfolio.user.profileImageUrl}
              alt={portfolio.user.displayName}
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-gold object-cover"
            />
          )}
          <h1 className="text-5xl md:text-6xl font-bold text-dark-green mb-4">
            {portfolio.user.displayName}
          </h1>
          <p className="text-xl text-brown/60">@{portfolio.user.username || username}</p>
        </div>
      </section>

      {/* Dynamic Sections */}
      {portfolio.sections
        .sort((a, b) => a.order - b.order)
        .map((section) => getSectionContent(section))}

      <CheckeredBorder />
    </div>
  );
}
