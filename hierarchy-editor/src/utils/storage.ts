import { DEFAULT_HOME_SECTIONS, STORAGE_KEY } from '../constants/hierarchy';
import type { PersistedHierarchy } from '../types/hierarchy';

export function saveHierarchyToStorage(payload: PersistedHierarchy) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function loadHierarchyFromStorage(): PersistedHierarchy | null {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as PersistedHierarchy;

    if (!Array.isArray(parsed.sections)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function buildPersistedState(sections: string[]): PersistedHierarchy {
  return {
    sections,
    savedAt: new Date().toISOString(),
  };
}

export function getSafeSections(sections?: string[]) {
  if (!Array.isArray(sections) || sections.length === 0) {
    return DEFAULT_HOME_SECTIONS;
  }

  return sections;
}