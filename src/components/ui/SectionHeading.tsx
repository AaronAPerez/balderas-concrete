interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-14 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-3xl font-bold text-brand sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
