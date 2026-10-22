/**
 * Line icons drawn to match the EcoMulch mockups. All use currentColor and a
 * 48×48 grid so they sit consistently in the principle tiles and detail panel.
 */

type IconProps = { className?: string; strokeWidth?: number };

export type IconComponent = (props: IconProps) => React.ReactElement;

function Svg({
  className = "",
  strokeWidth = 1.7,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Small leaf used inside several composite icons. */
function LeafBadge({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="var(--icon-bg, #fff)" />
      <path
        d={`M${cx - r * 0.55} ${cy + r * 0.55} C ${cx - r * 0.6} ${cy - r * 0.2}, ${cx - r * 0.1} ${cy - r * 0.62}, ${cx + r * 0.62} ${cy - r * 0.62} C ${cx + r * 0.62} ${cy + r * 0.1}, ${cx + r * 0.2} ${cy + r * 0.6}, ${cx - r * 0.55} ${cy + r * 0.55} Z`}
      />
      <path d={`M${cx - r * 0.55} ${cy + r * 0.55} L ${cx + r * 0.3} ${cy - r * 0.3}`} />
    </>
  );
}

export function UrbanizationIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M5 42h34" />
      <path d="M9 42V20h10v22" />
      <path d="M19 42V8h11v22" />
      <path d="M30 14h4v14" />
      <path d="M12 24h1M15 24h1M12 28h1M15 28h1M12 32h1M15 32h1M12 36h1M15 36h1" />
      <path d="M22.5 12h1M26 12h1M22.5 16h1M26 16h1M22.5 20h1M26 20h1M22.5 24h1M26 24h1M22.5 28h1M26 28h1M22.5 32h1M22.5 36h1" />
      <LeafBadge cx={36} cy={35} r={9} />
    </Svg>
  );
}

export function ClimateIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M31 21.5a7 7 0 1 1 9.2 7.9" />
      <path d="M34 6.5v3M44.5 17h-3M41.4 9.6l-2.1 2.1M26.6 9.6l2.1 2.1" />
      <path d="M12.5 40h24a7.5 7.5 0 0 0 .8-15 10.5 10.5 0 0 0-20.1-2.2A8.6 8.6 0 0 0 12.5 40Z" />
    </Svg>
  );
}

export function BiodiversityIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M24 16v22" />
      <path d="M21.5 10.5 24 15l2.5-4.5" />
      <path d="M22.5 18C17 10 9 5.5 5.5 8c-3 2.2-.5 10 4.5 13.5 2.5 1.7 6 2.5 12.5 2" />
      <path d="M25.5 18C31 10 39 5.5 42.5 8c3 2.2.5 10-4.5 13.5-2.5 1.7-6 2.5-12.5 2" />
      <path d="M22.5 25.5c-6 .2-11.5 3.4-12 8-.4 4 3.5 6 7.5 4 3.4-1.7 4.8-6.5 4.5-12Z" />
      <path d="M25.5 25.5c6 .2 11.5 3.4 12 8 .4 4-3.5 6-7.5 4-3.4-1.7-4.8-6.5-4.5-12Z" />
      <path d="M9.5 12.5c3 2 6.5 5 9.5 8.5M38.5 12.5c-3 2-6.5 5-9.5 8.5" />
    </Svg>
  );
}

export function SoilIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M24 34V17" />
      <path d="M24 22c-1-6-6.5-9.5-12.5-9 .3 6 5.5 9.8 12.5 9Z" />
      <path d="M24 19c.8-6 6-10 12.5-9.6-.2 6.4-5.5 10.3-12.5 9.6Z" />
      <path d="M8 40c3-5 9.5-7.5 16-7.5S37 35 40 40" />
      <path d="M4 40h40" />
      <path d="M17 37.5h.5M24 36h.5M30.5 37.5h.5" />
    </Svg>
  );
}

export function WaterIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M24 5.5C19 13 12.5 21 12.5 29a11.5 11.5 0 0 0 23 0C35.5 21 29 13 24 5.5Z" />
    </Svg>
  );
}

