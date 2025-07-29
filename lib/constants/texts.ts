import { FullProjectData } from '@/app/projects/[projectId]/page';
import { FullServiceData } from '@/app/services/[service]/page';
import { CaseStudySummaryProps } from '@/components/sections/home/CaseStudies';
import { ServiceCardProps } from '@/components/sections/home/WhatWeDo';
import SvgInstagramIcon from '@/components/icons/InstagramIcon';
import SvgFacebookIcon from '@/components/icons/FacebookIcon';
import { WorkCardProps } from '@/components/sections/works/WorksDisplay';
import { ReferenceProps } from '@/components/sections/about/References';
import { AchievementBlockProps } from '@/components/sections/about/Achievements';
import { TeamSlideProps } from '@/components/sections/about/Team';
import { SocialBtnProps } from '@/components/general/Socials';
import { ContactsGroupProps } from '@/components/general/PinpointContacts';
import { JobsCTAProps } from '@/components/sections/jobs/JobsCTA';
import { FullJobProps } from '@/app/jobs/[job]/page';
import { TiktokIcon } from '@/components/icons';

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
    address: 'No.18 Aba Close Area 8 Garki, Abuja.',
    tel: ['+234 912 323 2389', '+234 912 323 2397'],
    email: 'abuja@pinpoint.ng',
  },
  {
    location: 'Kano',
    address: 'MTN Office. Civic Center',
    tel: ['+234 812 222 1489', '+234 812 222 6489'],
    email: 'kano@pinpoint.ng',
  },
  {
    location: 'Benue',
    address: 'No.18 Aba Close Area 8 Garki, Abuja.',
    tel: [],
    email: 'benue@pinpoint.ng',
  },
  {
    location: 'China',
    address: 'No.18 Aba Close Area 8 Garki, Abuja.',
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

export const selectedCaseStudies: string[] = ['cefic', 'fipra', 'eortc'];

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
    number: 17,
    desc: 'Awards & Recognitions',
    className:
      'grid bg-gray-f2 md:col-start-3 md:col-end-4 lg:col-start-4 lg:col-end-5 md:row-start-1 md:row-end-2',
  },
  {
    number: 15,
    desc: 'Years of experience',
    className:
      'grid bg-dark text-white md:col-start-1 md:col-end-2 lg:col-start-2 lg:col-end-3 md:row-start-2 md:row-end-3',
  },
  {
    number: 300,
    numberSuffix: '+',
    desc: 'Projects launched',
    className:
      'grid bg-white md:col-start-1 md:col-end-2 lg:col-start-2 lg:col-end-3 md:row-start-3 md:row-end-4',
  },
  {
    number: 10,
    numberSuffix: '+',
    desc: 'Coffee drunk today',
    className: 'hidden lg:grid bg-gray-d9 lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
  },
];

