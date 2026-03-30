import { PAGE_TREE } from '../constants/hierarchy';
import type { PersistedHierarchy } from '../types/hierarchy';

export function buildExportPayload(state: PersistedHierarchy) {
  return {
    metadata: {
      exportedAt: new Date().toISOString(),
      app: 'Visual Page Hierarchy Editor',
      version: '1.0.0',
    },
    homeSections: state.sections,
    pageTree: PAGE_TREE,
  };
}

export function downloadJsonFile(fileName: string, json: unknown) {
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}