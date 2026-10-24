import { MemoryState, ExperiencePreferences } from '../types';

export const STORAGE_KEY_MEMORY = 'the_window_20m_memory_v1';
export const STORAGE_KEY_PREFS = 'the_window_20m_prefs_v1';

export const DEFAULT_MEMORY_STATE: MemoryState = {
  version: 1,
  categories: [
    { id: 'cat-first-look', name: 'The First Look' },
    { id: 'cat-unsaid', name: 'Things I Never Said' },
    { id: 'cat-quiet', name: 'Quiet Moments' },
    { id: 'cat-imagined', name: 'What I Imagined' },
    { id: 'cat-know', name: 'What I Know' },
    { id: 'cat-carry', name: 'What I Will Carry Forward' },
  ],
  entries: [],
  distanceNote: '',
  chapters: [
    {
      id: 'chap-1',
      title: 'The First Look',
      date: '',
      note: '',
    },
    {
      id: 'chap-2',
      title: 'The Curiosity',
      date: '',
      note: '',
    },
    {
      id: 'chap-3',
      title: 'The Waiting',
      date: '',
      note: '',
    },
    {
      id: 'chap-4',
      title: 'The Unsaid',
      date: '',
      note: '',
    },
    {
      id: 'chap-5',
      title: 'The Distance',
      date: '',
      note: '',
    },
    {
      id: 'chap-6',
      title: 'What Remains',
      date: '',
      note: '',
    },
  ],
  lastPage: {
    quoteText:
      "I don't know what I meant to you.\nBut I know what those quiet moments meant to me.",
    showQuote: true,
    futureLetter: '',
    futureLetterDate: '',
  },
};

export const DEFAULT_PREFERENCES: ExperiencePreferences = {
  timeOfDay: 'dusk',
  rainEnabled: false,
  hazeEnabled: true,
  reducedMotion: false,
  soundEnabled: false,
  deskLampOn: true,
};

export interface StorageLoadResult<T> {
  data: T;
  available: boolean;
  error?: string;
}

export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__window_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function loadMemoryState(): StorageLoadResult<MemoryState> {
  if (!isLocalStorageAvailable()) {
    return {
      data: DEFAULT_MEMORY_STATE,
      available: false,
      error: 'Browser local storage is unavailable in this session (e.g., private browsing restriction). Changes will only last until this tab closes unless exported.',
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_MEMORY);
    if (!raw) {
      return { data: DEFAULT_MEMORY_STATE, available: true };
    }
    const parsed = JSON.parse(raw) as Partial<MemoryState>;
    return {
      available: true,
      data: {
        version: 1,
        categories:
          Array.isArray(parsed.categories) && parsed.categories.length > 0
            ? parsed.categories
            : DEFAULT_MEMORY_STATE.categories,
        entries: Array.isArray(parsed.entries) ? parsed.entries : [],
        distanceNote: typeof parsed.distanceNote === 'string' ? parsed.distanceNote : '',
        chapters:
          Array.isArray(parsed.chapters) && parsed.chapters.length > 0
            ? parsed.chapters
            : DEFAULT_MEMORY_STATE.chapters,
        lastPage: {
          quoteText:
            typeof parsed.lastPage?.quoteText === 'string'
              ? parsed.lastPage.quoteText
              : DEFAULT_MEMORY_STATE.lastPage.quoteText,
          showQuote:
            typeof parsed.lastPage?.showQuote === 'boolean'
              ? parsed.lastPage.showQuote
              : true,
          futureLetter:
            typeof parsed.lastPage?.futureLetter === 'string'
              ? parsed.lastPage.futureLetter
              : '',
          futureLetterDate:
            typeof parsed.lastPage?.futureLetterDate === 'string'
              ? parsed.lastPage.futureLetterDate
              : '',
        },
      },
    };
  } catch {
    return {
      data: DEFAULT_MEMORY_STATE,
      available: true,
      error: 'Saved local data could not be read and was safely reset to blank defaults.',
    };
  }
}

