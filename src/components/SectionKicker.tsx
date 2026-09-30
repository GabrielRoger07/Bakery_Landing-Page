export function SectionKicker({
  children,
  symmetric = true,
}: {
  children: React.ReactNode;
  symmetric?: boolean;
}) {
  return (
    <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.28em] text-gold">
      <span className="h-px w-7 bg-gold" />
      {children}
      {symmetric ? (
        <span className="h-px w-7 bg-gold" />
      ) : (
        <span className="text-[9px] tracking-normal">✦</span>
      )}
    </span>
  );
}
