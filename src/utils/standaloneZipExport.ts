import JSZip from 'jszip';
import { MemoryState } from '../types';

export const STANDALONE_README_MD = `# THE WINDOW — 20 METERS APART
### A Personal Memory Experience by AKSAD

> *"Somewhere between these rooftops, a window became a memory."*

An interactive animated cartoon memory reconstruction of a modest fifth-floor study desk, dense South Asian residential concrete and unfinished brick rooftops, overhead electrical wires, and a window in a two-story house approximately 20 meters away.

---

## Included Files

- \`index.html\` — Complete HTML structure with embedded animated cartoon SVG scenes for the Opening Scene, Fifth-Floor Study Room, Window View, Symbolic Distance, Editable Timeline, Personal Diary, and Last Page.
- \`style.css\` — Cinematic cel-shaded color system, responsive layout, Day/Dusk/Night transitions, and \`prefers-reduced-motion\` support.
- \`script.js\` — Zero-dependency vanilla JavaScript powering interactive animated cartoon scenes, subtle rain-on-glass Canvas, optional Web Audio room hush, local diary CRUD, timeline editing, and JSON/TXT backup export & import.
- \`README.md\` — Setup, GitHub Pages deployment, privacy notes, and troubleshooting guide.

---

## 1. Beginner-Friendly Windows Setup Instructions

This project runs **without Node.js, npm, external images, build tools, paid APIs, or an internet connection**.

### Option A: Open Directly in Your Browser (Simplest)
1. Download and extract \`the-window-20-meters-apart-standalone.zip\` by right-clicking the ZIP file in **File Explorer** and selecting **Extract All...**.
2. Open the extracted folder.
3. Double-click **\`index.html\`** to open it in Microsoft Edge, Google Chrome, or Mozilla Firefox.
4. All animated cartoon scenes, Day/Dusk/Night lighting, rain on glass, personal diary, timeline, and JSON/TXT export work immediately via \`file://\`.

### Option B: Optional Local Server on Windows (Recommended for Persistent Storage)
Some browsers isolate \`localStorage\` across \`file://\` pages or clear \`file://\` data more aggressively than \`http://localhost\`. For long-term browser persistence on Windows:
1. If Python is installed on Windows, open the project folder in **File Explorer**, click the address bar, type \`cmd\`, and press **Enter**.
2. Run:
   \`\`\`bat
   python -m http.server 8080
   \`\`\`
3. Open your browser and visit \`http://localhost:8080\`.

---

## 2. GitHub Pages Deployment Instructions

1. Sign in to [GitHub](https://github.com) and click **New repository** (\`+\` icon in the top-right corner).
2. Name your repository (for example, \`the-window-20m\`) and click **Create repository**.
3. Click **uploading an existing file** and drag \`index.html\`, \`style.css\`, \`script.js\`, and \`README.md\` into the upload area.
4. Click **Commit changes**.
5. Open **Settings -> Pages**, choose **Deploy from a branch**, select **\`main\`** and **\`/ (root)\`**, and click **Save**.
6. Your live URL will publish in 1–2 minutes.

---

## 3. Privacy & Safety Architecture

- **100% Local-First**: All personal diary entries, custom categories, timeline chapters, distance reflections, and letters remain inside your browser's local storage.
- **Zero Tracking or External Calls**: No analytics, no external databases, no geolocation, no maps, and no facial or identity recognition.
- **Unencrypted Browser Storage Notice**: Browser \`localStorage\` is not encrypted on disk and **will be erased if you clear your browser's site data/cache** or use an Incognito/Private window. Use **Export JSON** or **Export TXT** inside the Notebook regularly.

---

## 4. Troubleshooting

- **My diary entries disappeared after closing the browser:** Avoid Incognito / InPrivate mode, which wipes \`localStorage\` on exit. Keep exported \`.json\` backups.
- **Ambient sound does not play when toggled on:** Audio is muted by default with zero autoplay. Click the sound button directly and check your browser tab volume.
- **Choppy performance on an older laptop:** Toggle **Reduced Motion: On** and **Rain: Off** in the atmosphere bar.
`;

