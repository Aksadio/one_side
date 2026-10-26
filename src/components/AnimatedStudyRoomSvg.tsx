import React from 'react';
import { TimeOfDay } from '../types';
import { ArchitecturalRooftopSvg } from './ArchitecturalRooftopSvg';

interface AnimatedStudyRoomSvgProps {
  timeOfDay: TimeOfDay;
  deskLampOn: boolean;
  reducedMotion: boolean;
  curtainOpen: boolean;
  onToggleCurtain: () => void;
}

/**
 * Hand-crafted animated 2D cartoon / anime-style fifth-floor study room illustration.
 * Features an open casement window with South Asian iron security grilles looking out
 * onto the animated cartoon rooftops, swaying window curtain, wooden study desk,
 * stacked textbooks, clothbound notebook with fluttering page corner, pen, steaming tea mug,
 * and interactive warm brass desk lamp.
 */
export const AnimatedStudyRoomSvg: React.FC<AnimatedStudyRoomSvgProps> = ({
  timeOfDay,
  deskLampOn,
  reducedMotion,
  curtainOpen,
  onToggleCurtain,
}) => {
  const roomColors = {
    day: {
      wallLeft: '#3c4654',
      wallRight: '#313a47',
      wallTrim: '#232a35',
      windowFrame: '#242c37',
      sill: '#465160',
      deskTop: '#6b4932',
      deskEdge: '#4b3120',
      deskShadow: '#382417',
      curtain: '#95a5b8',
      curtainShadow: '#738396',
    },
    dusk: {
      wallLeft: '#1e2532',
      wallRight: '#171d28',
      wallTrim: '#0f141d',
      windowFrame: '#141923',
      sill: '#252e3d',
      deskTop: '#4f3422',
      deskEdge: '#332015',
      deskShadow: '#21140d',
      curtain: '#4c5b70',
      curtainShadow: '#354152',
    },
    night: {
      wallLeft: '#121722',
      wallRight: '#0d111a',
      wallTrim: '#080b11',
      windowFrame: '#0c1017',
      sill: '#181f2b',
      deskTop: '#3b2618',
      deskEdge: '#24160e',
      deskShadow: '#150c07',
      curtain: '#2c3646',
      curtainShadow: '#1d2531',
    },
  }[timeOfDay];

  const outline = '#090d14';

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full select-none"
      role="group"
      aria-label="Animated cartoon illustration of a modest fifth-floor study desk beside an open window overlooking dense residential rooftops, featuring stacked books, a clothbound notebook, pen, and desk lamp"
    >
      <defs>
        {/* Repeating curtain pleats (14 folds across the curtain) */}
        <linearGradient id="curtain-pleats" x1="0" y1="0" x2="0.0714" y2="0" spreadMethod="repeat">
          <stop offset="0%" stopColor={roomColors.curtainShadow} />
          <stop offset="50%" stopColor={roomColors.curtain} />
          <stop offset="100%" stopColor={roomColors.curtainShadow} />
        </linearGradient>

        {/* Clip path for the open fifth-floor window aperture */}
        <clipPath id="study-window-aperture">
          <rect x="135" y="78" width="845" height="535" rx="3" />
        </clipPath>

        {/* Warm Cartoon Desk Lamp Cone Gradient */}
        <radialGradient id="cartoon-lamp-cone" cx="68%" cy="46%" r="55%">
          <stop offset="0%" stopColor="#ffcf7d" stopOpacity="0.48" />
          <stop offset="45%" stopColor="#e59e46" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#e59e46" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="lamp-beam-poly" x1="0.5" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#ffe1a6" stopOpacity="0.34" />
          <stop offset="70%" stopColor="#e8a248" stopOpacity="0.11" />
          <stop offset="100%" stopColor="#e8a248" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 1. ROOM INTERIOR PLASTER WALLS */}
      <rect width="1600" height="900" fill={roomColors.wallRight} />
      <polygon points="0,0 1060,0 1060,900 0,900" fill={roomColors.wallLeft} />
      {/* Subtle wall corner line */}
      <line x1="1060" y1="0" x2="1060" y2="660" stroke={outline} strokeWidth="2.5" opacity="0.6" />

      {/* Small pinned study timetable note on right wall */}
      <g transform="translate(1125, 165) rotate(1.2)" stroke={outline} strokeWidth="2">
        <rect x="0" y="0" width="118" height="148" fill={timeOfDay === 'day' ? '#d8d5cc' : '#7b7d85'} rx="2" />
        <circle cx="59" cy="10" r="3.5" fill="#b85344" />
        <line x1="18" y1="34" x2="98" y2="34" stroke={outline} strokeWidth="1.8" opacity="0.45" />
        <line x1="18" y1="54" x2="88" y2="54" stroke={outline} strokeWidth="1.8" opacity="0.45" />
        <line x1="18" y1="74" x2="94" y2="74" stroke={outline} strokeWidth="1.8" opacity="0.45" />
        <line x1="18" y1="94" x2="72" y2="94" stroke={outline} strokeWidth="1.8" opacity="0.45" />
      </g>

      {/* 2. FIFTH-FLOOR WINDOW APERTURE SHOWING ANIMATED CARTOON ROOFTOPS */}
      <g clipPath="url(#study-window-aperture)">
        <g transform="translate(65, 25) scale(0.84)">
          <ArchitecturalRooftopSvg
            timeOfDay={timeOfDay}
            reducedMotion={reducedMotion}
            highlightFocalWindow={true}
          />
        </g>
      </g>

      {/* 3. WINDOW FRAME, IRON SECURITY GRILLES & OPEN CASEMENT SHUTTERS */}
      <g stroke={outline} strokeWidth="3" strokeLinejoin="round">
        {/* Recessed window wall depth */}
        <polygon points="118,62 998,62 980,78 135,78" fill={roomColors.wallTrim} />
        <polygon points="998,62 998,630 980,613 980,78" fill={roomColors.wallTrim} />
        <polygon points="118,62 135,78 135,613 118,630" fill={roomColors.sill} />

        {/* Outer Wooden Window Frame */}
        <rect
          x="118"
          y="62"
          width="880"
          height="568"
          fill="none"
          stroke={roomColors.windowFrame}
          strokeWidth="16"
        />
        <rect x="110" y="54" width="896" height="584" fill="none" stroke={outline} strokeWidth="2.8" />

        {/* South Asian Horizontal & Vertical Iron Grille Bars */}
        <g stroke={outline} strokeWidth="3.2" opacity="0.88">
          <line x1="345" y1="78" x2="345" y2="613" />
          <line x1="558" y1="78" x2="558" y2="613" strokeWidth="5" />
          <line x1="770" y1="78" x2="770" y2="613" />

          <line x1="135" y1="212" x2="980" y2="212" />
          <line x1="135" y1="346" x2="980" y2="346" />
          <line x1="135" y1="480" x2="980" y2="480" />
        </g>

        {/* Left Open Wooden Casement Shutter Angled Inward */}
        <polygon
          points="122,70 205,102 205,588 122,620"
          fill={roomColors.windowFrame}
          stroke={outline}
          strokeWidth="2.8"
        />
        <polygon
          points="136,92 192,114 192,572 136,596"
          fill="#2d3b4e"
          opacity="0.45"
        />

        {/* Window Concrete Sill */}
        <polygon points="96,626 1020,626 1036,650 84,650" fill={roomColors.sill} />
      </g>

      {/* Window curtain: closed = covers the whole window, open = gathered at the right edge.
          Click (or Enter / Space) on the curtain to open or close it. */}
      <rect x="85" y="38" width="955" height="9" rx="4" fill="#2c221b" stroke={outline} strokeWidth="2.5" />
      <g
        role="button"
        tabIndex={0}
        aria-pressed={curtainOpen}
        aria-label={curtainOpen ? 'Close the window curtain' : 'Open the window curtain'}
        onClick={onToggleCurtain}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleCurtain();
          }
        }}
        className="cursor-pointer outline-none transition-[filter] duration-200 hover:brightness-110 focus-visible:brightness-125"
        style={{
          transformBox: 'fill-box',
          transformOrigin: '100% 50%',
          transform: `scaleX(${curtainOpen ? 0.14 : 1})`,
          transition: reducedMotion ? 'none' : 'transform 1100ms cubic-bezier(0.65, 0, 0.35, 1)',
        }}
      >
        <title>{curtainOpen ? 'Close the curtain' : 'Open the curtain'}</title>
        <rect
          x="100"
          y="47"
          width="912"
          height="589"
          fill="url(#curtain-pleats)"
          stroke={outline}
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
        {/* Soft hem shadow along the bottom of the curtain */}
        <rect x="100" y="612" width="912" height="24" fill={roomColors.curtainShadow} opacity="0.55" />
      </g>

      {/* 4. MODEST WOODEN STUDY DESK BESIDE THE WINDOW */}
      <g stroke={outline} strokeWidth="3" strokeLinejoin="round">
        {/* Desk Tabletop Surface */}
        <polygon points="0,665 1600,665 1600,900 0,900" fill={roomColors.deskTop} />
        {/* Subtle wood grain cartoon lines */}
        <path
          d="M 80 735 Q 480 728 920 738 M 240 815 Q 760 805 1380 820"
          stroke={roomColors.deskEdge}
          strokeWidth="2"
          fill="none"
          opacity="0.55"
        />
        {/* Back raised lip of study desk */}
        <rect x="0" y="655" width="1600" height="14" fill={roomColors.deskEdge} />
      </g>

      {/* 5. STACKED STUDY TEXTBOOKS (LEFT SIDE OF DESK) */}
      <g transform="translate(155, 578)" stroke={outline} strokeWidth="2.6" strokeLinejoin="round">
        {/* Bottom Heavy Textbook */}
        <polygon points="0,85 235,85 258,108 18,108" fill="#31495e" />
        <rect x="18" y="108" width="240" height="32" rx="2" fill="#e6dfd1" />
        <line x1="24" y1="118" x2="252" y2="118" stroke="#b5ae9e" strokeWidth="1.5" />
        <line x1="24" y1="128" x2="252" y2="128" stroke="#b5ae9e" strokeWidth="1.5" />
        <polygon points="0,85 18,108 18,140 0,116" fill="#233647" />

        {/* Middle Brick-Red Textbook */}
        <g transform="translate(14, -28)">
          <polygon points="0,85 215,85 236,105 16,105" fill="#7c3f38" />
          <rect x="16" y="105" width="220" height="27" rx="2" fill="#ebe5d8" />
          <line x1="22" y1="117" x2="230" y2="117" stroke="#b5ae9e" strokeWidth="1.5" />
          <polygon points="0,85 16,105 16,132 0,112" fill="#5c2c27" />
        </g>

        {/* Top Olive Study Guide */}
        <g transform="translate(26, -52)">
          <polygon points="0,85 190,85 208,102 14,102" fill="#4b5e4d" />
          <rect x="14" y="102" width="194" height="23" rx="2" fill="#efe9dc" />
          <polygon points="0,85 14,102 14,125 0,108" fill="#364538" />
        </g>
      </g>

      {/* 6. CERAMIC TEA CUP WITH ANIMATED RISING CARTOON STEAM */}
      <g transform="translate(485, 638)">
        {/* Animated delicate steam wisps */}
        <g fill="none" stroke="#dce4ef" strokeWidth="2.2" strokeLinecap="round" opacity="0.45">
          <path d="M 24 -4 Q 16 -22 28 -38 Q 38 -52 24 -68">
            {!reducedMotion && (
              <animate
                attributeName="d"
                dur="4.2s"
                repeatCount="indefinite"
                values="
                  M 24 -4 Q 16 -22 28 -38 Q 38 -52 24 -68;
                  M 24 -4 Q 32 -22 20 -38 Q 12 -52 26 -68;
                  M 24 -4 Q 16 -22 28 -38 Q 38 -52 24 -68
                "
              />
            )}
          </path>
          <path d="M 42 -8 Q 50 -24 38 -40 Q 30 -54 42 -66" opacity="0.65">
            {!reducedMotion && (
              <animate
                attributeName="d"
                dur="5s"
                repeatCount="indefinite"
                values="
                  M 42 -8 Q 50 -24 38 -40 Q 30 -54 42 -66;
                  M 42 -8 Q 34 -24 46 -40 Q 52 -54 38 -66;
                  M 42 -8 Q 50 -24 38 -40 Q 30 -54 42 -66
                "
              />
            )}
          </path>
        </g>

        {/* Mug body */}
        <g stroke={outline} strokeWidth="2.5">
          <path d="M 52 16 C 72 16 72 48 52 48" fill="none" stroke="#c8c2b6" strokeWidth="6" />
          <path d="M 52 16 C 72 16 72 48 52 48" fill="none" stroke={outline} strokeWidth="2.2" />
          <ellipse cx="30" cy="60" rx="26" ry="7" fill="#241811" stroke="none" opacity="0.45" />
          <rect x="6" y="6" width="48" height="52" rx="6" fill="#d8d1c5" />
          <ellipse cx="30" cy="8" rx="24" ry="6" fill="#7d5233" />
        </g>
      </g>

      {/* 7. CLOTHBOUND PERSONAL NOTEBOOK & BALLPOINT PEN (CENTER-RIGHT OF DESK) */}
      <g transform="translate(690, 718)" stroke={outline} strokeWidth="2.8" strokeLinejoin="round">
        {/* Drop shadow on desk */}
        <polygon points="8,14 335,14 378,118 32,118" fill={roomColors.deskShadow} stroke="none" opacity="0.65" />

        {/* Closed/Slightly Ajar Clothbound Notebook Cover */}
        <polygon points="0,8 322,8 362,106 24,106" fill="#232c3b" />
        {/* Cream Paper Block Edge */}
        <polygon points="24,106 362,106 362,118 24,118" fill="#e8e0cf" />
        {/* Cloth Spine Accent */}
        <polygon points="0,8 36,8 60,106 24,106" fill="#171d28" />
        {/* Amber Ribbon Bookmark */}
        <polygon points="188,114 204,114 214,142 198,136 186,143" fill="#d99b4e" strokeWidth="2" />

        {/* Subtle Breeze-Fluttering Loose Corner Page Peeking Out */}
        <path
          d="M 285 8 L 320 8 L 356 96 L 315 96 Z"
          fill="#f2ead9"
          stroke={outline}
          strokeWidth="1.8"
        >
          {!reducedMotion && (
            <animate
              attributeName="d"
              dur="4.8s"
              repeatCount="indefinite"
              values="
                M 285 8 L 320 8 L 356 96 L 315 96 Z;
                M 285 8 L 323 2 L 358 92 L 315 96 Z;
                M 285 8 L 320 8 L 356 96 L 315 96 Z
              "
            />
          )}
        </path>

        {/* Notebook Cover Label */}
        <rect x="118" y="38" width="124" height="32" rx="2" fill="#e8e0cf" strokeWidth="2" />
        <line x1="134" y1="50" x2="226" y2="50" stroke="#5b6472" strokeWidth="2" />
        <line x1="148" y1="60" x2="212" y2="60" stroke="#5b6472" strokeWidth="1.6" />

        {/* Simple Ballpoint Pen Resting Beside Notebook */}
        <g transform="translate(382, 26) rotate(19)">
          <rect x="0" y="0" width="12" height="92" rx="4" fill="#2f3947" strokeWidth="2.2" />
          <polygon points="0,92 12,92 6,108" fill="#d99b4e" strokeWidth="2" />
          <rect x="2" y="12" width="3" height="28" fill="#9aa5b4" stroke="none" />
        </g>
      </g>

      {/* 8. ARTICULATED STUDY DESK LAMP (RIGHT SIDE) + WARM LIGHT BEAM */}
      {deskLampOn && (
        <g pointerEvents="none">
          <polygon
            points="1235,382 620,895 1540,895 1315,392"
            fill="url(#lamp-beam-poly)"
          >
            {!reducedMotion && (
              <animate
                attributeName="opacity"
                values="0.9;1;0.9"
                dur="4s"
                repeatCount="indefinite"
              />
            )}
          </polygon>
          <ellipse cx="1045" cy="765" rx="480" ry="155" fill="url(#cartoon-lamp-cone)" />
        </g>
      )}

      <g stroke={outline} strokeWidth="3" strokeLinejoin="round">
        {/* Weighted Lamp Base */}
        <ellipse cx="1395" cy="735" rx="68" ry="18" fill={roomColors.deskShadow} stroke="none" opacity="0.6" />
        <ellipse cx="1395" cy="726" rx="62" ry="15" fill="#2d3644" />
        <ellipse cx="1395" cy="718" rx="46" ry="11" fill="#3e4959" />

        {/* Articulated Metal Arm */}
        <line x1="1395" y1="714" x2="1442" y2="520" stroke="#394454" strokeWidth="11" strokeLinecap="round" />
        <line x1="1395" y1="714" x2="1442" y2="520" stroke={outline} strokeWidth="3" />
        <circle cx="1442" cy="520" r="11" fill="#d99b4e" />

        <line x1="1442" y1="520" x2="1295" y2="375" stroke="#394454" strokeWidth="10" strokeLinecap="round" />
        <line x1="1442" y1="520" x2="1295" y2="375" stroke={outline} strokeWidth="3" />
        <circle cx="1295" cy="375" r="9" fill="#d99b4e" />

        {/* Classic Dome Lamp Shade */}
        <g transform="translate(1272, 375) rotate(24)">
          {deskLampOn && (
            <ellipse cx="0" cy="48" rx="44" ry="18" fill="#ffdf9a" stroke="none" />
          )}
          <path
            d="M -22 0 C -22 -22 22 -22 22 0 L 52 46 L -52 46 Z"
            fill={deskLampOn ? '#465468' : '#2a3340'}
          />
          <ellipse
            cx="0"
            cy="46"
            rx="52"
            ry="11"
            fill={deskLampOn ? '#ffe3a3' : '#1b222c'}
          />
        </g>
      </g>

      {/* Subtle Floating Dust Motes in Warm Lamp Light */}
      {deskLampOn && !reducedMotion && (
        <g fill="#ffe6b3" opacity="0.55">
          {[
            { cx: 1120, cy: 520, r: 2.2, dur: '6s' },
            { cx: 1030, cy: 610, r: 1.8, dur: '7.5s' },
            { cx: 1190, cy: 640, r: 2.0, dur: '5.5s' },
            { cx: 945, cy: 675, r: 1.6, dur: '8s' },
          ].map((m, i) => (
            <circle key={i} cx={m.cx} cy={m.cy} r={m.r}>
              <animate
                attributeName="cy"
                values={`${m.cy};${m.cy - 22};${m.cy}`}
                dur={m.dur}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.2;0.7;0.2"
                dur={m.dur}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}

      {/* Room Dimming Scrim when Desk Lamp is Switched Off */}
      {!deskLampOn && (
        <rect
          width="1600"
          height="900"
          fill="#070a10"
          opacity={timeOfDay === 'day' ? 0.16 : 0.42}
          pointerEvents="none"
        />
      )}
    </svg>
  );
};
