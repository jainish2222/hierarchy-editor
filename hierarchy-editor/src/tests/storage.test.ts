import { describe, expect, it, beforeEach } from 'vitest';
import { buildPersistedState, getSafeSections, loadHierarchyFromStorage, saveHierarchyToStorage } from '../utils/storage';

const KEY = 'visual-page-hierarchy-editor';

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and loads hierarchy state from localStorage', () => {
    const state = buildPersistedState(['Hero', 'CTA', 'Footer']);
    saveHierarchyToStorage(state);

    const loaded = loadHierarchyFromStorage();

    expect(loaded?.sections).toEqual(['Hero', 'CTA', 'Footer']);
    expect(localStorage.getItem(KEY)).toBeTruthy();
  });

  it('returns fallback sections when invalid data is passed', () => {
    expect(getSafeSections(undefined)).toEqual(['Hero', 'Features', 'Testimonials', 'CTA', 'Footer']);
  });
});