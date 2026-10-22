import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

/** Pale breadcrumb strip directly under the sub-page heroes. */
export function CrumbBar({
  items,
  wide = false,
}: {
  items: Crumb[];
  /** Align to the header's margins instead of the narrow Who We Are column. */
  wide?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb" className="bg-surface-crumb">
      <ol
        className={`${
          wide ? "container-site" : "container-narrow"
        } flex flex-wrap items-center gap-3 py-2.5 text-[0.84rem]`}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-3">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="text-ink transition-colors hover:text-brand-600"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-brand-600" aria-current="page">
                  {item.label}
                </span>
              )}
              {!last && (
                <ChevronRight className="h-3.5 w-3.5 text-ink" strokeWidth={2.2} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Navy section title followed by the short green rule.
 * `lede` sits under the rule as a larger standfirst; `as="h1"` is for page
 * headers that have no hero (the journey pages).
 */
export function SectionTitle({
  children,
  className = "",
  size = "md",
  as: Tag = "h2",
  lede,
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  as?: "h1" | "h2";
  lede?: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Tag
        className={`font-700 leading-[1.2] tracking-[-0.01em] text-ink ${
          size === "sm"
            ? "text-[1.4rem]"
            : size === "lg"
              ? "text-[1.5rem] sm:text-[1.6rem]"
              : size === "xl"
                ? "text-[1.85rem] leading-[1.12] sm:text-[2.3rem]"
                : "text-[1.55rem] sm:text-[1.75rem]"
        }`}
      >
        {children}
      </Tag>
      <span className="rule mt-4" />
      {lede && (
        <p className="mt-4 max-w-[54rem] text-[1.05rem] leading-[1.45] text-ink-light">
          {lede}
        </p>
      )}
    </div>
  );
}

/** Rounded content photo. */
export function Photo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden rounded-lg ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 560px"
        className="object-cover"
      />
    </div>
  );
}
