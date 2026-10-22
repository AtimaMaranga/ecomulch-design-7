import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";

export function PageHero({
  image,
  imageAlt,
  eyebrow,
  eyebrowIcon,
  title,
  subtitle,
  align = "left",
  soft = false,
  children,
  heightClass = "min-h-[360px] md:min-h-[440px]",
  priority = false,
}: {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  soft?: boolean;
  children?: React.ReactNode;
  heightClass?: string;
  priority?: boolean;
}) {
  const centered = align === "center";
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      <div
        className={`absolute inset-0 ${soft ? "hero-overlay-soft" : "hero-overlay"}`}
      />
      <div
        className={`container-page relative flex ${heightClass} flex-col justify-center py-14 ${
          centered ? "items-center text-center" : "items-start text-left"
        }`}
      >
        <div className={centered ? "max-w-3xl" : "max-w-2xl"}>
          {eyebrow && (
            <Eyebrow icon={eyebrowIcon} tone="light" className="mb-4">
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className="font-display text-3xl font-700 leading-[1.12] text-white drop-shadow-sm sm:text-4xl md:text-[2.75rem]">
            {title}
          </h1>
          {subtitle && (
            <p
              className={`mt-5 text-base leading-relaxed text-white/90 sm:text-lg ${
                centered ? "mx-auto max-w-2xl" : "max-w-xl"
              }`}
            >
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  );
}
