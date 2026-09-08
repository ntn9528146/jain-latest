export async function callGeminiApi(promptText) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY is missing in environment variables.');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: promptText }]
        }
      ]
    })
  });

  if (!response.ok) {
    const errData = await response.text();
    throw new Error(`Gemini API Error [${response.status}]: ${errData}`);
  }

  const data = await response.json();
  const textResult = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return textResult;
}

export function parseAiJsonSafely(rawText) {
  if (!rawText) return null;
  try {
    let cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const jsonString = cleaned.substring(firstBrace, lastBrace + 1);
      return JSON.parse(jsonString);
    }
    return JSON.parse(cleaned);
  } catch (e) {
    console.warn('Strict JSON parse failed, returning null for fallback handling:', e);
    return null;
  }
}
