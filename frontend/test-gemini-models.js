// Quick test script to list available Gemini models via REST API
const API_KEY = "AIzaSyDQo251BmNyD-MIK5_CxgqKgoASX_FCmag";

async function listModels() {
  try {
    console.log("Fetching available models...\n");
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error:", data);
      return;
    }
    
    console.log("Available models:\n");
    data.models.forEach(model => {
      console.log(`Model: ${model.name}`);
      console.log(`  Display Name: ${model.displayName}`);
      console.log(`  Supported Methods: ${model.supportedGenerationMethods?.join(", ")}`);
      console.log("");
    });
  } catch (error) {
    console.error("Error listing models:", error.message);
  }
}

listModels();
