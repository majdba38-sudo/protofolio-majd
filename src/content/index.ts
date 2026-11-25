import { digitalProjects } from './digital';
import { experiments } from './projects';
import type { Localized } from './types';

export type GalleryFilter = 'all' | 'branding' | 'posters' | 'digital';

export interface GalleryItem {
  id: string;
  filter: Exclude<GalleryFilter, 'all'>;
  number?: string;
  name: Localized;
  category: Localized;
  description: Localized;
  creativeDirection?: Localized;
  image: string;
  /** Key used by the upload buttons for this item's main image. */
  mediaKey: string;
}

/** Experiments gallery: all brand, poster and digital projects, built from the data files. */
export const galleryItems: GalleryItem[] = [
  ...experiments.map((p) => ({
    id: p.id,
    filter: p.kind === 'branding' ? ('branding' as const) : ('posters' as const),
    number: p.number,
    name: p.name,
    category: p.category,
    description: p.description,
    creativeDirection: p.creativeDirection,
    image: p.image,
    mediaKey: `experiments/${p.id}/original`,
  })),
  ...digitalProjects.map((p) => ({
    id: p.id,
    filter: 'digital' as const,
    name: p.name,
    category: p.category,
    description: p.description,
    image: p.preview,
    mediaKey: `digital/${p.id}/preview`,
  })),
];

export function findProject(id: string) {
  const experiment = experiments.find((p) => p.id === id);
  if (experiment) return { type: 'experiment' as const, project: experiment };
  const digital = digitalProjects.find((p) => p.id === id);
  if (digital) return { type: 'digital' as const, project: digital };
  return null;
}
