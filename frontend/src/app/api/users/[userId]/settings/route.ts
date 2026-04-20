import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

// PATCH /api/users/[userId]/settings
// Update user settings like username and main portfolio
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Verify authentication
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { userId: paramUserId } = await params;
    
    // Ensure authenticated user matches the userId in the URL
    if (authResult.userId !== paramUserId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { username, mainPortfolioId } = body;

    const updates: any = {};

    // Update username if provided
    if (username !== undefined) {
      // Validate username format (alphanumeric, hyphens, underscores only)
      const usernameRegex = /^[a-z0-9_-]+$/;
      if (!usernameRegex.test(username)) {
        return NextResponse.json(
          { error: 'Username can only contain lowercase letters, numbers, hyphens, and underscores' },
          { status: 400 }
        );
      }

      // Check if username is already taken
      const existingUser = await prisma.users.findFirst({
        where: {
          username: username.toLowerCase(),
          NOT: { userId: paramUserId },
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'Username already taken' },
          { status: 409 }
        );
      }

      updates.username = username.toLowerCase();
    }

    // Update user
    const updatedUser = await prisma.users.update({
      where: { userId: paramUserId },
      data: updates,
      select: {
        userId: true,
        email: true,
        displayName: true,
        username: true,
        profileImageUrl: true,
      },
    });

    // Handle main portfolio update
    if (mainPortfolioId) {
      // First, unset any existing main portfolio
      await prisma.portfolios.updateMany({
        where: {
          userId: paramUserId,
          isMainPortfolio: true,
        },
        data: { isMainPortfolio: false },
      });

      // Set new main portfolio
      await prisma.portfolios.update({
        where: {
          portfolioId: mainPortfolioId,
          userId: paramUserId, // Ensure user owns this portfolio
        },
        data: { isMainPortfolio: true },
      });
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: 'Settings updated successfully',
    });

  } catch (error) {
    console.error('Update user settings error:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
