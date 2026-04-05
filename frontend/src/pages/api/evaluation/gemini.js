// Gemini API key from environment variable
const GOOGLE_GENAI_API_KEY = process.env.GOOGLE_GENAI_API_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { workExperience, skills, projects, visualElements } = req.body;

  try {
    // Dynamically import the package to avoid SSR issues
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(GOOGLE_GENAI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Compose prompt for numerical scoring out of 70
    // Research-based scoring weights prioritize demonstrable ability and relevant skills
    const prompt = `You are a professional senior technical recruiter and portfolio evaluator with extensive industry experience. Your role is to provide honest, constructive assessments that reflect current market standards while maintaining a respectful and encouraging tone.

EVALUATION STANDARDS:
- Typical portfolio scores range from 35-45/70 (50-65%)
- Strong portfolios may reach 50-60/70 (70-85%)
- Scores above 60/70 are reserved for truly exceptional work
- Insufficient detail should result in conservative scoring
- All assessments should be compared against current 2026 market standards

Scoring Criteria:

1. Skills & Technical Competency (0-25 points) - HIGHEST PRIORITY
   
   HIGHLY VALUED IN 2026:
   - AI/ML: LLMs, RAG, vector databases, prompt engineering
   - Modern frameworks: React 19+, Next.js 15+, Svelte 5, Vue 3+
   - Cloud-native: Kubernetes, serverless, edge computing
   - Type-safe languages: TypeScript, Rust, Go
   
   LESS COMPETITIVE:
   - Legacy technologies without modern framework context
   - Generic skill listings without demonstrated depth
   - Limited or absent cloud/DevOps capabilities
   
   Scoring guidance: 18-22pts = exceptional, 11-17pts = competitive, 6-10pts = foundational, 0-5pts = needs development

2. Projects & Work Samples (0-25 points) - HIGHEST PRIORITY
   
   STRONG INDICATORS:
   - Detailed descriptions with specific technologies and outcomes
   - Production applications with measurable impact
   - Projects demonstrating 2025-2026 technology adoption
   
   DEVELOPMENT OPPORTUNITIES:
   - Basic applications without clear complexity indicators
   - Generic descriptions lacking technical detail
   - Tutorial-style projects without original contributions
   
   Scoring guidance: 18-22pts = impressive production work, 11-17pts = solid implementations, 6-10pts = foundational projects, 0-5pts = limited demonstration

3. Work Experience & Background (0-17 points)
   
   EVALUATION FACTORS:
   - Career progression and demonstrated growth
   - Relevance to current market demands (2024-2026 weighted heavily)
   - Specific accomplishments and responsibilities
   
   Scoring guidance: 14-17pts = senior level with clear progression, 8-13pts = solid mid-level, 4-7pts = early career, 0-3pts = limited professional experience

4. Visual Presentation & Polish (0-3 points)
   - Professional visual elements that enhance understanding
   - Interactive demonstrations or compelling case studies
   
   Scoring guidance: 3pts = exceptional, 2pts = professional, 1pt = basic, 0pts = none

ASSESSMENT GUIDELINES:
- When details are limited or unclear, score conservatively while noting what additional information would strengthen the portfolio
- Keep reasoning concise (2-4 sentences maximum) - highlight key strengths and top 1-2 areas for improvement
- Compare portfolios to current competitive standards while being fair and constructive

Portfolio Data:
Work Experience: ${workExperience || 'Not provided'}
Skills: ${skills || 'Not provided'}
Projects: ${projects || 'Not provided'}
Visual Elements: ${visualElements || 'Not provided'}

Provide your response in the following JSON format:
{
  "score": <number between 0-70>,
  "breakdown": {
    "skills": <score out of 25>,
    "projects": <score out of 25>,
    "workExperience": <score out of 17>,
    "visualElements": <score out of 3>
  },
  "reasoning": "2-4 sentences maximum. State the overall level (e.g., 'strong mid-level', 'developing junior'), highlight 1-2 key strengths, and note the single most important area for improvement."
}`;
    const result = await model.generateContent(prompt);
    res.status(200).json({ result: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to evaluate portfolio" });
  }
}
