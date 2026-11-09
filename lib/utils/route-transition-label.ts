import startCase from 'lodash/startCase';

const STATIC_LABELS: Record<string, string> = {
  '/': 'Home',
  '/about-us': 'About us',
  '/our-works': 'Our Works',
  '/contact': 'Contact',
  '/jobs': 'Jobs',
  '/privacy-policy': 'Privacy Policy',
  '/starting-a-new-project': 'Starting a new project?',
  '/join-our-team': 'Spontaneous Application',
};

export function routeTransitionLabel(pathname: string): string {
  const normalized = pathname === '' ? '/' : pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (STATIC_LABELS[normalized]) return STATIC_LABELS[normalized];

  const labelFromSegment = (segment: string | undefined, fallback: string) => {
    if (!segment) return fallback;
    const decoded = decodeURIComponent(segment);
    return startCase(decoded.replaceAll(/[-_]/g, ' '));
  };

  if (normalized.startsWith('/misc/')) {
    const slug = normalized.slice('/misc/'.length).split('/')[0];
    return labelFromSegment(slug, 'Misc');
  }
  if (normalized.startsWith('/services/')) {
    const slug = normalized.slice('/services/'.length).split('/')[0];
    return labelFromSegment(slug, 'Services');
  }
  if (normalized.startsWith('/jobs/')) {
    const slug = normalized.slice('/jobs/'.length).split('/')[0];
    return labelFromSegment(slug, 'Careers');
  }
  if (normalized.startsWith('/projects/')) {
    const slug = normalized.slice('/projects/'.length).split('/')[0];
    return labelFromSegment(slug, 'Project');
  }

  return 'Pinpoint';
}
