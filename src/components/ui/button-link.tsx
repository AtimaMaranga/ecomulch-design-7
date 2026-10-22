import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "solid" | "outline" | "ghost" | "white";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  solid:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow-md",
  outline:
    "border border-brand-600/40 text-brand-700 hover:border-brand-600 hover:bg-brand-50",
  ghost: "text-brand-600 hover:text-brand-700 hover:bg-brand-50",
  white:
    "bg-white text-brand-700 hover:bg-brand-50 shadow-sm hover:shadow-md",
};

const sizes = {
  sm: "px-4 py-2 text-[0.8rem]",
  md: "px-5 py-2.5",
  lg: "px-6 py-3 text-base",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "solid",
  size = "md",
  withArrow = false,
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  withArrow?: boolean;
  className?: string;
  external?: boolean;
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className} group`;
  const inner = (
    <>
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
