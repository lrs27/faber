import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateToken } from '@/lib/auth';

// POST /api/auth/google
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { googleId, email, displayName, profileImageUrl } = body;

    if (!googleId || !email) {
      return NextResponse.json(
        { error: 'Google ID and email are required' },
        { status: 400 }
      );
    }

    // Check if user exists by googleId or email
    let user = await prisma.users.findFirst({
      where: {
        OR: [{ googleId }, { email: email.toLowerCase() }],
      },
    });

    if (user) {
      // Update existing user with Google info if not already set
      if (!user.googleId) {
        user = await prisma.users.update({
          where: { userId: user.userId },
          data: {
            googleId,
            authProvider: user.passwordHash ? user.authProvider : 'google',
            profileImageUrl: profileImageUrl || user.profileImageUrl,
          },
        });
      }
    } else {
      // Create new user
      user = await prisma.users.create({
        data: {
          email: email.toLowerCase(),
          displayName: displayName || email.split('@')[0],
          googleId,
          authProvider: 'google',
          profileImageUrl,
        },
      });
    }

    // Generate token
    const token = generateToken(user);

    return NextResponse.json({
      message: user ? 'Login successful' : 'Account created successfully',
      user: {
        userId: user.userId,
        email: user.email,
        displayName: user.displayName,
      },
      token,
    });
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate with Google' },
      { status: 500 }
    );
  }
}
