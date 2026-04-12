import { NextRequest, NextResponse } from 'next/server';

// POST /api/evaluation/score
export async function POST(request: NextRequest) {
  try {
    // TODO: Integrate with Google Gemini API to evaluate portfolio
    // const portfolioData = await request.json();
    // const score = await evaluateWithGemini(portfolioData);
    // return NextResponse.json({ score });
    
    return NextResponse.json(
      { message: 'Portfolio evaluation not implemented yet.' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Evaluation error:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate portfolio' },
      { status: 500 }
    );
  }
}
