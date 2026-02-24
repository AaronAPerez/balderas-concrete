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
    <div
      className={`mb-14 ${centered ? "flex flex-col items-center" : ""} ${className}`}
    >
      <h2
        className={`text-3xl font-bold text-brand sm:text-4xl ${centered ? "text-center" : ""}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`pt-6 text-lg text-slate-600 max-w-2xl leading-relaxed ${centered ? "text-center" : ""}`}
          // className={`pt-6 text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed ${centered ? "text-center" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
