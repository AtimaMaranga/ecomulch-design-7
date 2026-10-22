import Image from "next/image";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export function PillarCard({
  image,
  imageAlt,
  eyebrow,
  eyebrowIcon: Icon,
  title,
  children,
  ctaLabel,
  href,
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  eyebrowIcon: LucideIcon;
  title: string;
  children: React.ReactNode;
  ctaLabel: string;
  href: string;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover sm:flex-row">
      <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-40 lg:w-44">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 176px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <span className="inline-flex items-center gap-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-brand-600">
          <Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
          {eyebrow}
        </span>
        <h3 className="mt-2 font-display text-lg font-600 leading-snug text-ink">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-[0.82rem] leading-relaxed text-slate-500">
          {children}
        </p>
        <Link
          href={href}
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-brand-600/40 px-4 py-2 text-xs font-semibold text-brand-700 transition-all group-hover:border-brand-600 group-hover:bg-brand-50"
        >
          {ctaLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
