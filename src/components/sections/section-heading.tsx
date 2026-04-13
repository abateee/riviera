type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const titleClass = tone === "light" ? "text-white" : "text-slate-950";
  const descriptionClass =
    tone === "light" ? "text-slate-300" : "text-slate-600";
  const eyebrowClass = tone === "light" ? "text-brand-200" : "text-brand-600";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.28em] ${eyebrowClass}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-heading text-4xl leading-tight sm:text-5xl ${titleClass}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-lg leading-8 ${descriptionClass}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
