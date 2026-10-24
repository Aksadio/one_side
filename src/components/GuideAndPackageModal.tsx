import React, { useEffect, useState } from 'react';
import { X, Archive, Terminal, Globe, ShieldCheck, Wrench } from 'lucide-react';
import { MemoryState } from '../types';
import { downloadStandaloneZipBundle } from '../utils/standaloneZipExport';

interface GuideAndPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  memoryState: MemoryState;
}

export const GuideAndPackageModal: React.FC<GuideAndPackageModalProps> = ({
  isOpen,
  onClose,
  memoryState,
}) => {
  const [packaging, setPackaging] = useState(false);
  const [doneMsg, setDoneMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    setPackaging(true);
    setDoneMsg(null);
    try {
      await downloadStandaloneZipBundle(memoryState);
      setDoneMsg('Downloaded standalone ZIP (index.html, style.css, script.js, README.md & local assets).');
    } catch {
      setDoneMsg('Could not generate ZIP package in this browser environment.');
    } finally {
      setPackaging(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070b]/85 p-3 backdrop-blur-md sm:p-6"
    >
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-[#27303f] bg-[#0d121a] text-[#e6e8ec] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#1d2532] px-6 py-4">
          <div>
            <p className="font-sans text-xs tracking-[0.2em] text-[#d99b4e] uppercase">
              Offline Archive · Windows &amp; GitHub Pages Guide
            </p>
            <h2 id="guide-modal-title" className="font-serif text-2xl text-[#f2f4f7]">
              Standalone Package &amp; Setup Documentation
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close setup and package modal"
            className="flex h-10 w-10 items-center justify-center rounded border border-[#263040] bg-[#121822] text-[#b5becb] hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="space-y-8 overflow-y-auto p-6 sm:p-8">
          {/* Standalone ZIP Download Box */}
          <div className="rounded-lg border border-[#2b3546] bg-[#111722] p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-serif text-xl text-[#f5ebd8]">
                  Download Standalone Static Package (.ZIP)
                </h3>
                <p className="mt-1 max-w-xl font-sans text-xs leading-relaxed text-[#9ca5b4]">
                  Packages a zero-dependency vanilla <code className="font-mono text-[#e6e8ec]">index.html</code>,{' '}
                  <code className="font-mono text-[#e6e8ec]">style.css</code>,{' '}
                  <code className="font-mono text-[#e6e8ec]">script.js</code>, and{' '}
                  <code className="font-mono text-[#e6e8ec]">README.md</code> with embedded animated
                  cartoon rooftop &amp; study room illustrations—plus your current local diary
                  state—ready for direct offline opening or GitHub Pages.
                </p>
              </div>
              <button
                type="button"
                disabled={packaging}
                onClick={handleDownloadZip}
                className="inline-flex min-h-[42px] items-center gap-2 rounded bg-[#d99b4e] px-5 py-2.5 font-sans text-xs font-medium text-[#0b0e13] transition-colors hover:bg-[#e5ad65] disabled:opacity-60 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Archive className="h-4 w-4 shrink-0" />
                <span>{packaging ? 'Packaging ZIP...' : 'Download Project ZIP'}</span>
              </button>
            </div>
            {doneMsg && (
              <p className="mt-3 font-sans text-xs text-[#d99b4e]">{doneMsg}</p>
            )}
          </div>

          {/* 1. Beginner-Friendly Windows Setup */}
          <section className="space-y-2.5">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[#d99b4e] shrink-0" />
              <h3 className="font-serif text-xl text-[#f0f2f5]">
                1. Beginner-Friendly Windows Setup Instructions
              </h3>
            </div>
            <div className="space-y-2 font-sans text-xs leading-relaxed text-[#b5becb]">
              <p>
                <strong>Direct Open (No Node.js or Install Required):</strong> Right-click the
                downloaded <code className="font-mono text-[#e6e8ec]">the-window-20-meters-apart-standalone.zip</code>{' '}
                in Windows File Explorer, choose <strong>Extract All...</strong>, open the extracted
                folder, and double-click <code className="font-mono text-[#e6e8ec]">index.html</code>{' '}
                to open it in Edge, Chrome, or Firefox.
              </p>
              <p>
                <strong>Optional Local Server (Recommended for Long-Term Browser Storage):</strong>{' '}
                Some browsers clear <code className="font-mono text-[#e6e8ec]">file://</code>{' '}
                storage more aggressively than <code className="font-mono text-[#e6e8ec]">localhost</code>.
                If Python is installed on Windows, type <code className="font-mono text-[#e6e8ec]">cmd</code>{' '}
                into the folder&apos;s File Explorer address bar, press Enter, run{' '}
                <code className="font-mono text-[#e6e8ec]">python -m http.server 8080</code>, and
                open <code className="font-mono text-[#e6e8ec]">http://localhost:8080</code>.
              </p>
            </div>
          </section>

          {/* 2. GitHub Pages Deployment */}
          <section className="space-y-2.5 border-t border-[#1d2532] pt-6">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#d99b4e] shrink-0" />
              <h3 className="font-serif text-xl text-[#f0f2f5]">
                2. GitHub Pages Deployment Instructions
              </h3>
            </div>
            <ol className="list-decimal space-y-1.5 pl-5 font-sans text-xs leading-relaxed text-[#b5becb]">
              <li>
                Create a new repository on GitHub (for example,{' '}
                <code className="font-mono text-[#e6e8ec]">the-window-20m</code>).
              </li>
              <li>
                Upload the extracted standalone files (<code className="font-mono text-[#e6e8ec]">index.html</code>,{' '}
                <code className="font-mono text-[#e6e8ec]">style.css</code>,{' '}
                <code className="font-mono text-[#e6e8ec]">script.js</code>,{' '}
                <code className="font-mono text-[#e6e8ec]">README.md</code>, and the{' '}
                <code className="font-mono text-[#e6e8ec]">assets/</code> folder) to the repository
                root and commit.
              </li>
              <li>
                Open repository <strong>Settings → Pages</strong>. Under{' '}
                <strong>Build and deployment</strong>, select{' '}
                <strong>Deploy from a branch</strong>, choose branch{' '}
                <code className="font-mono text-[#e6e8ec]">main</code> and folder{' '}
                <code className="font-mono text-[#e6e8ec]">/ (root)</code>, and click{' '}
                <strong>Save</strong>.
              </li>
              <li>
                Wait 1–2 minutes for GitHub Pages to publish your live link. Note: if you want a
                blank public site, clear or avoid committing private notes inside{' '}
                <code className="font-mono text-[#e6e8ec]">script.js</code> before uploading.
              </li>
            </ol>
          </section>

          {/* 3. Privacy & Data Persistence Notice */}
          <section className="space-y-2.5 border-t border-[#1d2532] pt-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#d99b4e] shrink-0" />
              <h3 className="font-serif text-xl text-[#f0f2f5]">
                3. Privacy, Local Storage &amp; Ethical Design
              </h3>
            </div>
            <p className="font-sans text-xs leading-relaxed text-[#b5becb]">
              This project contains no tracking, external APIs, geolocation, maps, or identity
              inference. All personal diary entries and notes stay in your browser&apos;s local
              storage by default. Because browser local storage is unencrypted and is not
              synchronized across devices—and will be lost if you clear browser data—always use{' '}
              <strong>Export JSON</strong> or <strong>Export TXT</strong> inside the Notebook for
              safekeeping.
            </p>
          </section>

          {/* 4. Troubleshooting */}
          <section className="space-y-2.5 border-t border-[#1d2532] pt-6">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-[#d99b4e] shrink-0" />
              <h3 className="font-serif text-xl text-[#f0f2f5]">4. Troubleshooting</h3>
            </div>
            <ul className="list-disc space-y-1.5 pl-5 font-sans text-xs leading-relaxed text-[#b5becb]">
              <li>
                <strong>Diary entries disappeared after closing the browser:</strong> Private /
                Incognito windows erase <code className="font-mono text-[#e6e8ec]">localStorage</code>{' '}
                on exit. Use a normal browser profile and export JSON backups regularly.
              </li>
              <li>
                <strong>Ambient sound is silent:</strong> Audio is muted by default with zero
                autoplay. Click the Ambient Sound toggle directly and verify your browser tab is not
                muted.
              </li>
              <li>
                <strong>Slower older laptop performance:</strong> Switch{' '}
                <strong>Reduced Motion: On</strong> and keep <strong>Rain on Glass: Off</strong> in
                the atmosphere bar to pause all continuous animations.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
