/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  BookOpen,
  Volume2,
  VolumeX,
  CloudRain,
  Sparkles,
  Sun,
  Sunset,
  Moon,
  Download,
  AlertCircle,
} from 'lucide-react';
import {
  DiaryCategory,
  DiaryEntry,
  ExperiencePreferences,
  LastPageContent,
  MemoryState,
  TimeOfDay,
  TimelineChapter,
} from './types';
import {
  loadMemoryState,
  loadPreferences,
  saveMemoryState,
  savePreferences,
} from './utils/storage';
import { ambientAudio } from './utils/ambientSound';
import { OpeningScene } from './components/OpeningScene';
import { StudyRoomScene } from './components/StudyRoomScene';
import { WindowViewScene } from './components/WindowViewScene';
import { DistanceSection } from './components/DistanceSection';
import { TimelineSection } from './components/TimelineSection';
import { LastPageSection } from './components/LastPageSection';
import { DiaryModal } from './components/DiaryModal';
import { GuideAndPackageModal } from './components/GuideAndPackageModal';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  const [memoryState, setMemoryState] = useState<MemoryState>(() => loadMemoryState().data);
  const [storageWarning, setStorageWarning] = useState<string | null>(
    () => loadMemoryState().error || null
  );

  const [preferences, setPreferences] = useState<ExperiencePreferences>(() => loadPreferences());
  const [audioError, setAudioError] = useState<string | null>(null);

  const [isDiaryOpen, setIsDiaryOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Sync preferences to localStorage (excluding soundEnabled so audio never autoplays)
  useEffect(() => {
    savePreferences(preferences);
  }, [preferences]);

  // Clean up Web Audio on unmount
  useEffect(() => {
    return () => {
      ambientAudio.dispose();
    };
  }, []);

  const persistMemory = useCallback((next: MemoryState) => {
    setMemoryState(next);
    const res = saveMemoryState(next);
    if (!res.ok && res.error) {
      setStorageWarning(res.error);
    }
  }, []);

  const handleChangeTimeOfDay = (timeOfDay: TimeOfDay) => {
    setPreferences((prev) => ({ ...prev, timeOfDay }));
  };

  const handleToggleRain = () => {
    setPreferences((prev) => {
      const nextRain = !prev.rainEnabled;
      if (prev.soundEnabled) {
        ambientAudio.setRainLayer(nextRain);
      }
      return { ...prev, rainEnabled: nextRain };
    });
  };

  const handleToggleHaze = () => {
    setPreferences((prev) => ({ ...prev, hazeEnabled: !prev.hazeEnabled }));
  };

  const handleToggleReducedMotion = () => {
    setPreferences((prev) => ({ ...prev, reducedMotion: true }));
  };

  const handleToggleDeskLamp = () => {
    setPreferences((prev) => ({ ...prev, deskLampOn: !prev.deskLampOn }));
  };

  const handleToggleSound = () => {
    setAudioError(null);
    if (preferences.soundEnabled) {
      ambientAudio.stop();
      setPreferences((prev) => ({ ...prev, soundEnabled: false }));
    } else {
      const result = ambientAudio.start(preferences.rainEnabled);
      if (!result.ok) {
        setAudioError(result.error || 'Ambient audio unavailable.');
        return;
      }
      setPreferences((prev) => ({ ...prev, soundEnabled: true }));
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: preferences.reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleUpdateCategories = (categories: DiaryCategory[]) => {
    persistMemory({ ...memoryState, categories });
  };

  const handleUpdateEntries = (entries: DiaryEntry[]) => {
    persistMemory({ ...memoryState, entries });
  };

  const handleSaveDistanceNote = (distanceNote: string) => {
    persistMemory({ ...memoryState, distanceNote });
  };

  const handleUpdateChapters = (chapters: TimelineChapter[]) => {
    persistMemory({ ...memoryState, chapters });
  };

  const handleUpdateLastPage = (lastPage: LastPageContent) => {
    persistMemory({ ...memoryState, lastPage });
  };

  const handleImportState = (imported: MemoryState) => {
    persistMemory(imported);
  };

  if (!hasEntered) {
    return (
      <OpeningScene
        onEnter={() => {
          // The visitor's tap on "Enter" is the one gesture phones allow: start the music right here
          if (!preferences.soundEnabled) handleToggleSound();
          setHasEntered(true);
        }}
        reducedMotion={preferences.reducedMotion}
      />
    );
  }

  return (
    <div
      className={`relative min-h-screen w-full overflow-x-hidden bg-[#0b0e13] text-[#e6e8ec] ${
        preferences.reducedMotion ? 'motion-reduce' : ''
      }`}
    >
      {/* Subtle 35mm film grain overlay when atmospheric haze/grain is enabled */}
      {preferences.hazeEnabled && (
        <div
          aria-hidden="true"
          className="film-grain pointer-events-none fixed inset-0 z-40 opacity-85"
        />
      )}

      {/* Clean 3-Zone Top Bar Contract (<= 15% mobile sticky cap) */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 border-b border-[#1c2330] bg-[#0b0e13]/92 px-4 py-3.5 backdrop-blur-md sm:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#scene-study"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('scene-study');
          }}
          className="font-serif text-lg font-medium tracking-[0.18em] text-[#f2f4f7] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#d99b4e]"
        >
          THE WINDOW
        </a>

        {/* Zone 2: 5 Clean Single-Line Text Navigation Links */}
        <nav
          aria-label="Memory chapters"
          className="hidden items-center gap-7 font-sans text-xs font-medium text-[#9aa3b2] md:flex"
        >
          <a
            href="#scene-study"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('scene-study');
            }}
            className="underline-offset-4 transition-colors hover:text-[#f2f4f7] hover:underline whitespace-nowrap shrink-0"
          >
            Study Room
          </a>
          <a
            href="#scene-window"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('scene-window');
            }}
            className="underline-offset-4 transition-colors hover:text-[#f2f4f7] hover:underline whitespace-nowrap shrink-0"
          >
            Window View
          </a>
          <a
            href="#scene-distance"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('scene-distance');
            }}
            className="underline-offset-4 transition-colors hover:text-[#f2f4f7] hover:underline whitespace-nowrap shrink-0"
          >
            20 Meters
          </a>
          <a
            href="#scene-timeline"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('scene-timeline');
            }}
            className="underline-offset-4 transition-colors hover:text-[#f2f4f7] hover:underline whitespace-nowrap shrink-0"
          >
            Timeline
          </a>
          <a
            href="#scene-last-page"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('scene-last-page');
            }}
            className="underline-offset-4 transition-colors hover:text-[#f2f4f7] hover:underline whitespace-nowrap shrink-0"
          >
            Last Page
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action — Open Personal Notebook */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => setIsDiaryOpen(true)}
            className="inline-flex min-h-[38px] items-center gap-2 rounded border border-[#d99b4e]/60 bg-[#151b26] px-4 py-1.5 font-sans text-xs font-medium text-[#f5ebd8] transition-colors duration-200 hover:bg-[#d99b4e] hover:text-[#0b0e13] focus-visible:outline-2 focus-visible:outline-[#d99b4e] cursor-pointer whitespace-nowrap shrink-0"
          >
            <BookOpen className="h-3.5 w-3.5 shrink-0" />
            <span>
              Open Notebook{memoryState.entries.length > 0 ? ` (${memoryState.entries.length})` : ''}
            </span>
          </button>
        </div>
      </header>

      {/* Non-sticky Workspace Atmosphere & Accessibility Toolbar below header */}
      <div
        role="region"
        aria-label="Atmosphere, sound, and motion settings"
        className="border-b border-[#171d28] bg-[#0d1118]"
      >
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-8">
          {/* Mobile quick scene jump links */}
          <div className="flex items-center gap-4 overflow-x-auto py-1 font-sans text-xs text-[#9aa3b2] md:hidden">
            <button
              type="button"
              onClick={() => scrollToSection('scene-study')}
              className="hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              Study Room
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('scene-window')}
              className="hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              Window View
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('scene-distance')}
              className="hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              20 Meters
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('scene-timeline')}
              className="hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              Timeline
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('scene-last-page')}
              className="hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              Last Page
            </button>
          </div>

          <div className="hidden items-center gap-2 font-sans text-xs text-[#7c8594] md:flex">
            <span>20 Meters Apart</span>
            <span aria-hidden="true">·</span>
            <span>A Personal Memory Experience by AKSAD</span>
          </div>

          {/* Lighting, Rain, Haze, Reduced Motion & Sound Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Day / Dusk / Night quick switcher */}
            <div
              role="group"
              aria-label="Lighting mode"
              className="inline-flex items-center rounded border border-[#222a36] bg-[#0a0e14] p-0.5"
            >
              {(
                [
                  { id: 'day', label: 'Day', Icon: Sun },
                  { id: 'dusk', label: 'Dusk', Icon: Sunset },
                  { id: 'night', label: 'Night', Icon: Moon },
                ] as const
              ).map(({ id, label, Icon }) => {
                const active = preferences.timeOfDay === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleChangeTimeOfDay(id)}
                    aria-pressed={active}
                    className={`inline-flex min-h-[30px] items-center gap-1 rounded px-2.5 py-1 font-sans text-[11px] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#1f2735] font-medium text-[#f5ebd8]'
                        : 'text-[#8d96a5] hover:text-white'
                    }`}
                  >
                    <Icon className="h-3 w-3 shrink-0" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleToggleRain}
              aria-pressed={preferences.rainEnabled}
              className={`inline-flex min-h-[32px] items-center gap-1.5 rounded border px-2.5 py-1 font-sans text-[11px] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                preferences.rainEnabled
                  ? 'border-[#7da0c4]/50 bg-[#172130] text-[#dce8f5]'
                  : 'border-[#222a36] bg-[#0a0e14] text-[#8d96a5] hover:text-white'
              }`}
            >
              <CloudRain className="h-3 w-3 shrink-0" />
              <span>Rain: {preferences.rainEnabled ? 'On' : 'Off'}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleHaze}
              aria-pressed={preferences.hazeEnabled}
              className={`inline-flex min-h-[32px] items-center gap-1.5 rounded border px-2.5 py-1 font-sans text-[11px] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                preferences.hazeEnabled
                  ? 'border-[#333f52] bg-[#141a24] text-[#cfd5df]'
                  : 'border-[#222a36] bg-[#0a0e14] text-[#7c8594] hover:text-white'
              }`}
            >
              <Sparkles className="h-3 w-3 shrink-0" />
              <span>Haze &amp; Grain: {preferences.hazeEnabled ? 'On' : 'Off'}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleReducedMotion}
              aria-pressed={preferences.reducedMotion}
              className={`inline-flex min-h-[32px] items-center gap-1.5 rounded border px-2.5 py-1 font-sans text-[11px] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                preferences.reducedMotion
                  ? 'border-[#d99b4e]/60 bg-[#1c1914] text-[#f5ebd8]'
                  : 'border-[#222a36] bg-[#0a0e14] text-[#8d96a5] hover:text-white'
              }`}
            >
              <span>Reduced Motion: {preferences.reducedMotion ? 'On' : 'Off'}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleSound}
              aria-pressed={preferences.soundEnabled}
              aria-label={
                preferences.soundEnabled ? 'Mute ambient room sound' : 'Enable subtle ambient sound'
              }
              className={`inline-flex min-h-[32px] items-center gap-1.5 rounded border px-2.5 py-1 font-sans text-[11px] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                preferences.soundEnabled
                  ? 'border-[#d99b4e]/60 bg-[#1c1914] text-[#f5ebd8]'
                  : 'border-[#222a36] bg-[#0a0e14] text-[#8d96a5] hover:text-white'
              }`}
            >
              {preferences.soundEnabled ? (
                <Volume2 className="h-3.5 w-3.5 text-[#d99b4e] shrink-0" />
              ) : (
                <VolumeX className="h-3.5 w-3.5 shrink-0" />
              )}
              <span>{preferences.soundEnabled ? 'Sound: On' : 'Muted'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Helpful Storage or Audio Warning Banner if needed */}
      {(storageWarning || audioError) && (
        <div
          role="alert"
          className="mx-auto mt-4 flex max-w-[1360px] items-center justify-between gap-3 rounded border border-[#d99b4e]/40 bg-[#191612] px-4 py-2.5 font-sans text-xs text-[#f2dec0] sm:px-6"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-[#d99b4e] shrink-0" />
            <span>{storageWarning || audioError}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setStorageWarning(null);
              setAudioError(null);
            }}
            className="text-[#9aa3b2] hover:text-white cursor-pointer whitespace-nowrap shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Narrative Experience */}
      <main>
        {/* 01. Fifth-Floor Study Room */}
        <StudyRoomScene
          preferences={preferences}
          onToggleLamp={handleToggleDeskLamp}
          onOpenDiary={() => setIsDiaryOpen(true)}
          onFocusWindow={() => scrollToSection('scene-window')}
          diaryCount={memoryState.entries.length}
        />

        {/* 02. The Window View (20 Meters Apart) */}
        <WindowViewScene
          preferences={preferences}
          onChangeTimeOfDay={handleChangeTimeOfDay}
          onToggleRain={handleToggleRain}
          onBackToStudy={() => scrollToSection('scene-study')}
        />

        {/* 03. Symbolic Distance */}
        <DistanceSection
          distanceNote={memoryState.distanceNote}
          onSaveDistanceNote={handleSaveDistanceNote}
          reducedMotion={preferences.reducedMotion}
        />

        {/* 04. Editable Emotional Chapters Timeline */}
        <TimelineSection
          chapters={memoryState.chapters}
          onUpdateChapters={handleUpdateChapters}
        />

        {/* 05. The Last Page */}
        <LastPageSection
          lastPage={memoryState.lastPage}
          onUpdateLastPage={handleUpdateLastPage}
        />
      </main>

      {/* Quiet Editorial Footer with Privacy Notice & Standalone ZIP Export */}
      <footer className="border-t border-[#1b222e] bg-[#080b10] py-12">
        <div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-6 px-4 sm:px-8 lg:flex-row lg:items-center">
          <div className="space-y-1.5">
            <p className="font-serif text-lg tracking-[0.14em] text-[#e6e8ec]">
              THE WINDOW — 20 METERS APART
            </p>
            <p className="font-sans text-xs text-[#8d96a5]">
              A Personal Memory Experience by AKSAD · &ldquo;Somewhere between these rooftops, a
              window became a memory.&rdquo;
            </p>
            <p className="max-w-2xl pt-1 font-sans text-[11px] leading-relaxed text-[#6f7887]">
              Privacy note: All personal diary entries, timeline notes, and letters stay local in
              your browser&apos;s unencrypted localStorage and are never uploaded or shared.
              Clearing browser site data can erase local entries—use Export inside the Notebook for
              personal backups.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDiaryOpen(true)}
              className="inline-flex min-h-[40px] items-center gap-2 rounded border border-[#273142] bg-[#101620] px-4 py-2 font-sans text-xs text-[#d6dce6] transition-colors hover:border-[#d99b4e]/60 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#d99b4e] shrink-0" />
              <span>Notebook &amp; Backup</span>
            </button>

            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="inline-flex min-h-[40px] items-center gap-2 rounded border border-[#273142] bg-[#101620] px-4 py-2 font-sans text-xs text-[#d6dce6] transition-colors hover:border-[#d99b4e]/60 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5 text-[#d99b4e] shrink-0" />
              <span>Standalone ZIP &amp; Setup Guide</span>
            </button>

            <button
              type="button"
              onClick={() => setHasEntered(false)}
              className="inline-flex min-h-[40px] items-center rounded px-3 py-2 font-sans text-xs text-[#8d96a5] hover:text-white cursor-pointer whitespace-nowrap shrink-0"
            >
              Return to Opening
            </button>
          </div>
        </div>
      </footer>

      {/* Personal Diary Modal */}
      <DiaryModal
        isOpen={isDiaryOpen}
        onClose={() => setIsDiaryOpen(false)}
        memoryState={memoryState}
        onUpdateCategories={handleUpdateCategories}
        onUpdateEntries={handleUpdateEntries}
        onImportState={handleImportState}
      />

      {/* Standalone ZIP Package & Windows / GitHub Pages Setup Modal */}
      <GuideAndPackageModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        memoryState={memoryState}
      />
    </div>
  );
}
