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
        img: 'https://static.pinpoint.ng/images/about-link-highlight.webp',
        imgClass: 'rotate-6 peer-hover:-rotate-8',
      },
      {
        text: 'Our works',
        href: '/our-works',
        img: 'https://static.pinpoint.ng/images/works-link-highlight.webp',
        imgClass: 'rotate-24 peer-hover:rotate-8',
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
        href: '/starting-a-new-project?service=make_a_custom_request',
        img: 'https://static.pinpoint.ng/images/team/mary.jpg',
        imgClass: '-rotate-4 peer-hover:rotate-10',
      },
      {
        text: 'Jobs',
        href: '/jobs',
        img: 'https://static.pinpoint.ng/images/team/olivia.jpg',
        imgClass: 'rotate-6 peer-hover:-rotate-8',
      },
      {
        text: 'Contact',
        href: '/contact',
        img: 'https://static.pinpoint.ng/images/team/bili.jpg',
        imgClass: '-rotate-30 peer-hover:-rotate-15',
      },
    ],
  },
];
