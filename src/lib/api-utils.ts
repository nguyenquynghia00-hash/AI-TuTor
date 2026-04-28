import { GoogleGenAI } from '@google/genai';

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export function getFromCache(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

export function setCache(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

// Delay helper
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Smart retry with backoff
export async function retryWithBackoff<T>(fn: () => Promise<T>, retries = 3, delayMs = 1500): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && (error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED') || error?.message?.includes('quota'))) {
      console.warn(`Rate limited. Retrying in ${delayMs}ms... (${retries} retries left)`);
      await delay(delayMs);
      return retryWithBackoff(fn, retries - 1, delayMs * 2);
    }
    throw error;
  }
}

// Request Queue to prevent concurrent API spam
class RequestQueue {
  private queue: (() => Promise<void>)[] = [];
  private isProcessing = false;

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await task();
        // Add a small delay between requests to avoid hitting rate limits too fast
        await delay(500);
      }
    }

    this.isProcessing = false;
  }
}

export const apiQueue = new RequestQueue();

// Debounce helper
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  waitFor: number
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    return new Promise((resolve) => {
      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
  };
}
