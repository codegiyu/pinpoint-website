import type { Metadata } from 'next';
import type { PinpointGlobalRouteSeo } from '@/lib/api/pinpoint-public-types';

export function metadataFromRouteSeo(
  seo: PinpointGlobalRouteSeo | undefined,
  fallbackTitle: string
): Metadata {
  if (!seo) {
    return { title: fallbackTitle };
  }

  const base: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: seo.canonicalPath },
    robots: seo.robots,
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      type: seo.openGraph.type,
      ...(seo.openGraph.image && { images: [seo.openGraph.image] }),
      ...(seo.openGraph.siteName && { siteName: seo.openGraph.siteName }),
      ...(seo.openGraph.locale && { locale: seo.openGraph.locale }),
    },
    twitter: {
      card: seo.twitter.card,
      title: seo.twitter.title,
      description: seo.twitter.description,
      ...(seo.twitter.image && { images: [seo.twitter.image] }),
      ...(seo.twitter.creator && { creator: seo.twitter.creator }),
    },
  };

  return base;
}
