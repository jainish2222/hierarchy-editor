import type { Node, Edge } from '@xyflow/react';

export type PageLevel = 1 | 2 | 3;

export type PageNodeData = {
  label: string;
  level: PageLevel;
  description: string;
  isHome?: boolean;
  sections?: string[];
  onSectionsChange?: (sections: string[]) => void;
};

export type HierarchyNode = Node<PageNodeData>;
export type HierarchyEdge = Edge;

export type PersistedHierarchy = {
  sections: string[];
  savedAt: string;
};