function buildStandaloneAnimatedRooftopSvg(prefix: string): string {
  return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" class="cartoon-svg" aria-hidden="true">
    <defs>
      <linearGradient id="${prefix}-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" class="sky-top" />
        <stop offset="58%" class="sky-mid" />
        <stop offset="100%" class="sky-bot" />
      </linearGradient>
      <radialGradient id="${prefix}-halo" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stop-color="#f7be6d" stop-opacity="0.55" />
        <stop offset="100%" stop-color="#df953f" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#${prefix}-sky)" />
    <g class="cloud-group">
      <animateTransform attributeName="transform" type="translate" from="-80 0" to="80 0" dur="44s" repeatCount="indefinite" />
      <path d="M 110 190 Q 145 155 205 162 Q 250 140 310 175 L 95 198 Z" class="cloud-fill" />
      <path d="M 980 150 Q 1030 118 1110 128 Q 1165 122 1205 154 L 965 156 Z" class="cloud-fill" />
    </g>
    <g stroke="#0e131b" stroke-width="2.4" class="far-buildings">
      <rect x="40" y="290" width="180" height="330" />
      <rect x="210" y="255" width="210" height="365" />
      <rect x="850" y="270" width="220" height="350" />
      <rect x="1200" y="245" width="240" height="375" />
    </g>
    <g stroke="#0e131b" stroke-width="2.6">
      <rect x="95" y="345" width="355" height="495" class="mid-concrete" />
      <rect x="90" y="325" width="365" height="22" class="parapet" />
      <rect x="315" y="285" width="52" height="40" rx="6" fill="#161c26" />
      <rect x="1035" y="352" width="465" height="500" class="brick-wall" />
      <rect x="1030" y="334" width="475" height="20" class="parapet" />
    </g>
    <circle cx="765" cy="520" r="130" fill="url(#${prefix}-halo)" class="focal-halo" />
    <g stroke="#0e131b" stroke-width="2.6">
      <rect x="575" y="402" width="370" height="428" class="house-main" />
      <rect x="566" y="374" width="388" height="28" class="parapet" />
      <rect x="632" y="334" width="54" height="40" rx="6" fill="#161c26" />
      <polygon points="694,462 846,462 854,474 686,474" class="parapet" />
      <rect x="706" y="474" width="128" height="96" fill="#0e131b" />
      <rect x="713" y="481" width="55" height="82" class="focal-pane-left" />
      <rect x="772" y="481" width="55" height="82" class="focal-pane-right" />
      <path d="M 804 481 L 827 481 L 827 563 L 809 563 Q 801 522 804 481 Z" fill="#f5cb86" opacity="0.65" stroke="none">
        <animate attributeName="d" dur="5.5s" repeatCount="indefinite" values="M 804 481 L 827 481 L 827 563 L 809 563 Q 801 522 804 481 Z;M 804 481 L 827 481 L 827 563 L 800 563 Q 792 522 804 481 Z;M 804 481 L 827 481 L 827 563 L 809 563 Q 801 522 804 481 Z" />
      </path>
      <line x1="740" y1="481" x2="740" y2="563" />
      <line x1="770" y1="478" x2="770" y2="566" stroke-width="3.2" />
      <line x1="800" y1="481" x2="800" y2="563" />
      <line x1="713" y1="508" x2="827" y2="508" />
      <line x1="713" y1="536" x2="827" y2="536" />
    </g>
    <g fill="none" stroke="#0d1118" stroke-width="2">
      <path d="M 0 520 Q 485 600 990 485 T 1600 520">
        <animate attributeName="d" dur="8.5s" repeatCount="indefinite" values="M 0 520 Q 485 600 990 485 T 1600 520;M 0 520 Q 485 608 990 489 T 1600 520;M 0 520 Q 485 600 990 485 T 1600 520" />
      </path>
    </g>
  </svg>`;
}

function buildStandaloneHtml(): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script>
    (function () {
      try {
        var desc = Object.getOwnPropertyDescriptor(window, 'fetch') || Object.getOwnPropertyDescriptor(Object.getPrototypeOf(window) || {}, 'fetch');
        if (desc && desc.get && !desc.set && desc.configurable !== false) {
          var currentFetch = window.fetch.bind(window);
          Object.defineProperty(window, 'fetch', {
            configurable: true, enumerable: true,
            get: function () { return currentFetch; },
            set: function (fn) { if (typeof fn === 'function') currentFetch = fn; }
          });
        }
      } catch (_) {}
    })();
  </script>
  <title>THE WINDOW — 20 Meters Apart | A Personal Memory Experience by AKSAD</title>
  <meta name="description" content="Somewhere between these rooftops, a window became a memory. A personal interactive memory experience by AKSAD." />
  <link rel="stylesheet" href="./style.css" />
</head>
<body data-time="dusk">
  <!-- OPENING EXPERIENCE -->
  <section id="opening-scene" class="opening-scene" aria-label="Opening Scene">
    <div class="opening-bg">${buildStandaloneAnimatedRooftopSvg('open')}</div>
    <div class="opening-scrim"></div>
    <div class="opening-top">
      <span>A PERSONAL MEMORY EXPERIENCE BY AKSAD</span>
      <span>5TH FLOOR · ~20M</span>
    </div>
    <div class="opening-center">
      <h1>THE WINDOW</h1>
      <p class="subtitle">20 METERS APART</p>
      <div class="divider"></div>
      <p class="tagline">&ldquo;Somewhere between these rooftops, a window became a memory.&rdquo;</p>
      <button id="enter-memory-btn" type="button" class="primary-outline-btn">ENTER THIS MEMORY</button>
    </div>
    <p class="opening-foot">Works quietly without sound · All personal notes remain private in your browser</p>
  </section>

  <!-- MAIN EXPERIENCE -->
  <div id="main-experience" class="main-experience hidden">
    <header class="top-bar">
      <a href="#scene-study" class="brand">THE WINDOW</a>
      <nav class="nav-links" aria-label="Primary scenes">
        <a href="#scene-study">Study Room</a>
        <a href="#scene-window">Window View</a>
        <a href="#scene-distance">20 Meters</a>
        <a href="#scene-timeline">Timeline</a>
        <a href="#scene-last-page">Last Page</a>
      </nav>
      <button id="open-diary-nav-btn" type="button" class="notebook-btn">Open Notebook</button>
    </header>

    <div class="atmosphere-strip" role="region" aria-label="Atmosphere and accessibility controls">
      <div class="control-group">
        <span class="control-label">Lighting:</span>
        <button type="button" data-mode="day" class="mode-btn">Day</button>
        <button type="button" data-mode="dusk" class="mode-btn active">Dusk</button>
        <button type="button" data-mode="night" class="mode-btn">Night</button>
      </div>
      <div class="control-group">
        <button type="button" id="toggle-rain-btn" class="toggle-btn" aria-pressed="false">Rain: Off</button>
        <button type="button" id="toggle-motion-btn" class="toggle-btn" aria-pressed="false">Reduced Motion: Off</button>
        <button type="button" id="toggle-sound-btn" class="toggle-btn" aria-pressed="false">Ambient Sound: Muted</button>
      </div>
    </div>

    <main>
      <!-- 01. STUDY ROOM -->
      <section id="scene-study" class="scene-container">
        <div class="scene-header">
          <div>
            <p class="kicker">01 · Fifth-Floor Study Room</p>
            <h2>The Desk Beside the Window</h2>
          </div>
          <p class="scene-desc">Select the window to step closer to the rooftops, or click the notebook on the desk to open your private diary.</p>
        </div>
        <div id="study-viewport" class="viewport">
          <div class="study-cartoon-wrap">
            ${buildStandaloneAnimatedRooftopSvg('study')}
            <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" class="study-fg-svg" aria-hidden="true">
              <path d="M 0 0 H 1600 V 900 H 0 Z M 135 80 V 615 H 980 V 80 Z" fill="#18202c" fill-rule="evenodd" />
              <rect x="125" y="70" width="865" height="555" fill="none" stroke="#0d121a" stroke-width="14" />
              <polygon points="0,660 1600,660 1600,900 0,900" fill="#4f3422" stroke="#0d121a" stroke-width="3" />
              <polygon points="690,726 1012,726 1052,824 714,824" fill="#232c3b" stroke="#0d121a" stroke-width="3" />
              <ellipse id="lamp-glow-cone" cx="1150" cy="740" rx="380" ry="130" fill="#ffcf7d" opacity="0.22" />
            </svg>
          </div>
          <button type="button" id="hotspot-window" class="hotspot hotspot-window">Look Out the Window</button>
          <button type="button" id="hotspot-notebook" class="hotspot hotspot-notebook">Open Notebook</button>
          <button type="button" id="hotspot-lamp" class="hotspot hotspot-lamp">Desk Lamp: Warm</button>
        </div>
      </section>

      <!-- 02. THE WINDOW VIEW -->
      <section id="scene-window" class="scene-container">
        <div class="scene-header">
          <div>
            <p class="kicker">02 · The Window View</p>
            <h2>Across the Rooftops</h2>
          </div>
          <button type="button" id="zoom-window-btn" class="toggle-btn">Focus Distant Window</button>
        </div>
        <div id="window-viewport" class="viewport">
          <div id="window-zoom-layer" class="window-zoom-layer">
            ${buildStandaloneAnimatedRooftopSvg('win')}
          </div>
          <canvas id="rain-canvas" class="rain-canvas" aria-hidden="true"></canvas>
          <div class="window-caption">
            <div>
              <p class="caption-tag">20 METERS APART</p>
              <p id="lighting-caption-text">Muted blue-gray twilight, drifting clouds, and a warm amber window across quiet rooftops.</p>
            </div>
            <p class="ethical-note">Approximate remembered distance &amp; illustrated lighting—not a GPS measurement or live status.</p>
          </div>
        </div>
      </section>

      <!-- 03. THE DISTANCE -->
      <section id="scene-distance" class="scene-container narrow">
        <div class="distance-card">
          <p class="kicker">03 · Symbolic Span</p>
          <h2 class="distance-number">20 METERS</h2>
          <p class="tagline">&ldquo;A small distance. A world of things left unsaid.&rdquo;</p>
          <svg viewBox="0 0 800 220" class="distance-svg" role="img" aria-label="Symbolic sightline between fifth-floor study window and two-story house">
            <line x1="40" y1="195" x2="760" y2="195" stroke="#2a3342" stroke-width="1" />
            <rect x="70" y="30" width="110" height="165" fill="#141a24" stroke="#3a4556" />
            <rect x="150" y="42" width="20" height="16" fill="#d99b4e" fill-opacity="0.35" stroke="#d99b4e" />
            <rect x="600" y="115" width="125" height="80" fill="#161c26" stroke="#3a4556" />
            <rect x="618" y="128" width="24" height="18" fill="#d99b4e" fill-opacity="0.35" stroke="#d99b4e" />
            <line x1="170" y1="50" x2="618" y2="137" stroke="#d99b4e" stroke-dasharray="5 5" />
          </svg>
          <div class="private-note-box">
            <label for="distance-note-input">Private Note on What This Distance Meant to You</label>
            <textarea id="distance-note-input" rows="3" placeholder="Write quietly in your own words..."></textarea>
            <button type="button" id="save-distance-btn" class="amber-btn">Save Distance Note</button>
            <span id="distance-saved-msg" class="saved-status" aria-live="polite"></span>
          </div>
        </div>
      </section>

      <!-- 04. THE TIMELINE -->
      <section id="scene-timeline" class="scene-container narrow">
        <div class="scene-header">
          <div>
            <p class="kicker">04 · Emotional Chapters</p>
            <h2>The Timeline</h2>
          </div>
          <button type="button" id="add-chapter-btn" class="toggle-btn">+ Add Chapter</button>
        </div>
        <div id="timeline-list" class="timeline-list"></div>
      </section>

      <!-- 05. THE LAST PAGE -->
      <section id="scene-last-page" class="scene-container narrow">
        <p class="kicker center">05 · The Last Page</p>
        <blockquote id="last-page-quote" class="closing-quote"></blockquote>
        <div class="quote-controls">
          <textarea id="last-page-quote-input" rows="3" placeholder="Replace with your own closing words, or leave empty to remove..."></textarea>
          <div class="btn-row">
            <button type="button" id="save-quote-btn" class="toggle-btn">Update Closing Words</button>
            <button type="button" id="clear-quote-btn" class="toggle-btn">Remove Closing Text</button>
          </div>
        </div>

        <div class="future-letter-box">
          <h3>Optional Letter to Your Future Self</h3>
          <p class="ethical-note">Stored strictly in your local browser. Never published or transmitted.</p>
          <textarea id="future-letter-input" rows="5" placeholder="Dear future self..."></textarea>
          <button type="button" id="save-letter-btn" class="amber-btn">Save Letter Locally</button>
          <span id="letter-saved-msg" class="saved-status" aria-live="polite"></span>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <p>THE WINDOW — 20 METERS APART · A Personal Memory Experience by AKSAD</p>
      <p class="ethical-note">All personal memories stay local in this browser. Clearing browser storage will remove unsaved local data—use Export inside the Notebook for backups.</p>
    </footer>
  </div>

  <!-- PERSONAL DIARY MODAL -->
  <div id="diary-modal" class="modal hidden" role="dialog" aria-modal="true" aria-labelledby="diary-title">
    <div class="modal-panel">
      <div class="modal-header">
        <div>
          <p class="kicker">The Unsaid · Private Notebook</p>
          <h2 id="diary-title">Personal Memory Diary</h2>
        </div>
        <button type="button" id="close-diary-btn" class="toggle-btn">Close (Esc)</button>
      </div>
      <div class="modal-body">
        <aside class="diary-sidebar">
          <h3>Categories</h3>
          <div id="category-list" class="category-list"></div>
          <div class="cat-add-row">
            <input type="text" id="new-category-input" placeholder="New category..." />
            <button type="button" id="add-category-btn" class="toggle-btn">Add</button>
          </div>
          <hr />
          <h3>Backup &amp; Privacy</h3>
          <p class="ethical-note">Local storage is unencrypted and local to this browser. Export a backup anytime.</p>
          <div class="btn-wrap">
            <button type="button" id="export-json-btn" class="toggle-btn">Export JSON</button>
            <button type="button" id="export-txt-btn" class="toggle-btn">Export TXT</button>
            <label class="toggle-btn file-label">
              Import JSON
              <input type="file" id="import-json-input" accept=".json,application/json" hidden />
            </label>
          </div>
        </aside>
        <section class="diary-main">
          <form id="diary-entry-form" class="entry-form">
            <input type="hidden" id="entry-edit-id" />
            <div class="form-row">
              <select id="entry-category-select" aria-label="Category"></select>
              <input type="text" id="entry-title-input" placeholder="Entry title..." />
              <input type="text" id="entry-date-input" placeholder="Optional date..." />
            </div>
            <textarea id="entry-content-input" rows="4" placeholder="Write your own memories here. Nothing is pre-written or shared..."></textarea>
            <div class="btn-row">
              <button type="submit" class="amber-btn">Save Entry</button>
            </div>
          </form>
          <div id="diary-entries-container" class="entries-list"></div>
        </section>
      </div>
    </div>
  </div>

  <script src="./script.js"></script>
</body>
</html>`;
}

