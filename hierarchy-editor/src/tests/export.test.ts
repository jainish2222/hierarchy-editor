import { describe, expect, it } from 'vitest';
import { buildExportPayload } from '../utils/export';

describe('export utils', () => {
  it('builds an export payload with metadata and tree', () => {
    const payload = buildExportPayload({
      sections: ['Hero', 'Features', 'Footer'],
      savedAt: '2026-03-30T10:00:00.000Z',
    });

    expect(payload.homeSections).toEqual(['Hero', 'Features', 'Footer']);
    expect(payload.pageTree.root.label).toBe('Home');
    expect(payload.metadata.app).toBe('Visual Page Hierarchy Editor');
  });
});