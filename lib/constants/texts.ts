import { FullServiceData } from '@/app/services/[service]/page';
import { CaseStudySummaryProps } from '@/components/sections/home/CaseStudies';
import { ServiceCardProps } from '@/components/sections/home/WhatWeDo';
import SvgLinkedin from '@/components/icons/Linkedin';
import SvgInstagramIcon from '@/components/icons/InstagramIcon';
import SvgXIcon from '@/components/icons/XIcon';
import SvgFacebookIcon from '@/components/icons/FacebookIcon';
import { WorkCardProps } from '@/components/sections/works/WorksDisplay';
import { PinpointContactsProps } from '../types/general';

export const changingHeroTitleModifiers: string[] = ['strategic', 'branding', 'digital', 'stories'];
export const changingContactTitleModifiers: string[] = [
  'Hello',
  'Atelier',
  'Bonjour',
  'Bom dia',
  'Hola',
  'Goeiedag',
  'Buongiorno',
];

export const contactInformation: PinpointContactsProps = {
  address: ['Rue de Haerne 51', '1040 Brussels'],
  tel: ' +32 2 494 01 28',
  email: ' info@atelierdesign.be',
  socials: [
    {
      title: 'Instagram',
      url: 'https://www.instagram.com/atelierdesign_bxl/',
      Icon: SvgInstagramIcon,
    },
    {
      title: 'Facebook',
      url: 'https://www.facebook.com///atelierdesign.be/',
      Icon: SvgFacebookIcon,
    },
    {
      title: 'LinkedIn',
      url: 'https://be.linkedin.com/company/atelier-design',
      Icon: SvgLinkedin,
    },
    {
      title: 'X',
      url: 'https://x.com/atelierdesign',
      Icon: SvgXIcon,
    },
  ],
};

export const homeCaseStudySamples: Omit<CaseStudySummaryProps, 'index'>[] = [
  {
    title: 'CEFIC',
    description: 'Celebrating 50 years of scientific excellence',
    img: '/images/case-studies/cefic.webp',
    link: '#',
    imgOnRight: true,
  },
  {
    title: 'Fipra',
    description:
      'Redefining the boundaries of strategic communication through a new visual identity and website',
    img: '/images/case-studies/fipra.webp',
    link: '#',
    imgOnRight: false,
  },
  {
    title: 'EORTC',
    description:
      'Highlighting therapeutic advances in cancer treatment through their new annual report',
    img: '/images/case-studies/eortc.webp',
    link: '#',
    imgOnRight: true,
  },
];

