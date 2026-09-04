// 3-Gemini Key Rotation & Health Tracker Vault
export const GEMINI_KEYS = [
  {
    id: 'key_1',
    key: import.meta.env.VITE_GEMINI_API_KEY_1 || '',
    isHealthy: true,
    lastUsed: 0,
    failCount: 0
  },
  {
    id: 'key_2',
    key: import.meta.env.VITE_GEMINI_API_KEY_2 || '',
    isHealthy: true,
    lastUsed: 0,
    failCount: 0
  },
  {
    id: 'key_3',
    key: import.meta.env.VITE_GEMINI_API_KEY_3 || '',
    isHealthy: true,
    lastUsed: 0,
    failCount: 0
  }
];

let currentKeyIndex = 0;

export function getActiveGeminiKey() {
  const availableKeys = GEMINI_KEYS.filter(k => k.isHealthy && k.key.trim().length > 0);
  
  if (availableKeys.length === 0) {
    // Agar koi key config nahi hai toh fallback blank return karega
    const fallback = GEMINI_KEYS.find(k => k.key.trim().length > 0);
    return fallback ? fallback.key : '';
  }

  currentKeyIndex = (currentKeyIndex + 1) % availableKeys.length;
  const selected = availableKeys[currentKeyIndex];
  selected.lastUsed = Date.now();
  return selected.key;
}

export function reportKeyFailure(failedKeyString) {
  const target = GEMINI_KEYS.find(k => k.key === failedKeyString);
  if (target) {
    target.failCount += 1;
    if (target.failCount >= 3) {
      target.isHealthy = false;
      // 1 minute baad wapas recovery test
      setTimeout(() => {
        target.isHealthy = true;
        target.failCount = 0;
      }, 60000);
    }
  }
}
