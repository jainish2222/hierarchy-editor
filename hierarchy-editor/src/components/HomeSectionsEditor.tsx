import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import SectionCard from './SectionCard';

type HomeSectionsEditorProps = {
  sections: string[];
  onChange?: (sections: string[]) => void;
};

export default function HomeSectionsEditor({ sections, onChange }: HomeSectionsEditorProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = sections.indexOf(String(active.id));
    const newIndex = sections.indexOf(String(over.id));

    onChange?.(arrayMove(sections, oldIndex, newIndex));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">Home Sections</p>
        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">DndKit</span>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections} strategy={rectSortingStrategy}>
          <div className="space-y-2">
            {sections.map((section, index) => (
              <SectionCard key={section} id={section} index={index} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}