import Link from "next/link";
import { Fragment } from "react";

/*
 * Minimal inline formatting for editable text, so editors can keep emphasis
 * and links without a rich-text editor:
 *   **bold words**        → <strong>
 *   [link text](/path)    → link (internal paths use next/link)
 * Everything else renders as plain text.
 */

const TOKEN = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function rich(text: string | undefined, boldClass = "font-700 text-ink"): React.ReactNode {
  if (!text) return null;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text))) {
    if (m.index > last) out.push(<Fragment key={i++}>{text.slice(last, m.index)}</Fragment>);
    if (m[1] !== undefined) {
      out.push(
        <strong key={i++} className={boldClass}>
          {m[1]}
        </strong>,
      );
    } else {
      const href = m[3];
      const cls =
        "font-600 text-brand-600 underline decoration-brand-300 underline-offset-[3px] transition-colors hover:text-brand-700 hover:decoration-brand-600";
      out.push(
        /^https?:/.test(href) ? (
          <a key={i++} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
            {m[2]}
          </a>
        ) : (
          <Link key={i++} href={href} className={cls}>
            {m[2]}
          </Link>
        ),
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(<Fragment key={i++}>{text.slice(last)}</Fragment>);
  return out;
}

/** A list of paragraphs, each with inline formatting. */
export function Paras({
  items,
  className,
  boldClass,
}: {
  items: string[];
  className?: string;
  boldClass?: string;
}) {
  return (
    <>
      {items.filter(Boolean).map((p, i) => (
        <p key={i} className={className}>
          {rich(p, boldClass)}
        </p>
      ))}
    </>
  );
}
