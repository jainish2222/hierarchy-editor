import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';

type SectionCardProps = {
  id: string;
  index: number;
};

export default function SectionCard({ id, index }: SectionCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={[
        'group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm',
        isDragging ? 'scale-[1.02] shadow-soft ring-2 ring-brand-100' : 'hover:border-brand-200 hover:shadow-md',
      ].join(' ')}
    >
      <button
        type="button"
        aria-label={`Drag ${id}`}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-brand-50 group-hover:text-brand-600"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Section {index + 1}</p>
        <p className="truncate text-sm font-semibold text-slate-800">{id}</p>
      </div>
    </div>
  );
}