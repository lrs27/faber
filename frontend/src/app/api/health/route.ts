import { NextRequest, NextResponse } from 'next/server';

// GET /api/health
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'OK',
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
  });
}