function buildStandaloneCss(): string {
  return `:root {
  --bg: #0b0e13;
  --surface: #101620;
  --border: #232c3b;
  --text: #e6e8ec;
  --muted: #919bab;
  --amber: #d99b4e;
  --serif: Georgia, "Cormorant Garamond", "Times New Roman", serif;
  --sans: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

body[data-time="day"] {
  --sky-top: #8fa8be; --sky-mid: #b5c7d6; --sky-bot: #dce4ea;
  --cloud: #f0f4f8; --far: #7f90a0; --mid: #969fa8; --parapet: #b0b8c0;
  --brick: #9e5b49; --house: #a7afb6; --pane-l: #5c6773; --pane-r: #786e60; --halo-op: 0;
}
body[data-time="dusk"] {
  --sky-top: #1d283a; --sky-mid: #374863; --sky-bot: #6d6875;
  --cloud: #565c73; --far: #283345; --mid: #394454; --parapet: #4a5769;
  --brick: #5e3730; --house: #445061; --pane-l: #8f6234; --pane-r: #f0ad56; --halo-op: 1;
}
body[data-time="night"] {
  --sky-top: #070b12; --sky-mid: #101826; --sky-bot: #1c293d;
  --cloud: #162133; --far: #111824; --mid: #1a2330; --parapet: #243040;
  --brick: #331e1c; --house: #202b3b; --pane-l: #7a5026; --pane-r: #e89d42; --halo-op: 1;
}

.sky-top { stop-color: var(--sky-top); }
.sky-mid { stop-color: var(--sky-mid); }
.sky-bot { stop-color: var(--sky-bot); }
.cloud-fill { fill: var(--cloud); }
.far-buildings { fill: var(--far); }
.mid-concrete { fill: var(--mid); }
.parapet { fill: var(--parapet); }
.brick-wall { fill: var(--brick); }
.house-main { fill: var(--house); }
.focal-pane-left { fill: var(--pane-l); }
.focal-pane-right { fill: var(--pane-r); }
.focal-halo { opacity: var(--halo-op); transition: opacity 0.8s ease; }

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; background: var(--bg); color: var(--text); font-family: var(--sans); overflow-x: hidden; }
body { min-height: 100vh; overflow-x: hidden; line-height: 1.6; }
.hidden { display: none !important; }

.cartoon-svg, .study-fg-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.opening-scene {
  position: relative; min-height: 100vh; display: flex; flex-direction: column;
  justify-content: space-between; align-items: center; text-align: center; padding: 2.5rem 1.5rem; overflow: hidden;
}
.opening-bg { position: absolute; inset: 0; }
.opening-scrim { position: absolute; inset: 0; background: linear-gradient(to top, #07090d, rgba(11,15,22,0.45), #07090d); }
.opening-top, .opening-center, .opening-foot { position: relative; z-index: 2; }
.opening-top { width: 100%; max-width: 1180px; display: flex; justify-content: space-between; font-size: 0.75rem; letter-spacing: 0.2em; color: var(--muted); }
.opening-center h1 { font-family: var(--serif); font-size: clamp(2.6rem, 6vw, 4.8rem); font-weight: 400; letter-spacing: 0.14em; }
.subtitle { color: var(--amber); letter-spacing: 0.32em; font-size: 0.8rem; margin-top: 0.5rem; }
.divider { width: 4rem; height: 1px; background: rgba(230,232,236,0.22); margin: 1.75rem auto; }
.tagline { font-family: var(--serif); font-style: italic; font-size: 1.35rem; color: #cfd5df; max-width: 34rem; margin: 0 auto; }
.primary-outline-btn {
  margin-top: 2.2rem; padding: 0.85rem 2rem; background: rgba(13,18,25,0.8); color: #fff;
  border: 1px solid rgba(230,232,236,0.35); letter-spacing: 0.22em; font-size: 0.75rem; cursor: pointer;
}
.primary-outline-btn:hover { border-color: var(--amber); }
.opening-foot { font-size: 0.75rem; color: var(--muted); }

.top-bar {
  position: sticky; top: 0; z-index: 30; display: flex; align-items: center; justify-content: space-between;
  gap: 2rem; padding: 0.9rem 2rem; background: rgba(11,14,19,0.92); border-bottom: 1px solid var(--border); backdrop-filter: blur(8px);
}
.brand { font-family: var(--serif); letter-spacing: 0.16em; color: #fff; text-decoration: none; font-size: 1.15rem; white-space: nowrap; }
.nav-links { display: flex; gap: 1.5rem; flex-wrap: wrap; }
.nav-links a { color: var(--muted); text-decoration: none; font-size: 0.85rem; white-space: nowrap; }
.nav-links a:hover { color: #fff; }
.notebook-btn, .amber-btn {
  background: var(--amber); color: #0b0e13; border: none; padding: 0.5rem 1rem; border-radius: 4px;
  font-size: 0.78rem; font-weight: 600; cursor: pointer; white-space: nowrap;
}

.atmosphere-strip {
  max-width: 1280px; margin: 1rem auto 0; padding: 0.65rem 1.5rem; display: flex; flex-wrap: wrap;
  justify-content: space-between; gap: 0.75rem; border-bottom: 1px solid var(--border);
}
.control-group { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.control-label { font-size: 0.75rem; color: var(--muted); }
.mode-btn, .toggle-btn {
  background: var(--surface); color: var(--text); border: 1px solid var(--border); padding: 0.4rem 0.8rem;
  border-radius: 4px; font-size: 0.75rem; cursor: pointer;
}
.mode-btn.active { border-color: var(--amber); color: #f7e6cc; }

.scene-container { max-width: 1280px; margin: 0 auto; padding: 3rem 1.5rem; }
.scene-container.narrow { max-width: 880px; }
.scene-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
.kicker { font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
.center { text-align: center; }
h2 { font-family: var(--serif); font-size: 2.1rem; font-weight: 400; color: #f2f4f7; }
.scene-desc, .ethical-note { font-size: 0.8rem; color: var(--muted); max-width: 30rem; }

.viewport {
  position: relative; width: 100%; aspect-ratio: 16 / 9; min-height: 360px; overflow: hidden;
  border-radius: 8px; border: 1px solid var(--border); background: #090d13;
}
.study-cartoon-wrap { position: absolute; inset: 0; }
.hotspot {
  position: absolute; z-index: 10; background: rgba(12,16,24,0.84); color: #f2f4f7;
  border: 1px solid rgba(217,155,78,0.5); padding: 0.55rem 0.95rem; border-radius: 4px; font-size: 0.75rem; cursor: pointer;
}
.hotspot-window { top: 26%; left: 22%; }
.hotspot-notebook { bottom: 15%; left: 52%; }
.hotspot-lamp { top: 48%; right: 12%; }

.window-zoom-layer { position: absolute; inset: 0; transition: transform 1.2s ease; transform-origin: 48% 57%; }
.window-zoom-layer.zoomed { transform: scale(1.6); }
.rain-canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.window-caption {
  position: absolute; inset-inline: 0; bottom: 0; padding: 1.25rem 1.5rem;
  background: linear-gradient(to top, rgba(7,9,14,0.94), transparent);
  display: flex; justify-content: space-between; align-items: flex-end; gap: 1rem; flex-wrap: wrap;
}
.caption-tag { color: var(--amber); font-size: 0.72rem; letter-spacing: 0.22em; }

.distance-card, .future-letter-box, .timeline-item {
  background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 1.75rem;
}
.distance-number { text-align: center; font-size: 3rem; letter-spacing: 0.12em; margin: 0.4rem 0; }
.distance-svg { width: 100%; height: auto; margin: 1.5rem 0; }
textarea, input[type="text"], select {
  width: 100%; background: #090d14; color: var(--text); border: 1px solid var(--border);
  border-radius: 4px; padding: 0.65rem 0.8rem; font-family: inherit; font-size: 0.92rem; margin-top: 0.4rem;
}
.private-note-box { margin-top: 1rem; display: flex; flex-direction: column; gap: 0.6rem; align-items: flex-start; }
.timeline-list { display: flex; flex-direction: column; gap: 1rem; }
.timeline-item-head { display: flex; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem; }
.closing-quote { font-family: var(--serif); font-style: italic; font-size: 1.75rem; text-align: center; margin: 1.5rem 0; white-space: pre-line; }
.quote-controls, .future-letter-box { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
.btn-row, .btn-wrap { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.saved-status { font-size: 0.75rem; color: var(--amber); }
.site-footer { border-top: 1px solid var(--border); padding: 2.5rem 1.5rem; text-align: center; font-size: 0.8rem; color: var(--muted); }

.modal { position: fixed; inset: 0; z-index: 50; background: rgba(5,7,11,0.85); display: flex; align-items: center; justify-content: center; padding: 1rem; }
.modal-panel { background: #0d121a; border: 1px solid var(--border); border-radius: 8px; width: 100%; max-width: 980px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; border-bottom: 1px solid var(--border); }
.modal-body { display: grid; grid-template-columns: 260px 1fr; overflow-y: auto; flex: 1; }
.diary-sidebar { padding: 1.25rem; border-right: 1px solid var(--border); display: flex; flex-direction: column; gap: 0.75rem; }
.diary-main { padding: 1.25rem; display: flex; flex-direction: column; gap: 1.25rem; }
.category-list { display: flex; flex-direction: column; gap: 0.3rem; }
.cat-item { display: flex; justify-content: space-between; align-items: center; gap: 0.25rem; }
.form-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
.entry-card { border: 1px solid var(--border); border-radius: 6px; padding: 1rem; margin-bottom: 0.75rem; background: #0a0e15; }
.file-label { display: inline-block; }

@media (max-width: 768px) {
  .modal-body { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .nav-links { display: none; }
}
body.reduced-motion *, body.reduced-motion *::before, body.reduced-motion *::after {
  transition: none !important; animation: none !important;
}
`;
}

