import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex shrink-0 items-center gap-2.5 lg:gap-2 xl:gap-2.5 ${className}`}
      aria-label="EcoMulch home"
    >
      <LeafMark className="h-[40px] w-[33px] text-brand-600 transition-transform duration-300 group-hover:-rotate-3 sm:h-[54px] sm:w-[46px] lg:h-[46px] lg:w-[38px] xl:h-[56px] xl:w-[47px] 2xl:h-[62px] 2xl:w-[52px]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.4rem] font-800 tracking-[-0.01em] text-ink sm:text-[1.9rem] lg:text-[1.55rem] xl:text-[1.9rem] 2xl:text-[2.2rem]">
          Eco<span className="text-brand-600">Mulch</span>
        </span>
        <span className="mt-1 whitespace-nowrap text-[0.56rem] font-600 text-ink sm:text-[0.7rem] lg:text-[0.6rem] xl:text-[0.76rem] 2xl:text-[0.8rem]">
          Sustainable Urban Greening
        </span>
      </span>
    </Link>
  );
}

/** Sprig mark: a stem with a crown leaf and two pairs of leaves. */
export function LeafMark({ className = "" }: { className?: string }) {
  const leaf = "M0 0C-7-4-8.2-12.6-1.8-19 5.2-13.6 5.8-5 0 0Z";
  const vein = "M0 -2 -0.8 -15.5";
  return (
    <svg viewBox="0 0 50 60" className={className} aria-hidden="true">
      <path d="M25 58V16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* crown */}
      <g transform="translate(25 21)">
        <path d={leaf} fill="currentColor" />
        <path d={vein} stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />
      </g>
      {/* upper pair */}
      <g transform="translate(23.5 34) rotate(-55) scale(0.9)">
        <path d={leaf} fill="currentColor" />
        <path d={vein} stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />
      </g>
      <g transform="translate(26.5 34) rotate(55) scale(0.9)">
        <path d={leaf} fill="currentColor" />
        <path d={vein} stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />
      </g>
      {/* lower pair */}
      <g transform="translate(23.5 49) rotate(-60) scale(1.08)">
        <path d={leaf} fill="currentColor" />
        <path d={vein} stroke="#fff" strokeWidth="1" strokeLinecap="round" />
      </g>
      <g transform="translate(26.5 49) rotate(60) scale(1.08)">
        <path d={leaf} fill="currentColor" />
        <path d={vein} stroke="#fff" strokeWidth="1" strokeLinecap="round" />
      </g>
    </svg>
  );
}
