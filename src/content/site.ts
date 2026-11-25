import type { Localized } from './types';

/**
 * Site-wide settings. Edit here to update brand text, contact details and the contact form.
 * Leave a value empty until you have the real one. The site shows a placeholder instead.
 */
export const site = {
  brand: {
    name: { en: 'THE IDEA LAB', ar: 'مختبر الأفكار' } as Localized,
    tagline: {
      en: 'Where ideas become visual experiences.',
      ar: 'حيث تتحول الأفكار إلى تجارب بصرية.',
    } as Localized,
    createdBy: { en: 'Created by Majd Faisal', ar: 'من إبداع مجد فيصل' } as Localized,
  },
  documentTitle: {
    en: 'THE IDEA LAB — Majd Faisal | Creative Designer & Idea Innovator',
    ar: 'مختبر الأفكار — مجد فيصل | مصممة إبداعية ومبتكرة أفكار',
  } as Localized,
  contact: {
    /** Public email address. Example: 'hello@yourdomain.com' */
    email: '',
    /**
     * Form endpoint that accepts JSON POST requests, such as Formspree
     * (https://formspree.io/f/your-id) or any API you control. Leave empty to use email fallback.
     */
    formEndpoint: '',
  },
};
