import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);
console.log(__dirname);

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

// Ensure apps directory exists
const appsDir = path.join(__dirname, 'apps');
if (!fs.existsSync(appsDir)) {
  fs.mkdirSync(appsDir);
}

app.post('/create', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const formattedPrompt = `Generate the HTML content for a ${prompt}, ensuring it is mobile-friendly. 
  Please provide only the raw HTML code, starting with <!DOCTYPE html> and ending with </html>. 
  Include a responsive viewport setting and consider basic mobile layout principles. 
  Make it visually appealing with modern CSS. Do not include any explanations or markdown.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: formattedPrompt }] }]
      }),
    });

    const data = await response.json();
    let htmlContent = data.candidates[0]?.content?.parts[0]?.text || '';

    // Clean up the response
    htmlContent = htmlContent.replace(/```html|```/g, '').trim();

    const randomFileName = `app_${Date.now()}.html`;
    const filePath = path.join(appsDir, randomFileName);

    fs.writeFileSync(filePath, htmlContent);
    const fileUrl = `${BASE_URL}:${PORT}/apps/${randomFileName}`;

    res.json({ fileUrl });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to generate application' });
  }
});

// Serve generated apps
app.use('/apps', express.static(appsDir));

// Configuration endpoint
app.get('/config', (req, res) => {
  res.json({ baseUrl: `${BASE_URL}:${PORT}` });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Backend running at ${BASE_URL}:${PORT}`);
});