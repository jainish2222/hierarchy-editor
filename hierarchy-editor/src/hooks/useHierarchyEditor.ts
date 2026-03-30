import { useCallback, useMemo, useState } from 'react';
import { MarkerType, type NodeTypes } from '@xyflow/react';
import PageNode from '../components/PageNode';
import { DEFAULT_HOME_SECTIONS, PAGE_TREE } from '../constants/hierarchy';
import { getLayoutedElements } from '../utils/layout';
import { buildPersistedState, getSafeSections, loadHierarchyFromStorage, saveHierarchyToStorage } from '../utils/storage';
import { buildExportPayload, downloadJsonFile } from '../utils/export';
import type { HierarchyEdge, HierarchyNode } from '../types/hierarchy';

const nodeTypes: NodeTypes = {
  pageNode: PageNode,
};

type FlattenPage = {
  id: string;
  label: string;
  description: string;
  level: 1 | 2 | 3;
  parentId?: string;
};

function flattenPages(): FlattenPage[] {
  const pages: FlattenPage[] = [
    {
      id: PAGE_TREE.root.id,
      label: PAGE_TREE.root.label,
      description: PAGE_TREE.root.description,
      level: 1,
    },
  ];

  PAGE_TREE.root.children.forEach((child) => {
    pages.push({
      id: child.id,
      label: child.label,
      description: child.description,
      level: 2,
      parentId: PAGE_TREE.root.id,
    });

    if ('children' in child && child.children) {
      child.children.forEach((subpage) => {
        pages.push({
          id: subpage.id,
          label: subpage.label,
          description: subpage.description,
          level: 3,
          parentId: child.id,
        });
      });
    }
  });

  return pages;
}

export function useHierarchyEditor() {
  const [homeSections, setHomeSections] = useState<string[]>(DEFAULT_HOME_SECTIONS);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [jsonPreview, setJsonPreview] = useState<string>(() => JSON.stringify(buildExportPayload(buildPersistedState(DEFAULT_HOME_SECTIONS)), null, 2));

  const pages = useMemo(() => flattenPages(), []);

  const rawEdges = useMemo<HierarchyEdge[]>(() => {
    return pages
      .filter((page) => page.parentId)
      .map((page) => ({
        id: `${page.parentId}-${page.id}`,
        source: page.parentId!,
        target: page.id,
        animated: false,
        markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' },
        style: { stroke: '#94a3b8', strokeWidth: 1.5 },
        type: 'smoothstep',
      }));
  }, [pages]);

  const rawNodes = useMemo<HierarchyNode[]>(() => {
    return pages.map((page) => ({
      id: page.id,
      type: 'pageNode',
      position: { x: 0, y: 0 },
      data: {
        label: page.label,
        level: page.level,
        description: page.description,
        isHome: page.id === 'home',
        sections: page.id === 'home' ? homeSections : undefined,
        onSectionsChange: page.id === 'home' ? setHomeSections : undefined,
      },
    }));
  }, [pages, homeSections]);

  const layouted = useMemo(() => getLayoutedElements(rawNodes, rawEdges), [rawNodes, rawEdges]);

  const persistState = useCallback((sections: string[]) => {
    const payload = buildPersistedState(sections);
    saveHierarchyToStorage(payload);
    setLastSavedAt(payload.savedAt);
    setJsonPreview(JSON.stringify(buildExportPayload(payload), null, 2));
  }, []);

  const handleSave = useCallback(() => {
    persistState(homeSections);
  }, [homeSections, persistState]);

  const handleLoad = useCallback(() => {
    const stored = loadHierarchyFromStorage();

    if (!stored) {
      const fallback = buildPersistedState(DEFAULT_HOME_SECTIONS);
      setHomeSections(DEFAULT_HOME_SECTIONS);
      setLastSavedAt(null);
      setJsonPreview(JSON.stringify(buildExportPayload(fallback), null, 2));
      return;
    }

    const safeSections = getSafeSections(stored.sections);
    setHomeSections(safeSections);
    setLastSavedAt(stored.savedAt);
    setJsonPreview(JSON.stringify(buildExportPayload({ ...stored, sections: safeSections }), null, 2));
  }, []);

  const handleExport = useCallback(() => {
    const payload = buildExportPayload(buildPersistedState(homeSections));
    setJsonPreview(JSON.stringify(payload, null, 2));
    downloadJsonFile('visual-page-hierarchy.json', payload);
  }, [homeSections]);

  return {
    nodes: layouted.nodes,
    edges: layouted.edges,
    nodeTypes,
    homeSections,
    lastSavedAt,
    jsonPreview,
    handleSave,
    handleLoad,
    handleExport,
    totalPages: pages.length,
  };
}