export function saveMemoryState(state: MemoryState): { ok: boolean; error?: string } {
  try {
    window.localStorage.setItem(STORAGE_KEY_MEMORY, JSON.stringify(state));
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: 'Unable to save to browser storage (quota exceeded or restricted). Please export your backup file.',
    };
  }
}

export function loadPreferences(): ExperiencePreferences {
  return { ...loadPreferencesRaw(), reducedMotion: true };
}

function loadPreferencesRaw(): ExperiencePreferences {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isLocalStorageAvailable()) {
    return { ...DEFAULT_PREFERENCES, reducedMotion: prefersReduced };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_PREFS);
    if (!raw) {
      return { ...DEFAULT_PREFERENCES, reducedMotion: prefersReduced };
    }
    const parsed = JSON.parse(raw) as Partial<ExperiencePreferences>;
    return {
      timeOfDay:
        parsed.timeOfDay === 'day' || parsed.timeOfDay === 'dusk' || parsed.timeOfDay === 'night'
          ? parsed.timeOfDay
          : 'dusk',
      rainEnabled: Boolean(parsed.rainEnabled),
      hazeEnabled: parsed.hazeEnabled !== undefined ? Boolean(parsed.hazeEnabled) : true,
      reducedMotion:
        parsed.reducedMotion !== undefined ? Boolean(parsed.reducedMotion) : prefersReduced,
      soundEnabled: false, // Always disabled on startup per requirement 13: no autoplay, off by default
      deskLampOn: parsed.deskLampOn !== undefined ? Boolean(parsed.deskLampOn) : true,
    };
  } catch {
    return { ...DEFAULT_PREFERENCES, reducedMotion: prefersReduced };
  }
}

export function savePreferences(prefs: ExperiencePreferences): void {
  try {
    // Never persist soundEnabled as true across reloads so it never autoplays
    const safeToStore = { ...prefs, soundEnabled: false };
    window.localStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(safeToStore));
  } catch {
    // Ignore storage errors on visual preferences
  }
}

export function formatMemoryAsPlainText(state: MemoryState): string {
  const lines: string[] = [];
  lines.push('THE WINDOW — 20 METERS APART');
  lines.push('A Personal Memory Experience by AKSAD');
  lines.push(`Exported on: ${new Date().toLocaleString()}`);
  lines.push('------------------------------------------------------------');
  lines.push('');

  lines.push('I. THE UNSAID — PERSONAL DIARY');
  lines.push('------------------------------------------------------------');
  if (state.entries.length === 0) {
    lines.push('(No diary entries recorded yet.)');
  } else {
    const catMap = new Map(state.categories.map((c) => [c.id, c.name]));
    state.entries.forEach((entry, idx) => {
      const catName = catMap.get(entry.categoryId) || 'Uncategorized';
      lines.push(`${idx + 1}. ${entry.title || 'Untitled Entry'}`);
      lines.push(`   Category: ${catName}${entry.date ? ` · Date: ${entry.date}` : ''}`);
      lines.push('');
      lines.push(`   ${entry.content.replace(/\n/g, '\n   ')}`);
      lines.push('');
    });
  }
  lines.push('');

  lines.push('II. THE DISTANCE (20 METERS)');
  lines.push('------------------------------------------------------------');
  lines.push(state.distanceNote ? state.distanceNote : '(No private distance note recorded.)');
  lines.push('');

  lines.push('III. THE TIMELINE — EMOTIONAL CHAPTERS');
  lines.push('------------------------------------------------------------');
  state.chapters.forEach((chap, idx) => {
    lines.push(`${String(idx + 1).padStart(2, '0')}. ${chap.title}${chap.date ? ` (${chap.date})` : ''}`);
    if (chap.note.trim()) {
      lines.push(`    ${chap.note.replace(/\n/g, '\n    ')}`);
    }
    lines.push('');
  });

  lines.push('IV. THE LAST PAGE');
  lines.push('------------------------------------------------------------');
  if (state.lastPage.showQuote && state.lastPage.quoteText.trim()) {
    lines.push(state.lastPage.quoteText);
    lines.push('');
  }
  if (state.lastPage.futureLetter.trim()) {
    lines.push(
      `Letter to Future Self${state.lastPage.futureLetterDate ? ` (${state.lastPage.futureLetterDate})` : ''}:`
    );
    lines.push(state.lastPage.futureLetter);
  }

  return lines.join('\n');
}

