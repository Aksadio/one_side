import React from 'react';
import { TimeOfDay } from '../types';

interface ArchitecturalRooftopProps {
  timeOfDay: TimeOfDay;
  reducedMotion?: boolean;
  highlightFocalWindow?: boolean;
}

/**
 * Hand-crafted animated 2D cartoon / cel-shaded anime background illustration
 * depicting dense South Asian residential rooftops, unfinished brick walls,
 * weathered concrete parapets, rooftop water tanks, swaying utility wires,
 * drifting clouds, rustling potted plants, and the two-story house ~20m away.
 */
export const ArchitecturalRooftopSvg: React.FC<ArchitecturalRooftopProps> = ({
  timeOfDay,
  reducedMotion = false,
  highlightFocalWindow = true,
}) => {
  const palette = {
    day: {
      skyTop: '#8fa8be',
      skyMid: '#b5c7d6',
      skyBottom: '#dce4ea',
      cloud: '#f0f4f8',
      cloudShadow: '#c3d1de',
      sunOrMoon: '#f7efe1',
      farCity: '#7f90a0',
      farCityDark: '#6b7b8b',
      midConcrete: '#969fa8',
      midConcreteShade: '#79838e',
      parapetTop: '#b0b8c0',
      brickBase: '#9e5b49',
      brickDark: '#7d4334',
      brickMortar: '#b37a6a',
      houseMain: '#a7afb6',
      houseSide: '#879099',
      tankBody: '#2d3540',
      tankHighlight: '#465261',
      outline: '#1d242e',
      windowGlass: '#4a5868',
      focalLightLeft: '#5c6773',
      focalLightRight: '#786e60',
      curtainColor: '#c9cfd6',
      foliage: '#4a6b53',
      foliageLight: '#648a6e',
      wire: '#1d242e',
      distantWinLit: '#8693a0',
    },
    dusk: {
      skyTop: '#1d283a',
      skyMid: '#374863',
      skyBottom: '#6d6875',
      cloud: '#565c73',
      cloudShadow: '#384057',
      sunOrMoon: '#e6b87d',
      farCity: '#283345',
      farCityDark: '#1e2736',
      midConcrete: '#394454',
      midConcreteShade: '#2a3341',
      parapetTop: '#4a5769',
      brickBase: '#5e3730',
      brickDark: '#432622',
      brickMortar: '#73473f',
      houseMain: '#445061',
      houseSide: '#313b4a',
      tankBody: '#161c26',
      tankHighlight: '#283242',
      outline: '#0e131b',
      windowGlass: '#1c2430',
      focalLightLeft: '#8f6234',
      focalLightRight: '#f0ad56',
      curtainColor: '#f5cb86',
      foliage: '#25382e',
      foliageLight: '#354f41',
      wire: '#0d1118',
      distantWinLit: '#d89b4c',
    },
    night: {
      skyTop: '#070b12',
      skyMid: '#101826',
      skyBottom: '#1c293d',
      cloud: '#162133',
      cloudShadow: '#0d1522',
      sunOrMoon: '#dce6f5',
      farCity: '#111824',
      farCityDark: '#0b1019',
      midConcrete: '#1a2330',
      midConcreteShade: '#121923',
      parapetTop: '#243040',
      brickBase: '#331e1c',
      brickDark: '#221312',
      brickMortar: '#422825',
      houseMain: '#202b3b',
      houseSide: '#151d29',
      tankBody: '#090d13',
      tankHighlight: '#161e2b',
      outline: '#06080d',
      windowGlass: '#0d131c',
      focalLightLeft: '#7a5026',
      focalLightRight: '#e89d42',
      curtainColor: '#f0be71',
      foliage: '#121f19',
      foliageLight: '#1c2e25',
      wire: '#05070b',
      distantWinLit: '#c98a3b',
    },
  }[timeOfDay];

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full select-none"
      role="img"
      aria-label={`Animated cartoon illustration of South Asian residential rooftops and a two-story house 20 meters away at ${timeOfDay}`}
    >
      <defs>
        {/* Illustrated Cel-Shaded Sky Gradient */}
        <linearGradient id={`cartoon-sky-${timeOfDay}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.skyTop} />
          <stop offset="58%" stopColor={palette.skyMid} />
          <stop offset="100%" stopColor={palette.skyBottom} />
        </linearGradient>

        {/* Soft Cartoon Brick Pattern */}
        <pattern
          id={`brick-tex-${timeOfDay}`}
          width="36"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect width="36" height="20" fill={palette.brickBase} />
          <path
            d="M 0 10 H 36 M 18 0 V 10 M 0 10 V 20 M 36 10 V 20"
            stroke={palette.brickDark}
            strokeWidth="2"
          />
          <rect x="2" y="2" width="13" height="5" fill={palette.brickMortar} opacity="0.22" rx="1" />
          <rect x="21" y="12" width="12" height="5" fill={palette.brickDark} opacity="0.35" rx="1" />
        </pattern>

        {/* Warm Focal Window Cartoon Halo */}
        <radialGradient id={`cartoon-window-halo-${timeOfDay}`} cx="50%" cy="50%" r="55%">
          <stop
            offset="0%"
            stopColor="#f7be6d"
            stopOpacity={timeOfDay === 'day' ? 0.08 : 0.65}
          />
          <stop
            offset="55%"
            stopColor="#df953f"
            stopOpacity={timeOfDay === 'day' ? 0.0 : 0.22}
          />
          <stop offset="100%" stopColor="#df953f" stopOpacity="0" />
        </radialGradient>

        {/* Atmospheric Horizon Mist */}
        <linearGradient id={`horizon-haze-${timeOfDay}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.skyBottom} stopOpacity="0" />
          <stop offset="100%" stopColor={palette.skyBottom} stopOpacity="0.32" />
        </linearGradient>
      </defs>

      {/* 1. SKY BACKDROP */}
      <rect width="1600" height="900" fill={`url(#cartoon-sky-${timeOfDay})`} />

      {/* Twinkling Cartoon Stars (Night & Dusk) */}
      {timeOfDay !== 'day' && (
        <g fill="#e8effa">
          {[
            { cx: 210, cy: 88, r: 1.8, dur: '3.6s' },
            { cx: 430, cy: 62, r: 1.4, dur: '4.8s' },
            { cx: 685, cy: 105, r: 2.0, dur: '3.9s' },
            { cx: 940, cy: 54, r: 1.5, dur: '5.2s' },
            { cx: 1190, cy: 96, r: 1.9, dur: '4.1s' },
            { cx: 1410, cy: 70, r: 1.5, dur: '4.5s' },
            { cx: 1080, cy: 145, r: 1.3, dur: '3.3s' },
          ].map((s, idx) => (
            <circle
              key={idx}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              opacity={timeOfDay === 'night' ? 0.75 : 0.28}
            >
              {!reducedMotion && (
                <animate
                  attributeName="opacity"
                  values={
                    timeOfDay === 'night' ? '0.25;0.85;0.25' : '0.1;0.35;0.1'
                  }
                  dur={s.dur}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}
        </g>
      )}

      {/* Illustrated Moon / Pale Sun */}
      {timeOfDay === 'night' ? (
        <g transform="translate(1265, 115)">
          <circle cx="0" cy="0" r="32" fill={palette.sunOrMoon} opacity="0.14" />
          <path
            d="M -6 -22 A 22 22 0 1 0 18 12 A 17 17 0 1 1 -6 -22 Z"
            fill={palette.sunOrMoon}
          />
        </g>
      ) : (
        <g transform={timeOfDay === 'dusk' ? 'translate(540, 235)' : 'translate(1180, 125)'}>
          <circle cx="0" cy="0" r="46" fill={palette.sunOrMoon} opacity="0.22" />
          <circle cx="0" cy="0" r="26" fill={palette.sunOrMoon} opacity="0.65" />
        </g>
      )}

      {/* Animated Stylized Cartoon Clouds Drifting Slowly */}
      <g opacity={timeOfDay === 'night' ? 0.45 : 0.82}>
        <g>
          {!reducedMotion && (
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-90 0"
              to="90 0"
              dur="48s"
              repeatCount="indefinite"
            />
          )}
          {/* Cloud Cluster Left */}
          <path
            d="M 110 190 Q 135 162 175 168 Q 205 142 252 156 Q 290 155 308 182 Q 338 185 342 204 L 95 204 Q 92 192 110 190 Z"
            fill={palette.cloud}
          />
          <path
            d="M 95 204 L 342 204 Q 336 212 315 212 L 112 212 Q 96 212 95 204 Z"
            fill={palette.cloudShadow}
          />

          {/* Cloud Cluster Right */}
          <path
            d="M 980 155 Q 1010 128 1055 135 Q 1095 108 1148 126 Q 1192 126 1212 152 L 965 156 Z"
            fill={palette.cloud}
          />
          <path
            d="M 965 156 L 1212 152 Q 1208 164 1185 164 L 985 164 Z"
            fill={palette.cloudShadow}
          />
        </g>
      </g>

      {/* Distant Cartoon Birds Gliding */}
      {timeOfDay !== 'night' && (
        <g stroke={palette.outline} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6">
          {!reducedMotion && (
            <animateTransform
              attributeName="transform"
              type="translate"
              from="1620 40"
              to="-260 -30"
              dur="36s"
              repeatCount="indefinite"
            />
          )}
          <path d="M 0 180 Q 6 173 12 180 Q 18 173 24 180" />
          <path d="M 34 192 Q 39 186 44 192 Q 49 186 54 192" />
          <path d="M -22 196 Q -17 191 -12 196 Q -7 191 -2 196" />
        </g>
      )}

      {/* 2. DISTANT BACKGROUND NEIGHBORHOOD SKYLINE (Cartoon Outlined Silhouettes) */}
      <g stroke={palette.outline} strokeWidth="2" strokeLinejoin="round">
        <rect x="20" y="295" width="165" height="320" fill={palette.farCity} />
        <rect x="175" y="255" width="195" height="360" fill={palette.farCityDark} />
        <rect x="355" y="305" width="175" height="310" fill={palette.farCity} />
        <rect x="515" y="275" width="165" height="340" fill={palette.farCityDark} />
        <rect x="665" y="315" width="190" height="300" fill={palette.farCity} />
        <rect x="840" y="268" width="210" height="347" fill={palette.farCityDark} />
        <rect x="1035" y="290" width="180" height="325" fill={palette.farCity} />
        <rect x="1200" y="242" width="225" height="373" fill={palette.farCityDark} />
        <rect x="1410" y="285" width="180" height="330" fill={palette.farCity} />

        {/* Distant rooftop stairwells (mumties) & water tanks */}
        <rect x="215" y="226" width="52" height="29" fill={palette.farCity} />
        <rect x="292" y="232" width="28" height="23" rx="4" fill={palette.tankBody} />
        <rect x="885" y="238" width="58" height="30" fill={palette.farCity} />
        <rect x="1245" y="212" width="64" height="30" fill={palette.farCity} />
        <rect x="1330" y="218" width="32" height="24" rx="4" fill={palette.tankBody} />
        <rect x="1368" y="220" width="28" height="22" rx="4" fill={palette.tankBody} />
      </g>

      {/* Distant Subtle Apartment Windows */}
      <g fill={palette.distantWinLit} opacity={timeOfDay === 'day' ? 0.35 : 0.55}>
        <rect x="215" y="290" width="16" height="22" rx="1" />
        <rect x="245" y="290" width="16" height="22" rx="1" />
        <rect x="895" y="310" width="18" height="22" rx="1" />
        <rect x="1260" y="280" width="16" height="24" rx="1" />
        <rect x="1290" y="280" width="16" height="24" rx="1" />
      </g>

      {/* Horizon Atmospheric Mist */}
      <rect x="0" y="260" width="1600" height="220" fill={`url(#horizon-haze-${timeOfDay})`} />

      {/* 3. MID-GROUND LEFT: WEATHERED CONCRETE APARTMENT BLOCK */}
      <g stroke={palette.outline} strokeWidth="2.5" strokeLinejoin="round">
        {/* Side shadow wall */}
        <polygon points="40,365 110,345 110,840 40,840" fill={palette.midConcreteShade} />
        {/* Main concrete front face */}
        <rect x="110" y="345" width="350" height="495" fill={palette.midConcrete} />
        {/* Flat rooftop parapet wall */}
        <rect x="104" y="325" width="362" height="22" fill={palette.parapetTop} />
        {/* Rooftop stairwell (mumty) */}
        <rect x="155" y="268" width="96" height="57" fill={palette.midConcrete} />
        <polygon points="148,268 258,268 252,258 154,258" fill={palette.parapetTop} />
        <rect x="188" y="284" width="26" height="41" fill={palette.midConcreteShade} />

        {/* Ribbed Cylindrical Black Water Tank on Left Roof */}
        <g transform="translate(325, 282)">
          <rect x="0" y="6" width="52" height="38" rx="6" fill={palette.tankBody} />
          <rect x="8" y="6" width="12" height="38" fill={palette.tankHighlight} stroke="none" opacity="0.5" />
          <line x1="0" y1="17" x2="52" y2="17" stroke={palette.outline} strokeWidth="2" />
          <line x1="0" y1="29" x2="52" y2="29" stroke={palette.outline} strokeWidth="2" />
          <rect x="15" y="0" width="22" height="6" rx="2" fill={palette.tankBody} />
        </g>

        {/* Left Building Recessed Balconies & Grilled Windows */}
        {[405, 535].map((yPos, idx) => (
          <g key={idx}>
            {/* Concrete sunshade (chajja) */}
            <polygon
              points={`150,${yPos} 275,${yPos} 282,${yPos + 10} 144,${yPos + 10}`}
              fill={palette.parapetTop}
            />
            <rect x="160" y={yPos + 10} width="104" height="66" fill={palette.windowGlass} />
            <line x1="212" y1={yPos + 10} x2="212" y2={yPos + 76} stroke={palette.outline} strokeWidth="2.5" />
            <line x1="160" y1={yPos + 42} x2="264" y2={yPos + 42} stroke={palette.outline} strokeWidth="2" />

            {/* Small balcony with iron railing */}
            <rect x="315" y={yPos + 6} width="108" height="82" fill={palette.midConcreteShade} />
            <rect x="310" y={yPos + 58} width="118" height="32" fill={palette.parapetTop} />
            <line x1="315" y1={yPos + 46} x2="423" y2={yPos + 46} stroke={palette.outline} strokeWidth="2" />
          </g>
        ))}

        {/* Cartoon Clothesline Gently Swaying on Left Rooftop */}
        <line x1="251" y1="295" x2="325" y2="298" stroke={palette.outline} strokeWidth="1.8" />
        <g>
          {!reducedMotion && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 275 296; 4 275 296; 0 275 296"
              dur="4.5s"
              repeatCount="indefinite"
            />
          )}
          <polygon points="266,296 284,297 287,318 263,317" fill="#6f879e" stroke={palette.outline} strokeWidth="1.8" />
        </g>
        <g>
          {!reducedMotion && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 302 297; 5 302 297; 0 302 297"
              dur="5.2s"
              repeatCount="indefinite"
            />
          )}
          <polygon points="292,297 310,298 313,315 290,314" fill="#b87d6a" stroke={palette.outline} strokeWidth="1.8" />
        </g>
      </g>

      {/* 4. MID-GROUND RIGHT: UNFINISHED EXPOSED BRICK BUILDING */}
      <g stroke={palette.outline} strokeWidth="2.5" strokeLinejoin="round">
        {/* Concrete column frame */}
        <rect x="1035" y="352" width="470" height="510" fill={`url(#brick-tex-${timeOfDay})`} />
        {/* Exposed concrete floor slab bands */}
        <rect x="1030" y="334" width="480" height="20" fill={palette.midConcrete} />
        <rect x="1035" y="485" width="470" height="14" fill={palette.midConcreteShade} />
        <rect x="1035" y="635" width="470" height="14" fill={palette.midConcreteShade} />
        {/* Concrete pillars */}
        <rect x="1035" y="354" width="22" height="508" fill={palette.midConcreteShade} />
        <rect x="1255" y="354" width="20" height="508" fill={palette.midConcreteShade} />

        {/* Rebar rods sticking out of unfinished roof columns (authentic South Asian detail) */}
        <g stroke={palette.outline} strokeWidth="2">
          <line x1="1042" y1="334" x2="1042" y2="314" />
          <line x1="1050" y1="334" x2="1050" y2="317" />
          <line x1="1261" y1="334" x2="1261" y2="313" />
          <line x1="1269" y1="334" x2="1269" y2="316" />
        </g>

        {/* Rooftop water tank on brick building */}
        <g transform="translate(1135, 292)">
          <rect x="0" y="6" width="56" height="36" rx="6" fill={palette.tankBody} />
          <rect x="16" y="0" width="24" height="6" rx="2" fill={palette.tankBody} />
          <line x1="0" y1="18" x2="56" y2="18" stroke={palette.outline} strokeWidth="2" />
          <line x1="0" y1="29" x2="56" y2="29" stroke={palette.outline} strokeWidth="2" />
        </g>

        {/* Windows on brick building */}
        <polygon points="1095,400 1210,400 1216,409 1089,409" fill={palette.parapetTop} />
        <rect x="1105" y="409" width="94" height="60" fill={palette.windowGlass} />
        <line x1="1152" y1="409" x2="1152" y2="469" stroke={palette.outline} strokeWidth="2.5" />

        <polygon points="1315,400 1430,400 1436,409 1309,409" fill={palette.parapetTop} />
        <rect x="1325" y="409" width="94" height="60" fill={palette.windowGlass} />
        <line x1="1372" y1="409" x2="1372" y2="469" stroke={palette.outline} strokeWidth="2.5" />
      </g>

      {/* 5. CENTRAL TWO-STORY HOUSE (~20 METERS AWAY — FOCAL POINT) */}
      <g>
        {/* Warm Cartoon Glow Aura Behind/Around the Focal Window */}
        {highlightFocalWindow && (
          <circle
            cx="762"
            cy="524"
            r="135"
            fill={`url(#cartoon-window-halo-${timeOfDay})`}
          >
            {!reducedMotion && timeOfDay !== 'day' && (
              <animate
                attributeName="r"
                values="128;142;128"
                dur="6s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        )}

        <g stroke={palette.outline} strokeWidth="2.6" strokeLinejoin="round">
          {/* Recessed side wall in unfinished brick */}
          <polygon points="945,402 1005,422 1005,830 945,830" fill={`url(#brick-tex-${timeOfDay})`} />

          {/* Main Two-StoryPlastered Concrete House Facade */}
          <rect x="575" y="402" width="370" height="428" fill={palette.houseMain} />

          {/* Subtle plaster weathering patch (cel-shaded flat polygon) */}
          <polygon
            points="595,585 675,578 692,612 610,620"
            fill={palette.houseSide}
            stroke="none"
            opacity="0.55"
          />
          <polygon
            points="855,445 925,440 932,475 868,480"
            fill={palette.houseSide}
            stroke="none"
            opacity="0.45"
          />

          {/* First/Second story concrete ledge divider */}
          <rect x="568" y="618" width="384" height="12" fill={palette.parapetTop} />

          {/* Flat Rooftop Parapet Wall */}
          <rect x="566" y="374" width="388" height="28" fill={palette.parapetTop} />
          <line x1="566" y1="382" x2="954" y2="382" stroke={palette.outline} strokeWidth="1.8" />

          {/* Rooftop Water Tank & Piping on the Two-Story House */}
          <g transform="translate(632, 326)">
            <rect x="0" y="8" width="54" height="40" rx="6" fill={palette.tankBody} />
            <rect x="9" y="8" width="12" height="40" fill={palette.tankHighlight} stroke="none" opacity="0.5" />
            <rect x="16" y="0" width="22" height="8" rx="2" fill={palette.tankBody} />
            <line x1="0" y1="21" x2="54" y2="21" stroke={palette.outline} strokeWidth="2" />
            <line x1="0" y1="34" x2="54" y2="34" stroke={palette.outline} strokeWidth="2" />
            {/* Outlet water pipe */}
            <path d="M 54 40 H 78 V 48" fill="none" stroke={palette.outline} strokeWidth="2.5" />
          </g>

          {/* Small Terracotta Potted Plants on the Two-Story Rooftop Ledge */}
          <g transform="translate(838, 354)">
            <polygon points="4,20 24,20 21,6 7,6" fill="#9c523c" />
            <g fill={palette.foliageLight} stroke={palette.outline} strokeWidth="1.8">
              {!reducedMotion && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 14 8; -4 14 8; 0 14 8"
                  dur="4s"
                  repeatCount="indefinite"
                />
              )}
              <ellipse cx="10" cy="2" rx="6" ry="9" transform="rotate(-18 10 2)" />
              <ellipse cx="18" cy="1" rx="6" ry="10" transform="rotate(16 18 1)" />
            </g>
          </g>

          {/* Secondary quiet shuttered window on the left of the two-story house */}
          <polygon points="604,474 676,474 680,483 600,483" fill={palette.parapetTop} />
          <rect x="610" y="483" width="60" height="76" fill={palette.houseSide} />
          <line x1="640" y1="483" x2="640" y2="559" stroke={palette.outline} strokeWidth="2" />

          {/* ========================================================== */}
          {/* THE FOCAL WINDOW (20 METERS APART)                         */}
          {/* ========================================================== */}
          {/* Concrete Sunshade Overhang (Chajja) */}
          <polygon points="694,462 846,462 854,474 686,474" fill={palette.parapetTop} />

          {/* Outer Recessed Window Frame */}
          <rect x="706" y="474" width="128" height="96" fill={palette.outline} />

          {/* Left Window Pane (Warm shaded interior) */}
          <rect x="713" y="481" width="55" height="82" fill={palette.focalLightLeft} />

          {/* Right Window Pane (Softly Glowing Warm Amber Interior — No Person) */}
          <rect x="772" y="481" width="55" height="82" fill={palette.focalLightRight}>
            {!reducedMotion && timeOfDay !== 'day' && (
              <animate
                attributeName="opacity"
                values="0.92;1;0.92"
                dur="5s"
                repeatCount="indefinite"
              />
            )}
          </rect>

          {/* Gentle Swaying Translucent Curtain Inside the Right Pane (No Silhouette/Person) */}
          <path
            d="M 804 481 L 827 481 L 827 563 L 809 563 Q 801 522 804 481 Z"
            fill={palette.curtainColor}
            stroke="none"
            opacity="0.65"
          >
            {!reducedMotion && (
              <animate
                attributeName="d"
                dur="5.5s"
                repeatCount="indefinite"
                values="
                  M 804 481 L 827 481 L 827 563 L 809 563 Q 801 522 804 481 Z;
                  M 804 481 L 827 481 L 827 563 L 801 563 Q 793 522 804 481 Z;
                  M 804 481 L 827 481 L 827 563 L 809 563 Q 801 522 804 481 Z
                "
              />
            )}
          </path>

          {/* Traditional Horizontal & Vertical Iron Security Grille Bars */}
          <g stroke={palette.outline} strokeWidth="2.2">
            <line x1="740" y1="481" x2="740" y2="563" />
            <line x1="770" y1="478" x2="770" y2="566" strokeWidth="3.2" />
            <line x1="800" y1="481" x2="800" y2="563" />
            <line x1="713" y1="508" x2="827" y2="508" />
            <line x1="713" y1="536" x2="827" y2="536" />
          </g>

          {/* Window Sill Ledge */}
          <rect x="700" y="570" width="140" height="8" fill={palette.parapetTop} />

          {/* Lower Floor Arched Veranda / Window Hint */}
          <polygon points="698,660 842,660 848,670 692,670" fill={palette.parapetTop} />
          <rect x="708" y="670" width="124" height="78" fill={palette.windowGlass} />
          <line x1="770" y1="670" x2="770" y2="748" stroke={palette.outline} strokeWidth="2.5" />
        </g>
      </g>

      {/* 6. FOREGROUND ROOFTOP LEDGES & SWAYING FOLIAGE */}
      <g stroke={palette.outline} strokeWidth="2.8" strokeLinejoin="round">
        {/* Left foreground flat roof corner */}
        <polygon points="0,715 535,665 555,900 0,900" fill={palette.farCityDark} />
        <polygon points="0,702 538,652 538,668 0,718" fill={palette.midConcreteShade} />

        {/* Right foreground flat roof corner */}
        <polygon points="1065,680 1600,730 1600,900 1045,900" fill={palette.farCityDark} />
        <polygon points="1062,666 1600,716 1600,732 1062,682" fill={palette.midConcreteShade} />
      </g>

      {/* Gentle Swaying Tree Canopy Peeking Between the Houses */}
      <g fill={palette.foliage} stroke={palette.outline} strokeWidth="2.4">
        {!reducedMotion && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 520 720; 1.8 520 720; 0 520 720"
            dur="6.5s"
            repeatCount="indefinite"
          />
        )}
        <circle cx="495" cy="665" r="46" />
        <circle cx="542" cy="655" r="52" fill={palette.foliageLight} />
        <circle cx="578" cy="685" r="40" />
      </g>

      {/* 7. UTILITY POLE & TANGLED SOUTH ASIAN ELECTRICAL CABLES SWAYING IN BREEZE */}
      <g>
        {/* Concrete utility pole */}
        <rect
          x="992"
          y="465"
          width="14"
          height="435"
          fill={palette.midConcreteShade}
          stroke={palette.outline}
          strokeWidth="2.5"
        />
        {/* Crossbars & ceramic insulators */}
        <rect
          x="964"
          y="482"
          width="70"
          height="7"
          fill={palette.parapetTop}
          stroke={palette.outline}
          strokeWidth="2"
        />
        <circle cx="972" cy="479" r="3.5" fill={palette.outline} />
        <circle cx="999" cy="479" r="3.5" fill={palette.outline} />
        <circle cx="1026" cy="479" r="3.5" fill={palette.outline} />

        {/* Draped Overhead Utility Wires */}
        <g fill="none" stroke={palette.wire} strokeLinecap="round">
          <path d="M 0 515 Q 485 595 972 482" strokeWidth="2.2">
            {!reducedMotion && (
              <animate
                attributeName="d"
                dur="8.5s"
                repeatCount="indefinite"
                values="
                  M 0 515 Q 485 595 972 482;
                  M 0 515 Q 485 603 972 482;
                  M 0 515 Q 485 595 972 482
                "
              />
            )}
          </path>
          <path d="M 0 548 Q 495 628 999 482" strokeWidth="1.7">
            {!reducedMotion && (
              <animate
                attributeName="d"
                dur="9.8s"
                repeatCount="indefinite"
                values="
                  M 0 548 Q 495 628 999 482;
                  M 0 548 Q 495 636 999 482;
                  M 0 548 Q 495 628 999 482
                "
              />
            )}
          </path>
          <path d="M 972 482 Q 1280 560 1600 505" strokeWidth="2.1">
            {!reducedMotion && (
              <animate
                attributeName="d"
                dur="9s"
                repeatCount="indefinite"
                values="
                  M 972 482 Q 1280 560 1600 505;
                  M 972 482 Q 1280 568 1600 505;
                  M 972 482 Q 1280 560 1600 505
                "
              />
            )}
          </path>
          <path d="M 1026 482 Q 1310 595 1600 548" strokeWidth="1.5">
            {!reducedMotion && (
              <animate
                attributeName="d"
                dur="10.5s"
                repeatCount="indefinite"
                values="
                  M 1026 482 Q 1310 595 1600 548;
                  M 1026 482 Q 1310 603 1600 548;
                  M 1026 482 Q 1310 595 1600 548
                "
              />
            )}
          </path>
        </g>
      </g>
    </svg>
  );
};
