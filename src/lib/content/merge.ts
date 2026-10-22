/**
 * Layer saved CMS edits over a page's default content.
 *
 * The default object defines the shape: keys missing from the saved copy fall
 * back to their defaults (so fields added in later releases appear
 * automatically), and values of the wrong type are ignored. Arrays are taken
 * from the saved copy wholesale (editors can add, remove and reorder items);
 * each saved item is merged over the default list's first item as a template.
 */

type Json = unknown;

function isObj(v: Json): v is Record<string, Json> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function mergeContent<T>(defaults: T, saved: Json): T {
  return merge(defaults as Json, saved) as T;
}

function merge(def: Json, saved: Json): Json {
  if (saved === undefined || saved === null) return def;
  if (Array.isArray(def)) {
    if (!Array.isArray(saved)) return def;
    const template = def[0];
    return saved.map((item, i) => merge(def[i] ?? template, item));
  }
  if (isObj(def)) {
    if (!isObj(saved)) return def;
    const out: Record<string, Json> = {};
    for (const key of Object.keys(def)) {
      // Keys starting with "_" are layout settings, never taken from the CMS.
      out[key] = key.startsWith("_") ? def[key] : merge(def[key], saved[key]);
    }
    return out;
  }
  if (typeof def === typeof saved) return saved;
  return def;
}
