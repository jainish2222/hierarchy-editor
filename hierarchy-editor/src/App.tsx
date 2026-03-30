import { Background, Controls, MiniMap, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ControlPanel from './components/ControlPanel';
import JsonPreviewPanel from './components/JsonPreviewPanel';
import LegendCard from './components/LegendCard';
import StatCard from './components/StatCard';
import { useHierarchyEditor } from './hooks/useHierarchyEditor';

export default function App() {
  const { nodes, edges, nodeTypes, handleSave, handleLoad, handleExport, lastSavedAt, jsonPreview, homeSections, totalPages } =
    useHierarchyEditor();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 overflow-hidden rounded-[32px] bg-slate-950 px-6 py-8 text-white shadow-soft sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-100">Jainish Koladiya - Frontend Developer</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Visual Page Hierarchy Editor</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                A polished React Flow + Dagre hierarchy viewer with a draggable Home page section editor powered by DndKit,
                plus save, load, and JSON export support.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:w-[560px]">
              <StatCard label="Total Pages" value={String(totalPages)} helper="1 root, 4 main pages, 7 subpages" />
              <StatCard label="Home Sections" value={String(homeSections.length)} helper="Fully reorderable with DndKit" />
              <StatCard label="Persistence" value="Ready" helper="localStorage save, load, export" />
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
          <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Hierarchy Canvas</h2>
                <p className="text-sm text-slate-500">Auto-laid out vertically using Dagre with all parent-child edges pre-connected.</p>
              </div>
            </div>

            <div className="h-[920px] w-full">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.25 }}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable
                proOptions={{ hideAttribution: true }}
              >
                <MiniMap zoomable pannable className="!bg-white" />
                <Controls position="bottom-left" />
                <Background gap={18} size={1} color="#e2e8f0" />
              </ReactFlow>
            </div>
          </section>

          <aside className="space-y-6">
            <ControlPanel onSave={handleSave} onLoad={handleLoad} onExport={handleExport} lastSavedAt={lastSavedAt} />
            <LegendCard />
            <JsonPreviewPanel json={jsonPreview} />
          </aside>
        </div>
      </div>
    </div>
  );
}