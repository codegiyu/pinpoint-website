import { FullProjectData } from '@/app/projects/[projectId]/page';
import { FullServiceData } from '@/app/services/[service]/page';
import SvgInstagramIcon from '@/components/icons/InstagramIcon';
import SvgFacebookIcon from '@/components/icons/FacebookIcon';
import { ReferenceProps } from '@/components/sections/about/References';
import { AchievementBlockProps } from '@/components/sections/about/Achievements';
import { TeamSlideProps } from '@/components/sections/about/Team';
import { SocialBtnProps } from '@/components/general/Socials';
import { ContactsGroupProps } from '@/components/general/PinpointContacts';
import { TiktokIcon } from '@/components/icons';
import { FullJobProps } from '@/app/jobs/[job]/page';

const liveUrl = process.env.live_url || 'https://pinpoint.ng';

export const SEO_DETAILS = {
  title: {
    default: 'Your Branding, Marketing, and Packaging Solution',
    template: '%s | Pinpoint Global',
  },
  description:
    "We are a creative brand consultancy into design, branding and packaging. \
    We've been collaborating with leading organizations to solve brand and \
    business challenges since 2019. Our team across different locations uses \
    the power of creativity to transform businesses for the better.",
  metadataBase: new URL(liveUrl),
  alternates: {
    canonical: liveUrl,
  },
  image: 'https://static.pinpoint.ng/site-preview.png',
  icons: 'https://static.pinpoint.ng/favicon.png',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
    },
  },
  authors: [{ name: 'Edward-Precious Omegbu', url: 'https://portfolio-codegiyu.vercel.app' }],
  keywords: [
    'pinpoint',
    'branding',
    'marketing',
    'packaging',
    'creative agency',
    'printing',
    'product design',
    'stickers',
    'social media',
    'animations',
    'motion graphics',
    'graphic design',
    'logo',
    'web design',
    'mobile apps',
  ],
  generator: 'Next.js',
  // referrer: 'no-referrer',
  publisher: 'Pinpoint Global Limited',
  category: 'Creative Agency',
  classification: 'Complete solution for branding, marketing, packaging and digital products',
};

export const changingHeroTitleModifiers: string[] = [
  'brands',
  'campaigns',
  'experiences',
  'identities',
];

export const changingContactTitleModifiers: string[] = [
  'Hello',
  'Sannu',
  'Ndewo',
  'Ẹ n lẹ',
  'Msugh',
  'Nǐ hǎo',
];

export const contactInformation: ContactsGroupProps[] = [
  {
    location: 'Abuja',
    address: 'No. 18 Aba Close, Area 8, Garki, Abuja.',
    tel: ['+234 912 323 2389', '+234 912 323 2397'],
    email: 'abuja@pinpoint.ng',
  },
  {
    location: 'Kano',
    address: 'MTN Office, Civic Center',
    tel: ['+234 812 222 1489', '+234 812 222 6489'],
    email: 'kano@pinpoint.ng',
  },
  {
    location: 'Benue',
    address: 'No. 8 7th Avenue, Inikpi street, High level, Makurdi',
    tel: [],
    email: 'benue@pinpoint.ng',
  },
  {
    location: 'China',
    address:
      'No. 36, Qingyuan Road, Jinfeng Town, Zhangjiagang, \
      Suzhou City, Jiangsu Province, China.',
    tel: ['+86 1958 7410 572'],
    email: 'china@pinpoint.ng',
  },
];

export const pinpointSocials: SocialBtnProps[] = [
  {
    title: 'Instagram',
    url: 'https://www.instagram.com/pinpointpackaging?igsh=MXNlbTN3MnQ3bzdicg==',
    Icon: SvgInstagramIcon,
  },
  {
    title: 'Facebook',
    url: 'https://www.facebook.com/share/19MUWfmSiG/?mibextid=wwXIfr',
    Icon: SvgFacebookIcon,
  },
  // {
  //   title: 'LinkedIn',
  //   url: 'https://be.linkedin.com/company/atelier-design',
  //   Icon: SvgLinkedin,
  // },
  // {
  //   title: 'X',
  //   url: 'https://x.com/atelierdesign',
  //   Icon: SvgXIcon,
  // },
  {
    title: 'Tiktok',
    url: 'https://www.tiktok.com/@pinpointglobal?_t=ZS-8yRAXCYmRLp&_r=1',
    Icon: TiktokIcon,
  },
];

export const selectedCaseStudies: AvailableProject[] = ['tahwil_solutions', 'gusto', 'afropay'];

export const ourStoryTexts: string[] = [
  'Founded in 2020, Pinpoint Global was born from the desire to provide brands \
  with the strategic direction and creative expertise needed to stand out in an \
  increasingly competitive marketplace. After years of working in the design and \
  branding industry, we recognized a gap for an agency that could combine a deep \
  understanding of brand strategy with innovative, high-quality design and packaging \
  solutions. Pinpoint Global was launched to fill that gap.',

  'Our agency was built on one core belief: brands are more than just logos and colors; \
  they are experiences, stories, and promises that connect with people on a deeper level. \
  We specialize in creating those connections by offering a full suite of branding services, \
  from strategy development and brand positioning to packaging design, digital marketing, \
  video animations, website design & development, and public relations.',

  "When we founded Pinpoint Global, our vision was clear—we wanted to create an agency that \
  wasn't just focused on aesthetics but driven by the bigger picture of helping businesses \
  grow sustainably. The world is filled with incredible ideas and products, yet many brands \
  struggle to gain the visibility and trust they deserve due to ineffective branding and \
  inconsistent messaging. That's where Pinpoint Global comes in.",

  'We sought to provide companies, big or small, with a roadmap for success, guiding them \
  through every step of the branding journey. Whether a brand is in its early stages or \
  looking to reinvent itself, we are here to help it reach its full potential through \
  strategic brand positioning, innovative design, and thoughtful storytelling.',

  "We understand that while first impressions matter, longevity in the market is achieved \
  through consistency and a deep emotional connection with your audience. Our goal is to \
  build brands that don't just stand out — they endure",
];

export const OUR_ACHIEVEMENTS: AchievementBlockProps[] = [
  {
    number: 50,
    numberSuffix: '+',
    desc: 'Awards & Recognitions',
    className:
      'grid bg-gray-f2 md:col-start-3 md:col-end-4 lg:col-start-4 lg:col-end-5 md:row-start-1 md:row-end-2',
  },
  {
    number: 5,
    desc: 'Years of experience',
    className:
      'grid bg-dark text-white md:col-start-1 md:col-end-2 lg:col-start-2 lg:col-end-3 md:row-start-2 md:row-end-3',
  },
  {
    number: 1000,
    numberSuffix: '+',
    desc: 'Brands Worked with',
    className:
      'grid bg-white md:col-start-1 md:col-end-2 lg:col-start-2 lg:col-end-3 md:row-start-3 md:row-end-4',
  },
  {
    number: 10,
    numberSuffix: 'K+',
    desc: 'Projects completed',
    className: 'hidden lg:grid bg-gray-d9 lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
  },
];

export const OUR_TEAM: TeamSlideProps[] = [
  {
    name: 'Adepoju Olayode',
    title: 'CEO',
    mainImage: 'https://static.pinpoint.ng/images/team/klef-main.webp',
    subImage: 'https://static.pinpoint.ng/images/team/klef-sub.webp',
  },
  {
    name: 'Onoja Enemona Isaac',
    title: 'Head of Design',
    mainImage: 'https://static.pinpoint.ng/images/team/isaac.jpg',
    subImage: 'https://static.pinpoint.ng/images/team/isaac.jpg',
  },
  {
    name: "Fahad Ya'u Deba",
    title: 'Animator',
    mainImage: 'https://static.pinpoint.ng/images/team/fahad.jpg',
    subImage: 'https://static.pinpoint.ng/images/team/fahad.jpg',
  },
  {
    name: 'Gaba Mary',
    title: 'Head of Marketing',
    mainImage: 'https://static.pinpoint.ng/images/team/mary.jpg',
    subImage: 'https://static.pinpoint.ng/images/team/mary.jpg',
  },
  {
    name: 'Nansel Dauda Joseph',
    title: 'Project Manager',
    mainImage: 'https://static.pinpoint.ng/images/team/dauda.jpg',
    subImage: 'https://static.pinpoint.ng/images/team/dauda.jpg',
  },
  // {
  //   name: 'Akeem Ayoola Aremu',
  //   title: 'Logistics Manager',
  //   mainImage: 'https://static.pinpoint.ng/images/team/akeem.jpg',
  //   subImage: 'https://static.pinpoint.ng/images/team/akeem.jpg',
  // },
  {
    name: 'Olivia U. Onyeagoro',
    title: 'HR Manager',
    mainImage: 'https://static.pinpoint.ng/images/team/olivia.jpg',
    subImage: 'https://static.pinpoint.ng/images/team/olivia.jpg',
  },
  {
    name: 'Chidi Collins',
    title: 'Accountant',
    mainImage: 'https://static.pinpoint.ng/images/team/chidi.jpg',
    subImage: 'https://static.pinpoint.ng/images/team/chidi.jpg',
  },
  {
    name: 'Panam Mbamo',
    title: 'Social Media Manager',
    mainImage: 'https://static.pinpoint.ng/images/team/panam.jpg',
    subImage: 'https://static.pinpoint.ng/images/team/panam.jpg',
  },
  {
    name: 'Bilqis Abdurrahman',
    title: 'Front Desk',
    mainImage: 'https://static.pinpoint.ng/images/team/bili.jpg',
    subImage: 'https://static.pinpoint.ng/images/team/bili.jpg',
  },
  {
    name: 'Simon Holiness',
    title: 'Production Manager',
    mainImage: 'https://static.pinpoint.ng/images/team/holiness.jpg',
    subImage: 'https://static.pinpoint.ng/images/team/holiness.jpg',
  },
  {
    name: 'Collins Bassey',
    title: 'Quality Control Manager',
    mainImage: 'https://static.pinpoint.ng/images/team/collins.jpg',
    subImage: 'https://static.pinpoint.ng/images/team/collins.jpg',
  },
];

