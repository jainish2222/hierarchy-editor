import type { PersistedHierarchy } from '../types/hierarchy';

export const STORAGE_KEY = 'visual-page-hierarchy-editor';

export const DEFAULT_HOME_SECTIONS = ['Hero', 'Features', 'Testimonials', 'CTA', 'Footer'];

export const DEFAULT_PERSISTED_STATE: PersistedHierarchy = {
  sections: DEFAULT_HOME_SECTIONS,
  savedAt: new Date().toISOString(),
};

export const PAGE_TREE = {
  root: {
    id: 'home',
    label: 'Home',
    description: 'Website root page with draggable homepage sections.',
    children: [
      { id: 'about', label: 'About', description: 'Company story, mission, and team overview.' },
      {
        id: 'services',
        label: 'Services',
        description: 'Primary service listing page.',
        children: [
          { id: 'service-detail-1', label: 'Service Detail 1', description: 'Detailed page for service offering one.' },
          { id: 'service-detail-2', label: 'Service Detail 2', description: 'Detailed page for service offering two.' },
        ],
      },
      {
        id: 'blog',
        label: 'Blog',
        description: 'Articles, insights, and thought leadership hub.',
        children: [
          { id: 'blog-post-1', label: 'Blog Post 1', description: 'First featured blog detail page.' },
          { id: 'blog-post-2', label: 'Blog Post 2', description: 'Second featured blog detail page.' },
          { id: 'author-page', label: 'Author Page', description: 'Author bio and post archive.' },
        ],
      },
      {
        id: 'contact',
        label: 'Contact',
        description: 'General enquiry and support page.',
        children: [
          { id: 'location-info', label: 'Location Info', description: 'Office address and map details.' },
          { id: 'support-page', label: 'Support Page', description: 'Customer support resources and contact options.' },
        ],
      },
    ],
  },
} as const;