export type TimeOfDay = 'day' | 'dusk' | 'night';

export type ActiveScene = 'opening' | 'study' | 'window' | 'distance' | 'timeline' | 'lastPage';

export interface DiaryCategory {
  id: string;
  name: string;
}

export interface DiaryEntry {
  id: string;
  categoryId: string;
  title: string;
  content: string;
  date?: string; // Optional user-recorded date string
  updatedAt: string;
}

export interface TimelineChapter {
  id: string;
  title: string;
  date?: string;
  note: string;
}

export interface LastPageContent {
  quoteText: string;
  showQuote: boolean;
  futureLetter: string;
  futureLetterDate?: string;
}

export interface MemoryState {
  version: number;
  categories: DiaryCategory[];
  entries: DiaryEntry[];
  distanceNote: string;
  chapters: TimelineChapter[];
  lastPage: LastPageContent;
}

export interface ExperiencePreferences {
  timeOfDay: TimeOfDay;
  rainEnabled: boolean;
  hazeEnabled: boolean;
  reducedMotion: boolean;
  soundEnabled: boolean;
  deskLampOn: boolean;
}
