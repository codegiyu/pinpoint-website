import { LangChangeLinkProps, NavLinkGroupProps } from '@/components/layout/Header';
import { ALL_SERVICES_DATA } from './texts';
import capitalize from 'lodash/capitalize';

export const BASE_LOAD_TIME = 1500; // ms
export const TRANSITION_DURATION = 0.8; // s

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
        href: '/about-us',
        img: '',
        imgClass: '',
      },
      {
        text: 'Our works',
        href: '/our-works',
        img: '',
        imgClass: '',
      },
    ],
  },
  {
    name: 'Services',
    links: ALL_SERVICES_DATA.map(service => ({
      text: capitalize(service.name),
      href: `/services/${service.id}`,
      img: service.menu.image,
      imgClass: service.menu.className,
    })),
  },
  {
    links: [
      {
        text: 'Starting a new project',
        href: '/starting-a-new-project',
        img: '',
        imgClass: '',
      },
      {
        text: 'Jobs',
        href: '/jobs',
        img: '',
        imgClass: '',
      },
      {
        text: 'Contact',
        href: '/contact',
        img: '',
        imgClass: '',
      },
    ],
  },
];
