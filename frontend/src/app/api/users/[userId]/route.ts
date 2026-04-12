import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Params {
  params: Promise<{
    userId: string;
  }>;
}

// GET /api/users/[userId]
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { userId } = await params;

    const user = await prisma.users.findUnique({
      where: { userId },
      select: {
        userId: true,
        email: true,
        displayName: true,
        profileImageUrl: true,
        role: true,
        createdAt: true,
        isActive: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}
