// lib/rate-limit.ts — IP sliding window: 3 free generations per 24 hours

import { AppError } from "@/lib/errors";

export const MAX_FREE_GENERATIONS = 3;
export const WINDOW_MS = 86_400_000; // 24 hours in milliseconds

const PRUNE_INTERVAL = 100;

const store = new Map<string, number[]>();
let requestCount = 0;

function pruneExpiredEntries(): void {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;

  for (const [ip, timestamps] of store) {
    const active = timestamps.filter((ts) => ts > cutoff);
    if (active.length === 0) {
      store.delete(ip);
    } else {
      store.set(ip, active);
    }
  }
}

export function checkRateLimit(ip: string): void {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;

  requestCount += 1;
  if (requestCount % PRUNE_INTERVAL === 0) {
    pruneExpiredEntries();
  }

  const timestamps = store.get(ip) ?? [];
  const active = timestamps.filter((ts) => ts > cutoff);

  if (active.length >= MAX_FREE_GENERATIONS) {
    throw AppError.rateLimit(
      `Rate limit exceeded for IP ${ip}: ${MAX_FREE_GENERATIONS} requests per 24h`,
      { ip, activeCount: active.length, windowMs: WINDOW_MS }
    );
  }

  active.push(now);
  store.set(ip, active);
}