export function WasteIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M39.5 17A17 17 0 0 0 10.4 12" />
      <path d="M10 6.5v6h6" />
      <path d="M8.5 31A17 17 0 0 0 37.6 36" />
      <path d="M38 41.5v-6h-6" />
      <path d="M17 31c-.6-8.4 5.4-14.2 14.5-14 .4 9.2-5.5 14.8-14.5 14Z" />
      <path d="M17 31l8.5-8.5" />
    </Svg>
  );
}

export function PlantsIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M14 30h20l-2.5 13h-15L14 30Z" />
      <path d="M12.5 26h23v4h-23z" />
      <path d="M24 26V12" />
      <path d="M24 19c-2-5-6.5-7.6-11-7 .5 5 4.8 8 11 7Z" />
      <path d="M24 16c1.7-5 6-8 11.5-7.5-.4 5.4-5 8.4-11.5 7.5Z" />
      <path d="M24 12c-2.4-2.4-2.6-5.8-.2-8.5 2.6 2.4 2.7 6 .2 8.5Z" />
      <path d="M24 23c2-3 5-4.5 8.5-4-.6 3.4-4 5-8.5 4Z" />
    </Svg>
  );
}

export function LivingSystemsIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="24" cy="10" r="4.5" />
      <circle cx="24" cy="27" r="3.5" />
      <circle cx="9" cy="38" r="4.5" />
      <circle cx="39" cy="38" r="4.5" />
      <path d="M24 14.5v9M21.2 29.2l-8.4 6.2M26.8 29.2l8.4 6.2M13.5 38h21" />
    </Svg>
  );
}

export function HardscapesIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M18 43V22h24v21" />
      <path d="M18 27h24M18 32h24M18 37h24" />
      <path d="M26 22v5M34 22v5M22 27v5M30 27v5M38 27v5M26 32v5M34 32v5M22 37v6M30 37v6M38 37v6" />
      <path d="M11 43c0-10 1-18 4-24 2.5-5 6-8.5 10-10" />
      <path d="M13 31c-3.6-.8-5.5-3.4-5.2-6.6 3.2-.2 5.6 2 5.2 6.6Z" />
      <path d="M14.2 22.5c.2-3.8 2.8-6 6-5.7-.2 3.4-2.6 5.6-6 5.7Z" />
      <path d="M19.5 13.5c-.6-3.4 1.2-6 4.3-6.5.6 3.2-1.2 5.8-4.3 6.5Z" />
      <path d="M26 9.2c1.8-2.4 4.6-3 7-1.5-1.6 2.5-4.5 3.1-7 1.5Z" />
      <path d="M11.5 38c-2.8-1.4-3.8-4-2.8-6.6" />
    </Svg>
  );
}

export function StewardshipIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M24 25V13" />
      <path d="M24 18c-1-4.5-4.4-7-8.5-6.6.2 4.4 3.6 7 8.5 6.6Z" />
      <path d="M24 16c.8-4.6 4.4-7.2 8.8-6.8-.2 4.6-3.8 7.2-8.8 6.8Z" />
      <path d="M24 13c-2.2-2.2-2.4-5.4-.2-8 2.4 2.2 2.6 5.6.2 8Z" />
      <path d="M4 26l6.5 13.5L19 43h3.5v-7.5c0-2.4-1-4.4-2.8-6L13.5 24c-1.2-1-3-.8-3.8.6-.7 1.2-.4 2.7.6 3.6l5 5" />
      <path d="M10 25.5 7.3 18.3c-.5-1.4-2-2.2-3.4-1.6-1.3.5-1.9 2-1.5 3.3L4 26" />
      <path d="M44 26l-6.5 13.5L29 43h-3.5v-7.5c0-2.4 1-4.4 2.8-6l6.2-5.5c1.2-1 3-.8 3.8.6.7 1.2.4 2.7-.6 3.6l-5 5" />
      <path d="M38 25.5l2.7-7.2c.5-1.4 2-2.2 3.4-1.6 1.3.5 1.9 2 1.5 3.3L44 26" />
    </Svg>
  );
}

