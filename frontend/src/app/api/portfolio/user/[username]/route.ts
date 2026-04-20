import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Params {
  params: Promise<{
    username: string;
  }>;
}

// GET /api/portfolio/user/[username]
// Fetch the main portfolio for a user by their username
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { username } = await params;

    // Find user by username
    const user = await prisma.users.findFirst({
      where: {
        username: username.toLowerCase(),
      },
      select: {
        userId: true,
        displayName: true,
        email: true,
        username: true,
        profileImageUrl: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Find main portfolio (or first created if no main portfolio set)
    let portfolio = await prisma.portfolios.findFirst({
      where: {
        userId: user.userId,
        isMainPortfolio: true,
        isPublished: true, // Only show published portfolios
      },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    });

    // If no main portfolio, get the first published one
    if (!portfolio) {
      portfolio = await prisma.portfolios.findFirst({
        where: {
          userId: user.userId,
          isPublished: true,
        },
        orderBy: { createdAt: 'asc' },
        include: {
          sections: {
            orderBy: { order: 'asc' },
          },
        },
      });
    }

    if (!portfolio) {
      return NextResponse.json(
        { error: 'No published portfolio found for this user' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.portfolios.update({
      where: { portfolioId: portfolio.portfolioId },
      data: { viewCount: { increment: 1 } },
    });

    // Return portfolio with user info
    return NextResponse.json({
      ...portfolio,
      user: {
        displayName: user.displayName,
        email: user.email,
        username: user.username,
        profileImageUrl: user.profileImageUrl,
      },
    });

  } catch (error) {
    console.error('Get portfolio by username error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}
