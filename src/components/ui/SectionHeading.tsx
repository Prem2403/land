interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <div
          className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-600 uppercase tracking-[0.14em] ${
            light ? 'border-white/20 text-brand-subtle' : 'border-surface-border text-brand-accent'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
          {eyebrow}
        </div>
      )}
      <h2
        className={`font-heading text-3xl font-700 leading-[1.15] tracking-tight sm:text-4xl ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-[15px] leading-relaxed ${light ? 'text-brand-light/80' : 'text-ink-muted'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
