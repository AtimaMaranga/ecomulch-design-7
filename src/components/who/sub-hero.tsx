import Image from "next/image";
import type { IconComponent } from "@/components/icons";

/**
 * The hero shared by every content page.
 *
 * Who We Are sub-pages use the original form: photo full-bleed, text on a
 * near-black green field that fades into it from the left (`layout="cover"`).
 *
 * The Recycling Green Waste and Greening Urban Spaces pages add two options in
 * the same geometry, type scale and rule:
 *   · `layout="split"` — the photo sits on the right and dissolves into a
 *     solid ground, so copy never sits on a busy image. Used for every hero
 *     whose mockup photo had copy baked into its left side.
 *   · `tone="light"` — pale mint ground with navy type, for the sub-pages
 *     whose mockups use a light hero.
 * Omit `image` for a text-only header in the same style.
 *
 * Wrap the coloured half of a two-tone title in <span className="hero-accent">.
 */
export function SubHero({
  image,
  imageAlt = "",
  eyebrow,
  eyebrowIcon: Icon,
  title,
  subtitle,
  subtitleClassName = "",
  body,
  tone = "dark",
  layout = "cover",
  size = "md",
  textWidth,
  wide = false,
}: {
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  eyebrowIcon?: IconComponent;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  subtitleClassName?: string;
  /** Further paragraphs under the subtitle. */
  body?: React.ReactNode;
  tone?: "dark" | "light";
  layout?: "cover" | "split";
  size?: "md" | "lg";
  textWidth?: string;
  /** Align to the header's margins instead of the narrow Who We Are column. */
  wide?: boolean;
}) {
  const dark = tone === "dark";
  const split = layout === "split" || !image;
  const width = textWidth ?? (split ? "max-w-[30rem]" : "max-w-[26rem]");

  const height =
    size === "lg"
      ? "md:min-h-[clamp(420px,38vw,560px)]"
      : "md:min-h-[clamp(318px,31vw,440px)]";

  return (
    <section
      data-tone={tone}
      className={`relative isolate overflow-hidden ${
        dark ? "bg-[#020c04]" : "bg-surface-tint"
      }`}
    >
      {image && !split && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
          <div className="hero-split-overlay absolute inset-0 max-md:bg-black/55" />
        </>
      )}

      {image && split && (
        <div className="mask-fade-left relative h-56 w-full sm:h-72 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[58%]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 58vw"
            className="object-cover"
          />
        </div>
      )}

      <div
        className={`${
          wide ? "container-site" : "container-narrow"
        } relative flex flex-col justify-center py-12 ${
          image && split ? "" : "min-h-[340px]"
        } ${height}`}
      >
        <div className={width}>
          {eyebrow && (
            <p
              className={`flex items-center gap-2.5 text-[0.9rem] font-600 uppercase tracking-[0.01em] ${
                dark ? "text-[#7cc84e]" : "text-brand-600"
              }`}
            >
              {Icon && <Icon className="h-6 w-6" strokeWidth={2.2} />}
              {eyebrow}
            </p>
          )}
          <h1
            className={`mt-3 text-[2.2rem] font-700 leading-[1.08] tracking-[-0.01em] sm:text-[2.85rem] ${
              dark ? "!text-white" : "text-ink"
            }`}
          >
            {title}
          </h1>
          <span className="mt-5 block h-[3px] w-10 rounded-full bg-brand-500" />
          {subtitle && (
            <p
              className={`mt-5 text-[1.02rem] leading-[1.45] sm:text-[1.1rem] ${
                dark ? "text-white" : "font-700 text-ink"
              } ${subtitleClassName}`}
            >
              {subtitle}
            </p>
          )}
          {body && (
            <div
              className={`mt-4 space-y-3.5 text-[0.98rem] leading-[1.5] ${
                dark ? "text-white/90" : "text-ink-light"
              }`}
            >
              {body}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
