"use client";

import { useRef, useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2, Upload, Loader2 } from "lucide-react";
import { ICON_OPTIONS, resolveIcon } from "@/lib/content/icon-registry";
import type { FieldDef } from "@/lib/content/types";

/* ------------------------------------------------------------------ */
/* Shared primitives                                                  */
/* ------------------------------------------------------------------ */

const inputCls =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

function Label({ def }: { def: FieldDef }) {
  return (
    <div className="mb-1.5">
      <label className="block text-sm font-600 text-ink">{def.label}</label>
      {def.help && <p className="text-xs text-slate-400">{def.help}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Image field — upload or paste a path                               */
/* ------------------------------------------------------------------ */

function ImageField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) onChange(data.url);
      else setErr(data.error || "Upload failed");
    } catch {
      setErr("Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-line bg-surface">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="grid h-full w-full place-items-center text-[11px] text-slate-400">
              No image
            </span>
          )}
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/example.jpg"
            className={inputCls}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="mt-2 inline-flex items-center gap-2 rounded-lg border border-brand-600/40 px-3 py-1.5 text-xs font-600 text-brand-700 transition-colors hover:bg-brand-50 disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Upload className="h-3.5 w-3.5" />
            )}
            Upload new photo
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onFile}
            className="hidden"
          />
          {err && <p className="mt-1 text-xs text-rust-600">{err}</p>}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Icon field — dropdown with a live preview                          */
/* ------------------------------------------------------------------ */

function IconField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const Icon = resolveIcon(value);
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
        <Icon className="h-5 w-5" strokeWidth={1.9} />
      </span>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      >
        {ICON_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* List field — repeatable group of sub-fields                        */
/* ------------------------------------------------------------------ */

function ListField({
  def,
  value,
  onChange,
}: {
  def: FieldDef;
  value: Record<string, unknown>[];
  onChange: (v: Record<string, unknown>[]) => void;
}) {
  const items = Array.isArray(value) ? value : [];
  const itemFields = def.itemFields ?? [];

  function updateItem(idx: number, key: string, v: unknown) {
    const next = items.map((it, i) => (i === idx ? { ...it, [key]: v } : it));
    onChange(next);
  }
  function move(idx: number, dir: -1 | 1) {
    const to = idx + dir;
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    [next[idx], next[to]] = [next[to], next[idx]];
    onChange(next);
  }
  function remove(idx: number) {
    onChange(items.filter((_, i) => i !== idx));
  }
  function add() {
    const blank: Record<string, unknown> = {};
    for (const f of itemFields) blank[f.key] = f.type === "list" ? [] : "";
    onChange([...items, blank]);
  }

  const atMax = def.maxItems != null && items.length >= def.maxItems;

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-line bg-surface-tint p-3.5"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-700 uppercase tracking-wider text-slate-400">
              {def.itemLabel || "Item"} {idx + 1}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(idx, -1)}
                disabled={idx === 0}
                className="rounded-md p-1 text-slate-400 hover:bg-white hover:text-ink disabled:opacity-30"
                aria-label="Move up"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => move(idx, 1)}
                disabled={idx === items.length - 1}
                className="rounded-md p-1 text-slate-400 hover:bg-white hover:text-ink disabled:opacity-30"
                aria-label="Move down"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="rounded-md p-1 text-rust-500 hover:bg-rust-50"
                aria-label="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {itemFields.map((f) => (
              <FieldInput
                key={f.key}
                def={f}
                value={item[f.key]}
                onChange={(v) => updateItem(idx, f.key, v)}
              />
            ))}
          </div>
        </div>
      ))}
      {!atMax && (
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-2 rounded-lg border border-dashed border-brand-300 px-3 py-2 text-sm font-600 text-brand-700 transition-colors hover:bg-brand-50"
        >
          <Plus className="h-4 w-4" />
          Add {def.itemLabel || "item"}
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dispatcher                                                         */
/* ------------------------------------------------------------------ */

export function FieldInput({
  def,
  value,
  onChange,
}: {
  def: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (def.type === "list") {
    return (
      <div>
        <Label def={def} />
        <ListField
          def={def}
          value={value as Record<string, unknown>[]}
          onChange={onChange}
        />
      </div>
    );
  }

  const str = typeof value === "string" ? value : "";

  return (
    <div>
      <Label def={def} />
      {def.type === "textarea" ? (
        <textarea
          value={str}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={`${inputCls} resize-y`}
        />
      ) : def.type === "image" ? (
        <ImageField value={str} onChange={onChange} />
      ) : def.type === "icon" ? (
        <IconField value={str} onChange={onChange} />
      ) : def.type === "select" ? (
        <select
          value={str}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        >
          {(def.options ?? []).map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={str}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      )}
    </div>
  );
}
