import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

interface Params {
  params: Promise<{
    userId: string;
  }>;
}

// GET /api/users/[userId]/portfolios
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { userId } = await params;

    const userPortfolios = await prisma.portfolios.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
        aiFeedback: {
          orderBy: { createdAt: 'desc' },
          take: 1, // Get most recent feedback
        },
      },
    });

    // Parse JSON content in sections
    const portfoliosWithParsedSections = userPortfolios.map(portfolio => ({
      ...portfolio,
      sections: portfolio.sections.map(section => ({
        ...section,
        content: typeof section.content === 'string' ? JSON.parse(section.content) : section.content,
        settings: section.settings && typeof section.settings === 'string' ? JSON.parse(section.settings) : section.settings,
      })),
    }));

    return NextResponse.json(portfoliosWithParsedSections);
  } catch (error) {
    console.error('Get portfolios error:', error);
    return NextResponse.json(
      { error: 'Failed to get portfolios' },
      { status: 500 }
    );
  }
}

// POST /api/users/[userId]/portfolios
export async function POST(request: NextRequest, { params }: Params) {
  try {
    console.log('[Portfolio API] Starting POST request');
    
    // Verify authentication
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      console.log('[Portfolio API] Auth failed');
      return authResult; // Return error response
    }

    console.log('[Portfolio API] Auth successful:', authResult.userId);

    const { userId: paramUserId } = await params;
    
    // Ensure authenticated user matches the userId in the URL
    if (authResult.userId !== paramUserId) {
      console.log('[Portfolio API] User ID mismatch');
      return NextResponse.json(
        { error: 'Unauthorized: Cannot create portfolio for another user' },
        { status: 403 }
      );
    }

    const body = await request.json();
    console.log('[Portfolio API] Request body:', { title: body.title, slug: body.slug, templateId: body.templateId, sectionCount: body.sections?.length, isMainPortfolio: body.isMainPortfolio });
    
    const { title, slug, templateId, sections, isMainPortfolio } = body;

    // Validate required fields
    if (!title || !slug) {
      console.log('[Portfolio API] Missing title or slug');
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    console.log('[Portfolio API] Checking for existing portfolio with slug:', slug);
    
    // Check if slug is unique for this user
    const existingPortfolio = await prisma.portfolios.findFirst({
      where: {
        userId: paramUserId,
        slug: slug,
      },
    });

    if (existingPortfolio) {
      console.log('[Portfolio API] Portfolio with slug already exists');
      return NextResponse.json(
        { error: 'A portfolio with this slug already exists' },
        { status: 409 }
      );
    }

    // Generate portfolio ID
    const portfolioId = `portfolio_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    console.log('[Portfolio API] Creating portfolio with ID:', portfolioId);

    // Create portfolio with sections in a transaction
    const portfolio = await prisma.$transaction(async (tx) => {
      // If this is the main portfolio, unset any existing main portfolios
      if (isMainPortfolio) {
        await tx.portfolios.updateMany({
          where: {
            userId: paramUserId,
          },
          data: {
            isMainPortfolio: false,
          },
        });
      }

      // Create the portfolio
      const newPortfolio = await tx.portfolios.create({
        data: {
          portfolioId,
          userId: paramUserId,
          title,
          slug,
          templateId: templateId || null,
          isMainPortfolio: isMainPortfolio || false,
          isPublished: false,
          publishedUrl: null,
          viewCount: 0,
        },
      });

      console.log('[Portfolio API] Portfolio created, now creating sections');

      // Create sections if provided
      if (sections && Array.isArray(sections)) {
        await Promise.all(
          sections.map((section: any, index: number) =>
            tx.sections.create({
              data: {
                sectionId: `section_${portfolioId}_${section.id}`,
                portfolioId,
                type: section.type,
                title: section.content?.heading || section.content?.name || section.type,
                content: JSON.stringify(section.content),
                order: index,
                isVisible: section.visible ?? true,
                settings: section.style ? JSON.stringify(section.style) : null,
              },
            })
          )
        );
      }

      console.log('[Portfolio API] Sections created successfully');
      
      return newPortfolio;
    });

    console.log('[Portfolio API] Portfolio created successfully');

    return NextResponse.json({
      success: true,
      portfolio,
      message: 'Portfolio created successfully',
    }, { status: 201 });

  } catch (error) {
    console.error('[Portfolio API] Create portfolio error:', error);
    console.error('[Portfolio API] Error details:', error instanceof Error ? error.message : 'Unknown error');
    console.error('[Portfolio API] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { error: 'Failed to create portfolio', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
