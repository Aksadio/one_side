import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Plus,
  Pencil,
  Trash2,
  Download,
  Upload,
  Check,
  FolderEdit,
  FileText,
} from 'lucide-react';
import { DiaryCategory, DiaryEntry, MemoryState } from '../types';
import { formatMemoryAsPlainText, validateImportedJson } from '../utils/storage';

interface DiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  memoryState: MemoryState;
  onUpdateCategories: (categories: DiaryCategory[]) => void;
  onUpdateEntries: (entries: DiaryEntry[]) => void;
  onImportState: (imported: MemoryState) => void;
}

export const DiaryModal: React.FC<DiaryModalProps> = ({
  isOpen,
  onClose,
  memoryState,
  onUpdateCategories,
  onUpdateEntries,
  onImportState,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState(false);

  const [entryTitle, setEntryTitle] = useState('');
  const [entryCategoryId, setEntryCategoryId] = useState(
    memoryState.categories[0]?.id || 'cat-first-look'
  );
  const [entryDate, setEntryDate] = useState('');
  const [entryContent, setEntryContent] = useState('');

  const [managingCategories, setManagingCategories] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [renamingCatId, setRenamingCatId] = useState<string | null>(null);
  const [renamingCatName, setRenamingCatName] = useState('');

  const [statusBanner, setStatusBanner] = useState<{
    type: 'info' | 'error';
    text: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (
      selectedCategoryId !== 'all' &&
      !memoryState.categories.some((c) => c.id === selectedCategoryId)
    ) {
      setSelectedCategoryId('all');
    }
  }, [memoryState.categories, selectedCategoryId]);

  if (!isOpen) return null;

  const showNotice = (type: 'info' | 'error', text: string) => {
    setStatusBanner({ type, text });
    if (type === 'info') {
      window.setTimeout(() => setStatusBanner(null), 3200);
    }
  };

  const openNewEntryForm = () => {
    setEditingEntryId(null);
    setEntryTitle('');
    setEntryDate('');
    setEntryContent('');
    setEntryCategoryId(
      selectedCategoryId !== 'all'
        ? selectedCategoryId
        : memoryState.categories[0]?.id || 'cat-first-look'
    );
    setIsComposing(true);
  };

  const openEditEntryForm = (entry: DiaryEntry) => {
    setEditingEntryId(entry.id);
    setEntryTitle(entry.title);
    setEntryCategoryId(entry.categoryId);
    setEntryDate(entry.date || '');
    setEntryContent(entry.content);
    setIsComposing(true);
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entryContent.trim() && !entryTitle.trim()) {
      showNotice('error', 'Write at least a title or a brief memory before saving.');
      return;
    }

    const nowIso = new Date().toISOString();

    if (editingEntryId) {
      const next = memoryState.entries.map((item) =>
        item.id === editingEntryId
          ? {
              ...item,
              title: entryTitle.trim() || 'Untitled Note',
              categoryId: entryCategoryId,
              date: entryDate.trim(),
              content: entryContent.trim(),
              updatedAt: nowIso,
            }
          : item
      );
      onUpdateEntries(next);
      showNotice('info', 'Diary entry updated locally.');
    } else {
      const created: DiaryEntry = {
        id: `entry-${Date.now()}`,
        title: entryTitle.trim() || 'Untitled Note',
        categoryId: entryCategoryId,
        date: entryDate.trim(),
        content: entryContent.trim(),
        updatedAt: nowIso,
      };
      onUpdateEntries([created, ...memoryState.entries]);
      showNotice('info', 'Saved quietly to your browser notebook.');
    }

    setIsComposing(false);
    setEditingEntryId(null);
  };

  const handleDeleteEntry = (id: string) => {
    onUpdateEntries(memoryState.entries.filter((e) => e.id !== id));
    if (editingEntryId === id) {
      setIsComposing(false);
      setEditingEntryId(null);
    }
    showNotice('info', 'Entry removed.');
  };

  // Editable Categories Handlers
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = newCategoryName.trim();
    if (!cleaned) return;
    const created: DiaryCategory = {
      id: `cat-${Date.now()}`,
      name: cleaned,
    };
    onUpdateCategories([...memoryState.categories, created]);
    setNewCategoryName('');
    showNotice('info', `Category "${cleaned}" added.`);
  };

  const handleSaveRenameCategory = (id: string) => {
    const cleaned = renamingCatName.trim();
    if (!cleaned) return;
    onUpdateCategories(
      memoryState.categories.map((c) => (c.id === id ? { ...c, name: cleaned } : c))
    );
    setRenamingCatId(null);
    setRenamingCatName('');
  };

  const handleDeleteCategory = (id: string) => {
    if (memoryState.categories.length <= 1) {
      showNotice('error', 'Keep at least one category in the notebook.');
      return;
    }
    const remaining = memoryState.categories.filter((c) => c.id !== id);
    const fallbackId = remaining[0].id;
    onUpdateCategories(remaining);
    // Reassign entries that belonged to deleted category so nothing is lost
    const reassigned = memoryState.entries.map((entry) =>
      entry.categoryId === id ? { ...entry, categoryId: fallbackId } : entry
    );
    onUpdateEntries(reassigned);
    showNotice('info', 'Category removed; existing notes moved to your first category.');
  };

  // Export & Import Handlers
  const triggerDownload = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    const dateStamp = new Date().toISOString().slice(0, 10);
    triggerDownload(
      `the-window-backup-${dateStamp}.json`,
      JSON.stringify(memoryState, null, 2),
      'application/json'
    );
    showNotice('info', 'Exported complete JSON backup file.');
  };

  const handleExportTxt = () => {
    const dateStamp = new Date().toISOString().slice(0, 10);
    triggerDownload(
      `the-window-diary-${dateStamp}.txt`,
      formatMemoryAsPlainText(memoryState),
      'text/plain;charset=utf-8'
    );
    showNotice('info', 'Exported readable plain-text diary.');
  };

  const handleImportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : '';
      const result = validateImportedJson(text);
      if (!result.valid || !result.data) {
        showNotice('error', result.error || 'Invalid backup file.');
      } else {
        onImportState(result.data);
        showNotice('info', 'Backup restored successfully.');
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.onerror = () => {
      showNotice('error', 'Failed to read the selected file.');
    };
    reader.readAsText(file);
  };

  const filteredEntries =
    selectedCategoryId === 'all'
      ? memoryState.entries
      : memoryState.entries.filter((e) => e.categoryId === selectedCategoryId);

  const categoryLookup = new Map(memoryState.categories.map((c) => [c.id, c.name]));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="diary-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070b]/85 p-3 backdrop-blur-md sm:p-6"
    >
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-[#27303f] bg-[#0d121a] text-[#e6e8ec] shadow-2xl">
        {/* Notebook Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#1d2532] px-5 py-4 sm:px-7">
          <div>
            <p className="font-sans text-xs tracking-[0.2em] text-[#d99b4e] uppercase">
              The Unsaid · Private Notebook
            </p>
            <h2 id="diary-modal-title" className="font-serif text-2xl text-[#f2f4f7] sm:text-3xl">
              Personal Memory Diary
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close personal diary"
            className="flex h-10 w-10 items-center justify-center rounded border border-[#263040] bg-[#121822] text-[#b5becb] transition-colors hover:border-[#e6e8ec]/40 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Status / Error Banner */}
        {statusBanner && (
          <div
            role={statusBanner.type === 'error' ? 'alert' : 'status'}
            className={`flex items-center justify-between border-b px-6 py-2.5 font-sans text-xs ${
              statusBanner.type === 'error'
                ? 'border-[#8f3f3f]/50 bg-[#261416] text-[#f5bcbc]'
                : 'border-[#d99b4e]/30 bg-[#191712] text-[#f2dec0]'
            }`}
          >
            <span>{statusBanner.text}</span>
            <button
              type="button"
              onClick={() => setStatusBanner(null)}
              className="text-[#9aa3b2] hover:text-white cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Main 2-Column Notebook Body */}
        <div className="grid flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-12">
          {/* Left Sidebar: Categories + Backup / Export */}
          <aside className="border-b border-[#1d2532] bg-[#0a0e15] p-5 lg:col-span-4 lg:border-r lg:border-b-0 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-xs font-medium tracking-[0.16em] text-[#8d96a5] uppercase">
                Categories
              </h3>
              <button
                type="button"
                onClick={() => setManagingCategories((v) => !v)}
                className="inline-flex items-center gap-1 font-sans text-xs text-[#b5becb] hover:text-[#d99b4e] cursor-pointer whitespace-nowrap shrink-0"
              >
                <FolderEdit className="h-3.5 w-3.5 shrink-0" />
                <span>{managingCategories ? 'Done' : 'Edit Categories'}</span>
              </button>
            </div>

            {/* Category Filter List */}
            <nav aria-label="Diary categories" className="mt-3 space-y-1">
              <button
                type="button"
                onClick={() => setSelectedCategoryId('all')}
                className={`flex w-full items-center justify-between rounded px-3 py-2 text-left font-sans text-xs transition-colors cursor-pointer ${
                  selectedCategoryId === 'all'
                    ? 'bg-[#19212e] font-medium text-[#f5ebd8]'
                    : 'text-[#9aa3b2] hover:bg-[#121822] hover:text-[#e6e8ec]'
                }`}
              >
                <span className="truncate">All Entries</span>
                <span className="font-mono text-[11px] text-[#7c8594] tabular-nums">
                  {memoryState.entries.length}
                </span>
              </button>

              {memoryState.categories.map((cat) => {
                const count = memoryState.entries.filter((e) => e.categoryId === cat.id).length;
                const isSelected = selectedCategoryId === cat.id;

                if (managingCategories && renamingCatId === cat.id) {
                  return (
                    <div key={cat.id} className="flex items-center gap-1.5 py-1">
                      <input
                        type="text"
                        value={renamingCatName}
                        onChange={(e) => setRenamingCatName(e.target.value)}
                        className="w-full rounded border border-[#d99b4e] bg-[#090d13] px-2.5 py-1 font-sans text-xs text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveRenameCategory(cat.id)}
                        aria-label="Save category name"
                        className="rounded bg-[#d99b4e] p-1.5 text-[#0b0e13] cursor-pointer"
                      >
                        <Check className="h-3 w-3" />
                      </button>
                    </div>
                  );
                }

                return (
                  <div key={cat.id} className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`flex flex-1 items-center justify-between rounded px-3 py-2 text-left font-sans text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#19212e] font-medium text-[#f5ebd8]'
                          : 'text-[#9aa3b2] hover:bg-[#121822] hover:text-[#e6e8ec]'
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span className="font-mono text-[11px] text-[#7c8594] tabular-nums">
                        {count}
                      </span>
                    </button>

                    {managingCategories && (
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            setRenamingCatId(cat.id);
                            setRenamingCatName(cat.name);
                          }}
                          aria-label={`Rename ${cat.name}`}
                          className="rounded p-1.5 text-[#8d96a5] hover:bg-[#18202c] hover:text-white cursor-pointer"
                        >
                          <Pencil className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(cat.id)}
                          aria-label={`Delete ${cat.name}`}
                          className="rounded p-1.5 text-[#8d96a5] hover:bg-[#2a181b] hover:text-[#f2a7a7] cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {managingCategories && (
              <form onSubmit={handleAddCategory} className="mt-3 flex gap-1.5">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="New category name..."
                  className="w-full rounded border border-[#273142] bg-[#090d13] px-2.5 py-1.5 font-sans text-xs text-white placeholder-[#656f7f] focus:border-[#d99b4e] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded border border-[#d99b4e]/60 px-2.5 py-1.5 font-sans text-xs text-[#f5ebd8] hover:bg-[#d99b4e] hover:text-[#0b0e13] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Add
                </button>
              </form>
            )}

            {/* Local Backup & Privacy Controls */}
            <div className="mt-8 border-t border-[#1b222e] pt-5">
              <h4 className="font-sans text-xs font-medium tracking-[0.14em] text-[#8d96a5] uppercase">
                Local Backup &amp; Export
              </h4>
              <p className="mt-1.5 font-sans text-[11px] leading-relaxed text-[#7c8594]">
                Entries stay private in this browser&apos;s unencrypted local storage and are never
                sent anywhere. Clearing browser data can erase them—export a backup anytime.
              </p>

              <div className="mt-3.5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded border border-[#283242] bg-[#121822] px-3 py-1.5 font-sans text-xs text-[#d6dce6] hover:border-[#d99b4e]/60 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Download className="h-3.5 w-3.5 text-[#d99b4e] shrink-0" />
                  <span>Export JSON</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportTxt}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded border border-[#283242] bg-[#121822] px-3 py-1.5 font-sans text-xs text-[#d6dce6] hover:border-[#d99b4e]/60 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                >
                  <FileText className="h-3.5 w-3.5 text-[#d99b4e] shrink-0" />
                  <span>Export TXT</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded border border-[#283242] bg-[#121822] px-3 py-1.5 font-sans text-xs text-[#d6dce6] hover:border-[#d99b4e]/60 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Upload className="h-3.5 w-3.5 text-[#d99b4e] shrink-0" />
                  <span>Import JSON</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImportFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </aside>

          {/* Right Pane: Entries List or Entry Editor */}
          <div className="flex flex-col p-5 lg:col-span-8 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1c2431] pb-4">
              <div>
                <h3 className="font-serif text-2xl text-[#f0f2f5]">
                  {selectedCategoryId === 'all'
                    ? 'All Notebook Pages'
                    : categoryLookup.get(selectedCategoryId) || 'Entries'}
                </h3>
              </div>

              {!isComposing && (
                <button
                  type="button"
                  onClick={openNewEntryForm}
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded bg-[#d99b4e] px-4 py-2 font-sans text-xs font-medium text-[#0b0e13] transition-colors hover:bg-[#e5ad65] cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Plus className="h-3.5 w-3.5 shrink-0" />
                  <span>New Diary Entry</span>
                </button>
              )}
            </div>

            {isComposing ? (
              <form onSubmit={handleSaveEntry} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="diary-entry-category"
                      className="block font-sans text-xs text-[#9aa3b2]"
                    >
                      Category
                    </label>
                    <select
                      id="diary-entry-category"
                      value={entryCategoryId}
                      onChange={(e) => setEntryCategoryId(e.target.value)}
                      className="mt-1.5 w-full rounded border border-[#2a3444] bg-[#090d13] px-3 py-2 font-sans text-xs text-[#e6e8ec] focus:border-[#d99b4e] focus:outline-none"
                    >
                      {memoryState.categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="diary-entry-title"
                      className="block font-sans text-xs text-[#9aa3b2]"
                    >
                      Title
                    </label>
                    <input
                      id="diary-entry-title"
                      type="text"
                      value={entryTitle}
                      onChange={(e) => setEntryTitle(e.target.value)}
                      placeholder="A brief heading..."
                      className="mt-1.5 w-full rounded border border-[#2a3444] bg-[#090d13] px-3 py-2 font-sans text-xs text-[#e6e8ec] placeholder-[#656f7f] focus:border-[#d99b4e] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="diary-entry-date"
                      className="block font-sans text-xs text-[#9aa3b2]"
                    >
                      Optional Date
                    </label>
                    <input
                      id="diary-entry-date"
                      type="text"
                      value={entryDate}
                      onChange={(e) => setEntryDate(e.target.value)}
                      placeholder="e.g., November Dusk"
                      className="mt-1.5 w-full rounded border border-[#2a3444] bg-[#090d13] px-3 py-2 font-sans text-xs text-[#e6e8ec] placeholder-[#656f7f] focus:border-[#d99b4e] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="diary-entry-content"
                    className="block font-sans text-xs text-[#9aa3b2]"
                  >
                    Memory / Unspoken Words
                  </label>
                  <textarea
                    id="diary-entry-content"
                    rows={8}
                    value={entryContent}
                    onChange={(e) => setEntryContent(e.target.value)}
                    placeholder="Write in your own words. Nothing is pre-written or sent anywhere..."
                    className="mt-1.5 w-full rounded border border-[#2a3444] bg-[#090d13] p-4 font-serif text-lg leading-relaxed text-[#f0f2f5] placeholder-[#656f7f] focus:border-[#d99b4e] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsComposing(false);
                      setEditingEntryId(null);
                    }}
                    className="min-h-[38px] rounded border border-[#28313f] px-4 py-1.5 font-sans text-xs text-[#9aa3b2] hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="min-h-[38px] rounded bg-[#d99b4e] px-5 py-1.5 font-sans text-xs font-medium text-[#0b0e13] hover:bg-[#e5ad65] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {editingEntryId ? 'Update Entry' : 'Save Entry'}
                  </button>
                </div>
              </form>
            ) : filteredEntries.length === 0 ? (
              /* Gentle Blank-State Invitation — No Invented Memories */
              <div className="my-auto flex flex-col items-center justify-center py-16 text-center">
                <p className="max-w-md font-serif text-2xl italic leading-relaxed text-[#cfd5df]">
                  These pages have been left intentionally blank for your own memories.
                </p>
                <p className="mt-3 max-w-md font-sans text-xs leading-relaxed text-[#8d96a5]">
                  No conversations, dates, or feelings have been invented here. Whenever you are
                  ready, record what you saw from the fifth-floor desk or what remained unsaid.
                </p>
                <button
                  type="button"
                  onClick={openNewEntryForm}
                  className="mt-6 inline-flex min-h-[40px] items-center gap-2 rounded border border-[#d99b4e]/60 bg-[#141a24] px-5 py-2 font-sans text-xs font-medium text-[#f5ebd8] transition-colors hover:bg-[#d99b4e] hover:text-[#0b0e13] cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Plus className="h-3.5 w-3.5 shrink-0" />
                  <span>Write Your First Entry</span>
                </button>
              </div>
            ) : (
              <div className="mt-5 space-y-5">
                {filteredEntries.map((entry) => {
                  const categoryName = categoryLookup.get(entry.categoryId) || 'Notebook';
                  return (
                    <article
                      key={entry.id}
                      className="rounded-md border border-[#1d2532] bg-[#0a0e15]/80 p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          {/* Zero-pill clean metadata with subtle middle dot separator */}
                          <div className="flex items-center gap-2 font-sans text-xs text-[#8d96a5]">
                            <span>{categoryName}</span>
                            {entry.date && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{entry.date}</span>
                              </>
                            )}
                          </div>
                          <h4 className="mt-1 font-serif text-xl text-[#f0f2f5]">
                            {entry.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => openEditEntryForm(entry)}
                            aria-label={`Edit ${entry.title}`}
                            className="inline-flex h-8 items-center gap-1 rounded px-2.5 font-sans text-xs text-[#b5becb] hover:bg-[#18202c] hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                          >
                            <Pencil className="h-3.5 w-3.5 shrink-0" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteEntry(entry.id)}
                            aria-label={`Delete ${entry.title}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded text-[#8d96a5] hover:bg-[#2a181b] hover:text-[#f2a7a7] cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="mt-3 whitespace-pre-wrap font-serif text-lg leading-relaxed text-[#d5dbe5]">
                        {entry.content}
                      </p>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