export function validateImportedJson(rawText: string): {
  valid: boolean;
  data?: MemoryState;
  error?: string;
} {
  try {
    const parsed = JSON.parse(rawText);
    if (!parsed || typeof parsed !== 'object') {
      return { valid: false, error: 'The selected file does not contain a valid JSON object.' };
    }
    if (!Array.isArray(parsed.categories) || !Array.isArray(parsed.entries) || !Array.isArray(parsed.chapters)) {
      return {
        valid: false,
        error: 'This JSON file is missing required memory fields (categories, entries, or chapters).',
      };
    }
    if (parsed.chapters.length === 0) {
      return {
        valid: false,
        error: 'A memory backup must include at least one timeline chapter.',
      };
    }

    const sanitized: MemoryState = {
      version: 1,
      categories: parsed.categories
        .filter((c: unknown): c is { id: string; name: string } =>
          Boolean(c && typeof c === 'object' && 'id' in c && 'name' in c)
        )
        .map((c: { id: string; name: string }) => ({
          id: String(c.id),
          name: String(c.name).slice(0, 80),
        })),
      entries: parsed.entries
        .filter((e: unknown): e is Record<string, unknown> => Boolean(e && typeof e === 'object'))
        .map((e: Record<string, unknown>, idx: number) => ({
          id: typeof e.id === 'string' ? e.id : `imported-entry-${idx}-${Date.now()}`,
          categoryId: typeof e.categoryId === 'string' ? e.categoryId : String(parsed.categories[0]?.id || 'cat-unsaid'),
          title: typeof e.title === 'string' ? e.title : 'Untitled',
          content: typeof e.content === 'string' ? e.content : '',
          date: typeof e.date === 'string' ? e.date : '',
          updatedAt: typeof e.updatedAt === 'string' ? e.updatedAt : new Date().toISOString(),
        })),
      distanceNote: typeof parsed.distanceNote === 'string' ? parsed.distanceNote : '',
      chapters: parsed.chapters
        .filter((ch: unknown): ch is Record<string, unknown> => Boolean(ch && typeof ch === 'object'))
        .map((ch: Record<string, unknown>, idx: number) => ({
          id: typeof ch.id === 'string' ? ch.id : `imported-chap-${idx}-${Date.now()}`,
          title: typeof ch.title === 'string' && ch.title.trim() ? ch.title : `Chapter ${idx + 1}`,
          date: typeof ch.date === 'string' ? ch.date : '',
          note: typeof ch.note === 'string' ? ch.note : '',
        })),
      lastPage: {
        quoteText:
          typeof parsed.lastPage?.quoteText === 'string'
            ? parsed.lastPage.quoteText
            : DEFAULT_MEMORY_STATE.lastPage.quoteText,
        showQuote:
          typeof parsed.lastPage?.showQuote === 'boolean' ? parsed.lastPage.showQuote : true,
        futureLetter:
          typeof parsed.lastPage?.futureLetter === 'string' ? parsed.lastPage.futureLetter : '',
        futureLetterDate:
          typeof parsed.lastPage?.futureLetterDate === 'string'
            ? parsed.lastPage.futureLetterDate
            : '',
      },
    };

    if (sanitized.categories.length === 0) {
      sanitized.categories = DEFAULT_MEMORY_STATE.categories;
    }

    return { valid: true, data: sanitized };
  } catch {
    return {
      valid: false,
      error: 'Could not parse JSON file. Make sure you selected a valid .json backup exported from THE WINDOW.',
    };
  }
}
