import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

// GET /api/auth/me
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    
    // If requireAuth returns a NextResponse (error), return it
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const user = await prisma.users.findUnique({
      where: { userId: authResult.userId },
      select: {
        userId: true,
        email: true,
        displayName: true,
        profileImageUrl: true,
        authProvider: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}
