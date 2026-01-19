const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 2;

declare global {
  var __rateLimitStore:
    | Map<string, { count: number; last: number }>
    | undefined;
}

const memoryStore =
  globalThis.__rateLimitStore ??
  new Map<string, { count: number; last: number }>();

globalThis.__rateLimitStore = memoryStore;

export const rateLimit = (key: string) => {
  const now = Date.now();
  const record = memoryStore.get(key);

  if (!record) {
    memoryStore.set(key, { count: 1, last: now });
    return true;
  }

  if (now - record.last > RATE_LIMIT_WINDOW) {
    memoryStore.set(key, { count: 1, last: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
};
