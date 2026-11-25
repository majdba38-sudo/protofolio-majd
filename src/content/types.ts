export type Localized = { en: string; ar: string };

export interface MockupScene {
  id: string;
  title: Localized;
}

export interface ExperimentProject {
  id: string;
  number: string;
  kind: 'branding' | 'posters';
  name: Localized;
  category: Localized;
  description: Localized;
  creativeDirection: Localized;
  /** Original file, stored in public/media/experiments. Kept unchanged. */
  image: string;
  imageAlt: Localized;
  designDetails: Localized[];
  mockupScenes: MockupScene[];
}

export interface DigitalProject {
  id: string;
  name: Localized;
  category: Localized;
  description: Localized;
  status: 'live' | 'coming-soon';
  /** Live website URL. Leave empty while the project has no public URL. */
  url: string;
  /** Preview screenshot. Leave empty to show a labelled placeholder. */
  preview: string;
  highlights: Localized[];
}

export interface ProcessStep {
  id: string;
  number: string;
  title: Localized;
  body: Localized;
}

export interface Service {
  id: string;
  number: string;
  title: Localized;
  body: Localized;
}

export interface CreatorProfile {
  name: Localized;
  title: Localized;
  intro: Localized[];
  strengths: Localized[];
}
