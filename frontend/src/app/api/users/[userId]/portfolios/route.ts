import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
    });

    return NextResponse.json(userPortfolios);
  } catch (error) {
    console.error('Get portfolios error:', error);
    return NextResponse.json(
      { error: 'Failed to get portfolios' },
      { status: 500 }
    );
  }
}
