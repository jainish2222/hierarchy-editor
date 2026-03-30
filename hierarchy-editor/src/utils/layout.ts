import dagre from 'dagre';
import type { HierarchyEdge, HierarchyNode } from '../types/hierarchy';

const NODE_WIDTH = 320;
const HOME_NODE_HEIGHT = 380;
const DEFAULT_NODE_HEIGHT = 120;

export function getLayoutedElements(nodes: HierarchyNode[], edges: HierarchyEdge[]) {
  const graph = new dagre.graphlib.Graph();

  graph.setGraph({
    rankdir: 'TB',
    nodesep: 40,
    ranksep: 80,
    marginx: 20,
    marginy: 20,
  });
  graph.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((node) => {
    const height = node.id === 'home' ? HOME_NODE_HEIGHT : DEFAULT_NODE_HEIGHT;
    graph.setNode(node.id, { width: NODE_WIDTH, height });
  });

  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  dagre.layout(graph);

  const layoutedNodes = nodes.map((node) => {
    const position = graph.node(node.id);
    const height = node.id === 'home' ? HOME_NODE_HEIGHT : DEFAULT_NODE_HEIGHT;

    return {
      ...node,
      position: {
        x: position.x - NODE_WIDTH / 2,
        y: position.y - height / 2,
      },
      draggable: false,
    };
  });

  return { nodes: layoutedNodes, edges };
}