export default function AdPlaceholder({
  label = "Miejsce na reklamę",
}: {
  label?: string;
}) {
  return (
    <div className="mx-auto my-8 flex min-h-[120px] max-w-4xl items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
      <div>
        <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Reklama
        </div>

        <div className="mt-2 text-sm text-slate-400">
          {label}
        </div>
      </div>
    </div>
  );
}