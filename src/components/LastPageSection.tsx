import React, { useState, useEffect } from 'react';
import { Pencil, EyeOff, Eye, Check, Mail } from 'lucide-react';
import { LastPageContent } from '../types';

interface LastPageSectionProps {
  lastPage: LastPageContent;
  onUpdateLastPage: (next: LastPageContent) => void;
}

export const LastPageSection: React.FC<LastPageSectionProps> = ({
  lastPage,
  onUpdateLastPage,
}) => {
  const [editingQuote, setEditingQuote] = useState(false);
  const [quoteDraft, setQuoteDraft] = useState(lastPage.quoteText);

  const [editingLetter, setEditingLetter] = useState(false);
  const [letterDraft, setLetterDraft] = useState(lastPage.futureLetter);
  const [letterDateDraft, setLetterDateDraft] = useState(lastPage.futureLetterDate || '');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  useEffect(() => {
    setQuoteDraft(lastPage.quoteText);
    setLetterDraft(lastPage.futureLetter);
    setLetterDateDraft(lastPage.futureLetterDate || '');
  }, [lastPage]);

  const showSaved = (msg: string) => {
    setSavedNotice(msg);
    window.setTimeout(() => setSavedNotice(null), 2200);
  };

  const handleSaveQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = quoteDraft.trim();
    onUpdateLastPage({
      ...lastPage,
      quoteText: cleaned,
      showQuote: cleaned.length > 0,
    });
    setEditingQuote(false);
    showSaved('Closing words updated.');
  };

  const handleToggleQuoteVisibility = () => {
    onUpdateLastPage({
      ...lastPage,
      showQuote: !lastPage.showQuote,
    });
  };

  const handleSaveLetter = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateLastPage({
      ...lastPage,
      futureLetter: letterDraft.trim(),
      futureLetterDate: letterDateDraft.trim(),
    });
    setEditingLetter(false);
    showSaved('Letter to your future self saved locally.');
  };

  return (
    <section
      id="scene-last-page"
      aria-labelledby="last-page-heading"
      className="mx-auto w-full max-w-[920px] px-4 pt-20 pb-28 sm:px-8"
    >
      <div className="border-t border-[#1e2530] pt-20">
        <div className="text-center">
          <p className="font-sans text-xs tracking-[0.2em] text-[#8d96a5] uppercase">
            05 · The Last Page
          </p>
          <h2 id="last-page-heading" className="sr-only">
            The Last Page — Quiet Closing Reflection
          </h2>
        </div>

        {/* Editable Closing Reflection */}
        <div className="mx-auto mt-10 max-w-2xl text-center">
          {editingQuote ? (
            <form onSubmit={handleSaveQuote} className="space-y-4 text-left">
              <label htmlFor="closing-words-textarea" className="block font-sans text-xs text-[#9aa3b2]">
                Closing Words (Replace with your own words, or clear to leave silent)
              </label>
              <textarea
                id="closing-words-textarea"
                rows={4}
                value={quoteDraft}
                onChange={(e) => setQuoteDraft(e.target.value)}
                placeholder="Write your own quiet closing reflection..."
                className="w-full rounded-md border border-[#2e3848] bg-[#0b0f16] p-4 font-serif text-xl leading-relaxed text-[#f0f2f5] focus:border-[#d99b4e] focus:outline-none"
              />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onUpdateLastPage({ ...lastPage, quoteText: '', showQuote: false });
                    setEditingQuote(false);
                    showSaved('Closing text removed.');
                  }}
                  className="min-h-[36px] font-sans text-xs text-[#9aa3b2] underline-offset-4 hover:text-[#f2a7a7] hover:underline cursor-pointer whitespace-nowrap shrink-0"
                >
                  Remove text entirely
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setQuoteDraft(lastPage.quoteText);
                      setEditingQuote(false);
                    }}
                    className="min-h-[38px] rounded border border-[#28313f] px-4 py-1.5 font-sans text-xs text-[#9aa3b2] hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="min-h-[38px] rounded bg-[#d99b4e] px-4 py-1.5 font-sans text-xs font-medium text-[#0b0e13] hover:bg-[#e5ad65] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Save Words
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              {lastPage.showQuote && lastPage.quoteText.trim() ? (
                <blockquote className="whitespace-pre-line font-serif text-2xl italic leading-relaxed text-[#eef0f4] sm:text-3xl">
                  &ldquo;{lastPage.quoteText}&rdquo;
                </blockquote>
              ) : (
                <p className="py-6 font-serif text-lg italic text-[#6d7686]">
                  (Left intentionally in quiet silence.)
                </p>
              )}

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingQuote(true)}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded border border-[#242c38] bg-[#10151e] px-3 py-1.5 font-sans text-xs text-[#b5becb] transition-colors hover:border-[#d99b4e]/60 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Pencil className="h-3.5 w-3.5 text-[#d99b4e] shrink-0" />
                  <span>Edit Closing Words</span>
                </button>

                {lastPage.quoteText.trim() && (
                  <button
                    type="button"
                    onClick={handleToggleQuoteVisibility}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded border border-[#242c38] bg-[#10151e] px-3 py-1.5 font-sans text-xs text-[#9aa3b2] transition-colors hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {lastPage.showQuote ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5 shrink-0" />
                        <span>Hide Text</span>
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5 shrink-0" />
                        <span>Restore Text</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {savedNotice && (
          <p className="mt-5 flex items-center justify-center gap-1.5 text-center font-sans text-xs text-[#d99b4e]">
            <Check className="h-3.5 w-3.5" />
            <span>{savedNotice}</span>
          </p>
        )}

        {/* Optional Personal Letter to Future Self */}
        <div className="mx-auto mt-16 max-w-2xl rounded-lg border border-[#1d2430] bg-[#0e131b]/75 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-[#d99b4e] shrink-0" />
              <h3 className="font-serif text-xl text-[#f0f2f5]">
                Optional Letter to Your Future Self
              </h3>
            </div>
            {!editingLetter && (
              <button
                type="button"
                onClick={() => setEditingLetter(true)}
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded border border-[#28313f] bg-[#121822] px-3.5 py-1.5 font-sans text-xs text-[#d6dce6] hover:border-[#d99b4e]/60 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
              >
                <Pencil className="h-3.5 w-3.5 text-[#d99b4e] shrink-0" />
                <span>{lastPage.futureLetter ? 'Edit Letter' : 'Write a Letter'}</span>
              </button>
            )}
          </div>

          <p className="mt-2 font-sans text-xs leading-relaxed text-[#8d96a5]">
            Some memories remain unresolved, and that is allowed. Write a quiet note to the person
            you will be years from that fifth-floor desk. Kept strictly local in your browser.
          </p>

          {editingLetter ? (
            <form onSubmit={handleSaveLetter} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="future-letter-date"
                  className="block font-sans text-xs text-[#9aa3b2]"
                >
                  Written On / Intended For (Optional)
                </label>
                <input
                  id="future-letter-date"
                  type="text"
                  value={letterDateDraft}
                  onChange={(e) => setLetterDateDraft(e.target.value)}
                  placeholder="e.g., Written October 2026 — For five years from now"
                  className="mt-1.5 w-full rounded border border-[#2c3646] bg-[#0a0e14] px-3.5 py-2 font-sans text-sm text-[#e6e8ec] placeholder-[#656f7f] focus:border-[#d99b4e] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="future-letter-body"
                  className="block font-sans text-xs text-[#9aa3b2]"
                >
                  Your Letter
                </label>
                <textarea
                  id="future-letter-body"
                  rows={6}
                  value={letterDraft}
                  onChange={(e) => setLetterDraft(e.target.value)}
                  placeholder="Dear future self..."
                  className="mt-1.5 w-full rounded border border-[#2c3646] bg-[#0a0e14] p-4 font-serif text-lg leading-relaxed text-[#e6e8ec] placeholder-[#656f7f] focus:border-[#d99b4e] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setLetterDraft(lastPage.futureLetter);
                    setLetterDateDraft(lastPage.futureLetterDate || '');
                    setEditingLetter(false);
                  }}
                  className="min-h-[38px] rounded border border-[#28313f] px-4 py-1.5 font-sans text-xs text-[#9aa3b2] hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[38px] rounded bg-[#d99b4e] px-4 py-1.5 font-sans text-xs font-medium text-[#0b0e13] hover:bg-[#e5ad65] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Save Letter
                </button>
              </div>
            </form>
          ) : lastPage.futureLetter ? (
            <div className="mt-5 border-t border-[#1e2633] pt-4">
              {lastPage.futureLetterDate && (
                <p className="mb-2 font-sans text-xs text-[#8d96a5]">
                  {lastPage.futureLetterDate}
                </p>
              )}
              <p className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-[#dfe4ec]">
                {lastPage.futureLetter}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
