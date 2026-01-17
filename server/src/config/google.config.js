console.log("🔧 Loading Google AI configuration...");

import dotenv from 'dotenv';
dotenv.config();

console.log("📝 Reading environment variables for Google AI...");

export const config = {
  googleApiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
  model: process.env.ORBITAI_MODEL || 'gemini-1.5-flash',
};

console.log(`🤖 Google AI Model: ${config.model}`);
console.log(`🔑 Google API Key configured: ${config.googleApiKey ? 'Yes' : 'No'}`);
console.log("✅ Google AI configuration loaded");