export function BeautyIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="24" cy="15" r="3.6" />
      <path d="M24 11.4c-2.6-2.4-2.6-6.4 0-8 2.6 1.6 2.6 5.6 0 8Z" />
      <path d="M24 18.6c-2.6 2.4-2.6 6.4 0 8 2.6-1.6 2.6-5.6 0-8Z" />
      <path d="M20.4 15c-2.4-2.6-6.4-2.6-8 0 1.6 2.6 5.6 2.6 8 0Z" />
      <path d="M27.6 15c2.4-2.6 6.4-2.6 8 0-1.6 2.6-5.6 2.6-8 0Z" />
      <path d="M21.4 12.4c-3.4-.6-5.6-3.6-4.6-6.4 3-.4 5.3 2.3 4.6 6.4Z" />
      <path d="M26.6 12.4c3.4-.6 5.6-3.6 4.6-6.4-3-.4-5.3 2.3-4.6 6.4Z" />
      <path d="M21.4 17.6c-3.4.6-5.6 3.6-4.6 6.4 3 .4 5.3-2.3 4.6-6.4Z" />
      <path d="M26.6 17.6c3.4.6 5.6 3.6 4.6 6.4-3 .4-5.3-2.3-4.6-6.4Z" />
      <path d="M24 26.6V45" />
      <path d="M24 38c-2-4.6-6.2-6.8-11-6 1.2 4.8 5.6 7 11 6Z" />
      <path d="M24 38c2-4.6 6.2-6.8 11-6-1.2 4.8-5.6 7-11 6Z" />
    </Svg>
  );
}

export function LearnAdaptIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 5h22a3 3 0 0 1 3 3v12" />
      <path d="M12 5v38h13" />
      <path d="M8.5 10h6M8.5 16h6M8.5 22h6M8.5 28h6M8.5 34h6M8.5 40h6" />
      <path d="M26 42c-1-9.6 5.4-17.4 17-17.8.8 11.2-6.2 18.4-17 17.8Z" />
      <path d="M26 42 37.5 30" />
      <path d="M31 36.5l-3.5-.4M34.6 32.6l-3.2-.6" />
    </Svg>
  );
}

/* ---------- small UI / section icons ---------- */

export function LeafOutlineIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M8 40C6.5 22.5 18 9 42 7c1.5 22.5-12.5 34.5-34 33Z" />
      <path d="M8 40 30 18" />
    </Svg>
  );
}

export function HeartOutlineIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M24 41S5 30.2 5 17.5A10 10 0 0 1 24 13a10 10 0 0 1 19 4.5C43 30.2 24 41 24 41Z" />
    </Svg>
  );
}

/** "Our Approach" card emblem — a young plant with spreading leaves. */
export function ApproachIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M24 44V14" />
      <path d="M24 14c-2.8-2.8-3-6.8-.2-10 3 2.8 3.2 7 .2 10Z" />
      <path d="M24 24c-2.4-5.6-7.4-8.6-13-8 .8 5.8 5.8 9 13 8Z" />
      <path d="M24 24c2.4-5.6 7.4-8.6 13-8-.8 5.8-5.8 9-13 8Z" />
      <path d="M24 34c-3.6-5.8-9.6-8.6-16-7.4 1.6 6.4 7.8 9.2 16 7.4Z" />
      <path d="M24 34c3.6-5.8 9.6-8.6 16-7.4-1.6 6.4-7.8 9.2-16 7.4Z" />
    </Svg>
  );
}

/** Mulch strands — "Discovered the potential of mulch". */
export function MulchIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M8 30 22 16M14 34l16-16M22 34l14-14M12 22l6-6M28 36l8-8" />
      <path d="M6 24l5 1M26 12l1 5M34 30l5 1" />
    </Svg>
  );
}

/** People with a heart — "More enjoyable places for people to live". */
export function CommunityIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M24 13.5s-5.5-3.2-5.5-6.8A2.9 2.9 0 0 1 24 5.2a2.9 2.9 0 0 1 5.5 1.5c0 3.6-5.5 6.8-5.5 6.8Z" />
      <circle cx="24" cy="22" r="3.6" />
      <circle cx="12" cy="26" r="3.6" />
      <circle cx="36" cy="26" r="3.6" />
      <path d="M17 36c0-4 3-7 7-7s7 3 7 7" />
      <path d="M4.5 40c0-4 3.2-7 7.5-7 2.2 0 4.2.8 5.5 2.2" />
      <path d="M43.5 40c0-4-3.2-7-7.5-7-2.2 0-4.2.8-5.5 2.2" />
      <path d="M17 36v4h14v-4" />
    </Svg>
  );
}