function buildStandaloneJs(initialState: MemoryState): string {
  return `// THE WINDOW — 20 METERS APART | Standalone Animated Cartoon Controller
(function () {
  const STORAGE_KEY = 'the_window_20m_memory_v1';
  const DEFAULT_STATE = ${JSON.stringify(initialState, null, 2)};

  let state = loadState();
  let prefs = { mode: 'dusk', rain: false, reducedMotion: false, sound: false, lamp: true, zoomed: false };
  let selectedCategory = 'all';
  let audioCtx = null;
  let masterGain = null;
  let rainAnimId = 0;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? Object.assign({}, DEFAULT_STATE, JSON.parse(raw)) : structuredClone(DEFAULT_STATE);
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Local storage unavailable. Use Export JSON to save your backup.');
    }
  }

  document.getElementById('enter-memory-btn').addEventListener('click', function () {
    document.getElementById('opening-scene').classList.add('hidden');
    document.getElementById('main-experience').classList.remove('hidden');
  });

  document.getElementById('hotspot-window').addEventListener('click', function () {
    document.getElementById('scene-window').scrollIntoView({ behavior: prefs.reducedMotion ? 'auto' : 'smooth' });
  });
  document.getElementById('hotspot-lamp').addEventListener('click', function (e) {
    prefs.lamp = !prefs.lamp;
    const cone = document.getElementById('lamp-glow-cone');
    if (cone) cone.style.opacity = prefs.lamp ? '0.22' : '0';
    e.currentTarget.textContent = 'Desk Lamp: ' + (prefs.lamp ? 'Warm' : 'Off');
  });

  const captions = {
    day: 'Soft pale daylight across illustrated concrete parapets, exposed brick, and rooftop water tanks.',
    dusk: 'Muted blue-gray twilight, drifting clouds, and a warm amber window across quiet rooftops.',
    night: 'Deep blue-gray shadows, faint stars, and subdued environmental stillness.'
  };
  document.querySelectorAll('.mode-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      prefs.mode = btn.getAttribute('data-mode');
      document.body.setAttribute('data-time', prefs.mode);
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b === btn));
      document.getElementById('lighting-caption-text').textContent = captions[prefs.mode];
    });
  });

  document.getElementById('zoom-window-btn').addEventListener('click', function (e) {
    prefs.zoomed = !prefs.zoomed;
    document.getElementById('window-zoom-layer').classList.toggle('zoomed', prefs.zoomed);
    e.currentTarget.textContent = prefs.zoomed ? 'Wider View' : 'Focus Distant Window';
  });

  const canvas = document.getElementById('rain-canvas');
  const ctx = canvas.getContext('2d');
  let drops = [];
  function renderRain() {
    cancelAnimationFrame(rainAnimId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!prefs.rain) return;
    canvas.width = canvas.clientWidth || 800;
    canvas.height = canvas.clientHeight || 450;
    if (drops.length === 0) {
      for (let i = 0; i < 45; i++) {
        drops.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, l: 14 + Math.random() * 16, s: 3 + Math.random() * 2.5 });
      }
    }
    function step() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(205, 222, 240, 0.16)';
      ctx.lineWidth = 1;
      drops.forEach(function (d) {
        ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - 1.5, d.y + d.l); ctx.stroke();
        if (!prefs.reducedMotion) {
          d.y += d.s;
          if (d.y > canvas.height) { d.y = -20; d.x = Math.random() * canvas.width; }
        }
      });
      if (!prefs.reducedMotion && prefs.rain) rainAnimId = requestAnimationFrame(step);
    }
    step();
  }

  document.getElementById('toggle-rain-btn').addEventListener('click', function (e) {
    prefs.rain = !prefs.rain;
    e.currentTarget.setAttribute('aria-pressed', String(prefs.rain));
    e.currentTarget.textContent = 'Rain: ' + (prefs.rain ? 'On' : 'Off');
    renderRain();
  });

  document.getElementById('toggle-motion-btn').addEventListener('click', function (e) {
    prefs.reducedMotion = !prefs.reducedMotion;
    document.body.classList.toggle('reduced-motion', prefs.reducedMotion);
    e.currentTarget.setAttribute('aria-pressed', String(prefs.reducedMotion));
    e.currentTarget.textContent = 'Reduced Motion: ' + (prefs.reducedMotion ? 'On' : 'Off');
    renderRain();
  });

  document.getElementById('toggle-sound-btn').addEventListener('click', function (e) {
    prefs.sound = !prefs.sound;
    e.currentTarget.setAttribute('aria-pressed', String(prefs.sound));
    e.currentTarget.textContent = 'Ambient Sound: ' + (prefs.sound ? 'On' : 'Muted');
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (prefs.sound) {
      if (!audioCtx) {
        audioCtx = new AudioContextClass();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.06;
        masterGain.connect(audioCtx.destination);
        const buf = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
        const data = buf.getChannelData(0);
        let last = 0;
        for (let i = 0; i < data.length; i++) {
          const w = Math.random() * 2 - 1;
          data[i] = (last + 0.02 * w) / 1.02;
          last = data[i];
        }
        const src = audioCtx.createBufferSource();
        src.buffer = buf; src.loop = true;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass'; filter.frequency.value = 240;
        src.connect(filter); filter.connect(masterGain); src.start();
      }
      if (audioCtx.state === 'suspended') audioCtx.resume();
      masterGain.gain.value = 0.06;
    } else if (masterGain) {
      masterGain.gain.value = 0.0;
    }
  });

  const distInput = document.getElementById('distance-note-input');
  distInput.value = state.distanceNote || '';
  document.getElementById('save-distance-btn').addEventListener('click', function () {
    state.distanceNote = distInput.value.trim();
    saveState();
    const msg = document.getElementById('distance-saved-msg');
    msg.textContent = 'Saved locally.';
    setTimeout(() => { msg.textContent = ''; }, 2000);
  });

  function renderTimeline() {
    const container = document.getElementById('timeline-list');
    container.innerHTML = '';
    state.chapters.forEach(function (ch, idx) {
      const div = document.createElement('div');
      div.className = 'timeline-item';
      div.innerHTML =
        '<div class="timeline-item-head">' +
        '<strong>' + String(idx + 1).padStart(2, '0') + '. ' + escapeHtml(ch.title) + (ch.date ? ' · ' + escapeHtml(ch.date) : '') + '</strong>' +
        '<div class="btn-row">' +
        '<button type="button" data-act="up" class="toggle-btn">↑</button>' +
        '<button type="button" data-act="down" class="toggle-btn">↓</button>' +
        '<button type="button" data-act="edit" class="toggle-btn">Edit</button>' +
        '<button type="button" data-act="del" class="toggle-btn">Delete</button>' +
        '</div></div>' +
        '<p>' + (ch.note ? escapeHtml(ch.note) : '<em>No personal note added yet.</em>') + '</p>';

      div.querySelector('[data-act="up"]').onclick = function () {
        if (idx === 0) return;
        const copy = state.chapters.slice();
        const item = copy.splice(idx, 1)[0];
        copy.splice(idx - 1, 0, item);
        state.chapters = copy; saveState(); renderTimeline();
      };
      div.querySelector('[data-act="down"]').onclick = function () {
        if (idx >= state.chapters.length - 1) return;
        const copy = state.chapters.slice();
        const item = copy.splice(idx, 1)[0];
        copy.splice(idx + 1, 0, item);
        state.chapters = copy; saveState(); renderTimeline();
      };
      div.querySelector('[data-act="del"]').onclick = function () {
        if (state.chapters.length <= 1) return;
        state.chapters = state.chapters.filter(c => c.id !== ch.id);
        saveState(); renderTimeline();
      };
      div.querySelector('[data-act="edit"]').onclick = function () {
        div.innerHTML =
          '<input type="text" class="ch-t" value="' + escapeHtml(ch.title) + '" />' +
          '<input type="text" class="ch-d" placeholder="Optional date..." value="' + escapeHtml(ch.date || '') + '" />' +
          '<textarea class="ch-n" rows="3">' + escapeHtml(ch.note || '') + '</textarea>' +
          '<div class="btn-row" style="margin-top:0.5rem"><button type="button" class="amber-btn save-ch">Save</button></div>';
        div.querySelector('.save-ch').onclick = function () {
          ch.title = div.querySelector('.ch-t').value.trim() || ch.title;
          ch.date = div.querySelector('.ch-d').value.trim();
          ch.note = div.querySelector('.ch-n').value.trim();
          saveState(); renderTimeline();
        };
      };
      container.appendChild(div);
    });
  }

  document.getElementById('add-chapter-btn').addEventListener('click', function () {
    state.chapters.push({ id: 'chap-' + Date.now(), title: 'New Chapter', date: '', note: '' });
    saveState(); renderTimeline();
  });

  function renderLastPage() {
    const qEl = document.getElementById('last-page-quote');
    const qIn = document.getElementById('last-page-quote-input');
    qIn.value = state.lastPage.quoteText || '';
    qEl.textContent = state.lastPage.showQuote && state.lastPage.quoteText ? '“' + state.lastPage.quoteText + '”' : '';
    document.getElementById('future-letter-input').value = state.lastPage.futureLetter || '';
  }
  document.getElementById('save-quote-btn').onclick = function () {
    state.lastPage.quoteText = document.getElementById('last-page-quote-input').value.trim();
    state.lastPage.showQuote = Boolean(state.lastPage.quoteText);
    saveState(); renderLastPage();
  };
  document.getElementById('clear-quote-btn').onclick = function () {
    state.lastPage.quoteText = ''; state.lastPage.showQuote = false;
    saveState(); renderLastPage();
  };
  document.getElementById('save-letter-btn').onclick = function () {
    state.lastPage.futureLetter = document.getElementById('future-letter-input').value.trim();
    saveState();
    const m = document.getElementById('letter-saved-msg');
    m.textContent = 'Letter saved locally.';
    setTimeout(() => { m.textContent = ''; }, 2000);
  };

  const modal = document.getElementById('diary-modal');
  function openDiary() { modal.classList.remove('hidden'); renderDiary(); }
  function closeDiary() { modal.classList.add('hidden'); }
  document.getElementById('open-diary-nav-btn').onclick = openDiary;
  document.getElementById('hotspot-notebook').onclick = openDiary;
  document.getElementById('close-diary-btn').onclick = closeDiary;
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeDiary(); });

  function renderDiary() {
    const catList = document.getElementById('category-list');
    const sel = document.getElementById('entry-category-select');
    catList.innerHTML = ''; sel.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.type = 'button'; allBtn.className = 'toggle-btn';
    allBtn.textContent = 'All (' + state.entries.length + ')';
    allBtn.onclick = () => { selectedCategory = 'all'; renderDiary(); };
    catList.appendChild(allBtn);

    state.categories.forEach(function (c) {
      const opt = document.createElement('option');
      opt.value = c.id; opt.textContent = c.name;
      sel.appendChild(opt);

      const row = document.createElement('div');
      row.className = 'cat-item';
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'toggle-btn'; b.style.flex = '1'; b.style.textAlign = 'left';
      b.textContent = c.name;
      b.onclick = () => { selectedCategory = c.id; renderDiary(); };
      row.appendChild(b);
      if (state.categories.length > 1) {
        const del = document.createElement('button');
        del.type = 'button'; del.className = 'toggle-btn'; del.textContent = '×';
        del.onclick = () => {
          state.categories = state.categories.filter(x => x.id !== c.id);
          saveState(); renderDiary();
        };
        row.appendChild(del);
      }
      catList.appendChild(row);
    });

    const list = document.getElementById('diary-entries-container');
    list.innerHTML = '';
    const entries = selectedCategory === 'all' ? state.entries : state.entries.filter(e => e.categoryId === selectedCategory);
    if (entries.length === 0) {
      list.innerHTML = '<p class="ethical-note">These pages are blank and waiting for your own words.</p>';
      return;
    }
    const catMap = new Map(state.categories.map(c => [c.id, c.name]));
    entries.forEach(function (entry) {
      const card = document.createElement('div');
      card.className = 'entry-card';
      card.innerHTML =
        '<div class="timeline-item-head"><div><small style="color:#919bab">' +
        escapeHtml(catMap.get(entry.categoryId) || 'Note') + (entry.date ? ' · ' + escapeHtml(entry.date) : '') +
        '</small><h4>' + escapeHtml(entry.title) + '</h4></div>' +
        '<div class="btn-row"><button type="button" class="toggle-btn ed">Edit</button><button type="button" class="toggle-btn dl">Delete</button></div></div>' +
        '<p style="white-space:pre-wrap;margin-top:0.5rem">' + escapeHtml(entry.content) + '</p>';
      card.querySelector('.ed').onclick = () => {
        document.getElementById('entry-edit-id').value = entry.id;
        document.getElementById('entry-category-select').value = entry.categoryId;
        document.getElementById('entry-title-input').value = entry.title;
        document.getElementById('entry-date-input').value = entry.date || '';
        document.getElementById('entry-content-input').value = entry.content;
      };
      card.querySelector('.dl').onclick = () => {
        state.entries = state.entries.filter(x => x.id !== entry.id);
        saveState(); renderDiary();
      };
      list.appendChild(card);
    });
  }

  document.getElementById('add-category-btn').onclick = function () {
    const inp = document.getElementById('new-category-input');
    if (!inp.value.trim()) return;
    state.categories.push({ id: 'cat-' + Date.now(), name: inp.value.trim() });
    inp.value = ''; saveState(); renderDiary();
  };

  document.getElementById('diary-entry-form').onsubmit = function (e) {
    e.preventDefault();
    const editId = document.getElementById('entry-edit-id').value;
    const catId = document.getElementById('entry-category-select').value;
    const title = document.getElementById('entry-title-input').value.trim() || 'Untitled Note';
    const date = document.getElementById('entry-date-input').value.trim();
    const content = document.getElementById('entry-content-input').value.trim();
    if (!content && !title) return;
    if (editId) {
      state.entries = state.entries.map(item => item.id === editId ? Object.assign({}, item, { categoryId: catId, title, date, content }) : item);
    } else {
      state.entries.unshift({ id: 'entry-' + Date.now(), categoryId: catId, title, date, content, updatedAt: new Date().toISOString() });
    }
    document.getElementById('entry-edit-id').value = '';
    document.getElementById('entry-title-input').value = '';
    document.getElementById('entry-date-input').value = '';
    document.getElementById('entry-content-input').value = '';
    saveState(); renderDiary();
  };

  function downloadFile(name, text, type) {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  }
  document.getElementById('export-json-btn').onclick = () => downloadFile('the-window-backup.json', JSON.stringify(state, null, 2), 'application/json');
  document.getElementById('export-txt-btn').onclick = () => {
    const txt = state.entries.map(e => e.title + (e.date ? ' (' + e.date + ')' : '') + '\\n' + e.content).join('\\n\\n---\\n\\n');
    downloadFile('the-window-diary.txt', txt || 'No diary entries recorded yet.', 'text/plain');
  };
  document.getElementById('import-json-input').onchange = function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const parsed = JSON.parse(r.result);
        if (Array.isArray(parsed.categories) && Array.isArray(parsed.entries)) {
          state = parsed; saveState(); renderDiary(); renderTimeline(); renderLastPage();
        }
      } catch (err) {
        console.error('Invalid backup JSON');
      }
    };
    r.readAsText(file);
  };

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  renderTimeline();
  renderLastPage();
})();
`;
}

export async function downloadStandaloneZipBundle(currentMemory: MemoryState): Promise<void> {
  const zip = new JSZip();

  zip.file('index.html', buildStandaloneHtml());
  zip.file('style.css', buildStandaloneCss());
  zip.file('script.js', buildStandaloneJs(currentMemory));
  zip.file('README.md', STANDALONE_README_MD);

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'the-window-20-meters-apart-standalone.zip';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
