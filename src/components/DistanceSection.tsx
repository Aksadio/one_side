import React, { useState, useEffect } from 'react';
import { Check, Edit3 } from 'lucide-react';

interface DistanceSectionProps {
  distanceNote: string;
  onSaveDistanceNote: (note: string) => void;
  reducedMotion: boolean;
}

export const DistanceSection: React.FC<DistanceSectionProps> = ({
  distanceNote,
  onSaveDistanceNote,
  reducedMotion,
}) => {
  const [draft, setDraft] = useState(distanceNote);
  const [isEditing, setIsEditing] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setDraft(distanceNote);
  }, [distanceNote]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveDistanceNote(draft.trim());
    setIsEditing(false);
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <section
      id="scene-distance"
      aria-labelledby="distance-heading"
      className="mx-auto w-full max-w-[1160px] px-4 py-20 sm:px-8"
    >
      <div className="border-y border-[#1e2530] py-16 sm:py-20">
        {/* Symbolic Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs tracking-[0.2em] text-[#8d96a5] uppercase">
            03 · Symbolic Span
          </p>
          <h2
            id="distance-heading"
            className="mt-3 font-serif text-5xl font-normal tracking-[0.12em] text-[#f2f4f7] sm:text-6xl tabular-nums"
          >
            20 METERS
          </h2>
          <p
            className="mt-4 font-serif text-xl italic text-[#cfd5df] sm:text-2xl"
            style={{ textWrap: 'balance' }}
          >
            &ldquo;A small distance. A world of things left unsaid.&rdquo;
          </p>
        </div>

        {/* Minimal Architectural Elevation Diagram connecting 5th-Floor Viewpoint & Two-Story House */}
        <div className="mx-auto mt-12 max-w-4xl rounded-lg border border-[#1d2430] bg-[#0e131b]/70 p-6 sm:p-10">
          <svg
            viewBox="0 0 900 280"
            className="h-auto w-full select-none"
            role="img"
            aria-label="Symbolic architectural elevation showing a fifth-floor study window on the left, utility rooftops between, and a two-story house window approximately 20 meters away on the right"
          >
            {/* Ground / Street Datum Line */}
            <line
              x1="40"
              y1="245"
              x2="860"
              y2="245"
              stroke="#2a3342"
              strokeWidth="1"
            />

            {/* Left Structure: 5th-Floor Residential Building */}
            <g>
              <rect
                x="85"
                y="38"
                width="135"
                height="207"
                fill="#141a24"
                stroke="#344052"
                strokeWidth="1.2"
              />
              {/* Floor dividers */}
              {[80, 121, 162, 203].map((y) => (
                <line
                  key={y}
                  x1="85"
                  y1={y}
                  x2="220"
                  y2={y}
                  stroke="#212936"
                  strokeWidth="1"
                />
              ))}
              {/* 5th-floor study desk window (highlighted) */}
              <rect
                x="182"
                y="50"
                width="26"
                height="20"
                fill="#d99b4e"
                fillOpacity="0.28"
                stroke="#d99b4e"
                strokeWidth="1.5"
              />
              <text
                x="85"
                y="24"
                fill="#9aa3b2"
                fontSize="11"
                fontFamily="Plus Jakarta Sans, sans-serif"
                letterSpacing="1.2"
              >
                FIFTH-FLOOR STUDY
              </text>
            </g>

            {/* Intervening low rooftop parapets & utility pole */}
            <g opacity="0.55">
              <rect x="310" y="175" width="120" height="70" fill="#11161f" stroke="#252e3d" />
              <rect x="455" y="188" width="110" height="57" fill="#11161f" stroke="#252e3d" />
              <line x1="442" y1="145" x2="442" y2="245" stroke="#2f3a4c" strokeWidth="1.5" />
            </g>

            {/* Right Structure: Two-Story House (~20m away) */}
            <g>
              {/* Rooftop water tank */}
              <rect x="692" y="132" width="22" height="16" rx="2" fill="#1c2430" stroke="#344052" />
              <rect
                x="665"
                y="148"
                width="145"
                height="97"
                fill="#161c26"
                stroke="#3a4556"
                strokeWidth="1.2"
              />
              <line x1="665" y1="196" x2="810" y2="196" stroke="#232c3a" strokeWidth="1" />
              {/* Distant focal window */}
              <rect
                x="686"
                y="162"
                width="30"
                height="22"
                fill="#d99b4e"
                fillOpacity="0.35"
                stroke="#d99b4e"
                strokeWidth="1.5"
              />
              <text
                x="665"
                y="120"
                fill="#9aa3b2"
                fontSize="11"
                fontFamily="Plus Jakarta Sans, sans-serif"
                letterSpacing="1.2"
              >
                TWO-STORY HOUSE
              </text>
            </g>

            {/* Symbolic Sightline Connection between the two windows */}
            <line
              x1="208"
              y1="60"
              x2="686"
              y2="173"
              stroke="#d99b4e"
              strokeWidth="1.25"
              strokeDasharray="5 5"
              opacity="0.8"
            >
              {!reducedMotion && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="20"
                  to="0"
                  dur="3.5s"
                  repeatCount="indefinite"
                />
              )}
            </line>

            {/* Endpoints */}
            <circle cx="208" cy="60" r="3.5" fill="#d99b4e" />
            <circle cx="686" cy="173" r="3.5" fill="#d99b4e" />

            {/* Midpoint label */}
            <rect x="386" y="96" width="128" height="24" rx="3" fill="#0b0e13" stroke="#2b3545" />
            <text
              x="450"
              y="112"
              textAnchor="middle"
              fill="#e6e8ec"
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="1.5"
            >
              ~ 20 METERS
            </text>
          </svg>

          <p className="mt-4 text-center font-sans text-xs text-[#7c8594]">
            Symbolic architectural representation based on personal memory—not a geographic map or
            measured survey.
          </p>
        </div>

        {/* Private Reflection Note on What the Distance Meant */}
        <div className="mx-auto mt-10 max-w-2xl">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-sans text-xs font-medium tracking-[0.16em] text-[#9aa3b2] uppercase">
              Private Note on This Distance
            </h3>
            <div className="flex items-center gap-3">
              {justSaved && (
                <span className="inline-flex items-center gap-1 font-sans text-xs text-[#c7d3e3]">
                  <Check className="h-3.5 w-3.5 text-[#d99b4e]" />
                  Saved locally
                </span>
              )}
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded border border-[#28313f] bg-[#121720] px-3 py-1.5 font-sans text-xs text-[#d6dce6] transition-colors hover:border-[#d99b4e]/60 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Edit3 className="h-3.5 w-3.5 text-[#d99b4e] shrink-0" />
                  <span>{distanceNote ? 'Edit Note' : 'Write Private Note'}</span>
                </button>
              )}
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="mt-3 space-y-3">
              <label htmlFor="distance-reflection-input" className="sr-only">
                What this distance meant to you
              </label>
              <textarea
                id="distance-reflection-input"
                rows={4}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write quietly in your own words what those twenty meters between the fifth-floor desk and that window meant to you..."
                className="w-full rounded-md border border-[#2e3848] bg-[#0b0f16] p-4 font-serif text-lg leading-relaxed text-[#e6e8ec] placeholder-[#6c7585] focus:border-[#d99b4e] focus:outline-none"
              />
              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setDraft(distanceNote);
                    setIsEditing(false);
                  }}
                  className="min-h-[38px] rounded border border-[#28313f] px-4 py-1.5 font-sans text-xs text-[#9aa3b2] hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[38px] rounded bg-[#d99b4e] px-4 py-1.5 font-sans text-xs font-medium text-[#0b0e13] transition-colors hover:bg-[#e5ad65] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Save Note
                </button>
              </div>
            </form>
          ) : distanceNote ? (
            <div className="mt-3 rounded-md border border-[#1d2430] bg-[#0f141d]/60 p-5">
              <p className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-[#dfe4ec]">
                {distanceNote}
              </p>
            </div>
          ) : (
            <p className="mt-3 font-serif text-base italic text-[#7c8594]">
              No note recorded yet. This space remains blank until you choose to put your own words
              here.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
