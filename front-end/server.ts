import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initializer for Gemini Client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Smart Food Match & Ranking API Endpoint
app.post('/api/gemini/smart-match', async (req, res) => {
  try {
    const ai = getGeminiClient();
    const { ngoProfile, availableListings } = req.body;

    if (!ai) {
      return res.json({
        matchExplanation: 'Vegetable curry from Grand Plaza Hotel has high nutritional value, matches your 20-plate demand, and expires in 45 minutes.',
        matchPercentage: 96,
        recommendation: 'Priority rescue recommended due to imminent expiry time.',
      });
    }

    const prompt = `You are FoodRescue AI, a smart logistics engine matching surplus food donations with local shelters & NGOs.
NGO Profile: ${JSON.stringify(ngoProfile || { name: 'Hope Shelter', serveCount: 50, preferences: ['Vegetarian', 'Warm Meals'] })}
Available Food Items: ${JSON.stringify(availableListings || [])}

Analyze the top best match item for this NGO. Return JSON in this format:
{
  "matchedItemId": "<id or name>",
  "matchPercentage": <number 80-99>,
  "matchExplanation": "<1-2 concise sentences explaining why this food item is ideal>",
  "recommendation": "<1 action suggestion for volunteers or NGO staff>"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Smart match error:', err);
    res.status(500).json({ error: 'Failed to generate AI match', details: err.message });
  }
});

// AI Food Assistant Endpoint (Auto-categorize, storage tips, expiry prediction)
app.post('/api/gemini/analyze-food', async (req, res) => {
  try {
    const ai = getGeminiClient();
    const { foodName, foodType } = req.body;

    if (!ai) {
      return res.json({
        suggestedCategory: foodType || 'Prepared Meals',
        estimatedShelfLifeHours: 4,
        storageTips: 'Keep insulated or refrigerated below 4°C until volunteer pickup.',
        suggestedPortions: 'Serves approx 15-20 adult meals.',
      });
    }

    const prompt = `Given surplus food item: "${foodName}" (Category hint: "${foodType || 'Unknown'}").
Provide helpful donation guidelines in JSON format:
{
  "suggestedCategory": "<Baked Goods | Produce | Prepared Meals | Dairy | Pantry>",
  "estimatedShelfLifeHours": <number of hours before quality degrades>,
  "storageTips": "<1 line tip on food safety and container transport>",
  "suggestedPortions": "<estimate serving size/meals provided>"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Analyze food error:', err);
    res.status(500).json({ error: 'Failed to analyze food', details: err.message });
  }
});

// Vite dev server vs production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FoodRescue server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
