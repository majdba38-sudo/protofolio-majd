import type { ExperimentProject } from './types';

/**
 * Brand identity and poster projects.
 * To add a project: copy an entry, give it a unique id, and place the original file in public/media/experiments.
 * The original file is displayed unchanged. Mockup slots are filled through the upload buttons.
 */
export const experiments: ExperimentProject[] = [
  {
    id: 'rawdat-al-qiyam',
    number: '01',
    kind: 'branding',
    name: { en: 'RAWDAT AL-QIYAM', ar: 'روضة القيم' },
    category: { en: 'Educational Branding', ar: 'هوية تعليمية' },
    description: {
      en: 'A kindergarten brand focused on introducing and nurturing values in young children.',
      ar: 'علامة تجارية لرياض أطفال تهدف إلى تقديم القيم وتنميتها لدى الأطفال الصغار.',
    },
    creativeDirection: {
      en: 'A visual identity inspired by childhood, education, and positive values.',
      ar: 'هوية بصرية مستوحاة من الطفولة والتعليم والقيم الإيجابية.',
    },
    image: '/media/experiments/rawdat-al-qiyam.jpeg',
    imageAlt: { en: 'RAWDAT AL-QIYAM logo', ar: 'شعار روضة القيم' },
    designDetails: [
      {
        en: 'Playful Arabic wordmark in orange, green, teal and purple with soft 3D highlights.',
        ar: 'شعار عربي مرح بالبرتقالي والأخضر والتركوازي والبنفسجي مع إضاءة ناعمة ثلاثية الأبعاد.',
      },
      {
        en: 'Sunrise, cloud and hot-air balloon illustrations that create a joyful children’s world.',
        ar: 'رسومات للشمس والسحاب والمنطاد تخلق عالمًا مبهجًا للأطفال.',
      },
      {
        en: 'The sub-line "الصباحي" is set in a clean grey typeface beneath the wordmark.',
        ar: 'جاءت العبارة الفرعية "الصباحي" بخط رمادي بسيط أسفل الشعار.',
      },
    ],
    mockupScenes: [
      { id: 'educational-materials', title: { en: 'Children’s educational materials', ar: 'مواد تعليمية للأطفال' } },
      { id: 'classroom-signs', title: { en: 'Classroom signs', ar: 'لافتات الفصول الدراسية' } },
      { id: 'notebooks', title: { en: 'Notebooks & stationery', ar: 'دفاتر وقرطاسية' } },
      { id: 'learning-cards', title: { en: 'Learning cards', ar: 'بطاقات تعليمية' } },
    ],
  },
  {
    id: 'qanoon-raqam',
    number: '02',
    kind: 'branding',
    name: { en: 'QANOON RAQAM', ar: 'قانون رقم' },
    category: { en: 'Cultural Event Branding', ar: 'هوية فعالية ثقافية' },
    description: {
      en: 'A distinctive Arabic language festival presented through a courtroom concept.',
      ar: 'مهرجان مميز للغة العربية يُقدَّم من خلال مفهوم قاعة المحكمة.',
    },
    creativeDirection: {
      en: 'A creative courtroom-inspired experience that connects Arabic language, calligraphy, and cultural identity.',
      ar: 'تجربة إبداعية مستوحاة من قاعة المحكمة تربط اللغة العربية والخط العربي بالهوية الثقافية.',
    },
    image: '/media/experiments/qanoon-raqam.jpeg',
    imageAlt: { en: 'QANOON RAQAM logo', ar: 'شعار قانون رقم' },
    designDetails: [
      {
        en: 'A tan balance scale forms the central axis of the mark.',
        ar: 'ميزان بلون بني فاتح يشكّل المحور المركزي للشعار.',
      },
      {
        en: 'White calligraphic wordmark set on a deep slate background.',
        ar: 'كلمة مكتوبة بالخط الديواني باللون الأبيض على خلفية رمادية داكنة.',
      },
      {
        en: 'Restrained two-colour palette that reads as formal and authoritative.',
        ar: 'لوحة ألوان محدودة من لونين تعطي طابعًا رسميًا ووقارًا.',
      },
    ],
    mockupScenes: [
      { id: 'event-signage', title: { en: 'Courtroom-inspired event signage', ar: 'لافتات الفعالية بطابع المحكمة' } },
      { id: 'certificates', title: { en: 'Certificates', ar: 'شهادات' } },
      { id: 'invitations', title: { en: 'Invitations', ar: 'بطاقات دعوة' } },
      { id: 'calligraphy-display', title: { en: 'Arabic calligraphy display', ar: 'عرض الخط العربي' } },
    ],
  },
  {
    id: 'mishkat',
    number: '03',
    kind: 'branding',
    name: { en: 'MISHKAT', ar: 'مشكاة' },
    category: { en: 'Quranic Brand Identity', ar: 'هوية علامة قرآنية' },
    description: {
      en: 'A brand focused on the Quran.',
      ar: 'علامة تجارية تُعنى بالقرآن الكريم.',
    },
    creativeDirection: {
      en: 'An elegant visual identity inspired by the beauty and significance of the Quran.',
      ar: 'هوية بصرية أنيقة مستوحاة من جمال القرآن الكريم ومكانته.',
    },
    image: '/media/experiments/mishkat.jpeg',
    imageAlt: { en: 'MISHKAT logo', ar: 'شعار مشكاة' },
    designDetails: [
      {
        en: 'A golden emblem with an arched top and dark green outline, echoing the niche that holds a lamp.',
        ar: 'شكل ذهبي بقمة مقوّسة وإطار أخضر داكن، يستحضر المشكاة التي توضع فيها المصباح.',
      },
      {
        en: 'Bold Arabic calligraphy in dark green sits inside the emblem.',
        ar: 'خط عربي عريض باللون الأخضر الداكن داخل الشكل.',
      },
      {
        en: 'Soft decorative corner illustrations in pale grey and cream.',
        ar: 'رسومات زخرفية ناعمة في الزوايا بالرمادي الفاتح والكريمي.',
      },
    ],
    mockupScenes: [
      { id: 'quran-covers', title: { en: 'Quran covers', ar: 'أغلفة مصاحف' } },
      { id: 'bookmarks', title: { en: 'Bookmarks', ar: 'مؤشرات صفحات' } },
      { id: 'educational-materials', title: { en: 'Educational materials', ar: 'مواد تعليمية' } },
      { id: 'elegant-stationery', title: { en: 'Elegant stationery', ar: 'قرطاسية أنيقة' } },
    ],
  },
  {
    id: 'al-enan',
    number: '04',
    kind: 'branding',
    name: { en: 'AL-ENAN', ar: 'العنان' },
    category: { en: 'Volunteer Team Identity', ar: 'هوية فريق تطوعي' },
    description: {
      en: 'A volunteer team for girls, focused on discovering talents and developing capabilities.',
      ar: 'فريق تطوعي للفتيات يركّز على اكتشاف المواهب وتنمية القدرات.',
    },
    creativeDirection: {
      en: 'A visual identity reflecting ambition, empowerment, growth, and creativity.',
      ar: 'هوية بصرية تعكس الطموح والتمكين والنمو والإبداع.',
    },
    image: '/media/experiments/al-enan.jpeg',
    imageAlt: { en: 'AL-ENAN volunteer team logo', ar: 'شعار فريق العنان التطوعي' },
    designDetails: [
      {
        en: 'Flowing Arabic calligraphy with a magenta-to-orange gradient.',
        ar: 'خط عربي انسيابي بتدرج من الفوشيا إلى البرتقالي.',
      },
      {
        en: 'Subtitle "فريق العنان التطوعي" in a clean grey typeface with dash accents.',
        ar: 'عبارة "فريق العنان التطوعي" بخط رمادي بسيط مع خطوط فاصلة.',
      },
      {
        en: 'A large pale watermark of the wordmark sits behind the logo.',
        ar: 'علامة مائية باهتة كبيرة من الكلمة تظهر خلف الشعار.',
      },
    ],
    mockupScenes: [
      { id: 'team-notebooks', title: { en: 'Team notebooks', ar: 'دفاتر الفريق' } },
      { id: 'event-materials', title: { en: 'Event materials', ar: 'مواد الفعاليات' } },
      { id: 'volunteer-badges', title: { en: 'Volunteer badges', ar: 'شارات المتطوعات' } },
      { id: 'team-stationery', title: { en: 'Team stationery', ar: 'قرطاسية الفريق' } },
    ],
  },
  {
    id: 'tamheer',
    number: '05',
    kind: 'branding',
    name: { en: 'TAMHEER', ar: 'تمهير' },
    category: { en: 'Development Program Branding', ar: 'هوية برنامج تطويري' },
    description: {
      en: 'A brand focused on developing female graduates from middle school and preparing them for their next stage.',
      ar: 'علامة تجارية تُعنى بتطوير خريجات المرحلة المتوسطة وإعدادهن للمرحلة التالية.',
    },
    creativeDirection: {
      en: 'A visual identity inspired by racing, progress, competition, and achievement.',
      ar: 'هوية بصرية مستوحاة من السباق والتقدم والتنافس والإنجاز.',
    },
    image: '/media/experiments/tamheer.jpeg',
    imageAlt: { en: 'TAMHEER logo', ar: 'شعار تمهير' },
    designDetails: [
      {
        en: 'Bold red Arabic wordmark with navy speed-stripe accents.',
        ar: 'كلمة عربية عريضة بالأحمر مع خطوط سرعة باللون الكحلي.',
      },
      {
        en: 'Checkered racing-flag motifs in the corners.',
        ar: 'زخارف مربعات علم السباق في الزوايا.',
      },
      {
        en: 'Slanted letter forms suggest forward motion and progress.',
        ar: 'حروف مائلة توحي بالحركة للأمام والتقدم.',
      },
    ],
    mockupScenes: [
      { id: 'racing-badges', title: { en: 'Racing-inspired badges', ar: 'شارات بطابع السباق' } },
      { id: 'event-banners', title: { en: 'Event banners', ar: 'لافتات الفعاليات' } },
      { id: 'certificates', title: { en: 'Certificates', ar: 'شهادات' } },
      { id: 'development-workbooks', title: { en: 'Development workbooks', ar: 'كراسات التطوير' } },
    ],
  },
  {
    id: 'lulluat-al-juman',
    number: '06',
    kind: 'posters',
    name: { en: "LU'LUAT AL-JUMAN", ar: 'لؤلؤة الجمان' },
    category: { en: "Children's Program Poster", ar: 'ملصق برنامج للأطفال' },
    description: {
      en: 'A program for young girls that focuses on inner and outer beauty.',
      ar: 'برنامج للفتيات الصغيرات يركّز على الجمال الداخلي والخارجي.',
    },
    creativeDirection: {
      en: 'A pearl shell concept representing beauty, value, and discovery.',
      ar: 'مفهوم المحارة واللؤلؤة يرمز إلى الجمال والقيمة والاكتشاف.',
    },
    image: '/media/experiments/lulluat-al-juman.jpeg',
    imageAlt: { en: "LU'LU'AT AL-JUMAN poster", ar: 'ملصق لؤلؤة الجمان' },
    designDetails: [
      {
        en: 'Soft pastel palette of pink, cream, and lilac.',
        ar: 'لوحة ألوان ناعمة من الوردي والكريمي والليلكي.',
      },
      {
        en: 'A pearl shell with a starfish and cloud base forms the central emblem.',
        ar: 'محارة مع نجمة بحر وقاعدة من السحب تشكّل الشعار المركزي.',
      },
      {
        en: 'Pearls in shells illustrate the program theme along the lower section.',
        ar: 'لآلئ داخل محارات توضح موضوع البرنامج في الجزء السفلي.',
      },
    ],
    mockupScenes: [
      { id: 'printed-poster', title: { en: 'Printed poster in a venue', ar: 'ملصق مطبوع في قاعة' } },
      { id: 'social-post', title: { en: 'Social media post & story', ar: 'منشور وقصة على وسائل التواصل' } },
      { id: 'digital-screen', title: { en: 'Digital screen display', ar: 'عرض على شاشة رقمية' } },
    ],
  },
  {
    id: 'maeen',
    number: '07',
    kind: 'posters',
    name: { en: 'MAEEN', ar: 'معين' },
    category: { en: 'Educational Program Poster', ar: 'ملصق برنامج تعليمي' },
    description: {
      en: 'An educational and intellectual enrichment journey.',
      ar: 'رحلة تعليمية وفكرية للإثراء المعرفي.',
    },
    creativeDirection: {
      en: 'A visual concept inspired by knowledge, enrichment, and continuous growth.',
      ar: 'مفهوم بصري مستوحى من المعرفة والإثراء والنمو المستمر.',
    },
    image: '/media/experiments/maeen.jpeg',
    imageAlt: { en: 'MAEEN poster', ar: 'ملصق معين' },
    designDetails: [
      {
        en: 'A teal waterfall photograph forms the header.',
        ar: 'صورة شلال بلون التركوازي تشكّل الترويسة.',
      },
      {
        en: 'Large navy calligraphic wordmark with teal accents.',
        ar: 'كلمة بخط عريض باللون الكحلي مع لمسات تركوازية.',
      },
      {
        en: 'Vertical navy sidebar holds session details with line icons.',
        ar: 'شريط جانبي كحلي عمودي يحمل تفاصيل الجلسات بأيقونات خطية.',
      },
    ],
    mockupScenes: [
      { id: 'printed-poster', title: { en: 'Printed poster in a venue', ar: 'ملصق مطبوع في قاعة' } },
      { id: 'social-post', title: { en: 'Social media post & story', ar: 'منشور وقصة على وسائل التواصل' } },
      { id: 'digital-screen', title: { en: 'Digital screen display', ar: 'عرض على شاشة رقمية' } },
    ],
  },
  {
    id: 'irqaa',
    number: '08',
    kind: 'posters',
    name: { en: 'IRQAA', ar: 'ارتقاء' },
    category: { en: 'Quranic Gathering Poster', ar: 'ملصق لقاءات قرآنية' },
    description: {
      en: 'A series of Quranic gatherings.',
      ar: 'سلسلة من اللقاءات القرآنية.',
    },
    creativeDirection: {
      en: 'A visual experience reflecting elevation, spiritual growth, and connection with the Quran.',
      ar: 'تجربة بصرية تعكس الارتقاء والنمو الروحي والصلة بالقرآن الكريم.',
    },
    image: '/media/experiments/irqaa.jpeg',
    imageAlt: { en: 'IRQAA poster', ar: 'ملصق ارتقاء' },
    designDetails: [
      {
        en: 'Plum and violet palette with a photograph of an ornate Quran stand as the header.',
        ar: 'لوحة ألوان من الخمري والبنفسجي مع صورة لحامل مصحف مزخرف في الترويسة.',
      },
      {
        en: 'An eight-point star emblem holds an open Quran.',
        ar: 'شعار بنجمة ثمانية الرؤوس يحتضن مصحفًا مفتوحًا.',
      },
      {
        en: 'Large calligraphic wordmark with a lightbulb accent that signals new ideas.',
        ar: 'كلمة بخط عريض مع لمسة مصباح ترمز إلى الأفكار الجديدة.',
      },
    ],
    mockupScenes: [
      { id: 'printed-poster', title: { en: 'Printed poster in a venue', ar: 'ملصق مطبوع في قاعة' } },
      { id: 'social-post', title: { en: 'Social media post & story', ar: 'منشور وقصة على وسائل التواصل' } },
      { id: 'digital-screen', title: { en: 'Digital screen display', ar: 'عرض على شاشة رقمية' } },
    ],
  },
  {
    id: 'albasi-nadhara',
    number: '09',
    kind: 'posters',
    name: { en: 'ALBASI NADHARA', ar: 'البسي نظارة' },
    category: { en: 'Educational Campaign Poster', ar: 'ملصق حملة تعليمية' },
    description: {
      en: 'Enrichment meetings that nurture life values, correct perspectives, and help participants develop better ways of seeing situations and making choices.',
      ar: 'لقاءات إثرائية تغرس القيم الحياتية وتصحح المنظور، وتساعد المشاركين على تطوير طرق أفضل لرؤية المواقف واتخاذ القرارات.',
    },
    creativeDirection: {
      en: 'A visual concept built around the idea of changing perspective and seeing life more clearly.',
      ar: 'مفهوم بصري قائم على فكرة تغيير المنظور ورؤية الحياة بوضوح أكبر.',
    },
    image: '/media/experiments/albasi-nadhara.jpeg',
    imageAlt: { en: 'ALBASI NADHARA poster', ar: 'ملصق البسي نظارة' },
    designDetails: [
      {
        en: 'Oversized teal-framed glasses carry the program title inside the lenses.',
        ar: 'نظارة كبيرة بإطار تركوازي تحمل عنوان البرنامج داخل العدستين.',
      },
      {
        en: 'Yellow and teal palette with a diagonal split across the layout.',
        ar: 'لوحة ألوان من الأصفر والتركوازي مع فاصل قطري في التصميم.',
      },
      {
        en: 'Reflection questions sit beside icon badges to invite participation.',
        ar: 'أسئلة تأملية إلى جانب أيقونات تدعو إلى المشاركة.',
      },
    ],
    mockupScenes: [
      { id: 'printed-poster', title: { en: 'Printed poster in a venue', ar: 'ملصق مطبوع في قاعة' } },
      { id: 'social-post', title: { en: 'Social media post & story', ar: 'منشور وقصة على وسائل التواصل' } },
      { id: 'digital-screen', title: { en: 'Digital screen display', ar: 'عرض على شاشة رقمية' } },
    ],
  },
];