export const OUR_TEAM: TeamSlideProps[] = [
  {
    name: 'Steven van Boxtel',
    title: 'Founder & Creative Director',
    mainImage: '/images/team/steven-main.webp',
    subImage: '/images/team/steven-sub.webp',
  },
  {
    name: 'Alicia Dekoninck',
    title: 'Founder & Project Manager',
    mainImage: '/images/team/alicia-main.webp',
    subImage: '/images/team/alicia-sub.webp',
  },
  {
    name: 'Grégoire',
    title: 'UI/UX & Brand Designer',
    mainImage: '/images/team/gregoire-main.jpg',
    subImage: '/images/team/gregoire-sub.webp',
  },
  {
    name: 'Sandra',
    title: 'UI/UX & Graphic Designer',
    mainImage: '/images/team/sandra-main.webp',
    subImage: '/images/team/sandra-sub.webp',
  },
  {
    name: 'Dimitri',
    title: 'Front-end Developer',
    mainImage: '/images/team/dimitri-main.webp',
    subImage: '/images/team/dimitri-sub.webp',
  },
  {
    name: 'Gyozo',
    title: 'Front-end Developer',
    mainImage: '/images/team/gyozoi-main.webp',
    subImage: '/images/team/gyozoi-sub.webp',
  },
  {
    name: 'Julien',
    title: 'Extern Front-end Developer',
    mainImage: '/images/team/julien-main.webp',
    subImage: '/images/team/julien-sub.webp',
  },
  {
    name: 'Louis',
    title: 'Extern Front-end Developer',
    mainImage: '/images/team/louis-main.jpg',
    subImage: '/images/team/louis-sub.webp',
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

export const ATELIER_SERVICES_DATA: FullServiceData[] = [
  {
    id: 'communication-strategy',
    name: 'Communication Strategy',
    pageTitle: 'We plan communication strategies that build your success',
    videoUrl: '/videos/branding-animation.webm',
    description:
      'In our communication agency, we orchestrate interactive and creative workshops to \
      jointly define the future of your communication strategy. This strategic approach \
      lays the foundation on which all other communication tools are developed, such as \
      logo creation, website development, and the production of various communication \
      supports. Our approach ensures that each developed tool is aligned with a coherent \
      strategy, thereby strengthening your message and optimizing your impact on your target audience.',
    expertise: {
      title: 'What we do',
      breakdown: [
        {
          title: 'We think digital',
          services: [
            'Audience Targeting',
            'Data Analysis',
            'Content Strategy',
            'Information Architecture',
            'Technical Analysis',
            'Planification',
            'Storytelling',
          ],
        },
        {
          title: 'We think brands',
          services: [
            'Analysis & Audit',
            'Positioning',
            'Value Proposition',
            'Brand Culture',
            'Brand Message',
            'Planification',
            'Storytelling',
          ],
        },
      ],
      highlightImage: '/images/communication-strategy-highlight.webp',
      marqueeText: 'Write your story',
    },
    breakdownSummary: [
      'Branding & positioning',
      'Digital strategy',
      'Content strategy',
      'Naming',
      'Research & analysis',
    ],
    whatMakesUsUnique: {
      title: 'Our long-term and qualitative vision',
      groups: [
        {
          title: 'Custom-made',
          text: 'We adapt our strategic solutions to your real needs in order \
          to develop communication tools that are unique to your project.',
        },
        {
          title: 'User and Audience Centric',
          text: 'Through interactive and creative workshops, we will be able to \
          establish the focal points to connect with your audience. This will \
          allow you to understand their logic and meet their needs in the best possible way.',
        },
        {
          title: 'Your story, your voice',
          text: "It is scientifically proven that stories grab a person's attention. \
          Our strategic workshops will help to build a powerful storytelling strategy \
          that not only makes sense but also builds an emotional and lasting connection \
          with your target audience. It will also define the right tone of voice that \
          is a perfect fit with their cultural language and behaviours.",
        },
        {
          title: 'All in confidence',
          text: "Your trust is important to us. We know that sometimes we touch a sensitive \
          chord. It's your company, your history, your values. All our workshops take place \
          indoors and all the information collected remains confidential between you and us.",
        },
      ],
    },
    menu: {
      image: '',
      className: '',
    },
  },
  {
    id: 'brand-identity',
    name: 'Brand Identity',
    pageTitle: 'Get all the attention you deserve',
    videoUrl: '/videos/print-animation.webm',
    description:
      'Give your brand a unique personality and ensure its immediate recognition \
      by collaborating with our communication agency in Brussels. We help you \
      create a logo that truly reflects your vision and values, making it a \
      cornerstone of your communication. We build visual identities that do \
      more than catch the eye; they actively support your communication goals, \
      establishing an authentic connection with your audience.',
    expertise: {
      title: 'Master every detail, create the extraordinary',
      breakdown: [
        {
          title: 'We think',
          services: [
            'Research & Analysis',
            'Brand Strategy',
            'Brand Positionining',
            'Brand Messaging',
            'Audience Tracking',
            'Planification',
          ],
        },
        {
          title: 'We create',
          services: [
            'Logotypes',
            'Namings',
            'Brand Identities',
            'Storytellings',
            'Visual & Motion Contents',
          ],
        },
        {
          title: 'We achieve',
          services: [
            'Print Collaterals',
            'Promotional Tools',
            'Annual Reports',
            'Signages',
            'Packagings',
            'Websites',
          ],
        },
      ],
      highlightImage: '/images/brand-identity-highlight.webp',
      marqueeText: 'Be authentic, consistent & memorable',
    },
    breakdownSummary: [
      'Logotype',
      'Printed materials',
      'Storytelling & copywrinting',
      'Graphic design',
      'Photography',
    ],
    whatMakesUsUnique: {
      title: 'Our long-term and qualitative vision',
      groups: [
        {
          title: 'Tailor-made',
          text: 'Because we are convinced that every project is unique, we \
          automatically propose tailor-made solutions. We concentrate our \
          energy into making a brand strategy that perfectly fits in with \
          your business.',
        },
        {
          title: 'Impressive identity',
          text: "We are known for our extraordinary creativity. We won't \
          tell you our secret, just know that your visual identity will \
          involve intense creative thinking and this journey will transform your brand.",
        },
        {
          title: 'Collateral communication supports',
          text: 'We have the most awesome creative solutions for everything: \
          from your brand name, to your storytelling, to graphic and visual \
          creations, that gives your brand a personality and makes it \
          instantly recognisable.',
        },
        {
          title: 'Effective harmony',
          text: 'Our team is committed to service and quality. Your project \
          is in the best hands. Our holistic approach allows you to communicate \
          consistently and interact efficiently through all your channels.',
        },
      ],
    },
    menu: {
      image: '',
      className: '',
    },
  },
  {
    id: 'website-creation',
    name: 'Website Creation',
    pageTitle: 'We design websites that evolve with you',
    videoUrl: '/videos/digital-animation.webm',
    description:
      'Our website creation agency in Brussels brings its expertise to \
      your project to ensure an optimized and effective digital presence, perfectly \
      tailored to your users. Over time, we have developed powerful tools specifically \
      for the WordPress platform, allowing you to get the most out of this robust CMS.',
    expertise: {
      title: 'Amaze, engage & build loyalty',
      breakdown: [
        {
          title: 'We think',
          services: [
            'Research & Analysis',
            'Strategic Workshops',
            'Planification',
            'Wireframes',
            'User Stories',
            'Content Hierarchy',
          ],
        },
        {
          title: 'We create',
          services: [
            'Storytelling',
            'User Experience (UX)',
            'User Interface (UI)',
            'Prototypes',
            'Responsive Design',
            'Visual, Motion & Text Content',
          ],
        },
        {
          title: 'We achieve',
          services: [
            'Websites',
            'Custom-Made Wordpress',
            'SEO',
            'E-Shops',
            'Web Applications',
            'Landing Page',
            'Newsletter',
            'Integration API CRM: Hubspot, Whise, Omnicasa, ...',
          ],
        },
      ],
      highlightImage: '/images/website-creation-highlight.jpg',
      marqueeText: 'Amaze, engage & build loyalty',
    },
    breakdownSummary: [
      'Website creation',
      'E-shop',
      'SEO',
      'Ergonomy (UI/UX)',
      'CRM API Integration',
    ],
    whatMakesUsUnique: {
      title: 'Our long-term and qualitative vision',
      groups: [
        {
          title: 'Custom-made',
          text: "It's been more than 10 years that we have specialized in \
          custom web solutions around the Wordpress tool, the CMS - reference \
          (30% of the CMS used in the world). Exit the prefabricated themes. \
          We concentrate our energy on making a site that fits perfectly \
          with your business.",
        },
        {
          title: 'Mobile first',
          text: "Because the mobile has become our first screen for several \
          years, a mobile-first approach allows us to prioritize technical \
          developments on the use of the mobile and thus offer a meaningful \
          customer experience from a smartphone. Of course, we do not neglect \
          any other screen: desktop, tablet or PC! It's called responsive design.",
        },
        {
          title: 'SEO',
          text: 'Having an attractive site is one thing, but how do you make \
          it visible so that your audience finds you and comes back again and \
          again? Technical optimization, semantic analysis and link profiling. \
          Thanks to our efficient work on natural referencing, your target \
          audience will always find you easily and at the right time.',
        },
        {
          title: 'Secure solutions',
          text: 'We do all that is necessary to secure your website. We work \
          on several axes as the qualitative and secure hosting choice, the \
          backups, the website code and other elements that ensure the security \
          of your website.',
        },
      ],
    },
    menu: {
      image: '',
      className: '',
    },
  },
];
export const ALL_SERVICES_DATA: FullServiceData[] = [
  {
    id: 'branding_and_identity',
    name: 'Branding & Identity',
    pageTitle: 'We craft brand identities that speak before you do',
    videoUrl: '/videos/branding-animation.webm',
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
      highlightImage: '/images/communication-strategy-highlight.webp',
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
      image: '',
      className: '',
    },
  },
  {
    id: 'marketing_and_media',
    name: 'Marketing & Media',
    pageTitle: 'Stories that move, strategies that stick',
    videoUrl: '/videos/marketing-sample-animation-2.webm',
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
      highlightImage: '/images/communication-strategy-highlight.webp',
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
      image: '',
      className: '',
    },
  },
  {
    id: 'packaging_and_product_design',
    name: 'Packaging & Product Design',
    pageTitle: 'We turn packaging into powerful first impressions',
    videoUrl: '/videos/print-animation.webm',
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
            'Label Systems',
            'Material & Finish Consulting',
            'Unboxing Experience Design',
            'Wearable Design',
          ],
        },
      ],
      highlightImage: '/images/communication-strategy-highlight.webp',
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
      image: '',
      className: '',
    },
  },
  {
    id: 'offset_and_digital_printing',
    name: 'Offset & Digital Printing',
    pageTitle: 'Print that delivers impact, on paper and in hand',
    videoUrl: '/videos/digital-animation.webm',
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
      highlightImage: '/images/website-creation-highlight.jpg',
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
      image: '',
      className: '',
    },
  },
  {
    id: 'digital_products_creation',
    name: 'Digital Products Creation',
    pageTitle: 'We craft digital products that feel as good as they function',
    videoUrl: '/videos/digital-animation.webm',
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
          ],
        },
        {
          title: 'We build digital products that scale with you',
          services: [
            'Frontend Development',
            'Cross-platform Mobile App Development',
            'Backend Development & API Integration',
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
      highlightImage: '/images/website-creation-highlight.jpg',
      marqueeText: 'Shape, ship & evolve.',
    },
    breakdownSummary: [
      'UI/UX Design for Web & Mobile',
      'Frontend development',
      'Cross-platform mobile app development',
      'Backend Development & API Integration',
      'E-commerce & SaaS platfroms',
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
      image: '',
      className: '',
    },
  },
];

