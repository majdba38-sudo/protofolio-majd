import type { Localized } from './types';

/** Interface text. Both languages are kept side by side here. */
export const ui = {
  nav: {
    home: { en: 'HOME', ar: 'الرئيسية' },
    about: { en: 'ABOUT', ar: 'عن المبدعة' },
    experiments: { en: 'EXPERIMENTS', ar: 'التجارب' },
    process: { en: 'PROCESS', ar: 'المنهجية' },
    services: { en: 'SERVICES', ar: 'الخدمات' },
    digital: { en: 'DIGITAL EXPERIENCES', ar: 'التجارب الرقمية' },
    contact: { en: 'CONTACT', ar: 'تواصل' },
    openMenu: { en: 'Open menu', ar: 'فتح القائمة' },
    closeMenu: { en: 'Close menu', ar: 'إغلاق القائمة' },
    language: { en: 'Language', ar: 'اللغة' },
    progress: { en: 'Scroll progress', ar: 'تقدم التمرير' },
  },

  entrance: {
    title: { en: 'WELCOME TO THE IDEA LAB', ar: 'مرحبًا بك في مختبر الأفكار' },
    subtitle: { en: 'Where ideas become visual experiences.', ar: 'حيث تتحول الأفكار إلى تجارب بصرية.' },
    body: {
      en: 'A creative space where imagination, strategy, and design come together to transform ideas into meaningful experiences.',
      ar: 'مساحة إبداعية تجتمع فيها الخيال والاستراتيجية والتصميم لتحويل الأفكار إلى تجارب ذات معنى.',
    },
    button: { en: 'ENTER THE LAB', ar: 'ادخل المختبر' },
    capsules: [
      { en: 'Concept', ar: 'مفهوم' },
      { en: 'Strategy', ar: 'استراتيجية' },
      { en: 'Story', ar: 'قصة' },
      { en: 'Design', ar: 'تصميم' },
      { en: 'Audience', ar: 'جمهور' },
      { en: 'Innovation', ar: 'ابتكار' },
    ] as Localized[],
    scrollHint: { en: 'Scroll to explore', ar: 'مرّر للاستكشاف' },
  },

  about: {
    eyebrow: { en: 'MEET THE CREATOR', ar: 'تعرّف على المبدعة' },
    strengthsLabel: { en: 'Strengths', ar: 'نقاط القوة' },
    profileTag: { en: 'Idea Innovator', ar: 'مبتكِرة الأفكار' },
    placeholderNote: { en: 'Portrait placeholder. Upload a photo at any time.', ar: 'صورة مؤقتة. يمكن رفع صورة في أي وقت.' },
  },

  experiments: {
    eyebrow: { en: 'EXPERIMENTS', ar: 'التجارب' },
    title: { en: 'THE EXPERIMENTS', ar: 'التجارب' },
    subtitle: {
      en: 'Every project starts with a question, an idea, and a creative direction.',
      ar: 'كل مشروع يبدأ بسؤال، وفكرة، واتجاه إبداعي.',
    },
    filterAll: { en: 'ALL PROJECTS', ar: 'كل المشاريع' },
    filterBranding: { en: 'BRANDING & LOGOS', ar: 'الهويات والشعارات' },
    filterPosters: { en: 'POSTERS & CAMPAIGNS', ar: 'الملصقات والحملات' },
    filterDigital: { en: 'DIGITAL EXPERIENCES', ar: 'التجارب الرقمية' },
    viewProject: { en: 'View Project', ar: 'عرض المشروع' },
    creativeDirection: { en: 'Creative direction', ar: 'الاتجاه الإبداعي' },
    empty: { en: 'No projects in this category yet.', ar: 'لا توجد مشاريع في هذا التصنيف بعد.' },
  },

  modal: {
    close: { en: 'Close project', ar: 'إغلاق المشروع' },
    category: { en: 'Project category', ar: 'تصنيف المشروع' },
    originalDesign: { en: 'Original design', ar: 'التصميم الأصلي' },
    concept: { en: 'Project concept', ar: 'مفهوم المشروع' },
    creativeDirection: { en: 'Creative direction', ar: 'الاتجاه الإبداعي' },
    designDetails: { en: 'Design details', ar: 'تفاصيل التصميم' },
    mockups: { en: 'Mockups', ar: 'المحاكيات' },
    mockupNote: {
      en: 'Conceptual mockups for presentation only. They are not real client-approved applications.',
      ar: 'محاكيات مفاهيمية للعرض فقط، وليست تطبيقات فعلية معتمدة من العميل.',
    },
    additional: { en: 'Additional images', ar: 'صور إضافية' },
    status: { en: 'Status', ar: 'الحالة' },
    visualConcept: { en: 'Visual concept', ar: 'المفهوم البصري' },
    posterNote: {
      en: 'Original poster shown exactly as designed. Zoom in to read the details.',
      ar: 'الملصق الأصلي معروض كما صُمم تمامًا. كبّر الصورة لقراءة التفاصيل.',
    },
  },

  media: {
    upload: { en: 'Upload', ar: 'رفع' },
    replace: { en: 'Replace', ar: 'استبدال' },
    placeholder: { en: 'Placeholder. Upload your file here.', ar: 'مكان مؤقت. ارفع ملفك هنا.' },
    hint: { en: 'JPG, PNG, WebP or AVIF', ar: 'صيغ JPG أو PNG أو WebP أو AVIF' },
    saved: { en: 'Saved to the project.', ar: 'تم الحفظ في المشروع.' },
    previewOnly: {
      en: 'Preview only. In the local dev server the file is saved permanently.',
      ar: 'معاينة فقط. على خادم التطوير المحلي يتم حفظ الملف بشكل دائم.',
    },
    failed: { en: 'Upload failed. Please try another file.', ar: 'فشل الرفع. يرجى تجربة ملف آخر.' },
    zoom: { en: 'Zoom', ar: 'تكبير' },
    zoomIn: { en: 'Zoom in', ar: 'تكبير' },
    zoomOut: { en: 'Zoom out', ar: 'تصغير' },
    zoomReset: { en: 'Reset', ar: 'إعادة الضبط' },
    zoomHint: { en: 'Scroll, drag, or use the buttons.', ar: 'مرّر أو اسحب أو استخدم الأزرار.' },
    closeZoom: { en: 'Close', ar: 'إغلاق' },
  },

  process: {
    eyebrow: { en: 'PROCESS', ar: 'المنهجية' },
    title: { en: 'THE THINKING ROOM', ar: 'غرفة التفكير' },
    subtitle: {
      en: 'Great design begins long before the first visual.',
      ar: 'التصميم العظيم يبدأ قبل أول عنصر بصري بوقت طويل.',
    },
    stepLabel: { en: 'Step', ar: 'المرحلة' },
    hint: { en: 'Select each step to explore it.', ar: 'اختر كل مرحلة لاستكشافها.' },
  },

  services: {
    eyebrow: { en: 'SERVICES', ar: 'الخدمات' },
    title: { en: 'THE TOOLBOX', ar: 'صندوق الأدوات' },
    subtitle: { en: 'Creative thinking meets practical execution.', ar: 'التفكير الإبداعي يلتقي بالتنفيذ العملي.' },
  },

  digital: {
    eyebrow: { en: 'DIGITAL EXPERIENCES', ar: 'التجارب الرقمية' },
    title: { en: 'DIGITAL EXPERIENCES', ar: 'التجارب الرقمية' },
    subtitle: {
      en: 'Ideas that move beyond visuals into interactive digital experiences.',
      ar: 'أفكار تتجاوز الصورة إلى تجارب رقمية تفاعلية.',
    },
    visit: { en: 'VISIT WEBSITE', ar: 'زيارة الموقع' },
    live: { en: 'Live', ar: 'متاح الآن' },
    comingSoon: { en: 'COMING SOON', ar: 'قريبًا' },
    statusLabel: { en: 'Live project status', ar: 'حالة المشروع' },
    category: { en: 'Project category', ar: 'تصنيف المشروع' },
    previewPlaceholder: { en: 'Preview coming soon', ar: 'المعاينة قريبًا' },
    conceptLabel: { en: 'Visual concept', ar: 'المفهوم البصري' },
    noUrlYet: { en: 'Website link will be added when the project launches.', ar: 'سيتم إضافة رابط الموقع عند إطلاق المشروع.' },
  },

  contact: {
    eyebrow: { en: 'CONTACT', ar: 'تواصل' },
    title: { en: "LET'S CREATE SOMETHING MEANINGFUL", ar: 'لنصنع شيئًا ذا معنى' },
    subtitle: {
      en: 'Have an idea, a challenge, or a project waiting to happen?',
      ar: 'لديك فكرة أو تحدٍّ أو مشروع ينتظر التنفيذ؟',
    },
    lead: { en: "Let's turn it into something extraordinary.", ar: 'دعنا نحوّله إلى شيء استثنائي.' },
    emailLabel: { en: 'Email', ar: 'البريد الإلكتروني' },
    emailPlaceholder: { en: 'Add your email in src/content/site.ts', ar: 'أضف بريدك الإلكتروني في src/content/site.ts' },
    name: { en: 'Name', ar: 'الاسم' },
    email: { en: 'Email', ar: 'البريد الإلكتروني' },
    organization: { en: 'Organization or company', ar: 'الجهة أو الشركة' },
    projectType: { en: 'Project type', ar: 'نوع المشروع' },
    message: { en: 'Message', ar: 'الرسالة' },
    selectType: { en: 'Select a project type', ar: 'اختر نوع المشروع' },
    send: { en: 'Send Inquiry', ar: 'إرسال الاستفسار' },
    sending: { en: 'Sending…', ar: 'جارٍ الإرسال…' },
    sent: { en: 'Thank you. Your inquiry has been sent.', ar: 'شكرًا لك. تم إرسال استفسارك.' },
    failed: { en: 'Something went wrong. Please try again.', ar: 'حدث خطأ. يرجى المحاولة مرة أخرى.' },
    notConnected: {
      en: 'The contact form is not connected yet. Add a form endpoint or email in src/content/site.ts.',
      ar: 'نموذج التواصل غير مرتبط بعد. أضف رابط النموذج أو البريد الإلكتروني في src/content/site.ts.',
    },
    required: { en: 'This field is required.', ar: 'هذا الحقل مطلوب.' },
    invalidEmail: { en: 'Please enter a valid email address.', ar: 'يرجى إدخال بريد إلكتروني صحيح.' },
  },

  footer: {
    rights: { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
  },

  projectTypes: [
    { en: 'Brand identity & logo design', ar: 'الهوية البصرية وتصميم الشعار' },
    { en: 'Campaign or program poster', ar: 'ملصق حملة أو برنامج' },
    { en: 'Training package & program design', ar: 'تصميم الحقائب التدريبية والبرامج' },
    { en: 'Creative idea & initiative', ar: 'فكرة ومبادرة إبداعية' },
    { en: 'Website or digital experience', ar: 'موقع أو تجربة رقمية' },
    { en: 'Other', ar: 'أخرى' },
  ] as Localized[],
};
