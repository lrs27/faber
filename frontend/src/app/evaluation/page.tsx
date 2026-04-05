"use client";

import { useState } from "react";

export default function EvaluationDebugForm() {
  const [workExperience, setWorkExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [visualElements, setVisualElements] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/evaluation/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workExperience, skills, projects, visualElements }),
      });
      const data = await res.json();
      console.log("API Response:", data);
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "0 1rem" }}>
      <h2>Gemini Portfolio Evaluation Debug Form</h2>
      <p style={{ color: "#666", marginBottom: "1rem" }}>Score: 0-70 based on skills, projects, work experience, and visual elements</p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <label>
          Work Experience (job titles, years, descriptions):
          <textarea 
            value={workExperience} 
            onChange={e => setWorkExperience(e.target.value)} 
            rows={4}
            placeholder="e.g., Senior Software Engineer at Google (3 years), Frontend Developer at Meta (2 years)"
          />
        </label>
        <label>
          Skills (comma-separated or list):
          <textarea 
            value={skills} 
            onChange={e => setSkills(e.target.value)} 
            rows={3}
            placeholder="e.g., React, TypeScript, Node.js, Python, Machine Learning, AWS"
          />
        </label>
        <label>
          Projects (descriptions, technologies used):
          <textarea 
            value={projects} 
            onChange={e => setProjects(e.target.value)} 
            rows={4}
            placeholder="e.g., Built an AI-powered chat app using GPT-4 and React. Created a real-time analytics dashboard with Next.js."
          />
        </label>
        <label>
          Visual Elements (describe media: images, videos, charts, etc.):
          <textarea 
            value={visualElements} 
            onChange={e => setVisualElements(e.target.value)} 
            rows={3}
            placeholder="e.g., 5 project screenshots, 2 demo videos, 3 interactive charts, hero image"
          />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Evaluating..." : "Submit"}</button>
      </form>
      {result && (
        <pre style={{ marginTop: 24, background: "#f5f5f5", padding: 16, borderRadius: 8 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
