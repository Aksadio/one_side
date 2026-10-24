import React, { useState, useEffect } from 'react';
import { ArchitecturalRooftopSvg } from './ArchitecturalRooftopSvg';

interface OpeningSceneProps {
  onEnter: () => void;
  reducedMotion: boolean;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({ onEnter, reducedMotion }) => {
  const [revealed, setRevealed] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true);
      return;
    }
    const timer = window.setTimeout(() => setRevealed(true), 120);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <section
      aria-label="Opening Scene — The Window: 20 Meters Apart"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#090c11] text-[#e6e8ec]"
    >
      {/* Animated Cartoon Fifth-Floor Residential Window View Backdrop */}
      <div
        className={`absolute inset-0 transition-transform ${
          reducedMotion ? '' : 'duration-[2600ms] ease-out'
        } ${revealed ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-40'}`}
      >
        <ArchitecturalRooftopSvg
          timeOfDay="dusk"
          reducedMotion={reducedMotion}
          highlightFocalWindow={true}
        />
      </div>

      {/* Modest interior fifth-floor window casement silhouette framing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-[14px] border-[#07090d]/90 sm:border-[28px] lg:border-[42px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090d]/95 via-[#0b0f16]/45 to-[#07090d]/75"
      />
      <div aria-hidden="true" className="film-grain pointer-events-none absolute inset-0 z-10" />

      {/* Top quiet creator credit */}
      <div
        className={`relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8 sm:px-12 sm:pt-12 transition-opacity ${
          reducedMotion ? '' : 'duration-1000 delay-300'
        } ${revealed ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className="font-sans text-xs tracking-[0.22em] text-[#9aa3b2] uppercase">
          A Personal Memory Experience by AKSAD
        </p>
        <p className="hidden font-mono text-xs text-[#7c8594] sm:block tabular-nums">
          5th Floor · ~20m
        </p>
      </div>

      {/* Central restrained cinematic title */}
      <div className="relative z-20 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <div
          className={`transition-all ${
            reducedMotion ? '' : 'duration-1000 delay-500 ease-out'
          } ${revealed ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
        >
          <h1
            className="font-serif text-5xl font-normal tracking-[0.14em] text-[#f2f4f7] sm:text-7xl lg:text-[5.25rem]"
            style={{ textWrap: 'balance' }}
          >
            THE WINDOW
          </h1>
          <p className="mt-3 font-sans text-xs font-medium tracking-[0.34em] text-[#d99b4e] uppercase sm:text-sm">
            20 METERS APART
          </p>

          <div className="mx-auto my-7 h-px w-16 bg-[#e6e8ec]/20" aria-hidden="true" />

          <p
            className="mx-auto max-w-xl font-serif text-xl italic leading-relaxed text-[#d0d6e0] sm:text-2xl"
            style={{ textWrap: 'balance' }}
          >
            &ldquo;Somewhere between these rooftops, a window became a memory.&rdquo;
          </p>

          <div className="mt-10">
            <button
              type="button"
              onClick={onEnter}
              className="group inline-flex min-h-[44px] items-center justify-center border border-[#e6e8ec]/30 bg-[#0d1219]/75 px-8 py-3 font-sans text-xs font-medium tracking-[0.24em] text-[#f2f4f7] uppercase backdrop-blur-sm transition-all duration-200 hover:border-[#d99b4e]/70 hover:bg-[#161e29] hover:text-[#f7e7ce] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d99b4e] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Enter This Memory
            </button>
          </div>
        </div>
      </div>

      {/* Bottom quiet context note */}
      <div
        className={`relative z-20 mx-auto w-full max-w-6xl px-6 pb-8 text-center sm:px-12 sm:pb-10 transition-opacity ${
          reducedMotion ? '' : 'duration-1000 delay-700'
        } ${revealed ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className="font-sans text-xs text-[#7c8594]">
          Works quietly without sound · All personal notes remain private in your browser
        </p>
      </div>
    </section>
  );
};