export const ALL_PROJECTS_DATA: FullProjectData[] = [
  {
    id: 'cefic',
    name: 'CEFIC',
    pageTitle: 'Celebrating 50 years of scientific excellence',
    descSummary: 'Celebrating 50 years of scientific excellence',
    bannerURL: { image: '/images/our-works/cefic.webp' },
    cardImage: '/images/our-works/cefic.webp',
    descriptionBg: '',
    description: '',
    services: ['Branding & Identity', 'Offset & Digital Printing'],
    extraServices: ['Illustration', 'Print'],
    sectors: ['Corporate', 'Health'],
  },
  {
    id: 'sander',
    name: 'Sander',
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/sander.webp' },
    cardImage: '/images/our-works/sander.webp',
    descriptionBg: '',
    description: '',
    services: ['Marketing & Media', 'Offset & Digital Printing'],
    extraServices: ['Print'],
    sectors: ['Corporate'],
  },
  {
    id: 'fipra',
    name: 'Fipra',
    pageTitle: 'Redefining the boundaries of strategic communication',
    descSummary:
      'Redefining the boundaries of strategic communication through a new visual identity and website',
    bannerURL: { image: '/images/our-works/fipra.webp' },
    cardImage: '/images/our-works/fipra.webp',
    descriptionBg: '',
    description: '',
    services: ['Branding & Identity', 'Packaging & Product Design', 'Digital Products Creation'],
    extraServices: ['Logo', 'Print'],
    sectors: ['Corporate'],
  },
  {
    id: 'eortc',
    name: 'EORTC',
    pageTitle: 'Highlighting therapeutic advances in cancer treatment',
    descSummary:
      'Highlighting therapeutic advances in cancer treatment through their new annual report',
    bannerURL: { image: '/images/our-works/eortc.webp' },
    cardImage: '/images/our-works/eortc.webp',
    descriptionBg: '',
    description: '',
    services: ['Branding & Identity', 'Offset & Digital Printing', 'Packaging & Product Design'],
    extraServices: ['Print'],
    sectors: ['Corporate'],
  },
  {
    id: 'sothebys',
    name: "Sotheby's Realty - Belgium",
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/sothebys.webp' },
    cardImage: '/images/our-works/sothebys.webp',
    descriptionBg: '',
    description: '',
    services: ['Packaging & Product Design', 'Digital Products Creation'],
    extraServices: ['Print'],
    sectors: ['Corporate', 'Real Estate'],
  },
  {
    id: 'froidmont',
    name: 'La Ferme de Froidmont',
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/froidmont.webp' },
    cardImage: '/images/our-works/froidmont.webp',
    descriptionBg: '',
    description: '',
    services: ['Branding & Identity', 'Digital Products Creation'],
    extraServices: ['Illustration'],
    sectors: ['E-shop', 'NGO'],
  },
  {
    id: 'febecoop',
    name: 'Febecoop',
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/febecoop.webp' },
    cardImage: '/images/our-works/febecoop.webp',
    descriptionBg: '',
    description: '',
    services: ['Branding & Identity', 'Marketing & Media'],
    extraServices: ['Illustration'],
    sectors: ['Corporate', 'NGO'],
  },
  {
    id: 'bluefino',
    name: 'Bluefino',
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/bluefino.webp' },
    cardImage: '/images/our-works/bluefino.webp',
    descriptionBg: '',
    description: '',
    services: ['Marketing & Media', 'Digital Products Creation'],
    extraServices: [],
    sectors: ['Corporate', 'Marketing'],
  },
  {
    id: 'castell',
    name: 'Castell Management',
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/castell.webp' },
    cardImage: '/images/our-works/castell.webp',
    descriptionBg: '',
    description: '',
    services: ['Branding & Identity', 'Offset & Digital Printing', 'Digital Products Creation'],
    extraServices: ['Logo', 'Print'],
    sectors: ['Corporate', 'Real Estate'],
  },
  {
    id: 'palais',
    name: "Pa'lais",
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/palais.webp' },
    cardImage: '/images/our-works/palais.webp',
    descriptionBg: '',
    description: '',
    services: ['Marketing & Media', 'Digital Products Creation'],
    extraServices: [],
    sectors: ['Food'],
  },
  {
    id: 'archibald',
    name: 'Archibald',
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/archibald.webp' },
    cardImage: '/images/our-works/archibald.webp',
    descriptionBg: '',
    description: '',
    services: ['Offset & Digital Printing', 'Packaging & Product Design'],
    extraServices: ['Print'],
    sectors: ['Corporate', 'Real Estate'],
  },
  {
    id: 'sanoleo',
    name: 'Sanoleo',
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/sanoleo.webp' },
    cardImage: '/images/our-works/sanoleo.webp',
    descriptionBg: '',
    description: '',
    services: ['Offset & Digital Printing', 'Digital Products Creation'],
    extraServices: ['Print'],
    sectors: ['Corporate', 'Health'],
  },
  {
    id: 'eu-traveltech',
    name: 'Eu Traveltech',
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/eu-traveltech.webp' },
    cardImage: '/images/our-works/eu-traveltech.webp',
    descriptionBg: '',
    description: '',
    services: ['Marketing & Media', 'Digital Products Creation'],
    extraServices: [],
    sectors: ['Corporate'],
  },
  {
    id: 'nove',
    name: 'Nove',
    cardImage: '/images/our-works/nove.jpg',
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/nove.jpg' },
    services: ['Marketing & Media', 'Digital Products Creation'],
    descriptionBg: '',
    description: '',
    extraServices: [],
    sectors: ['Corporate'],
  },
  {
    id: 'speos',
    name: 'Speos',
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/speos.webp' },
    cardImage: '/images/our-works/speos.webp',
    descriptionBg: '',
    description: '',
    services: ['Branding & Identity', 'Marketing & Media'],
    extraServices: ['Logo', 'Print'],
    sectors: ['Corporate', 'Marketing'],
  },
  {
    id: 'acumen',
    name: 'Acumen',
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/acumen.webp' },
    cardImage: '/images/our-works/acumen.webp',
    descriptionBg: '',
    description: '',
    services: ['Branding & Identity', 'Offset & Digital Printing'],
    extraServices: ['Logo', 'Print'],
    sectors: ['Corporate'],
  },
  {
    id: 'racine',
    name: 'Racine',
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/racine.webp' },
    cardImage: '/images/our-works/racine.webp',
    descriptionBg: '',
    description: '',
    services: ['Marketing & Media', 'Digital Products Creation'],
    extraServices: [],
    sectors: ['Corporate', 'Legal'],
  },
  {
    id: 'iro',
    name: 'IRO',
    cardImage: '/images/our-works/iro.webp',
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/iro.webp' },
    services: ['Branding & Identity', 'Offset & Digital Printing'],
    descriptionBg: '',
    description: '',
    extraServices: ['Illustration', 'Print'],
    sectors: ['Food'],
  },
  {
    id: 'sibelga',
    name: 'Sibelga',
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/sibelga.webp' },
    cardImage: '/images/our-works/sibelga.webp',
    descriptionBg: '',
    description: '',
    services: ['Branding & Identity', 'Digital Products Creation'],
    extraServices: ['Illustration'],
    sectors: ['Corporate', 'Energy'],
  },
  {
    id: 'caritas',
    name: 'Caritas International',
    pageTitle: '',
    descSummary: '',
    bannerURL: { image: '/images/our-works/caritas.webp' },
    cardImage: '/images/our-works/caritas.webp',
    descriptionBg: '',
    description: '',
    services: ['Marketing & Media', 'Digital Products Creation'],
    extraServices: [],
    sectors: ['NGO'],
  },
];

