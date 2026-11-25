import type { DigitalProject } from './types';

/**
 * Digital projects.
 * url: the live link. It must be the exact URL of the project. Leave empty when there is no public URL yet.
 * status: 'live' shows VISIT WEBSITE. 'coming-soon' shows a disabled COMING SOON button.
 * preview: a screenshot in public/media/digital. Leave empty to show a labelled placeholder.
 * Upload buttons on the site can replace the preview without editing this file.
 */
export const digitalProjects: DigitalProject[] = [
  {
    id: 'athar-bonyan',
    name: { en: 'Athar Bonyan', ar: 'أثر بنيان' },
    category: {
      en: 'Interactive Website / Volunteer Team Management',
      ar: 'موقع تفاعلي / إدارة فريق تطوعي',
    },
    description: {
      en: 'An interactive digital platform designed to collect, organize, and track team points, making team activities and achievements easier to manage.',
      ar: 'منصة رقمية تفاعلية لجمع نقاط الفريق وتنظيمها ومتابعتها، لتسهيل إدارة أنشطة الفريق وإنجازاته.',
    },
    status: 'live',
    url: 'https://athar-bonyan.majdba-38.workers.dev/',
    preview: '/media/digital/athar-bonyan.png',
    highlights: [
      { en: 'Collect and organise team points', ar: 'جمع نقاط الفريق وتنظيمها' },
      { en: 'Track team activities and achievements', ar: 'متابعة أنشطة الفريق وإنجازاته' },
      { en: 'Simple management for volunteer teams', ar: 'إدارة مبسطة لفرق التطوع' },
    ],
  },
  {
    id: 'roya-al-tabeeah',
    name: { en: "Ro'ya Al-Tabeeah", ar: 'رؤى الطبيعة' },
    category: { en: 'E-commerce / Natural Products', ar: 'متجر إلكتروني / منتجات طبيعية' },
    description: {
      en: 'An immersive natural-products shopping experience inspired by exploring a magical forest. The visitor should feel as if they are walking through nature and discovering products as they scroll.',
      ar: 'تجربة تسوق غامرة لمنتجات طبيعية مستوحاة من استكشاف غابة ساحرة، يشعر فيها الزائر بأنه يتجول في الطبيعة ويكتشف المنتجات أثناء التمرير.',
    },
    status: 'live',
    url: 'https://roa-shop.majdba-38.workers.dev/',
    preview: '/media/digital/roa-nature.png',
    highlights: [
      { en: 'Forest-inspired digital environment', ar: 'بيئة رقمية مستوحاة من الغابة' },
      { en: 'Natural textures', ar: 'ملامس طبيعية' },
      { en: 'Smooth scrolling', ar: 'تمرير سلس' },
      { en: 'Interactive product discovery', ar: 'اكتشاف تفاعلي للمنتجات' },
      { en: 'Product details and prices', ar: 'تفاصيل المنتجات والأسعار' },
      { en: 'Immersive visual storytelling', ar: 'سرد بصري غامر' },
    ],
  },
];
