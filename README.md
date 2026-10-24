# THE WINDOW — 20 METERS APART
### A Personal Memory Experience by AKSAD

> *"Somewhere between these rooftops, a window became a memory."*

**THE WINDOW — 20 METERS APART** is a quiet, cinematic personal memory project inspired by a fifth-floor study desk, dense South Asian residential concrete and unfinished brick rooftops, overhead utility cables, and a window in a modest two-story house approximately 20 meters away.

This project is an artistic reconstruction of remembered distance and unspoken quiet moments—never a tracking tool, real-world map, or attempt to identify any real person.

---

## Key Scenes & Features

1. **Opening Experience**: Full-screen fifth-floor twilight reveal with restrained typography and a calm transition into the memory.
2. **01 · The Study Room**: Interactive fifth-floor study desk beside the iron-grilled casement window with subtle mouse parallax, warm desk lamp toggle, clickable clothbound notebook, and window transition.
3. **02 · The Window View**: Artistic rooftop reconstruction featuring smooth **Day**, **Dusk** (default), and **Night** atmospheric transitions, gentle zoom toward the distant window, swaying overhead cables, and optional subtle **Rain on Glass**.
4. **03 · The Distance (20 Meters)**: Symbolic architectural elevation connecting the fifth-floor viewpoint and the two-story house, paired with a private local reflection note.
5. **04 · The Timeline**: Editable, reorderable emotional chapters (*The First Look*, *The Curiosity*, *The Waiting*, *The Unsaid*, *The Distance*, *What Remains*) with optional dates and personal notes. Works cleanly even when reduced to a single chapter.
6. **05 · The Last Page**: Editable or removable closing words and an optional private letter to your future self.
7. **The Unsaid — Personal Diary**: Private local notebook with editable categories, blank-state invitation (zero pre-invented memories), local browser storage persistence, **Export JSON**, **Export TXT**, and **Import JSON** backup restoration.
8. **Standalone Static ZIP Export**: Click **Standalone ZIP & Setup Guide** in the footer at any time to download a zero-dependency static bundle (`index.html`, `style.css`, `script.js`, `README.md`, and local `assets/`) that opens directly without Node.js or a build step.

---

## Beginner-Friendly Windows Setup Instructions

### Option 1: Zero-Install Standalone Mode (No Node.js Required)
1. Click **Standalone ZIP & Setup Guide → Download Project ZIP** in the website footer to download `the-window-20-meters-apart-standalone.zip`.
2. In Windows **File Explorer**, right-click the downloaded `.zip` file and click **Extract All...**.
3. Open the extracted folder and double-click **`index.html`** to launch it directly in Edge, Chrome, or Firefox.
4. Optional (for long-term browser `localStorage` reliability on Windows): if Python is installed, click the File Explorer address bar inside the extracted folder, type `cmd`, press **Enter**, run `python -m http.server 8080`, and visit `http://localhost:8080`.

### Option 2: Running This Vite / React Source Repository Locally
1. Install [Node.js LTS](https://nodejs.org/) on Windows if you wish to edit the TypeScript/React source.
2. Open **Command Prompt** or **PowerShell** inside the project folder and run:
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

---

## GitHub Pages Deployment Instructions

### Deploying the Standalone Static Bundle (Fastest — Zero Build Config)
1. Export the standalone ZIP from the footer (**Standalone ZIP & Setup Guide → Download Project ZIP**) and extract it.
2. Create a new repository on [GitHub](https://github.com/new).
3. Upload `index.html`, `style.css`, `script.js`, `README.md`, and the `assets/` folder to the root of your repository and commit.
4. Go to **Settings → Pages** in your GitHub repository.
5. Under **Build and deployment → Source**, choose **Deploy from a branch**, select **`main`** and **`/ (root)`**, and click **Save**.
6. Your site will be live on GitHub Pages in 1–2 minutes.

### Deploying the Vite Build via `dist/`
1. Run `npm run build` locally to generate the static `dist/` folder.
2. Upload the contents of `dist/` to your GitHub Pages branch (`gh-pages` or `main` `/docs`).

---

## Privacy & Safety Commitments

- **Local-Only Personal Data**: All diary entries, categories, distance reflections, timeline chapters, and future letters stay inside your browser's `localStorage` by default and are never sent to any external server.
- **Unencrypted Browser Storage Notice**: Browser `localStorage` is not encrypted and is not synchronized across devices. Clearing your browser cache/site data or using Incognito/Private mode can erase stored entries—use **Export JSON** or **Export TXT** inside the Notebook to save personal backups.
- **No Surveillance or Identification**: Contains no GPS, maps, geolocation, tracking, or identity/routine inference.

---

## Troubleshooting

- **My saved entries disappeared after closing the browser:** Ensure you are not in Incognito / InPrivate mode, and check that your browser is not configured to clear site data on exit. Always keep an exported `.json` backup file.
- **No sound plays when clicking Sound:** Audio is optional, synthesized via Web Audio API, and muted by default. Click the **Muted / Sound: On** toggle directly and check that your browser tab and Windows volume mixer are unmuted.
- **Animations feel heavy on a low-memory laptop:** Toggle **Reduced Motion: On** and keep **Rain: Off** in the atmosphere bar to disable continuous Canvas and CSS transitions.
