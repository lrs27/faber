import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

interface Params {
  params: Promise<{
    portfolioId: string;
  }>;
}

// GET /api/portfolios/[portfolioId]
// Fetch a single portfolio by ID with sections
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { portfolioId } = await params;

    const portfolio = await prisma.portfolios.findUnique({
      where: { portfolioId },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
        user: {
          select: {
            displayName: true,
            email: true,
            profileImageUrl: true,
          },
        },
      },
    });

    if (!portfolio) {
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

    return NextResponse.json(portfolioWithParsedSections);
  } catch (error) {
    console.error('Get portfolio error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}

// PUT /api/portfolios/[portfolioId]
// Update an existing portfolio
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    console.log('[Portfolio Update API] Starting PUT request');
    
    // Verify authentication
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      console.log('[Portfolio Update API] Auth failed');
      return authResult;
    }

    const { portfolioId } = await params;
    const body = await request.json();
    console.log('[Portfolio Update API] Request body:', { 
      portfolioId, 
      title: body.title, 
      slug: body.slug, 
      isMainPortfolio: body.isMainPortfolio,
      sectionCount: body.sections?.length 
    });
    
    const { title, slug, sections, isMainPortfolio } = body;

    // Check if portfolio exists and user owns it
    const existingPortfolio = await prisma.portfolios.findUnique({
      where: { portfolioId },
    });

    if (!existingPortfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    if (existingPortfolio.userId !== authResult.userId) {
      return NextResponse.json(
        { error: 'Unauthorized: You do not own this portfolio' },
        { status: 403 }
      );
    }

    // If slug changed, check it's unique for this user
    if (slug && slug !== existingPortfolio.slug) {
      const duplicateSlug = await prisma.portfolios.findFirst({
        where: {
          userId: authResult.userId,
          slug: slug,
          NOT: { portfolioId },
        },
      });

      if (duplicateSlug) {
        return NextResponse.json(
          { error: 'A portfolio with this slug already exists' },
          { status: 409 }
        );
      }
    }

    // Update portfolio in a transaction
    const updatedPortfolio = await prisma.$transaction(async (tx) => {
      // If this is being set as main portfolio, unset others
      if (isMainPortfolio) {
        await tx.portfolios.updateMany({
          where: {
            userId: authResult.userId,
            isMainPortfolio: true,
            NOT: { portfolioId },
          },
          data: { isMainPortfolio: false },
        });
      }

      // Update the portfolio
      const portfolio = await tx.portfolios.update({
        where: { portfolioId },
        data: {
          title: title || existingPortfolio.title,
          slug: slug || existingPortfolio.slug,
          isMainPortfolio: isMainPortfolio !== undefined ? isMainPortfolio : existingPortfolio.isMainPortfolio,
          isPublished: body.isPublished !== undefined ? body.isPublished : existingPortfolio.isPublished,
          updatedAt: new Date(),
        },
      });

      // Update sections if provided
      if (sections && Array.isArray(sections)) {
        // Delete existing sections
        await tx.sections.deleteMany({
          where: { portfolioId },
        });

        // Create new sections
        if (sections.length > 0) {
          await tx.sections.createMany({
            data: sections.map((section: any, index: number) => ({
              sectionId: `section_${Date.now()}_${Math.random().toString(36).substring(7)}_${index}`,
              portfolioId,
              type: section.type,
              title: section.title || null,
              content: JSON.stringify(section.content),
              order: section.order ?? index,
              isVisible: section.visible ?? true,
              settings: section.style ? JSON.stringify(section.style) : undefined,
            })),
          });
        }
      }

      return portfolio;
    });

    console.log('[Portfolio Update API] Portfolio updated successfully:', updatedPortfolio.portfolioId);
    return NextResponse.json(updatedPortfolio);
  } catch (error) {
    console.error('[Portfolio Update API] Update error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update portfolio',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
