import React, { useState, useRef } from 'react';
import { BookOpen, Eye, LampDesk } from 'lucide-react';
import { ExperiencePreferences } from '../types';
import { RainCanvas } from './RainCanvas';
import { AnimatedStudyRoomSvg } from './AnimatedStudyRoomSvg';

interface StudyRoomSceneProps {
  preferences: ExperiencePreferences;
  onToggleLamp: () => void;
  onOpenDiary: () => void;
  onFocusWindow: () => void;
  diaryCount: number;
}

export const StudyRoomScene: React.FC<StudyRoomSceneProps> = ({
  preferences,
  onToggleLamp,
  onOpenDiary,
  onFocusWindow,
  diaryCount,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (preferences.reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setParallax({ x: normX * -10, y: normY * -7 });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  return (
    <section
      id="scene-study"
      aria-labelledby="study-heading"
      className="mx-auto w-full max-w-[1360px] px-4 pt-6 pb-16 sm:px-8"
    >
      {/* Editorial scene header */}
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="font-sans text-xs tracking-[0.18em] text-[#8d96a5] uppercase">
            01 · Fifth-Floor Study Room
          </p>
          <h2
            id="study-heading"
            className="mt-1 font-serif text-3xl font-normal text-[#f0f2f5] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            The Desk Beside the Window
          </h2>
        </div>
        <p className="max-w-md font-sans text-sm leading-relaxed text-[#9ca5b4]">
          Move gently across the room. Select the open window to step closer to the rooftops, or
          open the clothbound notebook on the desk.
        </p>
      </div>

      {/* Interactive Animated Cartoon Study Room Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[16/10] min-h-[420px] w-full overflow-hidden rounded-lg border border-[#242c38] bg-[#0d1118] sm:aspect-[16/9]"
      >
        {/* Parallax Animated Cartoon Room Visual Layer */}
        <div
          className={`absolute inset-[-18px] transition-transform ${
            preferences.reducedMotion ? '' : 'duration-500 ease-out'
          }`}
          style={{
            transform: preferences.reducedMotion
              ? 'none'
              : `translate3d(${parallax.x}px, ${parallax.y}px, 0) scale(1.03)`,
          }}
        >
          <AnimatedStudyRoomSvg
            timeOfDay={preferences.timeOfDay}
            deskLampOn={preferences.deskLampOn}
            reducedMotion={preferences.reducedMotion}
          />
        </div>

        {/* Optional Rain on the Window Pane region */}
        <div className="pointer-events-none absolute top-[8%] left-[8%] h-[60%] w-[54%] overflow-hidden">
          <RainCanvas
            enabled={preferences.rainEnabled}
            reducedMotion={preferences.reducedMotion}
          />
        </div>

        {/* Atmospheric Haze & Vignette */}
        {preferences.hazeEnabled && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0a0e14]/40 via-transparent to-[#2c3849]/15"
          />
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080b10]/80 via-transparent to-[#080b10]/20"
        />

        {/* Interactive Hotspot 1: The Window (Look Outside -> 20 Meters Apart) */}
        <button
          type="button"
          onClick={onFocusWindow}
          aria-label="Look out the fifth-floor window toward the house 20 meters away"
          className="group absolute top-[18%] left-[12%] z-30 flex min-h-[44px] items-center gap-2.5 rounded border border-[#e6e8ec]/25 bg-[#0b0f17]/80 px-4 py-2.5 text-left backdrop-blur-md transition-all duration-200 hover:border-[#d99b4e]/80 hover:bg-[#121824]/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d99b4e] sm:top-[28%] sm:left-[24%] cursor-pointer whitespace-nowrap shrink-0"
        >
          <Eye className="h-4 w-4 text-[#d99b4e] transition-transform duration-200 group-hover:scale-110 shrink-0" />
          <span className="font-sans text-xs font-medium tracking-wider text-[#f0f2f5] uppercase">
            Look Out the Window
          </span>
        </button>

        {/* Interactive Hotspot 2: The Clothbound Notebook (Open Personal Diary) */}
        <button
          type="button"
          onClick={onOpenDiary}
          aria-label="Open the notebook on the desk to read or write in your personal diary"
          className="group absolute bottom-[14%] left-[48%] z-30 flex min-h-[44px] -translate-x-1/2 items-center gap-2.5 rounded border border-[#d99b4e]/50 bg-[#12161f]/88 px-4 py-2.5 text-left backdrop-blur-md transition-all duration-200 hover:border-[#d99b4e] hover:bg-[#191f2c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d99b4e] sm:bottom-[15%] sm:left-[52%] sm:translate-x-0 cursor-pointer whitespace-nowrap shrink-0"
        >
          <BookOpen className="h-4 w-4 text-[#d99b4e] transition-transform duration-200 group-hover:scale-110 shrink-0" />
          <span className="font-sans text-xs font-medium tracking-wider text-[#f5ebd8] uppercase">
            Open Notebook {diaryCount > 0 ? `(${diaryCount})` : ''}
          </span>
        </button>

        {/* Interactive Hotspot 3: Subtle Desk Lamp Switch */}
        <button
          type="button"
          onClick={onToggleLamp}
          aria-pressed={preferences.deskLampOn}
          aria-label={preferences.deskLampOn ? 'Turn off study desk lamp' : 'Turn on study desk lamp'}
          className="group absolute right-4 bottom-4 z-30 flex min-h-[40px] items-center gap-2 rounded border border-[#e6e8ec]/20 bg-[#0b0f17]/80 px-3.5 py-2 backdrop-blur-md transition-all duration-200 hover:border-[#d99b4e]/60 hover:bg-[#141b26] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d99b4e] sm:top-[46%] sm:right-[11%] sm:bottom-auto cursor-pointer whitespace-nowrap shrink-0"
        >
          <LampDesk
            className={`h-4 w-4 transition-colors ${
              preferences.deskLampOn ? 'text-[#e5a95c]' : 'text-[#7c8594]'
            } shrink-0`}
          />
          <span className="font-sans text-xs text-[#cfd5df]">
            Desk Lamp: {preferences.deskLampOn ? 'Warm' : 'Off'}
          </span>
        </button>

        {/* Quiet room detail caption along bottom-left */}
        <div className="pointer-events-none absolute bottom-4 left-5 z-20 hidden max-w-md sm:block">
          <p className="font-serif text-base italic text-[#cfd5df]/90">
            Stacked textbooks, a steaming cup, and the habit of glancing up between chapters.
          </p>
        </div>
      </div>
    </section>
  );
};
