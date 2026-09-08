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
    throw new Error(`Gemini API Error: ${errData}`);
  }

  const data = await response.json();
  const textResult = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return textResult;
}

export function parseAiJsonSafely(rawText) {
  if (!rawText) return null;
  try {
    // Strip markdown code blocks if any
    let cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    // Try direct parse first
    return JSON.parse(cleaned);
  } catch (e1) {
    try {
      // Fallback: fix single quotes or trailing commas if possible
      let fixed = rawText
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();
      // Basic cleanup for unquoted keys or single quotes
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${fixed}`)();
      return result;
    } catch (e2) {
      console.error('Safe JSON parse failed:', e2, rawText);
      return null;
    }
  }
}
