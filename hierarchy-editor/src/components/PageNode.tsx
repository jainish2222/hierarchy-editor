import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import HomeSectionsEditor from './HomeSectionsEditor';
import type { PageNodeData } from '../types/hierarchy';

type PageNodeType = Node<PageNodeData, 'pageNode'>;

const levelStyles: Record<1 | 2 | 3, string> = {
  1: 'border-brand-200 bg-gradient-to-br from-brand-50 via-indigo-50 to-white',
  2: 'border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50',
  3: 'border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50',
};

const levelLabels: Record<1 | 2 | 3, string> = {
  1: 'Level 1 · Root',
  2: 'Level 2 · Main Page',
  3: 'Level 3 · Subpage',
};

export default function PageNode({ data }: NodeProps<PageNodeType>) {
  const level = data.level;

  return (
    <div className={`w-[320px] rounded-[28px] border p-5 shadow-soft ${levelStyles[level]}`}>
      <Handle type="target" position={Position.Top} className="!bg-slate-400" />

      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
            {levelLabels[level]}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{data.label}</h3>
        </div>

        {data.isHome ? (
          <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
            Editable
          </span>
        ) : (
          <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
            Static
          </span>
        )}
      </div>

      <p className="mb-4 text-sm leading-6 text-slate-600">{data.description}</p>

      {data.isHome && data.sections ? (
        <HomeSectionsEditor sections={data.sections} onChange={data.onSectionsChange} />
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-4 py-3 text-sm text-slate-500">
          Auto-connected in the visual hierarchy.
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-slate-500" />
    </div>
  );
}