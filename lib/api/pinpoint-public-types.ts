/** Shapes aligned with docs/public-site-content-api.md (public JSON). */

export interface PinpointGlobalRouteSeo {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  openGraph: {
    title: string;
    description: string;
    type: 'website' | 'article';
    image?: string;
    siteName?: string;
    locale?: string;
  };
  twitter: {
    card: 'summary' | 'summary_large_image';
    title: string;
    description: string;
    image?: string;
    creator?: string;
  };
  robots: {
    index: boolean;
    follow: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
  };
}

export type PublicResponsiveBreakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface PublicStyleRules {
  width?: string;
  maxHeight?: string;
  display?: 'none' | 'block' | 'grid' | 'flex';
  textColorToken?: string;
  backgroundToken?: string;
  rotateDeg?: number;
  peerHoverRotateDeg?: number;
  gridColumnStart?: number;
  gridColumnEnd?: number;
  gridRowStart?: number;
  gridRowEnd?: number;
}

export interface PublicStyleSpec {
  responsive?: Partial<Record<PublicResponsiveBreakpoint, PublicStyleRules>>;
}

export interface PinpointGlobalGlobalConfigContent {
  SEO_DETAILS: {
    title: { default: string; template: string };
    description: string;
    metadataBase: string;
    alternates: { canonical: string };
    image: string;
    icons: string;
    robots: {
      index: boolean;
      follow: boolean;
      nocache: boolean;
      googleBot: { index: boolean; follow: boolean; 'max-video-preview': number };
    };
    authors: { name: string; url: string }[];
    keywords: string[];
    generator: string;
    publisher: string;
    category: string;
    classification: string;
  };
  contactInformation: {
    location: string;
    address: string;
    tel: string[];
    email: string;
  }[];
  quicklinks: { location: string; links: { label: string; href: string }[] };
  pinpointSocials: { title: string; url: string }[];
  footerCompanyDescription: string;
  DEFAULT_WORKS_DISPLAYED: number;
}

export interface PinpointGlobalPageContentStored {
  changingHeroTitleModifiers?: string[];
  ourStoryTexts?: string[];
  DEFAULT_WORKS_DISPLAYED?: number;
  AVAILABLE_SERVICE_IDS?: string[];
  changingContactTitleModifiers?: string[];
  newProjectTexts?: string[];
  AVAILABLE_PACKAGED_SERVICE_IDS?: string[];
  PRIVACY_POLICY?: string[][];
  seo?: PinpointGlobalRouteSeo;
}

export interface PublicProjectImage {
  src: string;
  alt: string;
  stylePreset?: string;
  style?: PublicStyleSpec;
  styleAdvanced?: Record<string, unknown>;
  className?: string;
  width?: number;
  height?: number;
}

export interface PublicRenderedService {
  index?: string;
  caption: string;
  title: string;
  description: string[][];
  sectionBg: string;
  textStylePreset?: string;
  textStyle?: PublicStyleSpec;
  textStyleAdvanced?: Record<string, unknown>;
  textColorClass?: string;
  images: PublicProjectImage[];
}

export interface PublicProject {
  _id: string;
  slug: string;
  name: string;
  pageTitle: string;
  descSummary: string;
  bannerURL: { image?: string; video?: string };
  cardImage: string;
  descriptionBg?: string;
  descriptionStyle?: PublicStyleSpec;
  textStylePreset?: string;
  textStyle?: PublicStyleSpec;
  textStyleAdvanced?: Record<string, unknown>;
  textColorClass?: string;
  descriptionHighlightPhotos: PublicProjectImage[];
  description: string;
  services: string[];
  extraServices: string[];
  sectors: string[];
  createdWebsite: string;
  renderedServices: PublicRenderedService[];
  relatedProjects: string[];
  featured?: boolean;
  featuredInService?: boolean;
  keywords?: string[];
  serviceBreakdown?: { href: string; text: string }[];
  seo?: PinpointGlobalRouteSeo;
}

export interface PublicService {
  _id: string;
  slug: string;
  name: string;
  pageTitle: string;
  videoUrl: string;
  posterUrl: string;
  description: string;
  expertise: {
    title: string;
    breakdown: {
      title: string;
      services: string[];
      stylePreset?: string;
      style?: PublicStyleSpec;
      styleAdvanced?: Record<string, unknown>;
      className?: string;
    }[];
    highlightImage: string;
    marqueeText: string;
  };
  breakdownSummary: string[];
  whatMakesUsUnique: {
    title: string;
    groups: { title: string; text: string; isLast?: boolean }[];
  };
  menu: {
    image: string;
    stylePreset?: string;
    style?: PublicStyleSpec;
    styleAdvanced?: Record<string, unknown>;
    className: string;
  };
  packagePricing: {
    id: string;
    packages: {
      id: string;
      priceRange: [number, number] | [number];
      priceSuffix?: string;
      benefits: string[];
    }[];
  }[];
  seo?: PinpointGlobalRouteSeo;
}

export interface PublicServiceDetail extends PublicService {
  featuredProjectsForService: PublicProject[];
}

export interface PublicJobListItem {
  _id: string;
  slug: string;
  title: string;
  description: string;
}

export interface PublicJob extends PublicJobListItem {
  type: 'list' | 'paragraphs';
  profile: string[];
  offer: string[];
  Ps: string;
  jobDescription: { title: string; text: string }[];
  seo?: PinpointGlobalRouteSeo;
}

export interface TeamMember {
  memberKey: string;
  order: number;
  name: string;
  title: string;
  mainImage: string;
  subImage: string;
}

export interface ReferenceLogo {
  logo: string;
  link?: string;
}

export interface AchievementRow {
  order: number;
  number: number;
  numberSuffix?: string;
  desc: string;
  stylePreset?: string;
  style?: PublicStyleSpec;
  styleAdvanced?: Record<string, unknown>;
  className: string;
}

export interface ProjectPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ProjectFilterOptions {
  sectors: string[];
  services: string[];
}

export interface GlobalConfigResponse {
  content: PinpointGlobalGlobalConfigContent;
}

export type PageKey =
  | 'home'
  | 'about-us'
  | 'our-works'
  | 'contact'
  | 'jobs'
  | 'join-our-team'
  | 'starting-a-new-project'
  | 'privacy-policy';

export interface PageResponseBase {
  pageKey: PageKey;
  content: PinpointGlobalPageContentStored;
}

export interface HomePageResponse extends PageResponseBase {
  pageKey: 'home';
  featuredProjects: PublicProject[];
}

export interface OurWorksPageResponse extends PageResponseBase {
  pageKey: 'our-works';
  projectFilterOptions: ProjectFilterOptions;
}

export type PageResponse = HomePageResponse | OurWorksPageResponse | PageResponseBase;

export interface ProjectsListResponse {
  projects: PublicProject[];
  pagination: ProjectPagination;
  filters: ProjectFilterOptions;
  projectFilterOptions: ProjectFilterOptions;
}

export interface ServicesListResponse {
  services: PublicService[];
}

export interface JobsListResponse {
  jobs: PublicJobListItem[];
  pagination: ProjectPagination;
}

export interface TeamResponse {
  team: TeamMember[];
}

export interface ReferencesResponse {
  featured: ReferenceLogo[];
  marquee: ReferenceLogo[];
}

export interface AchievementsResponse {
  achievements: AchievementRow[];
}

export interface ApiSuccessEnvelope<T> {
  success: true;
  data: T;
  responseCode: number;
  message: string;
}