export const OUR_REFERENCES: ReferenceProps[] = [
  { logo: '/images/references/Sothebys.webp', link: 'https://www.sothebysrealty.be/fr' },
  {
    logo: '/images/references/caritas.webp',
    link: 'https://www.caritasinternational.be/fr',
  },
  { logo: '/images/references/cheeesebox.webp', link: 'https://www.cheesebox.com' },
  { logo: '/images/references/bertone.png', link: 'https://bertone.it' },
  { logo: '/images/references/infrabel.webp', link: 'https://infrabel.be/fr' },
  { logo: '/images/references/iro.webp', link: 'https://www.matcha-iro.com' },
  { logo: '/images/references/racine.webp', link: 'https://racinebrussels.eu/fr' },
  { logo: '/images/references/senghor.webp', link: 'https://www.senghor.be' },
  { logo: '/images/references/sibelga.webp', link: 'https://www.sibelga.be' },
  { logo: '/images/references/vanin.png', link: 'https://www.vanin.be/fr' },
  { logo: '/images/references/speos.png', link: 'https://www.speos.be/en' },
  { logo: '/images/references/fipra.png', link: 'https://fipra.com' },
];

export const servicesSummary: ServiceCardProps[] = (() => {
  return ALL_SERVICES_DATA.map((service, idx, arr) => ({
    name: service.name,
    breakdown: service.breakdownSummary,
    href: `/services/${service.id}`,
    videoUrl: service.videoUrl,
    isLast: idx === arr.length - 1,
  }));
})();

