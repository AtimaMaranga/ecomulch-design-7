import { Sprout } from "lucide-react";

/** Any icon component that renders from className + strokeWidth (lucide or bespoke). */
type IconLike = React.ComponentType<{ className?: string; strokeWidth?: number }>;

export function Eyebrow({
  children,
  icon: Icon = Sprout,
  className = "",
  tone = "brand",
}: {
  children: React.ReactNode;
  icon?: IconLike;
  className?: string;
  tone?: "brand" | "light";
}) {
  const color = tone === "light" ? "text-brand-200" : "text-brand-600";
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] ${color} ${className}`}
    >
      <Icon className="h-4 w-4" strokeWidth={2.2} />
      {children}
    </span>
  );
}
