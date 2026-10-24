import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { TimelineChapter } from '../types';

interface TimelineSectionProps {
  chapters: TimelineChapter[];
  onUpdateChapters: (chapters: TimelineChapter[]) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  chapters,
  onUpdateChapters,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftDate, setDraftDate] = useState('');
  const [draftNote, setDraftNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newNote, setNewNote] = useState('');
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const startEditing = (chapter: TimelineChapter) => {
    setFeedbackError(null);
    setEditingId(chapter.id);
    setDraftTitle(chapter.title);
    setDraftDate(chapter.date || '');
    setDraftNote(chapter.note);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFeedbackError(null);
  };

  const saveEdit = (id: string) => {
    const trimmedTitle = draftTitle.trim();
    if (!trimmedTitle) {
      setFeedbackError('Please give the chapter a title.');
      return;
    }
    const updated = chapters.map((ch) =>
      ch.id === id
        ? { ...ch, title: trimmedTitle, date: draftDate.trim(), note: draftNote.trim() }
        : ch
    );
    onUpdateChapters(updated);
    setEditingId(null);
    setFeedbackError(null);
  };

  const moveChapter = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= chapters.length) return;
    const copy = [...chapters];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);
    onUpdateChapters(copy);
  };

  const deleteChapter = (id: string) => {
    if (chapters.length <= 1) {
      setFeedbackError('At least one chapter is kept so the timeline remains intact. You can rename or clear it instead.');
      return;
    }
    setFeedbackError(null);
    onUpdateChapters(chapters.filter((ch) => ch.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleAddChapter = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) {
      setFeedbackError('Please enter a title for the new chapter.');
      return;
    }
    const created: TimelineChapter = {
      id: `chap-${Date.now()}`,
      title: trimmedTitle,
      date: newDate.trim(),
      note: newNote.trim(),
    };
    onUpdateChapters([...chapters, created]);
    setNewTitle('');
    setNewDate('');
    setNewNote('');
    setIsAdding(false);
    setFeedbackError(null);
  };

  return (
    <section
      id="scene-timeline"
      aria-labelledby="timeline-heading"
      className="mx-auto w-full max-w-[960px] px-4 py-16 sm:px-8"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-sans text-xs tracking-[0.18em] text-[#8d96a5] uppercase">
            04 · Emotional Chapters
          </p>
          <h2
            id="timeline-heading"
            className="mt-1 font-serif text-3xl font-normal text-[#f0f2f5] sm:text-4xl"
          >
            The Timeline
          </h2>
          <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-[#9ca5b4]">
            Suggested chapter labels to shape or replace as you wish. Dates and personal notes are
            entirely optional.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsAdding(true);
            setFeedbackError(null);
          }}
          className="inline-flex min-h-[40px] items-center gap-2 self-start rounded border border-[#2d3646] bg-[#121721] px-4 py-2 font-sans text-xs font-medium text-[#e6e8ec] transition-colors hover:border-[#d99b4e]/70 hover:text-white sm:self-auto cursor-pointer whitespace-nowrap shrink-0"
        >
          <Plus className="h-3.5 w-3.5 text-[#d99b4e] shrink-0" />
          <span>Add Chapter</span>
        </button>
      </div>

      {feedbackError && (
        <div
          role="alert"
          className="mt-5 flex items-center justify-between rounded border border-[#d99b4e]/40 bg-[#1a1612] px-4 py-3 font-sans text-xs text-[#f2dec2]"
        >
          <span>{feedbackError}</span>
          <button
            type="button"
            onClick={() => setFeedbackError(null)}
            aria-label="Dismiss message"
            className="ml-4 text-[#9aa3b2] hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Add Chapter Form */}
      {isAdding && (
        <form
          onSubmit={handleAddChapter}
          className="mt-6 rounded-lg border border-[#2f394a] bg-[#0f141d] p-5 sm:p-6"
        >
          <h3 className="font-serif text-xl text-[#f0f2f5]">New Chapter</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="new-chap-title"
                className="block font-sans text-xs text-[#9aa3b2]"
              >
                Chapter Title
              </label>
              <input
                id="new-chap-title"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., Quiet Afternoons"
                className="mt-1.5 w-full rounded border border-[#28313f] bg-[#0a0e14] px-3.5 py-2 font-sans text-sm text-[#e6e8ec] placeholder-[#656f7f] focus:border-[#d99b4e] focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="new-chap-date"
                className="block font-sans text-xs text-[#9aa3b2]"
              >
                Remembered Season or Date (Optional)
              </label>
              <input
                id="new-chap-date"
                type="text"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                placeholder="e.g., Late Monsoon, 2022"
                className="mt-1.5 w-full rounded border border-[#28313f] bg-[#0a0e14] px-3.5 py-2 font-sans text-sm text-[#e6e8ec] placeholder-[#656f7f] focus:border-[#d99b4e] focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="new-chap-note" className="block font-sans text-xs text-[#9aa3b2]">
              Personal Note (Optional)
            </label>
            <textarea
              id="new-chap-note"
              rows={3}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write as much or as little as you remember..."
              className="mt-1.5 w-full rounded border border-[#28313f] bg-[#0a0e14] p-3.5 font-serif text-lg text-[#e6e8ec] placeholder-[#656f7f] focus:border-[#d99b4e] focus:outline-none"
            />
          </div>
          <div className="mt-4 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="min-h-[38px] rounded border border-[#28313f] px-4 py-1.5 font-sans text-xs text-[#9aa3b2] hover:text-white cursor-pointer whitespace-nowrap shrink-0"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[38px] rounded bg-[#d99b4e] px-4 py-1.5 font-sans text-xs font-medium text-[#0b0e13] hover:bg-[#e5ad65] cursor-pointer whitespace-nowrap shrink-0"
            >
              Save Chapter
            </button>
          </div>
        </form>
      )}

      {/* Timeline Rail */}
      <ol className="relative mt-10 space-y-6 before:absolute before:top-3 before:bottom-3 before:left-[15px] before:w-px before:bg-[#232b38]">
        {chapters.map((chapter, index) => {
          const isEditing = editingId === chapter.id;
          return (
            <li key={chapter.id} className="relative pl-11">
              {/* Minimalist index marker */}
              <span
                aria-hidden="true"
                className="absolute top-1.5 left-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#2c3646] bg-[#0d121a] font-mono text-xs text-[#d99b4e] tabular-nums"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="rounded-lg border border-[#1d2430] bg-[#0e131b]/80 p-5 transition-colors hover:border-[#2a3445] sm:p-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor={`edit-title-${chapter.id}`}
                          className="block font-sans text-xs text-[#9aa3b2]"
                        >
                          Chapter Title
                        </label>
                        <input
                          id={`edit-title-${chapter.id}`}
                          type="text"
                          value={draftTitle}
                          onChange={(e) => setDraftTitle(e.target.value)}
                          className="mt-1 w-full rounded border border-[#2e3848] bg-[#090d13] px-3 py-2 font-sans text-sm text-[#f0f2f5] focus:border-[#d99b4e] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`edit-date-${chapter.id}`}
                          className="block font-sans text-xs text-[#9aa3b2]"
                        >
                          Optional Date / Season
                        </label>
                        <input
                          id={`edit-date-${chapter.id}`}
                          type="text"
                          value={draftDate}
                          onChange={(e) => setDraftDate(e.target.value)}
                          placeholder="Leave blank if unrecorded"
                          className="mt-1 w-full rounded border border-[#2e3848] bg-[#090d13] px-3 py-2 font-sans text-sm text-[#f0f2f5] placeholder-[#656f7f] focus:border-[#d99b4e] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor={`edit-note-${chapter.id}`}
                        className="block font-sans text-xs text-[#9aa3b2]"
                      >
                        Personal Note
                      </label>
                      <textarea
                        id={`edit-note-${chapter.id}`}
                        rows={3}
                        value={draftNote}
                        onChange={(e) => setDraftNote(e.target.value)}
                        placeholder="Add your own quiet reflection for this chapter..."
                        className="mt-1 w-full rounded border border-[#2e3848] bg-[#090d13] p-3 font-serif text-lg leading-relaxed text-[#e6e8ec] placeholder-[#656f7f] focus:border-[#d99b4e] focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="inline-flex min-h-[36px] items-center gap-1.5 rounded border border-[#28313f] px-3.5 py-1.5 font-sans text-xs text-[#9aa3b2] hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEdit(chapter.id)}
                        className="inline-flex min-h-[36px] items-center gap-1.5 rounded bg-[#d99b4e] px-3.5 py-1.5 font-sans text-xs font-medium text-[#0b0e13] hover:bg-[#e5ad65] cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Check className="h-3.5 w-3.5 shrink-0" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-2xl font-normal tracking-wide text-[#f0f2f5]">
                          {chapter.title}
                        </h3>
                        {chapter.date && (
                          <p className="mt-0.5 font-sans text-xs text-[#8d96a5]">
                            <span>{chapter.date}</span>
                          </p>
                        )}
                      </div>

                      {/* Reorder, Edit & Delete Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveChapter(index, -1)}
                          disabled={index === 0}
                          aria-label={`Move ${chapter.title} earlier`}
                          className="flex h-8 w-8 items-center justify-center rounded text-[#8d96a5] transition-colors hover:bg-[#19212e] hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveChapter(index, 1)}
                          disabled={index === chapters.length - 1}
                          aria-label={`Move ${chapter.title} later`}
                          className="flex h-8 w-8 items-center justify-center rounded text-[#8d96a5] transition-colors hover:bg-[#19212e] hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => startEditing(chapter)}
                          aria-label={`Edit ${chapter.title}`}
                          className="flex h-8 items-center gap-1 rounded px-2.5 font-sans text-xs text-[#b5becb] transition-colors hover:bg-[#19212e] hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <Pencil className="h-3.5 w-3.5 shrink-0" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteChapter(chapter.id)}
                          aria-label={`Delete ${chapter.title}`}
                          className="flex h-8 w-8 items-center justify-center rounded text-[#8d96a5] transition-colors hover:bg-[#2a181b] hover:text-[#f2a7a7] cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {chapter.note ? (
                      <p className="mt-3 whitespace-pre-wrap font-serif text-lg leading-relaxed text-[#d3d9e3]">
                        {chapter.note}
                      </p>
                    ) : (
                      <p className="mt-2 font-serif text-base italic text-[#6d7686]">
                        Unwritten chapter—select Edit whenever you wish to add your own note.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
