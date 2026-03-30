import { Download, FolderDown, Save } from 'lucide-react';

type ControlPanelProps = {
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
  lastSavedAt: string | null;
};

function formatSavedAt(value: string | null) {
  if (!value) {
    return 'Not saved yet';
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function ControlPanel({ onSave, onLoad, onExport, lastSavedAt }: ControlPanelProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">Persistence & Export</p>
          <p className="mt-1 text-sm text-slate-500">Save to localStorage, restore the last version, or export a JSON snapshot.</p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          Last saved: {formatSavedAt(lastSavedAt)}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <button type="button" onClick={onSave} className="flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
          <Save className="h-4 w-4" /> Save
        </button>
        <button type="button" onClick={onLoad} className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50">
          <FolderDown className="h-4 w-4" /> Load
        </button>
        <button type="button" onClick={onExport} className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50">
          <Download className="h-4 w-4" /> Export JSON
        </button>
      </div>
    </div>
  );
}