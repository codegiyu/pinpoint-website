import { LangChangeLinkProps, NavLinkGroupProps } from '@/components/layout/Header';

export const langChangeOptions: LangChangeLinkProps[] = [
  { lang: 'fr', href: '/fr' },
  { lang: 'en', href: '/' },
  { lang: 'nl', href: '/nl' },
];

export const navlinks: NavLinkGroupProps[] = [
  {
    links: [
      {
        text: 'About us',
        href: 'about-us',
        img: '',
        imgClass: '',
      },
      {
        text: 'Our works',
        href: 'our-works',
        img: '',
        imgClass: '',
      },
    ],
  },
  {
    name: 'Services',
    links: [
      {
        text: 'Brand identity',
        href: 'services/brand-identity',
        img: '',
        imgClass: '',
      },
      {
        text: 'Communication strategy',
        href: 'services/communication-strategy',
        img: '',
        imgClass: '',
      },
      {
        text: 'Website creation',
        href: 'services/website-creation',
        img: '',
        imgClass: '',
      },
    ],
  },
  {
    links: [
      {
        text: 'Starting a new project',
        href: 'starting-a-new-project',
        img: '',
        imgClass: '',
      },
      {
        text: 'Jobs',
        href: 'jobs',
        img: '',
        imgClass: '',
      },
      {
        text: 'Contact',
        href: 'contact',
        img: '',
        imgClass: '',
      },
    ],
  },
];
