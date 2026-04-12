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

    // Compose prompt for numerical scoring out of 100
    // Research-based scoring weights prioritize demonstrable ability and relevant skills
    const prompt = `You are a professional senior technical recruiter and portfolio evaluator with extensive industry experience. Your role is to provide honest, constructive assessments that reflect current market standards while maintaining a respectful and encouraging tone.

EVALUATION STANDARDS:
- Typical portfolio scores range from 50-65/100 (50-65%)
- Strong portfolios may reach 70-85/100 (70-85%)
- Scores above 85/100 are reserved for truly exceptional work
- Insufficient detail should result in conservative scoring
- All assessments should be compared against current 2026 market standards

Scoring Criteria:

1. Skills & Technical Competency (0-36 points) - HIGHEST PRIORITY
   
   HIGHLY VALUED IN 2026:
   - AI/ML: LLMs, RAG, vector databases, prompt engineering
   - Modern frameworks: React 19+, Next.js 15+, Svelte 5, Vue 3+
   - Cloud-native: Kubernetes, serverless, edge computing
   - Type-safe languages: TypeScript, Rust, Go
   
   LESS COMPETITIVE:
   - Legacy technologies without modern framework context
   - Generic skill listings without demonstrated depth
   - Limited or absent cloud/DevOps capabilities
   
   Scoring guidance: 26-32pts = exceptional, 16-25pts = competitive, 9-15pts = foundational, 0-8pts = needs development

2. Projects & Work Samples (0-36 points) - HIGHEST PRIORITY
   
   STRONG INDICATORS:
   - Detailed descriptions with specific technologies and outcomes
   - Production applications with measurable impact
   - Projects demonstrating 2025-2026 technology adoption
   
   DEVELOPMENT OPPORTUNITIES:
   - Basic applications without clear complexity indicators
   - Generic descriptions lacking technical detail
   - Tutorial-style projects without original contributions
   
   Scoring guidance: 26-32pts = impressive production work, 16-25pts = solid implementations, 9-15pts = foundational projects, 0-8pts = limited demonstration

3. Work Experience & Background (0-24 points)
   
   EVALUATION FACTORS:
   - Career progression and demonstrated growth
   - Relevance to current market demands (2024-2026 weighted heavily)
   - Specific accomplishments and responsibilities
   
   Scoring guidance: 20-24pts = senior level with clear progression, 12-19pts = solid mid-level, 6-11pts = early career, 0-5pts = limited professional experience

4. Visual Presentation & Polish (0-4 points)
   - Professional visual elements that enhance understanding
   - Interactive demonstrations or compelling case studies
   
   Scoring guidance: 4pts = exceptional, 3pts = professional, 2pts = good, 1pt = basic, 0pts = none

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
  "score": <number between 0-100>,
  "breakdown": {
    "skills": <score out of 36>,
    "projects": <score out of 36>,
    "workExperience": <score out of 24>,
    "visualElements": <score out of 4>
  },
  "reasoning": "2-4 sentences maximum. State the overall level (e.g., 'strong mid-level', 'developing junior'), highlight 1-2 key strengths, and note the single most important area for improvement."
}`;
    const result = await model.generateContent(prompt);
    res.status(200).json({ result: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to evaluate portfolio" });
  }
}
