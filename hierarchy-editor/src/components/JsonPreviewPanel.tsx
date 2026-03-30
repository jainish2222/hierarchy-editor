type JsonPreviewPanelProps = {
  json: string;
};

export default function JsonPreviewPanel({ json }: JsonPreviewPanelProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 shadow-soft">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-white">Export Preview</p>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300">JSON</span>
      </div>
      <pre className="max-h-[360px] overflow-auto rounded-2xl bg-slate-900 p-4 text-xs leading-6 text-slate-200">{json}</pre>
    </div>
  );
}