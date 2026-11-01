import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Endpoints
  app.post('/api/analyze', async (req, res) => {
    try {
      const { code, language, context } = req.body;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Analyze the following ${language} code for bugs, security vulnerabilities, and quality issues.
        
        Code:
        ${code}
        
        Provide a structured JSON response.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              findings: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    severity: { type: Type.STRING, description: 'Critical, High, Medium, Low, Informational' },
                    category: { type: Type.STRING, description: 'Bugs, Security, Performance, Code Quality' },
                    filePath: { type: Type.STRING },
                    lineStart: { type: Type.INTEGER },
                    lineEnd: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                    impact: { type: Type.STRING },
                    recommendation: { type: Type.STRING },
                    confidence: { type: Type.NUMBER }
                  },
                  required: ['id', 'title', 'severity', 'category', 'explanation']
                }
              },
              summary: { type: Type.STRING }
            }
          }
        }
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (error: any) {
      console.error('Analysis error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/fix', async (req, res) => {
    try {
      const { code, finding, context } = req.body;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Generate a minimal, targeted fix for the following issue in this code.
        
        Issue: ${finding.title}
        Description: ${finding.explanation}
        Location: Lines ${finding.lineStart}-${finding.lineEnd}
        
        Original Code:
        ${code}
        
        Return ONLY the fixed code block or a patch that can be applied. Preferred is the full replacement of the affected function or section.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              fixedCode: { type: Type.STRING },
              explanation: { type: Type.STRING },
              diff: { type: Type.STRING }
            },
            required: ['fixedCode', 'explanation']
          }
        }
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (error: any) {
      console.error('Fix error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res) => {
      try {
        const url = req.originalUrl;
        const fs = await import('fs');
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        res.status(500).end(e.stack);
      }
    });
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
