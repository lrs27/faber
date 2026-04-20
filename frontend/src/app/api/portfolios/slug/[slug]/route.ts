import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

// GET /api/portfolios/slug/[slug]
// Fetch a single portfolio by slug with sections
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    console.log('[Portfolio API] Fetching portfolio by slug:', slug);

    const portfolio = await prisma.portfolios.findFirst({
      where: { slug },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
        user: {
          select: {
            displayName: true,
            email: true,
            username: true,
            profileImageUrl: true,
          },
        },
      },
    });

    if (!portfolio) {
      console.log('[Portfolio API] Portfolio not found for slug:', slug);
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    // Parse JSON content in sections
    const portfolioWithParsedSections = {
      ...portfolio,
      sections: portfolio.sections.map(section => ({
        ...section,
        content: typeof section.content === 'string' ? JSON.parse(section.content) : section.content,
        settings: section.settings && typeof section.settings === 'string' ? JSON.parse(section.settings) : section.settings,
      })),
    };

    console.log('[Portfolio API] Found portfolio:', portfolio.portfolioId, 'with', portfolio.sections.length, 'sections');
    return NextResponse.json(portfolioWithParsedSections);
  } catch (error) {
    console.error('[Portfolio API] Get portfolio by slug error:', error);
    console.error('[Portfolio API] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error: JSON.stringify(error, null, 2)
    });
    return NextResponse.json(
      { 
        error: 'Failed to fetch portfolio',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
