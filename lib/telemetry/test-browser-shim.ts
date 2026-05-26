/** Minimal browser globals for node:test (not imported from app code). */

export function createMemoryStorage(initial?: Record<string, string>): Storage {
  const map = new Map<string, string>(Object.entries(initial ?? {}));

  return {
    get length() {
      return map.size;
    },
    clear() {
      map.clear();
    },
    getItem(key: string) {
      return map.get(key) ?? null;
    },
    key(index: number) {
      return [...map.keys()][index] ?? null;
    },
    setItem(key: string, value: string) {
      map.set(key, value);
    },
    removeItem(key: string) {
      map.delete(key);
    },
  };
}

type BrowserGlobalsOptions = {
  sessionStorage?: Storage;
  localStorage?: Storage;
  referrer?: string;
  search?: string;
  innerWidth?: number;
};

export function withBrowserGlobals<T>(run: () => T, options: BrowserGlobalsOptions = {}): T {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;

  globalThis.window = {
    sessionStorage: options.sessionStorage ?? createMemoryStorage(),
    localStorage: options.localStorage ?? createMemoryStorage(),
    location: { search: options.search ?? '' } as Location,
    innerWidth: options.innerWidth ?? 1280,
  } as Window & typeof globalThis.window;

  globalThis.document = {
    referrer: options.referrer ?? '',
  } as Document;

  try {
    return run();
  } finally {
    globalThis.window = originalWindow;
    globalThis.document = originalDocument;
  }
}
