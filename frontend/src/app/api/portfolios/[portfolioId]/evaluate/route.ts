import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

interface Params {
  params: Promise<{
    portfolioId: string;
  }>;
}

// POST /api/portfolios/[portfolioId]/evaluate
export async function POST(request: NextRequest, { params }: Params) {
  try {
    // Verify authentication
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { portfolioId } = await params;

    // Fetch portfolio with sections
    const portfolio = await prisma.portfolios.findUnique({
      where: { portfolioId },
      include: {
        sections: true,
        user: true,
      },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    // Ensure user owns this portfolio
    if (portfolio.userId !== authResult.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Extract data from sections for evaluation
    let workExperience = '';
    let skills = '';
    let projects = '';
    let visualElements = '';

    for (const section of portfolio.sections) {
      const content = typeof section.content === 'string' 
        ? JSON.parse(section.content) 
        : section.content;

      switch (section.type) {
        case 'about':
          workExperience = content.bio || '';
          break;
        case 'skills':
          if (content.skills && Array.isArray(content.skills)) {
            skills = content.skills.map((s: any) => s.name).join(', ');
          }
          break;
        case 'projects':
          if (content.projects && Array.isArray(content.projects)) {
            projects = content.projects.map((p: any) => 
              `${p.title}: ${p.description}. Tags: ${p.tags?.join(', ') || 'none'}`
            ).join('\\n');
          }
          break;
      }
    }

    // Check for media/visual elements
    const mediaCount = await prisma.media.count({
      where: { portfolioId },
    });
    visualElements = mediaCount > 0 
      ? `Portfolio includes ${mediaCount} media items` 
      : 'No media items';

    // Call Gemini API for evaluation
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are a professional senior technical recruiter and portfolio evaluator with extensive industry experience. Your role is to provide honest, constructive assessments that reflect current market standards while maintaining a respectful and encouraging tone.

EVALUATION STANDARDS:
- Typical portfolio scores range from 50-65/100 (50-65%)
- Strong portfolios may reach 70-85/100 (70-85%)
- Scores above 85/100 are reserved for truly exceptional work

Scoring Criteria:
1. Skills & Technical Competency (0-36 points)
2. Projects & Work Samples (0-36 points)
3. Work Experience & Background (0-24 points)
4. Visual Presentation & Polish (0-4 points)

Portfolio Data:
Work Experience: ${workExperience || 'Not provided'}
Skills: ${skills || 'Not provided'}
Projects: ${projects || 'Not provided'}
Visual Elements: ${visualElements}

Provide your response in the following JSON format:
{
  "score": <number between 0-100>,
  "breakdown": {
    "skills": <score out of 36>,
    "projects": <score out of 36>,
    "workExperience": <score out of 24>,
    "visualElements": <score out of 4>
  },
  "reasoning": "2-4 sentences maximum. State the overall level, highlight 1-2 key strengths, and note the single most important area for improvement.",
  "strengths": ["strength 1", "strength 2"],
  "suggestions": ["suggestion 1", "suggestion 2"]
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }
    
    const evaluation = JSON.parse(jsonMatch[0]);

    // Save evaluation to database
    const feedbackId = `feedback_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    await prisma.$transaction([
      // Update portfolio score
      prisma.portfolios.update({
        where: { portfolioId },
        data: { aiScore: evaluation.score },
      }),
      // Save detailed feedback
      prisma.aIFeedback.create({
        data: {
          feedbackId,
          portfolioId,
          userId: portfolio.userId,
          overallScore: evaluation.score,
          designScore: evaluation.breakdown.visualElements,
          contentScore: evaluation.breakdown.projects,
          professionalismScore: evaluation.breakdown.workExperience,
          suggestions: evaluation.suggestions || [],
          strengths: evaluation.strengths || [],
          weaknesses: [],
          rawResponse: responseText,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      score: evaluation.score,
      reasoning: evaluation.reasoning,
      breakdown: evaluation.breakdown,
      strengths: evaluation.strengths,
      suggestions: evaluation.suggestions,
    });

  } catch (error) {
    console.error('Evaluation error:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate portfolio', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
