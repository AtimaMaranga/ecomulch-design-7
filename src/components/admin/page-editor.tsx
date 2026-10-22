"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Plus,
  Trash2,
  Save,
  Loader2,
  Check,
  ExternalLink,
  X,
} from "lucide-react";
import { FieldInput } from "./field-inputs";
import {
  BLOCK_SCHEMAS,
  PALETTE,
  getBlockSchema,
} from "@/lib/content/blocks-schema";
import type { Block, Page } from "@/lib/content/types";

function newId(type: string): string {
  const rand =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${type}-${rand}`;
}

export function PageEditor({ page }: { page: Page }) {
  const [blocks, setBlocks] = useState<Block[]>(page.blocks);
  const [open, setOpen] = useState<Record<string, boolean>>(
    Object.fromEntries(page.blocks.map((b) => [b.id, true])),
  );
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [palette, setPalette] = useState(false);

  const mutate = useCallback((updater: (prev: Block[]) => Block[]) => {
    setBlocks((prev) => updater(prev));
    setDirty(true);
    setSaved(false);
  }, []);

  const setData = useCallback(
    (id: string, key: string, value: unknown) =>
      mutate((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, data: { ...b.data, [key]: value } } : b,
        ),
      ),
    [mutate],
  );

  const move = (idx: number, dir: -1 | 1) =>
    mutate((prev) => {
      const to = idx + dir;
      if (to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[to]] = [next[to], next[idx]];
      return next;
    });

  const remove = (id: string) =>
    mutate((prev) => prev.filter((b) => b.id !== id));

  const duplicate = (idx: number) =>
    mutate((prev) => {
      const src = prev[idx];
      const copy: Block = {
        id: newId(src.type),
        type: src.type,
        data: JSON.parse(JSON.stringify(src.data)),
      };
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });

  const addBlock = (type: string) => {
    const schema = BLOCK_SCHEMAS[type];
    if (!schema) return;
    const block: Block = { id: newId(type), type, data: schema.makeDefault() };
    mutate((prev) => [...prev, block]);
    setOpen((o) => ({ ...o, [block.id]: true }));
    setPalette(false);
  };

  async function save() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/pages/${page.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...page, blocks }),
      });
      if (res.ok) {
        setDirty(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Could not save");
      }
    } catch {
      setError("Could not save. Check your connection.");
    } finally {
      setSaving(false);
    }
  }

  const headerLabel = useMemo(
    () => (b: Block) => getBlockSchema(b.type)?.label ?? b.type,
    [],
  );

  return (
    <div className="mx-auto max-w-3xl p-8 pb-32">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-600 text-brand-600">Editing page</p>
          <h1 className="font-display text-3xl font-700 text-ink">
            {page.title}
          </h1>
          <p className="text-sm text-slate-400">{page.path}</p>
        </div>
        <a
          href={page.path}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-600 text-ink-light transition-colors hover:border-brand-200 hover:text-brand-700"
        >
          <ExternalLink className="h-4 w-4" /> View page
        </a>
      </header>

      <div className="space-y-4">
        {blocks.map((block, idx) => {
          const schema = getBlockSchema(block.type);
          const isOpen = open[block.id] ?? true;
          return (
            <section
              key={block.id}
              className="overflow-hidden rounded-2xl border border-line bg-white shadow-card"
            >
              <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-3">
                <button
                  type="button"
                  onClick={() =>
                    setOpen((o) => ({ ...o, [block.id]: !isOpen }))
                  }
                  className="flex flex-1 items-center gap-2 text-left"
                >
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                  <span className="font-display text-base font-600 text-ink">
                    {headerLabel(block)}
                  </span>
                  <span className="text-xs text-slate-400">
                    #{idx + 1}
                  </span>
                </button>
                <div className="flex items-center gap-0.5">
                  <IconBtn
                    label="Move up"
                    onClick={() => move(idx, -1)}
                    disabled={idx === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </IconBtn>
                  <IconBtn
                    label="Move down"
                    onClick={() => move(idx, 1)}
                    disabled={idx === blocks.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </IconBtn>
                  <IconBtn label="Duplicate" onClick={() => duplicate(idx)}>
                    <Copy className="h-4 w-4" />
                  </IconBtn>
                  <IconBtn
                    label="Delete section"
                    danger
                    onClick={() => {
                      if (confirm("Delete this section? This cannot be undone once you save."))
                        remove(block.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </IconBtn>
                </div>
              </div>

              {isOpen && (
                <div className="space-y-4 p-4">
                  {schema ? (
                    schema.fields.map((f) => (
                      <FieldInput
                        key={f.key}
                        def={f}
                        value={block.data[f.key]}
                        onChange={(v) => setData(block.id, f.key, v)}
                      />
                    ))
                  ) : (
                    <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                      This section type (<code>{block.type}</code>) isn&apos;t
                      editable here yet. It will still display on the site.
                    </p>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Add section */}
      <div className="relative mt-5">
        <button
          type="button"
          onClick={() => setPalette((p) => !p)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand-300 py-4 text-sm font-600 text-brand-700 transition-colors hover:bg-brand-50"
        >
          <Plus className="h-4 w-4" /> Add a section
        </button>
        {palette && (
          <div className="absolute left-0 right-0 z-10 mt-2 rounded-2xl border border-line bg-white p-2 shadow-card-hover">
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-xs font-700 uppercase tracking-wider text-slate-400">
                Choose a section
              </span>
              <button
                type="button"
                onClick={() => setPalette(false)}
                className="rounded p-1 text-slate-400 hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-1 sm:grid-cols-2">
              {PALETTE.map((p) => (
                <button
                  key={p.type}
                  type="button"
                  onClick={() => addBlock(p.type)}
                  className="rounded-xl p-3 text-left transition-colors hover:bg-brand-50"
                >
                  <p className="font-600 text-ink">{p.label}</p>
                  <p className="text-xs leading-snug text-slate-400">
                    {p.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-64 right-0 border-t border-line bg-white/90 px-8 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <p className="text-sm">
            {error ? (
              <span className="text-rust-600">{error}</span>
            ) : saved ? (
              <span className="inline-flex items-center gap-1.5 text-brand-600">
                <Check className="h-4 w-4" /> Saved — your changes are live.
              </span>
            ) : dirty ? (
              <span className="text-slate-500">You have unsaved changes.</span>
            ) : (
              <span className="text-slate-400">All changes saved.</span>
            )}
          </p>
          <button
            type="button"
            onClick={save}
            disabled={saving || !dirty}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 font-600 text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  disabled,
  danger,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`rounded-md p-1.5 transition-colors disabled:opacity-30 ${
        danger
          ? "text-rust-500 hover:bg-rust-50"
          : "text-slate-400 hover:bg-white hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
