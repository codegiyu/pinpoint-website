import { CaseStudySummaryProps } from '@/components/sections/home/CaseStudies';
import { ServiceCardProps } from '@/components/sections/home/WhatWeDo';
import { WorkCardProps } from '@/components/sections/works/WorksDisplay';

export const changingHeroTitleModifiers: string[] = ['strategic', 'branding', 'digital', 'stories'];

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

export const services: ServiceCardProps[] = [
  {
    name: 'Communication strategy',
    breakdown: [
      'Branding & positioning',
      'Digital strategy',
      'Content strategy',
      'Naming',
      'Research & analysis',
    ],
    href: '#',
    videoUrl: '/videos/branding-animation.webm',
  },
  {
    name: 'Brand identity',
    breakdown: [
      'Logotype',
      'Printed materials',
      'Storytelling & copywrinting',
      'Graphic design',
      'Photography',
    ],
    href: '#',
    videoUrl: '/videos/print-animation.webm',
  },
  {
    name: 'Website creation',
    breakdown: ['Website creation', 'E-shop', 'SEO', 'Ergonomy (UI/UX)', 'CRM API Integration'],
    href: '#',
    videoUrl: '/videos/digital-animation.webm',
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
