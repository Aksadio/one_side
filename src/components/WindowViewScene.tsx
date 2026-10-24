import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Sun, Sunset, Moon, CloudRain, ArrowLeft } from 'lucide-react';
import { ExperiencePreferences, TimeOfDay } from '../types';
import { RainCanvas } from './RainCanvas';
import { ArchitecturalRooftopSvg } from './ArchitecturalRooftopSvg';

interface WindowViewSceneProps {
  preferences: ExperiencePreferences;
  onChangeTimeOfDay: (mode: TimeOfDay) => void;
  onToggleRain: () => void;
  onBackToStudy: () => void;
}

const TIME_DESCRIPTIONS: Record<TimeOfDay, { label: string; note: string }> = {
  day: {
    label: 'Day',
    note: 'Soft pale daylight across illustrated concrete parapets, exposed brick, and rooftop water tanks.',
  },
  dusk: {
    label: 'Dusk',
    note: 'Muted blue-gray twilight, drifting clouds, and a warm amber window across quiet rooftops.',
  },
  night: {
    label: 'Night',
    note: 'Deep blue-gray shadows, faint stars, and subdued environmental stillness.',
  },
};

export const WindowViewScene: React.FC<WindowViewSceneProps> = ({
  preferences,
  onChangeTimeOfDay,
  onToggleRain,
  onBackToStudy,
}) => {
  const [zoomed, setZoomed] = useState(false);

  return (
    <section
      id="scene-window"
      aria-labelledby="window-view-heading"
      className="mx-auto w-full max-w-[1360px] px-4 py-12 sm:px-8"
    >
      {/* Top header & Atmospheric Lighting Controls */}
      <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="font-sans text-xs tracking-[0.18em] text-[#8d96a5] uppercase">
            02 · The Window View
          </p>
          <h2
            id="window-view-heading"
            className="mt-1 font-serif text-3xl font-normal text-[#f0f2f5] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Across the Rooftops
          </h2>
        </div>

        {/* Artistic Lighting & Rain Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div
            role="group"
            aria-label="Artistic lighting states"
            className="inline-flex items-center rounded-md border border-[#242c38] bg-[#11161f] p-1"
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
                  onClick={() => onChangeTimeOfDay(id)}
                  aria-pressed={active}
                  className={`inline-flex min-h-[36px] items-center gap-1.5 rounded px-3.5 py-1.5 font-sans text-xs font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#222b38] text-[#f5ebd8] shadow-xs'
                      : 'text-[#8d96a5] hover:text-[#e6e8ec]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onToggleRain}
            aria-pressed={preferences.rainEnabled}
            className={`inline-flex min-h-[40px] items-center gap-2 rounded-md border px-3.5 py-2 font-sans text-xs font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
              preferences.rainEnabled
                ? 'border-[#7da0c4]/50 bg-[#182230] text-[#dce8f5]'
                : 'border-[#242c38] bg-[#11161f] text-[#8d96a5] hover:text-[#e6e8ec]'
            }`}
          >
            <CloudRain className="h-3.5 w-3.5 shrink-0" />
            <span>Rain on Glass: {preferences.rainEnabled ? 'On' : 'Off'}</span>
          </button>

          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            aria-pressed={zoomed}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[#d99b4e]/40 bg-[#161b24] px-3.5 py-2 font-sans text-xs font-medium text-[#f2e4ce] transition-colors duration-200 hover:border-[#d99b4e] hover:bg-[#1d2430] cursor-pointer whitespace-nowrap shrink-0"
          >
            {zoomed ? (
              <>
                <ZoomOut className="h-3.5 w-3.5 text-[#d99b4e] shrink-0" />
                <span>Wider View</span>
              </>
            ) : (
              <>
                <ZoomIn className="h-3.5 w-3.5 text-[#d99b4e] shrink-0" />
                <span>Focus Distant Window</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Fifth-Floor Animated Cartoon Window Viewport */}
      <div className="relative aspect-[16/10] min-h-[400px] w-full overflow-hidden rounded-lg border border-[#242c38] bg-[#090d13] sm:aspect-[16/9]">
        {/* Smoothly cross-faded Day / Dusk / Night animated cartoon illustrations */}
        <div
          className={`absolute inset-0 transition-transform ${
            preferences.reducedMotion ? '' : 'duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
          }`}
          style={{
            transformOrigin: '48% 57%',
            transform: zoomed ? 'scale(1.65)' : 'scale(1.0)',
          }}
        >
          {/* DAY LAYER */}
          <div
            className={`absolute inset-0 transition-opacity ${
              preferences.reducedMotion ? '' : 'duration-1000'
            } ${preferences.timeOfDay === 'day' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
          >
            <ArchitecturalRooftopSvg
              timeOfDay="day"
              reducedMotion={preferences.reducedMotion}
              highlightFocalWindow={true}
            />
          </div>

          {/* DUSK LAYER (DEFAULT) */}
          <div
            className={`absolute inset-0 transition-opacity ${
              preferences.reducedMotion ? '' : 'duration-1000'
            } ${preferences.timeOfDay === 'dusk' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
          >
            <ArchitecturalRooftopSvg
              timeOfDay="dusk"
              reducedMotion={preferences.reducedMotion}
              highlightFocalWindow={true}
            />
          </div>

          {/* NIGHT LAYER */}
          <div
            className={`absolute inset-0 transition-opacity ${
              preferences.reducedMotion ? '' : 'duration-1000'
            } ${preferences.timeOfDay === 'night' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
          >
            <ArchitecturalRooftopSvg
              timeOfDay="night"
              reducedMotion={preferences.reducedMotion}
              highlightFocalWindow={true}
            />
          </div>
        </div>

        {/* Optional Rain on Window Glass */}
        <RainCanvas
          enabled={preferences.rainEnabled}
          reducedMotion={preferences.reducedMotion}
        />

        {/* Natural Atmospheric Haze */}
        {preferences.hazeEnabled && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#090c12]/70 via-transparent to-[#18212e]/20"
          />
        )}

        {/* Clickable center region to toggle gentle zoom */}
        <button
          type="button"
          onClick={() => setZoomed((z) => !z)}
          aria-label={
            zoomed
              ? 'Return to wider fifth-floor rooftop view'
              : 'Gently zoom toward the distant two-story house window'
          }
          className="absolute inset-x-[25%] inset-y-[22%] z-25 cursor-zoom-in rounded focus-visible:outline-2 focus-visible:outline-[#d99b4e]"
          style={{ cursor: zoomed ? 'zoom-out' : 'zoom-in' }}
        />

        {/* Top-left Return to Study Desk button */}
        <div className="absolute top-4 left-4 z-30">
          <button
            type="button"
            onClick={onBackToStudy}
            className="inline-flex min-h-[38px] items-center gap-2 rounded border border-[#e6e8ec]/20 bg-[#0b0f17]/80 px-3.5 py-1.5 font-sans text-xs text-[#d6dce6] backdrop-blur-md transition-colors hover:border-[#e6e8ec]/45 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
            <span>Step Back to Desk</span>
          </button>
        </div>

        {/* Bottom Caption Bar inside viewport */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col justify-between gap-2 bg-gradient-to-t from-[#07090e]/95 via-[#07090e]/65 to-transparent p-5 sm:flex-row sm:items-end sm:p-7">
          <div>
            <p className="font-mono text-xs font-medium tracking-[0.26em] text-[#d99b4e] uppercase tabular-nums">
              20 METERS APART
            </p>
            <p className="mt-1 font-serif text-lg text-[#e6e8ec] sm:text-xl">
              {TIME_DESCRIPTIONS[preferences.timeOfDay].note}
            </p>
          </div>
          <p className="max-w-xs font-sans text-xs leading-relaxed text-[#9aa3b2] sm:text-right">
            An animated illustrated reconstruction of remembered distance &amp; lighting—not a live
            view, GPS measurement, or indicator of anyone&apos;s presence.
          </p>
        </div>
      </div>
    </section>
  );
};
