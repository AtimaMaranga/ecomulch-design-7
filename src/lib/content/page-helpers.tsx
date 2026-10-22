import { Fragment } from "react";
import { Accent } from "@/components/section/v2";
import { resolveIcon } from "./icon-registry";
import type { IconComponent } from "@/components/icons";
import type { BadgeTone, SoftTone, SolidTone } from "@/components/section/blocks";

/** Icon component from its registry name. */
export const ic = (name: string | undefined): IconComponent =>
  resolveIcon(name) as unknown as IconComponent;

/** "mint" → soft badge; "solid-rust" → solid badge. */
export function badge(tone: string | undefined): BadgeTone {
  if (tone?.startsWith("solid-")) return { solid: tone.slice(6) as SolidTone };
  return { soft: (tone || "mint") as SoftTone };
}

/** Text with "\n" rendered as line breaks on wider screens. */
export function lines(text: string | undefined): React.ReactNode {
  if (!text) return null;
  const parts = text.split("\n");
  return parts.map((p, i) => (
    <Fragment key={i}>
      {p}
      {i < parts.length - 1 && <br className="hidden sm:block" />}
    </Fragment>
  ));
}

/** Navy title with an optional green second part. */
export function twoTone(title: string, accent?: string, breakBefore = false): React.ReactNode {
  return (
    <>
      {lines(title)}
      {accent && (breakBefore ? <br className="hidden sm:block" /> : " ")}
      {accent && <Accent>{lines(accent)}</Accent>}
    </>
  );
}

/**
 * Links in page content may use shortcuts that follow Site settings:
 * {whatsapp}, {catalogue}, {youtube}, {flowerBedsVideo}.
 */
export function linkFor(
  href: string,
  s: {
    whatsapp: string;
    whatsappCatalogueUrl?: string;
    youtubeUrl?: string;
    flowerBedsYoutubeUrl?: string;
  },
): string {
  switch (href.trim()) {
    case "{whatsapp}":
      return s.whatsapp;
    case "{catalogue}":
      return s.whatsappCatalogueUrl || s.whatsapp;
    case "{youtube}":
      return s.youtubeUrl || "https://www.youtube.com/";
    case "{flowerBedsVideo}":
      return s.flowerBedsYoutubeUrl || s.youtubeUrl || "https://www.youtube.com/";
    default:
      return href;
  }
}