export const newProjectTexts: string[] = [
  'A brilliant idea deserves to shine. With us, every concept is a unique opportunity \
  to exceed our limits. Our creative agency combines its expertise in branding, marketing, \
  packaging, printing website creation, and strategies to turn each project into a \
  success blending elegance, quality, and functionality.',
  'The Pinpoint Team is a group of enthusiasts who are not afraid to break the mold. \
  Whether you need a website that grabs attention, a memorable visual identity, or a \
  powerful communication strategy, we are committed to delivering results that \
  exceed your expectations.',
];

export const AVAILABLE_PACKAGED_SERVICE_IDS = [
  'branding',
  'brand_naming',
  'brand_activation',
  'rebranding',
  'professional_logo_design',
  'campaign_branding',
  'social_media_strategy',
  'packaging_&_product_design',
  'stickers',
  'website_design_&_development',
  'make_a_custom_request',
  'make_an_enquiry',
] as const;
export type AvailablePackagedService = (typeof AVAILABLE_PACKAGED_SERVICE_IDS)[number];

export const AVAILABLE_SERVICE_IDS = [
  'branding_and_identity',
  'marketing_and_media',
  'packaging_and_product_design',
  'offset_and_digital_printing',
  'digital_products_creation',
] as const;
export type AvailableService = (typeof AVAILABLE_SERVICE_IDS)[number];
export const ALL_SERVICES_DATA: FullServiceData[] = [
  {
    id: 'branding_and_identity',
    name: 'Branding & Identity',
    pageTitle: 'We craft brand identities that speak before you do',
    videoUrl: 'https://static.pinpoint.ng/videos/branding-animation.mp4',
    posterUrl: 'https://static.pinpoint.ng/images/video-posters/branding-poster.png',
    description:
      "At the heart of every successful brand is a clear and compelling identity. \
      Through collaborative workshops and deep discovery sessions, we help you uncover \
      your brand's unique voice, core values, and visual personality. From professional \
      logo design to comprehensive brand systems and guidelines, we build identities \
      that not only stand out but also connect meaningfully with your audience. Every \
      element we create is crafted to ensure consistency, credibility, and long-term \
      recognition across every medium and touchpoint.",
    expertise: {
      title: 'Define, differentiate & stand out',
      breakdown: [
        {
          title: 'We shape visual identities',
          services: [
            'Logo Design',
            'Typography & Color Systems',
            'Visual Identity Development',
            'Iconography & Brand Assets',
            'Brand Guidelines',
          ],
        },
        {
          title: 'We build meaningful brands',
          services: [
            'Brand Strategy & Positioning',
            'Naming & Tagline Creation',
            'Brand Personality Development',
            'Competitive & Market Analysis',
          ],
        },
        {
          title: 'We bring your brand to life',
          services: [
            'Business Card & Stationery Design',
            'Pitch Decks & Templates',
            'Email Signature Design',
            'Brand Audit & Refresh',
            'Rebranding',
            'Brand Activation',
          ],
        },
      ],
      highlightImage: 'https://static.pinpoint.ng/images/branding-highlight.png',
      marqueeText: 'Define, differentiate & stand out.',
    },
    breakdownSummary: [
      'Brand strategy & positioning',
      'Professional logo design',
      'Visual identity design',
      'Brand naming & taglines',
      'Stationery design',
    ],
    whatMakesUsUnique: {
      title: 'Our long-term and qualitative vision',
      groups: [
        {
          title: 'Tailor-made',
          text: 'Because we are convinced that every project is unique, we automatically propose tailor-made solutions. We concentrate our energy into making a brand strategy that perfectly fits in with your business.',
        },
        {
          title: 'Rooted in strategy',
          text: 'Our branding process is built on research and insight, ensuring your identity is both meaningful and memorable. We help you define your “why” before shaping the “how”.',
        },
        {
          title: 'Beyond the logo',
          text: "We don't just create logos, we craft cohesive visual identities that speak your brand's truth across every touchpoint, from fonts to first impressions.",
        },
        {
          title: 'Consistency is power',
          text: 'We create systems that keep your brand consistent, from pitch decks to packaging, making sure your audience always recognizes and remembers you.',
        },
      ],
    },
    menu: {
      image: 'https://static.pinpoint.ng/images/team/waju.jpg',
      className: 'rotate-8 peer-hover:-rotate-6',
    },
    packagePricing: [
      {
        id: 'branding',
        packages: [
          {
            id: 'basic',
            priceRange: [250_000],
            benefits: [
              'Interview',
              'Logo Design',
              '2-3 Concepts',
              '2 Revisions',
              'Stationary Design',
              'Color Palette',
              'Brand Font Family& Font File',
              'Core Brand Guidelines',
              'Branding Questionnaire Interview',
              'Branding Summary',
              'Branding Workshop',
              'Values Statement',
              'Business Card Design',
              '1 Social Media Banner Design',
              'Presentation Template',
            ],
          },
          {
            id: 'premium',
            priceRange: [500_000],
            benefits: [
              'Interview',
              'Logo Design',
              '5-7 Concepts',
              '4 Revisions',
              'Stationary Design',
              'Color Palette',
              'Brand Font Family& Font File',
              'Core Brand Guidelines',
              'Branding Questionnaire Interview',
              'Branding Summary',
              'Branding Workshop',
              'Values Statement',
              'Business Card Design',
              '5 Social Media Banner Designs',
              'Presentation Template',
              '1 Website Design',
            ],
          },
          {
            id: 'classic',
            priceRange: [1_000_000],
            benefits: [
              'Interview',
              'Logo Design',
              '5-7 Concepts',
              '4 Revisions',
              'Stationary Design',
              'Color Palette',
              'Brand Font Family& Font File',
              'Core Brand Guidelines',
              'Branding Questionnaire Interview',
              'Branding Summary',
              'Branding Workshop',
              'Values Statement',
              'Business Card Design',
              '5 Social Media Banner Designs',
              'Presentation Template',
              '1 Website Design',
              'Logo Video Intro',
            ],
          },
        ],
      },
      {
        id: 'brand_naming',
        packages: [
          {
            id: 'basic',
            priceRange: [200_000, 500_000],
            benefits: ['Includes 3 name options', '1 round of revision'],
          },
          {
            id: 'premium',
            priceRange: [500_000, 1_250_000],
            benefits: [
              'Includes 5 name options',
              '2 rounds of revisions',
              'A naming strategy document',
            ],
          },
          {
            id: 'classic',
            priceRange: [1_250_000, 1_500_000],
            benefits: [
              'Includes 10 name options',
              '3 rounds of revisions',
              'A naming strategy document',
              'A brand guidelines document',
            ],
          },
        ],
      },
      {
        id: 'brand_activation',
        packages: [
          {
            id: 'basic',
            priceRange: [500_000, 2_000_000],
            benefits: ['Brand launch event', 'Social media campaign', 'Influencer partnerships'],
          },
          {
            id: 'premium',
            priceRange: [1_000_000, 2_500_000],
            benefits: [
              'Everything in Basic Package',
              'Brand ambassador partnership',
              'Event sponsorship',
              'PR services',
            ],
          },
          {
            id: 'classic',
            priceRange: [2_500_000, 10_000_000],
            benefits: [
              'Everything in Premium Package',
              'Brand experience activation',
              'Content creation',
              'Media buying',
            ],
          },
        ],
      },
      {
        id: 'professional_logo_design',
        packages: [
          {
            id: 'basic',
            priceRange: [30_000],
            benefits: [
              '1 Logo Review',
              'Font/Typography',
              'Color/Brand Pattern',
              'High Resolution png (Basic/Grayscale)',
              'High Resolution jpg (Basic/Grayscale)',
            ],
          },
          {
            id: 'premium',
            priceRange: [50_000],
            benefits: [
              '2 Logo Reviews',
              'Font/Typography',
              'Color/Brand Pattern',
              'High Resolution png (Basic/Grayscale)',
              'High Resolution jpg (Basic/Grayscale)',
              'Basic Logo Mockup',
              'Letterhead & Business Card Design',
            ],
          },
          {
            id: 'classic',
            priceRange: [100_000],
            benefits: [
              '3 Logo Reviews',
              'Font/Typography',
              'Color/Brand Pattern',
              'High Resolution png (Basic/Grayscale)',
              'High Resolution jpg (Basic/Grayscale)',
              'Basic Logo Mockup',
              'Letterhead & Business Card Design',
              '1 Social Media Design',
              'Tshirt Idea',
              'Rollup Banner Design',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'marketing_and_media',
    name: 'Marketing & Media',
    pageTitle: 'Stories that move, strategies that stick',
    videoUrl: 'https://static.pinpoint.ng/videos/marketing-animation.mp4',
    posterUrl: 'https://static.pinpoint.ng/images/video-posters/marketing-poster.png',
    description:
      'In a fast-moving digital world, connection is everything. We help \
      brands communicate with clarity, creativity, and consistency, \
      across every platform and format. From content strategies and \
      campaign planning to video production, motion graphics, and product \
      animations, we craft media that not only grabs attention but inspires \
      action. Our approach blends storytelling, design, and data to ensure \
      your message lands with the right audience, at the right time, in the \
      most engaging way possible.',
    expertise: {
      title: 'Captivate, connect & convert',
      breakdown: [
        {
          title: 'We plan campaigns that convert',
          services: [
            'Campaign Concept & Planning',
            'Audience Research & Targeting',
            'Paid Social & Google Ads',
            'Influencer & Partner Campaigns',
            'Analytics & Performance Tracking',
            'Cross-channel Strategy for Video & Motion Content',
          ],
        },
        {
          title: 'We amplify your message everywhere',
          services: [
            'Email Marketing',
            'Print & Outdoor Advertising',
            'Marketing Collateral (Flyers, Banners, Brochures)',
            'Press Kits & PR Assets',
            'Cross-platform Messaging Alignment',
            'Media Adaptation for Various Formats',
          ],
        },
        {
          title: 'We create content that connects',
          services: [
            'Social Media Strategy',
            'Copywriting & Storytelling',
            'Creative Direction',
            'Content Calendars',
            'Visual Assets for Campaigns',
            'Video Content',
            'Motion Graphics',
            'Product Animations',
            '3D Product Visualization',
          ],
        },
      ],
      highlightImage: 'https://static.pinpoint.ng/images/marketing-highlight.png',
      marqueeText: 'Captivate, connect & convert.',
    },
    breakdownSummary: [
      'Campaign branding',
      'Event branding and design',
      'Social media strategy & management',
      'Motion Graphics',
      'Product Animations',
    ],
    whatMakesUsUnique: {
      title: 'Our long-term and qualitative vision',
      groups: [
        {
          title: 'Story-first thinking',
          text: 'We lead with narrative, crafting campaigns and content that connect emotionally before they convert. Every asset has a purpose, and every message has meaning.',
        },
        {
          title: 'Cross-platform fluency',
          text: 'From social media to outdoor, motion to messaging, we understand how to tailor your voice to every channel without losing its soul.',
        },
        {
          title: 'Creative meets performance',
          text: "We combine bold creativity with data-backed strategy, ensuring that your campaigns don't just look good, they perform.",
        },
        {
          title: 'Scalable content systems',
          text: 'We design modular assets and systems you can reuse, remix, and adapt, so your brand stays fresh without reinventing the wheel every time.',
        },
      ],
    },
    menu: {
      image: 'https://static.pinpoint.ng/images/team/daniel.jpg',
      className: '-rotate-6 peer-hover:rotate-10',
    },
    packagePricing: [
      {
        id: 'campaign_branding',
        packages: [
          {
            id: 'starter',
            priceRange: [100_000, 150_000],
            benefits: [
              'Number of products: 1-2',
              'Campaign concept development',
              'Key visual design',
              'Social media assets creation (Facebook, Twitter, Instagram)',
              'Email marketing template design',
            ],
          },
          {
            id: 'essential',
            priceRange: [250_000, 350_000],
            benefits: [
              'Number of products: 3-5',
              'Everything in Starter package',
              'Influencer marketing assets creation',
              'Landing page design',
              'Campaign analytics report',
            ],
          },
          {
            id: 'advanced',
            priceRange: [500_000, 700_000],
            benefits: [
              'Number of products: 6-10',
              'Everything in Essential package',
              'Video campaign production (up to 60 seconds)',
              'Print materials design (brochures, flyers, posters)',
              'Event marketing materials design',
            ],
          },
          {
            id: 'premium',
            priceRange: [1_000_000, 1_500_000],
            benefits: [
              'Number of products: 11+',
              'Everything in Advanced package',
              'Comprehensive campaign strategy development',
              'Quarterly campaign performance review',
            ],
          },
        ],
      },
      {
        id: 'social_media_strategy',
        packages: [
          {
            id: 'basic',
            priceRange: [50_000],
            priceSuffix: ' (per month)',
            benefits: [
              'Social media account setup and optimization',
              'Monthly content calendar (2 posts per week)',
              'Post creation and scheduling (Facebook, Instagram, Twitter)',
              'Basic engagement (responding to comments and messages)',
            ],
          },
          {
            id: 'advanced',
            priceRange: [200_000],
            priceSuffix: ' (per month)',
            benefits: [
              'Everything in Basic Package',
              'Increased content creation (6 posts per week)',
              'Advanced engagement ( reviews)',
              'Social media advertising (Facebook and Instagram, ₦20,000 budget)',
            ],
          },
          {
            id: 'premium',
            priceRange: [300_000],
            priceSuffix: ' (per month)',
            benefits: [
              'Everything in Advanced Package',
              'High-level content creation (8 posts per week)',
              'Premium engagement (responding to comments, messages, reviews, and mentions)',
              'Social media advertising (Facebook, Instagram, Twitter, and LinkedIn, ₦50,000 budget)',
              'Monthly social media strategy session',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'packaging_and_product_design',
    name: 'Packaging & Product Design',
    pageTitle: 'We turn packaging into powerful first impressions',
    videoUrl: 'https://static.pinpoint.ng/videos/packaging-animation.mp4',
    posterUrl: 'https://static.pinpoint.ng/images/video-posters/packaging-poster.png',
    description:
      "Packaging is more than protection — it's the first conversation your \
      product has with the world. We design packaging that captivates, \
      communicates, and converts, all while staying true to your brand story. \
      From structural design to label layouts and custom dielines, we bring \
      strategic thinking and creative execution together to create memorable, \
      functional packaging. Whether it's on a shelf or on a screen, we make sure \
      your product stands out — and stands for something.",
    expertise: {
      title: 'Package, elevate & inspire',
      breakdown: [
        {
          title: 'We create products you can touch',
          services: [
            'Product Packaging',
            'Custom Stickers',
            '3D Dome Stickers',
            'Branded Stationery',
            'Promotional Products',
            'Tactile Brand Assets',
          ],
        },
        {
          title: 'We shape products with form and function',
          services: [
            'Product Mockups & Prototypes',
            'Art Direction for Product Launches',
            'Point-of-Sale Materials',
            'Display & Retail Design',
            'Label & Print File Preparation',
            'Packaging Guidelines & Templates',
          ],
        },
        {
          title: 'We bring brands to life in the real world',
          services: [
            'Packaging Design',
            'Product Design',
            'Label Systems',
            'Material & Finish Consulting',
            'Unboxing Experience Design',
            'Wearable Design',
          ],
        },
      ],
      highlightImage: 'https://static.pinpoint.ng/images/packaging-highlight.png',
      marqueeText: 'Package, elevate & inspire.',
    },
    breakdownSummary: [
      'Product packaging',
      'Packaging design',
      'Sticker & label design',
      'Unboxing experience design',
      'Promotional Products',
    ],
    whatMakesUsUnique: {
      title: 'Our long-term and qualitative vision',
      groups: [
        {
          title: 'Form with purpose',
          text: 'Our packaging designs are as functional as they are beautiful — built to protect, perform, and pop on any shelf or screen.',
        },
        {
          title: 'Tailored to your product',
          text: 'No templates here — we design packaging that fits your product, your brand, and your audience down to the last fold or label.',
        },
        {
          title: 'Retail & digital ready',
          text: 'Whether your product lives on shelves or in scrolls, we design packaging that shines in real life and in photos, thumbnails, and e-commerce listings.',
        },
        {
          title: 'Unified inside & out',
          text: 'From structural packaging to printed collateral, we ensure a seamless brand experience that flows from unboxing to long-term loyalty.',
        },
      ],
    },
    menu: {
      image: 'https://static.pinpoint.ng/images/team/abdul.jpg',
      className: 'rotate-20 peer-hover:rotate-5',
    },
    packagePricing: [
      {
        id: 'packaging_&_product_design',
        packages: [
          {
            id: 'basic',
            priceRange: [20_000, 30_000],
            benefits: [
              'Number of products: 1',
              'Product design concept',
              '2D design development',
              'Final design files (AI, PSD, Sketch)',
            ],
          },
          {
            id: 'standard',
            priceRange: [40_000, 60_000],
            benefits: [
              'Number of products: 2-3',
              'Everything in Basic package',
              '3D design visualization',
              'Design iterations (up to 2 rounds)',
            ],
          },
          {
            id: 'advanced',
            priceRange: [80_000, 120_000],
            benefits: [
              'Number of products: 4-5',
              'Everything in Standard package',
              'Advanced design research',
              'Design strategy development',
            ],
          },
          {
            id: 'premium',
            priceRange: [150_000, 250_000],
            benefits: [
              'Number of products: 6+',
              'Everything in Advanced package',
              'Dedicated design lead',
              'Priority project timeline',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'offset_and_digital_printing',
    name: 'Offset & Digital Printing',
    pageTitle: 'Print that delivers impact, on paper and in hand',
    videoUrl: 'https://static.pinpoint.ng/videos/printing-animation.mp4',
    posterUrl: 'https://static.pinpoint.ng/images/video-posters/printing-poster.png',
    description:
      'Tangible experiences still matter — and great print leaves a lasting impression. \
      We bring your ideas to life through high-quality offset and digital printing that \
      reflects the precision and polish of your brand. Whether you need business cards, \
      brochures, banners, or packaging sleeves, we ensure every piece is produced with \
      care and consistency. From file prep to final delivery, we manage the process \
      end-to-end so you can focus on results, not logistics.',
    expertise: {
      title: 'Print, polish & impress',
      breakdown: [
        {
          title: 'We bring your ideas to life on paper',
          services: [
            'Offset & Digital Print Production',
            'Business Cards & Stationery',
            'Posters & Large-Format Prints',
            'Brochures, Catalogues & Lookbooks',
            'Books & Editorial Projects',
            'Branded Marketing Materials',
          ],
        },
        {
          title: 'We take care of the details so your print looks perfect',
          services: [
            'Print Layout & Setup',
            'Proofing & Color Checks',
            'Paper & Finish Recommendations',
            'Print File Preparation',
            'Vendor Coordination',
            'Quality Review & Delivery',
          ],
        },
        {
          title: 'We create print that feels as good as it looks',
          services: [
            'Tactile Materials & Textures',
            'Foiling, Embossing & Special Finishes',
            'Packaging Inserts & Gift Wraps',
            'Custom Invitations & Event Collateral',
          ],
        },
      ],
      highlightImage: 'https://static.pinpoint.ng/images/printing-highlight.png',
      marqueeText: 'Print, polish & impress.',
    },
    breakdownSummary: [
      'Business card printing',
      'Brochure & flyer printing',
      'Poster & banner printing',
      'Booklet & magazine printing',
      'Branded stationery printing',
    ],
    whatMakesUsUnique: {
      title: 'Our long-term and qualitative vision',
      groups: [
        {
          title: 'Detail-obsessed',
          text: 'We sweat the small stuff, from color matching to paper selection, so that every print reflects the care behind your brand.',
        },
        {
          title: 'From file to finish',
          text: 'We manage the entire print process, making sure your materials arrive exactly as envisioned, with no surprises.',
        },
        {
          title: 'Print that performs',
          text: "Beyond looks, our printed materials are designed to support business goals; whether that's sales, awareness, or credibility.",
        },
        {
          title: 'Digital and physical harmony',
          text: 'We make sure your print materials align with your digital presence, creating a cohesive brand experience wherever your audience meets you.',
        },
      ],
    },
    menu: {
      image: 'https://static.pinpoint.ng/images/team/michael.jpg',
      className: '-rotate-4 peer-hover:rotate-6',
    },
    packagePricing: [],
  },
  {
    id: 'digital_products_creation',
    name: 'Digital Products Creation',
    pageTitle: 'We craft digital products that feel as good as they function',
    videoUrl: 'https://static.pinpoint.ng/videos/digital-animation.mp4',
    posterUrl: 'https://static.pinpoint.ng/images/video-posters/digital-poster.png',
    description:
      "We design and develop digital products that feel intuitive, perform beautifully, \
      and grow with your business. Through thoughtful UX, responsive design, and scalable \
      code, we turn ideas into engaging web and mobile experiences. Whether you're building \
      a landing page, an e-commerce store, or a full-featured mobile app, we craft solutions \
      that meet user needs and exceed business goals. From concept to launch — and beyond — \
      we're your partner in creating digital tools that are built to last.",
    expertise: {
      title: 'Shape, ship & evolve',
      breakdown: [
        {
          title: 'We design experiences people love to use',
          services: [
            'UI/UX Design for Web & Mobile',
            'Wireframes & Interactive Prototypes',
            'Responsive & Adaptive Layouts',
            'Design Systems & Component Libraries',
            'Accessibility-first Design',
            'Brand Integration & Visual Consistency',
            'Web Design',
          ],
        },
        {
          title: 'We build digital products that scale with you',
          services: [
            'Frontend Development',
            'Cross-platform Mobile App Development',
            'Backend Development & API Integration',
            'Website Development',
            'Headless CMS Integration',
            'E-commerce & SaaS Platforms',
            'Performance & SEO Optimization',
          ],
        },
        {
          title: 'We support, evolve, and grow your product',
          services: [
            'Ongoing Maintenance & Feature Updates',
            'Content Management Training',
            'User Analytics & Conversion Tracking',
            'Cloud Hosting & DevOps Support',
            'Security & Compliance Monitoring',
            'Product Strategy & Roadmapping',
          ],
        },
      ],
      highlightImage: 'https://static.pinpoint.ng/images/website-creation-highlight.jpg',
      marqueeText: 'Shape, ship & evolve.',
    },
    breakdownSummary: [
      'UI/UX Design for Web & Mobile',
      'Frontend development',
      'Cross-platform mobile app development',
      'Backend Development & API Integration',
      'E-commerce & SaaS platforms',
    ],
    whatMakesUsUnique: {
      title: 'Our long-term and qualitative vision',
      groups: [
        {
          title: 'Built for people',
          text: 'Every digital product we design is made for real users, with intuitive interfaces and thoughtful experiences that put people first.',
        },
        {
          title: 'Performance meets polish',
          text: 'We care about clean code, fast load times, and smooth transitions; because details make the difference between a tool and a product people love.',
        },
        {
          title: 'Scalable from day one',
          text: 'We build with growth in mind, from MVPs to enterprise tools, your product is designed to scale with your vision.',
        },
        {
          title: 'Design and dev under one roof',
          text: 'No handoff headaches. Our designers and developers work together from start to ship, ensuring cohesion at every step.',
        },
      ],
    },
    menu: {
      image: 'https://static.pinpoint.ng/images/team/edward.jpg',
      className: 'rotate-7 peer-hover:-rotate-4',
    },
    packagePricing: [
      {
        id: 'website_design_&_development',
        packages: [
          {
            id: 'basic',
            priceRange: [150_000, 300_000],
            benefits: [
              'Up to 5 pages (home, about, contact, services, FAQ)',
              'Simple layout and design',
              'Limited functionality (contact form, social media links)',
              'No e-commerce integration',
              'No content creation (writing, images, videos)',
            ],
          },
          {
            id: 'bronze',
            priceRange: [300_000, 600_000],
            benefits: [
              'Up to 10 pages (additional pages: portfolio, team, FAQ)',
              'Custom design and layout',
              'Basic functionality (contact form, social media integration, newsletter signup)',
              'Limited e-commerce integration (up to 5 products)',
              'No content creation (writing, images, videos)',
            ],
          },
          {
            id: 'silver',
            priceRange: [600_000, 1_200_000],
            benefits: [
              'Up to 20 pages (additional pages: blog, resources, testimonials)',
              'Custom design and layout',
              'Advanced functionality (search bar, filtering, sorting)',
              'Full e-commerce integration (70+ products)',
              'Content creation (writing, images, videos) for up to 5 pages',
            ],
          },
          {
            id: 'gold',
            priceRange: [1_200_000, 2_400_000],
            benefits: [
              'Up to 30 pages (additional pages: news, events, careers)',
              'Custom design and layout',
              'Advanced functionality (login/logout, user accounts, payment gateway)',
              'Full e-commerce integration (150+ products)',
              'Content creation (writing, images, videos) for up to 10 pages',
            ],
          },
          {
            id: 'platinum',
            priceRange: [2_400_000, 4_800_000],
            benefits: [
              'Unlimited pages',
              'Custom design and layout',
              'Advanced functionality (custom plugins, API integration)',
              'Full e-commerce integration (unlimited products)',
              'Content creation (writing, images, videos) for up to 20 pages',
            ],
          },
          {
            id: 'diamond',
            priceRange: [4_800_000],
            priceSuffix: '+',
            benefits: [
              'Unlimited pages',
              'Custom design and layout',
              'Advanced functionality (custom plugins, API integration, complex logic)',
              'Full e-commerce integration (unlimited products)',
              'Content creation (writing, images, videos) for all pages',
              'Dedicated project manager and development team',
              'Ongoing support and maintenance',
            ],
          },
        ],
      },
    ],
  },
];

export const AVAILABLE_PROJECT_IDS = [
  'tahwil_solutions',
  'afropay',
  'gusto',
  'pegrov',
  'damsy',
  'zhoikha',
] as const;
export type AvailableProject = (typeof AVAILABLE_PROJECT_IDS)[number];
export const ALL_PROJECTS_DATA: FullProjectData[] = [
  {
    id: 'tahwil_solutions',
    name: 'Tahwil Solutions',
    pageTitle: 'Visual identity to embody commitment to empowering businesses',
    descSummary:
      'Empowering businesses through strategic development, \
      insightful intelligence and streamlined operations',
    bannerURL: { image: 'https://static.pinpoint.ng/images/projects/tahwil-solutions-card.png' },
    cardImage: 'https://static.pinpoint.ng/images/projects/tahwil-solutions-card.png',
    descriptionBg: 'bg-[#0B4031]',
    textColorClass: 'text-white',
    description:
      'When Tahwil Solutions approached Pinpoint Global to design their logo, \
      they sought a visual identity that would embody their commitment to \
      empowering businesses through strategic development, insightful intelligence, \
      and streamlined operations. The name "Tahwil", meaning transformation and \
      growth, served as the cornerstone of our design process.',
    descriptionHighlightPhotos: [],
    services: ['branding_and_identity'],
    extraServices: ['Logo Design', 'Visual Identity Development'],
    sectors: ['Corporate'],
    createdWebsite: '',
    renderedServices: [
      {
        caption: 'Strong visual identity',
        title: 'Narrating a journey from solid foundations to boundless possibilities',
        sectionBg: 'bg-[#e8f4f0]',
        textColorClass: '',
        description: [
          [
            'Design Elements',
            "The Box and the Letter 'T': At Pinpoint Global, we crafted an \
            icon that merges a box with the letter 'T'. The box signifies \
            structure, stability, and the foundational aspects of business \
            development. It represents the solid groundwork that Tahwil Solutions \
            helps its clients build upon.The letter 'T', seamlessly integrated \
            into the box, symbolizes transformation and progress. It's not just \
            a letter but a pathway, indicating the direction towards growth and \
            success. The 'T' emerging from the box conveys the idea of breaking \
            out of constraints, thinking outside the box, and moving towards \
            innovative solutions",
            'Color Scheme: We selected colors that are both professional and vibrant, \
            symbolizing the dynamic nature of business growth. The primary color is a \
            deep blue, representing trust, reliability, and intelligence—qualities \
            that are integral to Tahwil Solutions. Complementary colors, such as green \
            or gold, were chosen to symbolize growth, prosperity, and success.',
            'Typography: The modern and sleek font used for the company name conveys a \
            sense of professionalism and forward-thinking. It balances well with the icon, \
            creating a harmonious and visually appealing logo.',
          ],
          [
            'The Narrative',
            "At Pinpoint Global, we believe in the power of a strong visual identity to \
            tell a brand's story. For Tahwil Solutions, we designed a logo that narrates \
            a journey from solid foundations to boundless possibilities. The box represents \
            the stable starting point every business needs. From this strong base, the 'T' \
            rises, symbolizing the upward trajectory of growth and the breaking of conventional \
            boundaries.",
            "This logo is more than just a visual identifier; it's a narrative of how Tahwil \
            Solutions partners with businesses, guiding them from a place of stability to new \
            heights of achievement. It's a promise of growth, innovation, and success.",
          ],
        ],
        images: [
          {
            src: 'https://static.pinpoint.ng/images/projects/tahwil-solutions-1.png',
            alt: '',
            className: 'w-1/2 md:w-1/3',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/tahwil-solutions-2.png',
            alt: '',
            className: 'w-1/2 md:w-1/3',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/tahwil-solutions-3.png',
            alt: '',
            className: 'w-full md:w-1/3',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/tahwil-solutions-4.png',
            alt: '',
            className: 'w-1/2',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/tahwil-solutions-5.png',
            alt: '',
            className: 'w-1/2',
          },
        ],
      },
    ],
    relatedProjects: [],
  },
  {
    id: 'afropay',
    name: 'Afropay',
    pageTitle: 'Visual identity to embody commitment to empowering businesses',
    descSummary: 'Trusted payment gateway bridging the gap between people and opportunities',
    bannerURL: { image: 'https://static.pinpoint.ng/images/projects/afropay-card.png' },
    cardImage: 'https://static.pinpoint.ng/images/projects/afropay-card.png',
    descriptionBg: 'bg-dark',
    textColorClass: 'text-white',
    description:
      'In the bustling cities and vibrant markets of West Africa, Afropay emerged \
      as a beacon of innovation, transforming the way people connect, transact, and \
      thrive in the digital age. Born out of a deep desire to empower individuals, \
      businesses, and communities, Afropay became the trusted payment gateway that \
      bridges the gap between people and opportunities. \\n\\nThe story of Afropay \
      began with a shared vision—a vision to build a secure, efficient, and inclusive \
      payment solution tailored to the unique needs of West Africa. We recognized the \
      challenges faced by individuals and businesses in navigating the complex financial \
      landscape, and we set out to provide a seamless platform that would unlock new possibilities.\
      \\n\\nAt the heart of Afropay lies a commitment to empowerment. We believe that everyone, \
      regardless of their background or circumstances, deserves access to the tools and resources \
      that enable them to thrive. With Afropay, individuals can embrace financial independence, \
      entrepreneurs can expand their reach, and communities can flourish.',
    descriptionHighlightPhotos: [],
    services: ['branding_and_identity'],
    extraServices: ['Logo Design', 'Visual Identity Development'],
    sectors: ['Corporate', 'Finance'],
    createdWebsite: '',
    renderedServices: [
      {
        caption: 'Brand Design',
        title: 'Crafting a digital identity rooted in West African spirit',
        sectionBg: 'bg-gray-f2',
        textColorClass: '',
        description: [
          [
            "We drew inspiration from the vibrant tapestry of West African cultures, infusing \
            our brand with the spirit of unity, resilience, and entrepreneurship that defines \
            the region. Just as the rhythm and diversity of the region's music and art captivate \
            the world, Afropay aspires to captivate the payment industry with its innovative \
            solutions and unwavering dedication to customer satisfaction.",
          ],
          [
            "Afropay's story is intertwined with the stories of countless individuals, entrepreneurs, \
            and communities across West Africa. Together, we are shaping a future where financial \
            inclusion is a reality, where economic growth is fueled by seamless digital transactions, and where opportunities know no boundaries. Join us on this transformative journey, where Afropay empowers individuals, connects businesses, and paves the way for a brighter and more prosperous West Africa. Together, let's rewrite the story of payments and build a future where everyone can thrive.",
          ],
        ],
        images: [
          {
            src: 'https://static.pinpoint.ng/images/projects/afropay-1.png',
            alt: '',
            className: 'w-1/2 md:w-1/3',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/afropay-2.png',
            alt: '',
            className: 'w-1/2 md:w-1/3',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/afropay-3.png',
            alt: '',
            className: 'w-full md:w-1/3',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/afropay-4.png',
            alt: '',
            className: 'w-1/2',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/afropay-5.png',
            alt: '',
            className: 'w-1/2',
          },
        ],
      },
    ],
    relatedProjects: [],
  },
  {
    id: 'gusto',
    name: 'Gusto',
    pageTitle: 'Rebranding to match exceptional dining experience',
    descSummary: 'Providing an exceptional dining experience that goes beyond just food',
    bannerURL: { image: 'https://static.pinpoint.ng/images/projects/gusto-card.png' },
    cardImage: 'https://static.pinpoint.ng/images/projects/gusto-card.png',
    descriptionBg: '',
    textColorClass: '',
    description:
      'Gusto, a well-established restaurant brand with branches in Kano, Abuja, \
      and Lagos, embarked on a journey of transformation and innovation. \
      Recognizing the importance of staying relevant and appealing to a dynamic \
      audience, Gusto partnered with Pinpoint Design and Packaging for a \
      comprehensive redesign and rebranding effort that would elevate its image \
      and strengthen its connection with customers. \\nAs the sun sets on this \
      tale of transformation, Gusto stands tall as a testament to the power of a \
      well-executed rebranding effort. The redesigned logo, coupled with the \
      revitalized visual identity, positions Gusto as a premier restaurant brand, \
      drawing diners in Kano, Abuja, and Lagos with its exceptional cuisine, warm \
      hospitality, and captivating dining experiences.',
    descriptionHighlightPhotos: [],
    services: [
      'branding_and_identity',
      'packaging_and_product_design',
      'offset_and_digital_printing',
    ],
    extraServices: [
      'Logo Design',
      'Visual Identity Development',
      'Rebranding',
      'Product Design',
      'Packaging',
      'Foiling',
      'Gift Wraps',
    ],
    sectors: ['Food'],
    createdWebsite: '',
    renderedServices: [
      {
        caption: 'Gusto re-imagined',
        title: 'A complete brand transformation',
        sectionBg: '',
        textColorClass: '',
        description: [
          [
            "The new logo reflects Gusto's commitment to culinary excellence, warmth, and a passion for exceptional dining experiences. The redesigned logo features a harmonious blend of modernity and sophistication. It incorporates a stylized illustration of a plate with utensils, symbolizing Gusto's dedication to crafting delicious and visually appealing dishes. The plate is accompanied by the refined and elegant typography of the brand name “Gusto” in a custom-designed font that exudes professionalism and a touch of creativity.",
          ],
          [
            "The color palette chosen for the rebranding reflects the brand's essence and desired emotional response. Deep shades of burgundy and rich gold are introduced to evoke a sense of luxury, sophistication, and culinary indulgence. These colors are complemented by subtle accents of ivory or silver, adding a touch of refinement and modernity to the overall visual identity.",
          ],
          [
            'In addition to the logo redesign, the rebranding effort encompasses a holistic approach to visual elements, including typography, imagery, and overall brand aesthetics. The typography is carefully selected to strike a balance between readability and elegance, ensuring that it is legible across various mediums, from menus to digital platforms. Imagery showcases the culinary delights offered at Gusto, capturing the essence of flavors, textures, and visually stunning presentations.',
          ],
        ],
        images: [
          {
            src: 'https://static.pinpoint.ng/images/projects/gusto-card.png',
            alt: '',
            className: 'w-1/2',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/gusto-1.png',
            alt: '',
            className: 'w-1/2',
          },
        ],
      },
      {
        caption: 'Product customization',
        title: 'Refined packaging for a refined experience',
        sectionBg: '',
        textColorClass: '',
        description: [
          [
            "The restaurant's interior design and ambiance are also part of the rebranding process. A cohesive visual language is created through the use of refined materials, contemporary furniture, and lighting that sets the mood for an inviting and sophisticated dining experience. The combination of warm and neutral tones, along with carefully curated decor elements, adds to the overall atmosphere and reinforces the brand's identity.",
          ],
          [
            "The reimagined Gusto aims to provide an exceptional dining experience that goes beyond just food, captivating guests with its refined ambiance, attentive service, and innovative culinary creations. The brand's values of quality, warmth, and passion are reflected in every aspect of the rebranding, inviting guests to indulge their senses and create lasting memories.",
          ],
          [
            'With the redesigned logo and rebranding efforts by Pinpoint Design and Packaging, Gusto confidently repositions itself as a leading culinary destination, appealing to a diverse audience seeking a refined and remarkable dining experience. The revitalized brand identity positions Gusto as a beacon of culinary excellence, an inviting space for socializing, and a place where unforgettable moments are created.',
          ],
        ],
        images: [
          {
            src: 'https://static.pinpoint.ng/images/projects/gusto-packaging-1.png',
            alt: '',
            className: 'w-1/2 md:w-1/3',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/gusto-packaging-2.png',
            alt: '',
            className: 'w-1/2 md:w-1/3',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/gusto-packaging-3.png',
            alt: '',
            className: 'w-full md:w-1/3',
          },
        ],
      },
    ],
    relatedProjects: [],
  },
  {
    id: 'pegrov',
    name: 'PEGROV',
    pageTitle: 'Rebranding to establish dynamic and engaging identity',
    descSummary: 'Innovative and trusted betting platform captivating customers in the UK',
    bannerURL: { image: 'https://static.pinpoint.ng/images/projects/pegrov-2.jpg' },
    cardImage: 'https://static.pinpoint.ng/images/projects/pegrov-2.jpg',
    descriptionBg: '',
    textColorClass: '',
    description:
      "PEGROV, a renowned betting of games company based in the UK, embarked on \
      a journey of rebranding and transformation to establish a dynamic and \
      engaging identity in the competitive betting industry. PEGROV sought the \
      expertise of Pinpoint Design and Packaging to create a fresh and modern \
      visual identity that reflects the brand's values, fosters trust, and \
      captures the excitement of betting on games. \\nWith the redesigned logo \
      and rebranding efforts by Pinpoint Design and Packaging, PEGROV confidently \
      positions itself as a leading player in the betting of games industry in \
      the UK. The revitalized brand identity positions PEGROV as a trusted \
      platform for gamers and bettors, known for its exciting betting options, \
      user-friendly interface, and commitment to responsible gaming.",
    descriptionHighlightPhotos: [],
    services: ['branding_and_identity', 'digital_products_creation'],
    extraServices: [
      'Logo Design',
      'Visual Identity Development',
      'Rebranding',
      'Cross-platform Mobile App Development',
      'Web Design',
    ],
    sectors: ['Entertainment', 'Gaming'],
    createdWebsite: '',
    renderedServices: [
      {
        caption: 'Rebranding',
        title: 'Logo design and rebranding',
        sectionBg: '',
        textColorClass: '',
        description: [
          [
            "The new logo design embodies PEGROV's energy, professionalism, and commitment to providing a thrilling betting experience. The redesigned logo features a sleek and contemporary symbol that combines elements from the world of games and betting. The symbol incorporates an abstract representation of a game controller or joystick, reflecting PEGROV's focus on gaming and betting activities. Its clean lines and balanced proportions create a sense of precision and reliability.",
          ],
          [
            "In addition to the logo redesign, the rebranding effort extends to various touchpoints, including typography, visual elements, and overall brand aesthetics. The typography is carefully chosen to strike a balance between readability and modernity, with a clean and contemporary font that enhances legibility across different platforms. Visual elements, such as dynamic patterns or illustrations inspired by gaming motifs, can be incorporated to enhance the brand's visual identity.",
          ],
          [
            "The reimagined PEGROV aims to provide a captivating and user-friendly betting platform that appeals to both experienced bettors and newcomers. The brand's values of transparency, integrity, and responsible gaming are reflected in every aspect of the rebranding, inviting customers to engage in a secure and thrilling betting experience.",
          ],
        ],
        images: [
          {
            src: 'https://static.pinpoint.ng/images/projects/pegrov-1.jpg',
            alt: '',
            className: 'w-1/2 md:w-1/3',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/pegrov-2.jpg',
            alt: '',
            className: 'w-1/2 md:w-1/3',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/pegrov-3.jpg',
            alt: '',
            className: 'w-full md:w-1/3',
          },
        ],
      },
      {
        caption: 'Digital Products',
        title: 'Web and mobile applications',
        sectionBg: '',
        textColorClass: '',
        description: [
          [
            "The rebranding effort also extends to the user interface of PEGROV's digital platforms, ensuring a seamless and intuitive betting experience. The website and mobile applications feature a modern and user-friendly design, allowing customers to navigate effortlessly, place bets, and access a wide range of games and betting options.",
          ],
        ],
        images: [],
      },
    ],
    relatedProjects: [],
  },
  {
    id: 'damsy',
    name: 'Damsy',
    pageTitle: 'Visual identity to capture the essence of the Damsy spirit',
    descSummary:
      'Committed to raising health livestock and poultry while \
      promoting sustainable farming practices',
    bannerURL: { image: 'https://static.pinpoint.ng/images/projects/damsy-farm-card.png' },
    cardImage: 'https://static.pinpoint.ng/images/projects/damsy-farm-card.png',
    descriptionBg: '',
    textColorClass: '',
    description:
      "In the vast Nigerian countryside, where the land is fertile and the sun \
      shines bright, a farm emerged with a passion for raising healthy livestock \
      and poultry. Damsy, a name that echoed a connection to nature and a \
      commitment to quality, embarked on a mission to provide nourishing food \
      products while promoting sustainable farming practices. \\nPinpoint Design \
      and Packaging, renowned for their expertise in visual storytelling, eagerly \
      took on the task of designing a logo that would embody the spirit of Damsy. \
      With careful precision and creative ingenuity, they set out to craft a symbol \
      that would reflect the brand's dedication to farming and its harmonious \
      relationship with the environment.",
    descriptionHighlightPhotos: [],
    services: ['branding_and_identity', 'packaging_and_product_design'],
    extraServices: [
      'Logo Design',
      'Visual Identity Development',
      'Brand Activation',
      'Product Design',
      'Promotional Products',
      'Product Packaging',
    ],
    sectors: ['Food', 'Agriculture'],
    createdWebsite: '',
    renderedServices: [
      {
        caption: 'Visual Storytelling',
        title: 'Logo design and branding',
        sectionBg: '',
        textColorClass: '',
        description: [
          [
            "The logo, a masterpiece of design, begins with a stylized representation of a strong and majestic farm animal, the horned cow. This iconic symbol represents the livestock aspect of Damsy's operations, showcasing the brand's commitment to raising healthy and robust animals. The cow's silhouette exudes strength, while its curved horns evoke a sense of resilience and connection to the earth.",
          ],
          [
            "Intertwined with the cow, there is an elegant illustration of a rooster, representing the poultry aspect of Damsy's farm. The rooster's proud stance and vibrant feathers symbolize the brand's dedication to raising poultry with care and expertise. It embodies the spirit of vitality and the dawn of a new day, reflecting the brand's commitment to providing fresh and nutritious poultry products.",
          ],
          [
            "The color palette chosen for the logo draws inspiration from nature and the farm's surroundings. Earthy tones of green and brown evoke a sense of growth, abundance, and the fertile soil that nourishes Damsy's animals. These colors harmonize with the brand's commitment to sustainability and environmental stewardship.",
          ],
          [
            "The typography within the logo is meticulously crafted to reflect the brand's identity. The font strikes a balance between approachability and professionalism, conveying a sense of trust and expertise. Its clean and bold appearance commands attention, representing the brand's commitment to quality and excellence.",
          ],
          [
            "The logo encapsulates the essence of Damsy, a farm committed to raising healthy livestock and poultry while promoting sustainable farming practices. It stands as a symbol of strength, vitality, and the brand's dedication to providing nourishing food products with a focus on quality and sustainability.",
          ],
        ],
        images: [
          {
            src: 'https://static.pinpoint.ng/images/projects/damsy-farm-1.png',
            alt: '',
            className: 'w-1/2 md:w-1/3',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/damsy-farm-2.jpg',
            alt: '',
            className: 'w-1/2 md:w-1/3',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/damsy-farm-card.png',
            alt: '',
            className: 'w-full md:w-1/3',
          },
        ],
      },
      {
        caption: 'Branding Material',
        title: 'Quality branded products to confidently represent the brand',
        sectionBg: 'bg-gray-f2',
        textColorClass: '',
        description: [
          [
            "As Pinpoint Design and Packaging developed the logo, they ensured that it could seamlessly adapt to various branding materials, including product packaging, signage, and marketing collateral. The logo's versatility allows it to confidently represent the brand across different mediums, reinforcing its identity and connection to the farm's values.",
          ],
        ],
        images: [
          {
            src: 'https://static.pinpoint.ng/images/projects/damsy-farm-packaging.png',
            alt: '',
            className: 'w-full lg:w-1/2',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/damsy-farm-packaging.png',
            alt: '',
            className: 'w-1/2 hidden lg:block',
          },
        ],
      },
    ],
    relatedProjects: [],
  },
  {
    id: 'zhoikha',
    name: 'Zhoikha',
    pageTitle: 'Elegant brand design with branded materials and packaging',
    descSummary: 'Lifestyle brand embodying elegance, sophistication and modernity',
    bannerURL: { image: 'https://static.pinpoint.ng/images/projects/zhoikha-card.png' },
    cardImage: 'https://static.pinpoint.ng/images/projects/zhoikha-card.png',
    descriptionBg: '',
    textColorClass: '',
    description:
      "The lifestyle brand, Zhoikha, embodies elegance, soqhistication and modernity. \
      Pinpoint Design and Packaging, renowned for their expertise in visual \
      storytelling, eagerly took on the task of designing a logo representing the \
      brand's core values and identity.",
    descriptionHighlightPhotos: [],
    services: [
      'branding_and_identity',
      'packaging_and_product_design',
      'offset_and_digital_printing',
    ],
    extraServices: [
      'Logo Design',
      'Visual Identity Development',
      'Product Design',
      'Promotional Products',
      'Product Packaging',
    ],
    sectors: ['Lifestyle'],
    createdWebsite: '',
    renderedServices: [
      {
        caption: 'Brand design',
        title: 'Logo design and branding',
        sectionBg: '',
        textColorClass: '',
        description: [
          [
            "The logo for ZHOIKHA, a lifestyle brand, embodies elegance, sophistication, and modernity. It features a combination of sleek typography and an abstract symbol that represents the brand's core values and identity.",
          ],
        ],
        images: [
          {
            src: 'https://static.pinpoint.ng/images/projects/zhoikha-1.png',
            alt: '',
            className: 'w-1/2 md:w-1/3',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/zhoikha-2.png',
            alt: '',
            className: 'w-1/2 md:w-1/3',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/zhoikha-card.png',
            alt: '',
            className: 'w-full md:w-1/3',
          },
        ],
      },
      {
        caption: 'Branding Material',
        title: 'Quality branded products to confidently represent the brand',
        sectionBg: 'bg-gray-f2',
        textColorClass: '',
        description: [
          [
            "As Pinpoint Design and Packaging developed the logo, they ensured that it could seamlessly adapt to various branding materials, including product packaging, signage, and marketing collateral. The logo's versatility allows it to confidently represent the brand across different mediums, reinforcing its identity and connection to the brand's values.",
          ],
        ],
        images: [
          {
            src: 'https://static.pinpoint.ng/images/projects/zhoikha-packaging-1.png',
            alt: '',
            className: 'w-full sm:w-1/2',
          },
          {
            src: 'https://static.pinpoint.ng/images/projects/zhoikha-product-1.png',
            alt: '',
            className: 'w-full sm:w-1/2',
          },
        ],
      },
    ],
    relatedProjects: [],
  },
];

export const DEFAULT_WORKS_DISPLAYED = 10;

export const OUR_REFERENCES: ReferenceProps[] = [
  {
    logo: 'https://static.pinpoint.ng/images/references/dangote.png',
    link: 'https://www.dangote.com',
  },
  {
    logo: 'https://static.pinpoint.ng/images/references/gtco.png',
    link: 'https://www.gtcoplc.com',
  },
  { logo: 'https://static.pinpoint.ng/images/references/bolt.png', link: 'https://bolt.eu/en-ng' },
  {
    logo: 'https://static.pinpoint.ng/images/references/airtel.png',
    link: 'https://www.airtel.com.ng',
  },
  {
    logo: 'https://static.pinpoint.ng/images/references/uba.png',
    link: 'https://www.ubagroup.com',
  },
  { logo: 'https://static.pinpoint.ng/images/references/ik-pen.png', link: 'https://ikpen.com' },
  {
    logo: 'https://static.pinpoint.ng/images/references/ayce.png',
    link: 'https://www.instagram.com/ayce_cafe',
  },
  {
    logo: 'https://static.pinpoint.ng/images/references/burgundy.png',
    link: 'https://www.theburgundyrestaurant.com',
  },
  {
    logo: 'https://static.pinpoint.ng/images/references/goalcash.png',
    link: 'https://www.goalcash.com/en/',
  },
  {
    logo: 'https://static.pinpoint.ng/images/references/maubbys.png',
    link: 'https://www.ordermaubbys.com/',
  },
  {
    logo: 'https://static.pinpoint.ng/images/references/eagle-watch.png',
    link: 'https://www.sulfman.com/eaglewatch',
  },
  {
    logo: 'https://static.pinpoint.ng/images/references/kamshi.png',
    link: 'https://www.instagram.com/kamshi_kamshi_bakhoor',
  },
];

export const ALL_JOBS_DATA: FullJobProps[] = [
  // {
  //   id: 'interactive-and-resourceful-front-end-developer',
  //   title: 'Interactive and resourceful front-end developer',
  //   description:
  //     'We are looking for a committed person, passionate about product \
  //     and design, who develops interfaces with eye and rigor in order to \
  //     take the lead on certain projects.',
  //   type: 'list',
  //   profile: [
  //     'You have a minimum of 3 years of experience',
  //     'Complete mastery of HTML/CSS/JS and integration techniques in responsive design',
  //     'You have a good knowledge of PHP and MYSQL. WebGL and Canvas are a plus',
  //     'You know about JavaScript/jQuery/Wordpress',
  //     'You are comfortable with Photoshop, Illustrator and Figma',
  //     'You manage SEO techniques',
  //     'You are creative and involved: every problem has its solution',
  //     "You're perfectly self-taught and have a passion for open source",
  //     "You like to work in a team and you're not afraid to communicate…",
  //     'You speak French and/or Dutch',
  //     'You are super organized and you have a good culture of technology watch',
  //     'You like a job well done, you pay attention to detail…',
  //   ],
  //   offer: [
  //     ' A freelance contract with an attractive remuneration',
  //     'A well-established organization in collaboration with our project \
  //     managers, you will compose your own schedule according to your availability',
  //     'A unique experience in a small communication agency in Brussels',
  //     'Talented colleagues who love afterwork parties',
  //     'A creative and pleasant environment (micro-naps are allowed)',
  //   ],
  //   jobDescription: [],
  //   Ps: 'If you are interested in this opportunity, apply on our website. Address \
  //   yourself directly to Juju (no need to impress him with a long cover letter, \
  //   just show him your portfolio and your best work).',
  // },
  // {
  //   id: 'internship-in-development-marketing-or-project-management',
  //   title: 'Internship in development, marketing or project management',
  //   description:
  //     'We gladly welcome interns who are looking for experience in the field of \
  //     web development, marketing or project management.',
  //   type: 'paragraphs',
  //   jobDescription: [
  //     {
  //       title: 'Which field?',
  //       text: ' We gladly welcome interns who are looking for experience in the \
  //       field of web design and development, marketing or project management.',
  //     },
  //     {
  //       title: 'What will you do ?',
  //       text: "Don't worry, you won't have to serve coffee or decorate the Christmas \
  //       tree… In fact, we expect much more from our interns. We like them to be dynamic, \
  //       proactive, eager to learn, not afraid to make mistakes and stronger than us at FIFA 25!",
  //     },
  //     {
  //       title: 'No secret between us',
  //       text: "We are a small multi-hat team that is on many fronts at the same time. So \
  //       don't hesitate to pull our sleeve because we forgot to provide you with tasks, \
  //       because there will always be tasks!",
  //     },
  //     {
  //       title: 'Apply now',
  //       text: 'If you are independent, creative and flexible, and you like to progress \
  //       quickly while bringing your own initiatives. Tell us more about your strengths \
  //       and show us what you could concretely bring to the agency.',
  //     },
  //   ],
  //   profile: [],
  //   offer: [],
  //   Ps: "PS: If you don't hear from us, don't hesitate to call, we are sometimes distracted 😉",
  // },
];

export const PRIVACY_POLICY: string[][] = [
  [
    'The following Terms and Conditions of Service apply to all products and services provided \
    by as PINPOINT Ltd (hereinafter referred to as PINPOINT) and in the event of any dispute \
    are governed by the laws of NIGERIA.',
    'All work is carried out by as PINPOINT on the understanding that the client has agreed \
    to our terms and conditions.',
    'Copyright is retained by as PINPOINT on all design work including words, pictures, ideas, \
    visuals and illustrations unless specifically released in writing and after all costs have \
    been settled. If a choice of designs is presented and one is chosen for your project, only \
    that solution is deemed to be given by us as fulfilling the contract. All other designs \
    remain the property of as PINPOINT, unless specifically agreed in writing.',
  ],
  [
    'Project Acceptance',
    "At the time of proposal as PINPOINT will provide the customer with a written estimate or quotation by email. These Terms and Conditions can be read at any time on the as PINPOINT ,social handles and website. A copy of the written estimate or quotation is to be signed and dated by the customer to indicate acceptance and should be returned to as PINPOINT. Alternatively, the client may send an official purchase order in reply to the estimate or quotation which binds the client to accept our terms and conditions, or an email acknowledging acceptance of the quotation. For the avoidance of doubt, the as PINPOINT Terms & Conditions are what govern the job, not any conditions on the customer's purchase order.",
  ],
  [
    'Design Charges',
    "Charges for design services to be provided by as PINPOINT will be set out in the written estimate or quotation that is provided to the customer. At the time of the customer's signed acceptance of this estimate or quotation, indicating acceptance of the Terms & Conditions, a non-refundable payment of 50% of the quoted fee will become immediately due. Unless agreed otherwise with the Client, all design services require an advance payment of a minimum of fifty (50) percent of the project quotation total before the work commences or is supplied to the Client for review. The remaining fifty (50) percent of the project quotation total will be due upon completion of the work prior to upload to the server or release of materials.",
  ],
  [
    'Source Files',
    "We will supply proofs and PDF files as appropriate for printing, or other graphic files as detailed in the job scope or request. Charges for design work do not cover the release of our copyright design source files, including but not restricted to indd, psd, AI, png, fla or other source files or raw code; if the Client requires these files for transfer to an in-house or other designer, they will be subject to a separate quotation or 'buy-out' charge.",
  ],
  [
    'Charges for Other Services',
    'Charges for any additional services requested during the project that are over and above the estimated time or out of scope, will become fully payable (100% of the quoted amount) at the time of estimate or quotation acceptance.',
  ],
  [
    'Payment',
    'The customer will be provided with an Approval Form or Proof Email, and an Invoice prior to final publication. At this time the remainder of the amount due will become payable and the customer will also be required to sign and return the Approval Form or signify approval by email to as PINPOINT . Any invoice queries must be submitted by email within 14 days of the invoice date. Accounts which remain outstanding for 30 days after the date of invoice, will incur late payment interest charge at the Bank of CBN Base Rate plus 8% on the outstanding amount from the date due until the date of payment. Payments may be made by online transfer, credit card (Visa, Mastercard) or Debit Card. Payments made by cheque must be previously agreed and may be subject to an administration charge. Cheques should not be sent in regular mail unless sent recorded delivery. Publication and/or release of work done by as PINPOINT on behalf of the client, may not take place before cleared funds have been received. Returned cheques will incur an additional fee of £50 per returned cheque. as PINPOINT reserves the right to consider an account to be in default in the event of a returned cheque.',
  ],
  [
    'Default',
    "An account shall be considered default if it remains unpaid for 30 days from the date of invoice, or following a returned cheque. as PINPOINT shall be entitled to as PINPOINT s and/or the customer's material from any and all computer systems, until the amount due has been fully paid. This includes any and all unpaid monies due for services, including, but not limited to, hosting, domain registration, search engine submission, design and maintenance, sub-contractors, printers, photographers and libraries. Removal of such materials does not relieve the customer of its obligation to pay the due amount. Customers whose accounts become default agree to pay all as PINPOINT ‘s reasonable legal and accounting expenses and third party collection agency fees in the enforcement of the debt and these Terms and Conditions.",
  ],
  [
    'Copyrights and Trademarks',
    "By supplying text, images and other data to as PINPOINT for inclusion in the customer's website or other medium, the customer declares that it holds the appropriate copyright and/or trademark permissions. The ownership of such materials will remain with the customer, or rightful copyright or trademark owner. Any artwork, images, or text supplied and/or designed by as PINPOINT on behalf of the customer, will remain the property of as PINPOINT and/or its suppliers unless otherwise agreed in writing. A licence for use of the copyright material is granted to the customer solely for the project defined in the scope or request and not for any other purpose. The customer may request in writing from as PINPOINT, the necessary permission to use materials (for which as PINPOINT holds the copyright) in forms other than for which it was originally supplied, and as PINPOINT may, at its discretion, grant this and may charge for the additional usage. Such permission must be obtained in writing before any of the aforesaid artwork, images, text, or other data is used. Any software, code, plugin or other third party material used in a web or digital project remains the property of the creator and any ongoing licence fees or fees for upgrades are the responsibility of the client, not as PINPOINT. By supplying images, text, or any other data to as PINPOINT, the customer grants as PINPOINT permission to use this material freely in the pursuit of the design. Should as PINPOINT, or the customer supply an image, text, audio clip or any other file for use in a website, multimedia presentation, print item, exhibition, advertisement or any other medium believing it to be copyright and royalty free, which subsequently emerges to have such copyright or royalty usage limitations, the customer will agree to allow as PINPOINT to remove and/or replace the file on the site. The customer agrees to fully indemnify and hold as PINPOINT free from harm in any and all claims resulting from the customer in not having obtained all the required copyright, and/or any other necessary permissions",
  ],
  [
    'Alterations',
    'The customer agrees that changes required over and above the estimated work, or in addition to the agreed scope, or where the client makes changes to the supplied copy or changes required to be carried out after acceptance of the draft design, will be liable to a separate charge. The customer also agrees that as PINPOINT holds no responsibility for any amendments made by any third party, before or after a design is published.',
  ],
  [
    'Licensing',
    'Any design, copywriting, drawing, idea or code created for the customer by as PINPOINT, or any of its contractors, is licensed for use by the client on a one-time only basis and may not be modified, re-used, or re-distributed in any way or form without the express written consent of as PINPOINT and any of its relevant sub-contractors. All design work - where there is a risk that another party make a claim, should be registered by the client with the appropriate authorities prior to publishing or first use or searches and legal advice sought as to its use. as PINPOINT will not be held responsible for any and all damages resulting from such claims. Glazier Design is not responsible for any loss, or consequential loss, non-delivery of products or services, of whatever cause. The customer agrees not to hold as PINPOINT responsible for any such loss or damage. Any claim against as PINPOINT shall be limited to the relevant fee(s) paid by the customer.',
  ],
  [
    'Data Formats',
    'The client agrees to as PINPOINT definition of acceptable means of supplying data to the company. Text is to be supplied to as PINPOINT in electronic format as standard text (.txt), MS Word (.docx) or via e-mail / FTP or shared folder. Images which are supplied in an electronic format are to be provided in a format as prescribed by as PINPOINT via e-mail / FTP. Images must be of a quality suitable for use without any subsequent image processing, and as PINPOINT will not be held responsible for any image quality which the client later deems to be unacceptable. as PINPOINT cannot be held responsible for the quality of any images which the client wishes to be scanned from printed materials. Additional expenses may be incurred for any necessary action, including, but not limited to, photography and art direction, photography searches, media conversion, digital image processing, or data entry services, colour correction and alteration of images.',
  ],
  [
    'Design Project Duration',
    "Any indication given by as PINPOINT of a design project's duration is to be considered by the customer to be an estimation. PINPOINT cannot be held responsible for any project over-runs, whatever the cause. Estimated project duration should be deemed to be from the date that cleared funds are received by as PINPOINT for the initial payment or by date confirmed in writing by as PINPOINT.",
  ],
  [
    'Rights of Access for Website Construction',
    'The client agrees to allow as PINPOINT all necessary access to computer systems and other locations, as required, in order to complete a website project and until all due funds are cleared, including the necessary read/write permissions, usernames and passwords. The customer also agrees to allow as PINPOINT access to any computer systems, usernames and passwords required to remove data and/or sites for failure to comply with these Terms and Conditions. The customer agrees to supply as PINPOINT with all necessary materials, electronic, or otherwise, required to create and complete the project, and to supply them in a timely manner.',
  ],
  [
    'Design Project Completion',
    "PINPOINT considers the design project complete upon receipt of the customer's signed Approval form or signoff email. Other services such as printing, display panel production, filmwork, website uploading, publishing etc either contracted on the client's behalf constitute a separate project and can be treated as a separate charge.",
  ],
  [
    'Website design only',
    'as PINPOINT require that a template is approved by the customer before coding of a site commences. Once the template(s) for the web site are approved by the customer, coding will commence; any changes to navigation items, colours, structure or content that require changes to the template will incur an additional charge. Once web design is complete, as PINPOINT will provide the customer with the opportunity to review the resulting work. as PINPOINT will make one set of minor changes at no extra cost within 14 days of the start of the review period. Minor changes include small textual changes and small adjustments to placement of items on the page. It does not include changes to images, colour schemes or any navigation features. Any minor changes can be notified to as PINPOINT by e-mail. as PINPOINT DESIGN will consider that the client has accepted the original draft, if no notification of changes is received in writing from the customer, within 14 days of the start of the review period.',
  ],
  [
    'Hosting websites',
    'PINPOINT offers a limited hosting services through an out-sourced virtual server. PINPOINT does not guarantee continuous service and will accept no liability for loss of service, whatever the cause. PINPOINT may request that clients change the type of hosting account used if that account is deemed by PINPOINT to be unacceptable because of poor service, lack of bandwidth or in any other way insufficient to support the website. Fees for hosting on PINPOINT virtual server are due at the commencement of any period of service and are non-refundable. Fees due to third party hosting organisations are the responsibility of the client PINPOINT are not liable for their payment, nor for the renewal of domain names, which are the sole responsibility of the customer / domain owner.',
  ],
  [
    'Domain Registration',
    'PINPOINT Design cannot guarantee the availability of any domain name. Where PINPOINT is to register a domain name on behalf of a client it will endeavour to do so but the client should not assume a successful registration.',
  ],
  [
    'Search Engine Submission',
    "Due to the infinite number of considerations that search engines use when determining a site's ranking, PINPOINT cannot guarantee any particular placement. Acceptance by any search engine cannot be guaranteed and when a site is accepted, the time it takes to appear in search results varies from one search engine to another. Rankings will also vary as new sites are added. PINPOINT recommend that customers use a professional SEO company and are happy to provide details of such companies, but accept no responsibility for their services.",
  ],
  [
    'Design Credits',
    "The customer agrees to allow PINPOINT to place a small credit on printed material exhibition displays, advertisements and/or a link to PINPOINT Design own website on the customer's website. This will usually be in the form of a small logo or line of text placed towards the bottom of the page. The customer also agrees to allow PINPOINT to place websites and other designs, along with a link to the client's site on PINPOINT's own website for demonstration purposes and to use any designs in its own publicity and portfolios.",
  ],
  [
    'Rights of Refusal',
    'PINPOINT will not include in its designs, any text, images or other data which it deems to be immoral, offensive, obscene or illegal. All advertising material must conform to all standards laid down by all relevant advertising standards authorities. PINPOINT also reserves the right to refuse to include submitted material without giving reason. In the situation where any images and/or data that PINPOINT does include in all good faith, and subsequently discovers is in contravention to such Terms and Conditions, the customer is obliged to allow PINPOINT to remove the contravention without hindrance, or penalty. PINPOINT is to be held in no way responsible for any such data being included.',
  ],
  [
    'Cancellation',
    "Cancellation of orders may be made initially by telephone contact, or e-mail, however, following this, PINPOINT will need formal notification in writing to the company's postal address. The client will then be invoiced for all work completed over and above the non-refundable deposit that will have been made at the time of first ordering. The balance of monies due must be paid within 30 days. Please note: any cancellation which is not formally confirmed in writing and received by PINPOINT within 14 days of such instruction being issued, will be liable for the full quoted cost of the project.",
  ],
  [
    'Disclaimer',
    'PINPOINT makes no warranties of any kind, express or implied, for any and all products and/or services that it supplies. PINPOINT will not be held responsible for any and all damages resulting from products and/or services it supplies. PINPOINT or services, of whatever cause. While we take reasonable steps to investigate the materials we recommend, we accept no responsibility for the performance or quality of materials or any consequential loss arising from their failure. The customer agrees not to hold PINPOINT responsible for any such loss or damage. Any claim against PINPOINT shall be limited to the relevant fee(s) paid by the customer. PINPOINT reserves the right to use the services of sub-contractors, agents and suppliers and any work, content, services and usage is bound by their Terms and Conditions. PINPOINT will not knowingly perform any actions to contravene these and the client also agrees to be so bound. PINPOINT and its clients agree to comply with Printers Terms and Conditions which include disclaimers for non-completion on time and the flexibility to supply quantities within 10% of the total ordered. PINPOINT recommend that if an exact quantity is required, then 10% extra is added to the quantity and extra time made available should the job be delayed.',
  ],
  [
    'General',
    'These Terms and Conditions supersede any previous Terms and Conditions distributed in any form. PINPOINT reserves the right to change any rates and any of the Terms and Conditions at any time and without prior notice.',
  ],
  [
    'Acceptance of Terms and Conditions and Quotation',
    'The placement of an order for design and/or any other services offered by PINPOINT, by email, verbally or in writing, is deemed to be acceptance of these terms and conditions, which are freely available at www.pinpoint.ng .',
  ],
];
