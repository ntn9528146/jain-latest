const KEY_POOL = [
  { key: import.meta.env.VITE_GEMINI_API_KEY_1 || import.meta.env.VITE_GEMINI_KEY_1 || "", failed: false },
  { key: import.meta.env.VITE_GEMINI_API_KEY_2 || import.meta.env.VITE_GEMINI_KEY_2 || "", failed: false },
  { key: import.meta.env.VITE_GEMINI_API_KEY_3 || import.meta.env.VITE_GEMINI_KEY_3 || "", failed: false }
];

let currentIndex = 0;

export function getActiveGeminiKey() {
  const localKey = localStorage.getItem("gemini_api_key") || localStorage.getItem("VITE_GEMINI_API_KEY");
  if (localKey && localKey.trim()) {
    return localKey.trim();
  }

  const availableKeys = KEY_POOL.filter(k => k.key && !k.failed);
  if (availableKeys.length > 0) {
    const chosen = availableKeys[currentIndex % availableKeys.length];
    currentIndex = (currentIndex + 1) % availableKeys.length;
    return chosen.key;
  }

  return KEY_POOL[0]?.key || "";
}

export function reportKeyFailure(failedKey) {
  const match = KEY_POOL.find(k => k.key === failedKey);
  if (match) {
    match.failed = true;
    console.warn("Rotating Gemini Key Account due to error or rate limit.");
  }
}

export default { getActiveGeminiKey, reportKeyFailure };
