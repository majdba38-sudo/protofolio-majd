import type { ProcessStep, Service } from './types';

export const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    number: '01',
    title: { en: 'DISCOVER', ar: 'اكتشف' },
    body: {
      en: 'Understand the project, its purpose, audience, and challenges.',
      ar: 'فهم المشروع وغايته وجمهوره وتحدياته.',
    },
  },
  {
    id: 'imagine',
    number: '02',
    title: { en: 'IMAGINE', ar: 'تخيّل' },
    body: {
      en: 'Explore possibilities and generate original creative ideas.',
      ar: 'استكشاف الاحتمالات وتوليد أفكار إبداعية أصيلة.',
    },
  },
  {
    id: 'connect',
    number: '03',
    title: { en: 'CONNECT', ar: 'اربط' },
    body: {
      en: 'Connect the idea with the right visual concept and audience experience.',
      ar: 'ربط الفكرة بالمفهوم البصري المناسب وبتجربة الجمهور.',
    },
  },
  {
    id: 'design',
    number: '04',
    title: { en: 'DESIGN', ar: 'صمّم' },
    body: {
      en: 'Transform the concept into a distinctive visual identity or creative product.',
      ar: 'تحويل المفهوم إلى هوية بصرية مميزة أو منتج إبداعي.',
    },
  },
  {
    id: 'deliver',
    number: '05',
    title: { en: 'DELIVER', ar: 'سلّم' },
    body: {
      en: 'Present a complete, meaningful, and purposeful creative outcome.',
      ar: 'تقديم نتيجة إبداعية متكاملة وهادفة ومؤثرة.',
    },
  },
];

export const services: Service[] = [
  {
    id: 'brand-identity',
    number: '01',
    title: { en: 'BRAND IDENTITY & LOGO DESIGN', ar: 'الهوية البصرية وتصميم الشعارات' },
    body: {
      en: "Building distinctive visual identities that communicate a brand's personality and purpose.",
      ar: 'بناء هويات بصرية مميزة تعبّر عن شخصية العلامة التجارية وهدفها.',
    },
  },
  {
    id: 'creative-ideas',
    number: '02',
    title: { en: 'CREATIVE IDEAS & INITIATIVES', ar: 'الأفكار والمبادرات الإبداعية' },
    body: {
      en: 'Developing original concepts and creative initiatives for organizations and projects.',
      ar: 'تطوير مفاهيم أصيلة ومبادرات إبداعية للمؤسسات والمشاريع.',
    },
  },
  {
    id: 'training-packages',
    number: '03',
    title: { en: 'TRAINING PACKAGES & PROGRAM DESIGN', ar: 'الحقائب التدريبية وتصميم البرامج' },
    body: {
      en: 'Creating educational content, training packages, and engaging learning experiences.',
      ar: 'إنشاء محتوى تعليمي وحقائب تدريبية وتجارب تعلم جذابة.',
    },
  },
  {
    id: 'ai-creativity',
    number: '04',
    title: { en: 'AI-POWERED CREATIVITY', ar: 'الإبداع بالذكاء الاصطناعي' },
    body: {
      en: 'Using artificial intelligence to explore new creative possibilities and accelerate visual production.',
      ar: 'استخدام الذكاء الاصطناعي لاستكشاف إمكانات إبداعية جديدة وتسريع الإنتاج البصري.',
    },
  },
  {
    id: 'campaigns',
    number: '05',
    title: { en: 'CAMPAIGNS & ADVERTISING DESIGN', ar: 'تصميم الحملات والإعلانات' },
    body: {
      en: 'Designing visual campaigns, promotional materials, and advertising concepts.',
      ar: 'تصميم حملات بصرية ومواد ترويجية ومفاهيم إعلانية.',
    },
  },
  {
    id: 'ai-websites',
    number: '06',
    title: { en: 'AI-POWERED WEBSITE DESIGN', ar: 'تصميم المواقع بالذكاء الاصطناعي' },
    body: {
      en: 'Creating modern digital experiences and interactive websites using AI-assisted development.',
      ar: 'إنشاء تجارب رقمية حديثة ومواقع تفاعلية بتطوير مدعوم بالذكاء الاصطناعي.',
    },
  },
  {
    id: 'program-posters',
    number: '07',
    title: { en: 'PROGRAM POSTERS & VISUAL CONTENT', ar: 'ملصقات البرامج والمحتوى البصري' },
    body: {
      en: 'Developing visual concepts and promotional designs for educational, cultural, and community programs.',
      ar: 'تطوير مفاهيم بصرية وتصاميم ترويجية للبرامج التعليمية والثقافية والمجتمعية.',
    },
  },
];