export const ALL_SERVICES_DATA: FullServiceData[] = [
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

export const ourWorks: WorkCardProps[] = [
  {
    name: 'CEFIC',
    linkParam: 'cefic',
    image: '/images/our-works/cefic.webp',
    services: ['Brand Identity'],
    extraServices: ['Illustration', 'Print'],
    sectors: ['Corporate', 'Health'],
  },
  {
    name: 'Sander',
    linkParam: 'sander',
    image: '/images/our-works/sander.webp',
    services: ['Brand Identity', 'Communication Strategy', 'Website Creation'],
    extraServices: ['Print'],
    sectors: ['Corporate'],
  },
  {
    name: 'Fipra',
    linkParam: 'fipra',
    image: '/images/our-works/fipra.webp',
    services: ['Brand Identity', 'Communication Strategy', 'Website Creation'],
    extraServices: ['Logo', 'Print'],
    sectors: ['Corporate'],
  },
  {
    name: 'EORTC',
    linkParam: 'eortc',
    image: '/images/our-works/eortc.webp',
    services: ['Brand Identity', 'Communication Strategy'],
    extraServices: ['Print'],
    sectors: ['Corporate'],
  },
  {
    name: "Sotheby's Realty - Belgium",
    linkParam: 'sothebys',
    image: '/images/our-works/sothebys.webp',
    services: ['Communication Strategy', 'Website Creation'],
    extraServices: ['Print'],
    sectors: ['Corporate', 'Real Estate'],
  },
  {
    name: 'La Ferme de Froidmont',
    linkParam: 'froidmont',
    image: '/images/our-works/froidmont.webp',
    services: ['Brand Identity', 'Communication Strategy', 'Website Creation'],
    extraServices: ['Illustration'],
    sectors: ['E-shop', 'NGO'],
  },
  {
    name: 'Febecoop',
    linkParam: 'febecoop',
    image: '/images/our-works/febecoop.webp',
    services: ['Brand Identity', 'Communication Strategy', 'Website Creation'],
    extraServices: ['Illustration'],
    sectors: ['Corporate', 'NGO'],
  },
  {
    name: 'Bluefino',
    linkParam: 'bluefino',
    image: '/images/our-works/bluefino.webp',
    services: ['Communication Strategy', 'Website Creation'],
    extraServices: [],
    sectors: ['Corporate', 'Marketing'],
  },
  {
    name: 'Castell Management',
    linkParam: 'castell',
    image: '/images/our-works/castell.webp',
    services: ['Brand Identity', 'Communication Strategy', 'Website Creation'],
    extraServices: ['Logo', 'Print'],
    sectors: ['Corporate', 'Real Estate'],
  },
  {
    name: "Pa'lais",
    linkParam: 'palais',
    image: '/images/our-works/palais.webp',
    services: ['Communication Strategy', 'Website Creation'],
    extraServices: [],
    sectors: ['Food'],
  },
  {
    name: 'Archibald',
    linkParam: 'archibald',
    image: '/images/our-works/archibald.webp',
    services: ['Communication Strategy', 'Website Creation'],
    extraServices: ['Print'],
    sectors: ['Corporate', 'Real Estate'],
  },
  {
    name: 'Sanoleo',
    linkParam: 'sanoleo',
    image: '/images/our-works/sanoleo.webp',
    services: ['Brand Identity', 'Communication Strategy', 'Website Creation'],
    extraServices: ['Print'],
    sectors: ['Corporate', 'Health'],
  },
  {
    name: 'Eu Traveltech',
    linkParam: 'eu-traveltech',
    image: '/images/our-works/eu-traveltech.webp',
    services: ['Communication Strategy', 'Website Creation'],
    extraServices: [],
    sectors: ['Corporate'],
  },
  {
    name: 'Nove',
    linkParam: 'nove',
    image: '/images/our-works/nove.jpg',
    services: ['Communication Strategy', 'Website Creation'],
    extraServices: [],
    sectors: ['Corporate'],
  },
  {
    name: 'Speos',
    linkParam: 'speos',
    image: '/images/our-works/speos.webp',
    services: ['Brand Identity', 'Communication Strategy', 'Website Creation'],
    extraServices: ['Logo', 'Print'],
    sectors: ['Corporate', 'Marketing'],
  },
  {
    name: 'Acumen',
    linkParam: 'acumen',
    image: '/images/our-works/acumen.webp',
    services: ['Brand Identity', 'Communication Strategy', 'Website Creation'],
    extraServices: ['Logo', 'Print'],
    sectors: ['Corporate'],
  },
  {
    name: 'Racine',
    linkParam: 'racine',
    image: '/images/our-works/racine.webp',
    services: ['Communication Strategy', 'Website Creation'],
    extraServices: [],
    sectors: ['Corporate', 'Legal'],
  },
  {
    name: 'IRO',
    linkParam: 'iro',
    image: '/images/our-works/iro.webp',
    services: ['Brand Identity', 'Communication Strategy'],
    extraServices: ['Illustration', 'Print'],
    sectors: ['Food'],
  },
  {
    name: 'Sibelga',
    linkParam: 'sibelga',
    image: '/images/our-works/sibelga.webp',
    services: ['Brand Identity', 'Website Creation'],
    extraServices: ['Illustration'],
    sectors: ['Corporate', 'Energy'],
  },
  {
    name: 'Caritas International',
    linkParam: 'caritas',
    image: '/images/our-works/caritas.webp',
    services: ['Communication Strategy', 'Website Creation'],
    extraServices: [],
    sectors: ['NGO'],
  },
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

export const { provenServicesList, provenSectorsList } = (() => {
  let services = new Set<string>();
  let sectors = new Set<string>();

  ourWorks.forEach(work => {
    services = new Set([...services, ...work.services, ...work.extraServices]);
    sectors = new Set([...sectors, ...work.sectors]);
  });

  return {
    provenServicesList: Array.from(services),
    provenSectorsList: Array.from(sectors),
  };
})();