/** Three-leaf sprout — "Support for biodiversity and ecosystems". */
export function SproutTrioIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M24 44V12" />
      <path d="M24 12c-2.8-2.8-3-6.6-.2-9.6 3 2.8 3.2 6.8.2 9.6Z" />
      <path d="M24 22c-2.2-5-6.6-7.6-11.6-7 .8 5.2 5.2 8 11.6 7Z" />
      <path d="M24 22c2.2-5 6.6-7.6 11.6-7-.8 5.2-5.2 8-11.6 7Z" />
      <path d="M24 32c-3-5-8-7.4-13.4-6.4 1.4 5.4 6.6 8 13.4 6.4Z" />
      <path d="M24 32c3-5 8-7.4 13.4-6.4-1.4 5.4-6.6 8-13.4 6.4Z" />
      <path d="M16 44h16" />
    </Svg>
  );
}

/** Wraps a lucide icon so it fits anywhere an IconComponent is expected. */
export function fromLucide(
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>,
): IconComponent {
  const Wrapped: IconComponent = ({ className, strokeWidth }) => (
    <Icon className={className} strokeWidth={strokeWidth} />
  );
  return Wrapped;
}

/** Root ball spreading below a stem — "The Root Environment". */
export function RootsIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M24 4v18" />
      <path d="M24 10c-2.6-3.6-6.4-4.8-10-3.8 1.4 3.8 5 5.4 10 3.8Z" />
      <path d="M24 10c2.6-3.6 6.4-4.8 10-3.8-1.4 3.8-5 5.4-10 3.8Z" />
      <path d="M6 22h36" />
      <path d="M24 22v20" />
      <path d="M24 28c-3 1-6 3.4-8 7.4M24 28c3 1 6 3.4 8 7.4" />
      <path d="M24 34c-2 1.4-3.4 3.6-4 6.6M24 34c2 1.4 3.4 3.6 4 6.6" />
      <path d="M16 35.4c-2.4.4-4.6 1.8-6 4M32 35.4c2.4.4 4.6 1.8 6 4" />
    </Svg>
  );
}

/** Watering can — "Steward". */
export function WateringCanIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M10 20h20v18a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3V20Z" />
      <path d="M14 20v-3a6 6 0 0 1 12 0v3" />
      <path d="M30 24 42 13" />
      <path d="M39.5 9.5l5 5-2 2-5-5Z" />
      <path d="M10 24c-3.4 0-6 2.6-6 6s2.6 6 6 6" />
      <path d="M44 20v1.5M41 23v1.5M44 25.5V27" />
    </Svg>
  );
}

/** A heap of mulch over the soil line — "Cover". */
export function MulchPileIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 38h40" />
      <path d="M8 38 22 14a2.4 2.4 0 0 1 4 0l14 24" />
      <path d="M18 30h.5M23 25h.5M28 30h.5M14 35h.5M24 34h.5M33 35h.5M21 20h.5" />
    </Svg>
  );
}

/** Flowers growing in a planted bed — "Transforming Urban Flower Beds". */
export function FlowerBedIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 36h40v6H4z" />
      <path d="M12 36V24M24 36V20M36 36V24" />
      <circle cx="12" cy="19" r="4" />
      <circle cx="24" cy="15" r="4" />
      <circle cx="36" cy="19" r="4" />
      <path d="M12 15v-2M8 19H6M16 19h2M24 11V9M20 15h-2M28 15h2M36 15v-2M32 19h-2M40 19h2" />
      <path d="M12 30c-2.6-.4-4.2-2-4.4-4.4 2.6 0 4.2 1.8 4.4 4.4ZM36 30c2.6-.4 4.2-2 4.4-4.4-2.6 0-4.2 1.8-4.4 4.4Z" />
    </Svg>
  );
}

/** Decorative leaf-and-line flourish either side of section titles. */
export function LeafFlourish({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 48 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <path d="M2 5c3-3.2 8-3.6 12-.8-3.4 3.4-8.6 3.6-12 .8Z" />
      <path d="M2 5l9 .8" />
      <path d="M11 9.5h35" />
    </svg>
  );
}
