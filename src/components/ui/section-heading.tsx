export function SectionHeading({
  as: Tag = "h2",
  children,
  className = "",
  rule = false,
  size = "md",
}: {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
  rule?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-xl sm:text-2xl",
    md: "text-2xl sm:text-3xl",
    lg: "text-3xl sm:text-4xl",
  } as const;

  return (
    <div className={className}>
      <Tag className={`font-600 leading-tight text-ink ${sizes[size]}`}>
        {children}
      </Tag>
      {rule && <span className="rule-accent mt-4 block" />}
    </div>
  );
}