export const projectsSummary: WorkCardProps[] = (() => {
  return ALL_PROJECTS_DATA.map(project => ({
    id: project.id,
    name: project.name,
    image: project.cardImage,
    services: project.services,
    extraServices: project.extraServices,
    sectors: project.sectors,
  }));
})();

export const homeCaseStudySamples = (() => {
  const samples: Omit<CaseStudySummaryProps, 'index'>[] = [];
  const selectedProjectsSet = new Set(selectedCaseStudies);

  for (const project of ALL_PROJECTS_DATA) {
    if (selectedProjectsSet.has(project.id)) {
      samples.push({
        id: project.id,
        title: project.name,
        description: project.descSummary,
        img: project.cardImage,
        imgOnRight: samples.length % 2 === 1,
      });
    }
  }

  return samples;
})();

export const { provenServicesList, provenSectorsList } = (() => {
  let sectors = new Set<string>();

  ALL_PROJECTS_DATA.forEach(project => {
    sectors = new Set([...sectors, ...project.sectors]);
  });

  return {
    provenServicesList: ALL_SERVICES_DATA.map(service => service.name),
    provenSectorsList: Array.from(sectors),
  };
})();

export const ALL_JOBS_DATA: FullJobProps[] = [
  {
    id: 'interactive-and-resourceful-front-end-developer',
    title: 'Interactive and resourceful front-end developer',
    description:
      'We are looking for a committed person, passionate about product \
      and design, who develops interfaces with eye and rigor in order to \
      take the lead on certain projects.',
    type: 'list',
    profile: [
      'You have a minimum of 3 years of experience',
      'Complete mastery of HTML/CSS/JS and integration techniques in responsive design',
      'You have a good knowledge of PHP and MYSQL. WebGL and Canvas are a plus',
      'You know about JavaScript/jQuery/Wordpress',
      'You are comfortable with Photoshop, Illustrator and Figma',
      'You manage SEO techniques',
      'You are creative and involved: every problem has its solution',
      "You're perfectly self-taught and have a passion for open source",
      "You like to work in a team and you're not afraid to communicate…",
      'You speak French and/or Dutch',
      'You are super organized and you have a good culture of technology watch',
      'You like a job well done, you pay attention to detail…',
    ],
    offer: [
      ' A freelance contract with an attractive remuneration',
      'A well-established organization in collaboration with our project \
      managers, you will compose your own schedule according to your availability',
      'A unique experience in a small communication agency in Brussels',
      'Talented colleagues who love afterwork parties',
      'A creative and pleasant environment (micro-naps are allowed)',
    ],
    jobDescription: [],
    Ps: 'If you are interested in this opportunity, apply on our website. Address \
    yourself directly to Juju (no need to impress him with a long cover letter, \
    just show him your portfolio and your best work).',
  },
  {
    id: 'internship-in-development-marketing-or-project-management',
    title: 'Internship in development, marketing or project management',
    description:
      'We gladly welcome interns who are looking for experience in the field of \
      web development, marketing or project management.',
    type: 'paragraphs',
    jobDescription: [
      {
        title: 'Which field?',
        text: ' We gladly welcome interns who are looking for experience in the \
        field of web design and development, marketing or project management.',
      },
      {
        title: 'What will you do ?',
        text: "Don't worry, you won't have to serve coffee or decorate the Christmas \
        tree… In fact, we expect much more from our interns. We like them to be dynamic, \
        proactive, eager to learn, not afraid to make mistakes and stronger than us at FIFA 25!",
      },
      {
        title: 'No secret between us',
        text: "We are a small multi-hat team that is on many fronts at the same time. So \
        don't hesitate to pull our sleeve because we forgot to provide you with tasks, \
        because there will always be tasks!",
      },
      {
        title: 'Apply now',
        text: 'If you are independent, creative and flexible, and you like to progress \
        quickly while bringing your own initiatives. Tell us more about your strengths \
        and show us what you could concretely bring to the agency.',
      },
    ],
    profile: [],
    offer: [],
    Ps: "PS: If you don't hear from us, don't hesitate to call, we are sometimes distracted 😉",
  },
];

export const jobCards: JobsCTAProps[] = (() => {
  return ALL_JOBS_DATA.map(job => ({
    title: job.title,
    description: job.description,
    href: `/jobs/${job.id}`,
  }));
})();
