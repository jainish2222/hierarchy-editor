const items = [
  { label: 'Level 1 · Root', tone: 'bg-brand-100' },
  { label: 'Level 2 · Main Pages', tone: 'bg-emerald-100' },
  { label: 'Level 3 · Subpages', tone: 'bg-amber-100' },
];

export default function LegendCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <p className="text-sm font-semibold text-slate-900">Hierarchy Legend</p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className={`h-3 w-3 rounded-full ${item.tone}`} />
            <span className="text-sm text-slate-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}