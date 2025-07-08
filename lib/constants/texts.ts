import { CaseStudySummaryProps } from '@/components/sections/home/CaseStudies';
import { ServiceCardProps } from '@/components/sections/home/WhatWeDo';

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
