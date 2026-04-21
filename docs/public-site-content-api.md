# Public site content API (Pinpoint Global)

Base path for **public** routes: **`/api/v1/public`**. All are **unauthenticated**.

Other subsidiaries may mount different paths under the same base (e.g. `/api/v1/public/other-brand/...`); only **pinpoint-global** is specified here.

---

## Response conventions

### Success (`sendResponse`)

Successful responses use HTTP **2xx** and this JSON shape:

```json
{
  "success": true,
  "data": { },
  "responseCode": 200,
  "message": "Human-readable status text"
}
```

- **`data`** is the payload described per endpoint below (`null` is not used for these routes; it is always an object for site-content endpoints).
- **`responseCode`** duplicates the HTTP status code.

### Errors (`AppError` / global handler)

Operational errors use **4xx/5xx** and (production) roughly:

```json
{
  "success": false,
  "message": "Error description",
  "error": null,
  "responseCode": 404
}
```

- **`error`** may carry extra structured data when the server sets it; often `null`.
- In **development**, responses may also include **`stack`**.

Common cases for this API:

| HTTP | Typical `message` |
|------|-------------------|
| **400** | Validation text (e.g. Zod issues joined with `; `) |
| **404** | `Subsidiary not found`, `Page not found`, `Project not found`, etc. |
| **429** | Rate limit (form POST only; see below) |

---

## Prerequisites

- A **Subsidiary** with slug **`pinpoint-global`** and **`isActive: true`**. Otherwise handlers that resolve the subsidiary throw **404** (`Subsidiary not found`).

### `content` shapes (CMS JSON)

Site content is stored with **explicit Mongoose sub-schemas** aligned to **pinpoint-frontend** and the Pinpoint Global seed files under `app/serverInitializer/seed/siteContent/pinpoint-global/` (see `app/lib/types/pinpointGlobal/contentShapes.ts` and `app/models/pinpointGlobalMongooseSchemas.ts`). Admin **PATCH** bodies that replace `content` must satisfy those shapes (validated before write).

Style guardrails: responsive style values such as `width` and `maxHeight` accept only safe CSS size tokens (`px`, `rem`, `%`, viewport units, `auto`, `fit-content`, `max-content`, or `var(--token)`), so frontend-rendered CSS variables remain constrained.

**Seed layout (preferred):** `global.json` holds **only** site-wide singleton fields: **`SEO_DETAILS`**, **`contactInformation`**, **`quicklinks`**, **`pinpointSocials`**, **`footerCompanyDescription`**, **`DEFAULT_WORKS_DISPLAYED`**. Page-specific copy (hero modifiers, contact modifiers, our story, new-project texts, packaged service ids, **service id list for our-works**) lives in **`pages/<pageKey>.json`**. Also: **`team.json`**, **`references-featured.json`**, **`references-marquee.json`**, **`achievements.json`**, and entity files under `projects/`, `services/`, `jobs/`. Team, references, and achievements are **only** in MongoDB collections, not in `global.json`. Entity JSON files may include top-level **`id`** as the stable **`slug`** (not stored inside `content`). Legacy **`bundle.json`**: embedded team/refs/achievements and duplicate page fields on `global` are stripped when writing `PinpointGlobalSiteGlobal`; page fields are merged into the appropriate `pages/*.json` when you run `node app/serverInitializer/seed/siteContent/pinpoint-global/build-split-from-bundle.mjs`.

**Per-route `seo` (optional on read, recommended for new writes):** Static pages and project/service/job detail payloads may include a `seo` object (`PinpointGlobalRouteSeo`): `title`, `description`, `keywords`, `canonicalPath` (path only; join with **`GET /pinpoint-global/global-config`** → `data.content.SEO_DETAILS.metadataBase` for absolute URLs), nested `openGraph` (`title`, `description`, `type` `website` \| `article`, optional `image`, `siteName`, `locale`), `twitter` (`card`, `title`, `description`, optional `image`, `creator`), and `robots` (`index`, `follow`, optional `noarchive`, `nosnippet`). The public site can map these fields directly to Next.js `metadata` / Open Graph / Twitter cards.

---

## Detailed response type reference (TypeScript names)

Canonical definitions: `app/lib/types/pinpointGlobal/contentShapes.ts`, `documents.ts`, and `dtos.ts`. Below is the **public JSON** shape (dates are ISO strings in JSON; MongoDB `_id` is a hex string on public project/service/job payloads).

<a id="pg-route-seo"></a>

### `PinpointGlobalRouteSeo`

```typescript
interface PinpointGlobalRouteSeo {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string; // path only
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
```

<a id="pg-global-config-content"></a>

### `PinpointGlobalGlobalConfigContent` (`GET …/global-config` → `data.content`)

Site-wide settings only. **Team**, **client references** (featured + marquee), and **achievements** are served from **`GET /team`**, **`GET /references`**, and **`GET /achievements`** (MongoDB collections).

```typescript
interface PinpointGlobalGlobalConfigContent {
  SEO_DETAILS: {
    title: { default: string; template: string }; // template often "%s | SiteName"
    description: string;
    metadataBase: string; // site origin for resolving URLs
    alternates: { canonical: string };
    image: string; // default OG image
    icons: string; // favicon URL
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
  contactInformation: { location: string; address: string; tel: string[]; email: string }[];
  quicklinks: { location: string; links: { label: string; href: string }[] };
  pinpointSocials: { title: string; url: string }[];
  footerCompanyDescription: string;
  DEFAULT_WORKS_DISPLAYED: number;
}
```

<a id="pg-page-stored"></a>

### `PinpointGlobalPageContentStored` (`GET …/pages/:pageKey` → `data.content`)

Union of optional page fields; only keys used by that `pageKey` are present. Common keys:

```typescript
interface PinpointGlobalPageContentStored {
  changingHeroTitleModifiers?: string[]; // home
  ourStoryTexts?: string[]; // about-us
  DEFAULT_WORKS_DISPLAYED?: number; // our-works
  AVAILABLE_SERVICE_IDS?: string[]; // our-works — service slugs for UI ordering / filters
  changingContactTitleModifiers?: string[]; // contact
  newProjectTexts?: string[]; // starting-a-new-project
  AVAILABLE_PACKAGED_SERVICE_IDS?: string[]; // starting-a-new-project
  PRIVACY_POLICY?: string[][]; // privacy-policy: sections → paragraphs
  seo?: PinpointGlobalRouteSeo;
}
```

<a id="pg-public-project"></a>

### Public project shape (`GET …/projects`, `…/projects/:slug`, `data.featuredProjects[]` on home, and items in `featuredProjectsForService`)

`PinpointGlobalProjectContent` fields at the top level, plus **`_id`** (MongoDB id string) and **`slug`** (URL slug). There is **no** `content.id` and no duplicate top-level `id`. The document field **`isActive`** exists in the database but is **not** included in public JSON; only **`isActive !== false`** (and legacy docs with no field) are returned. **`relatedProjects`**, **`services`**, and **`extraServices`** are filtered on read so slugs pointing at **inactive** projects or services are omitted.

### Active projects, services, and jobs (`isActive`)

- **Public list and detail** endpoints for **projects**, **services**, and **jobs** only include documents where **`isActive` is not `false`** (missing `isActive` is treated as active for older rows).
- **Inactive** items behave like **missing** for **`GET …/:slug`** (**404**).
- **Home** `featuredProjects` and **service detail** `featuredProjectsForService` only consider **active** projects.
- **Admin** list/get responses include the full document with **`isActive`** (boolean). **PATCH** may send **`{ "isActive": false }`** without **`content`** to toggle visibility.

```typescript
type PublicProject = PinpointGlobalProjectContent & { _id: string; slug: string };

type PinpointGlobalStyleSpec = {
  responsive?: Partial<
    Record<
      'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl',
      {
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
    >
  >;
};

interface PinpointGlobalProjectContent {
  name: string;
  pageTitle: string;
  descSummary: string;
  bannerURL: { image?: string; video?: string }; // exactly one set
  cardImage: string;
  descriptionBg?: string; // legacy fallback class token
  descriptionStyle?: PinpointGlobalStyleSpec;
  textStylePreset?: string;
  textStyle?: PinpointGlobalStyleSpec;
  textStyleAdvanced?: Record<string, unknown>;
  textColorClass?: string; // legacy fallback, retained during migration
  descriptionHighlightPhotos: {
    src: string;
    alt: string;
    stylePreset?: string;
    style?: PinpointGlobalStyleSpec;
    styleAdvanced?: Record<string, unknown>;
    className?: string; // legacy fallback
    width?: number;
    height?: number;
  }[];
  description: string;
  services: string[]; // service slugs that exist for this site
  extraServices: string[];
  sectors: string[];
  createdWebsite: string;
  renderedServices: {
    index?: string;
    caption: string;
    title: string;
    description: string[][]; // paragraphs → lines
    sectionBg: string;
    textStylePreset?: string;
    textStyle?: PinpointGlobalStyleSpec;
    textStyleAdvanced?: Record<string, unknown>;
    textColorClass?: string; // legacy fallback
    images: {
      src: string;
      alt: string;
      stylePreset?: string;
      style?: PinpointGlobalStyleSpec;
      styleAdvanced?: Record<string, unknown>;
      className?: string; // legacy fallback
      width?: number;
      height?: number;
    }[];
  }[];
  relatedProjects: string[]; // other project slugs
  featured?: boolean;
  featuredInService?: boolean;
  keywords?: string[];
  serviceBreakdown?: { href: string; text: string }[];
  seo?: PinpointGlobalRouteSeo;
}
```

<a id="pg-public-service"></a>

### Public service shape

- **`GET …/services`:** each list item is `PinpointGlobalServiceContent & { _id: string; slug: string }` — `name`, `pageTitle`, `videoUrl`, `posterUrl`, `description`, `expertise`, `breakdownSummary`, `whatMakesUsUnique`, `menu`, `packagePricing`, optional `seo`.
- **`GET …/services/:slug`:** same fields as a list item, plus **`featuredProjectsForService`**: `PublicProject[]` (length ≤ 4). See the service endpoint section for selection rules.

<a id="pg-public-job"></a>

### Public job shape (`GET …/jobs`, `…/jobs/:slug`)

`PinpointGlobalJobContent & { _id: string; slug: string }` — `title`, `description`, `type` (`'list'` \| `'paragraphs'`), `profile`, `offer`, `Ps`, `jobDescription: { title: string; text: string }[]`, optional `seo`.

<a id="pg-team"></a>

### Team (`GET …/team` → `data.team[]`)

```typescript
{ memberKey: string; order: number; name: string; title: string; mainImage: string; subImage: string }
```

<a id="pg-references"></a>

### References (`GET …/references`)

- `data.featured[]` / `data.marquee[]`: `{ logo: string; link?: string }[]` (content only, ordered).

<a id="pg-achievements"></a>

### Achievements (`GET …/achievements` → `data.achievements[]`)

```typescript
{
  order: number;
  number: number;
  numberSuffix?: string;
  desc: string;
  stylePreset?: string;
  style?: PinpointGlobalStyleSpec;
  styleAdvanced?: Record<string, unknown>;
  className: string; // legacy fallback
}
```

### Style fields migration note

- Public payloads now expose structured style fields (`stylePreset`, `style`, `styleAdvanced`) for dynamic rendering without Tailwind compile-time dependency.
- Legacy class fields (`className`, `textColorClass`) may still be present during rollout for backward compatibility.
- Frontend consumers should prefer style fields first and only fall back to class fields when style fields are absent.

### Home page extra field (`GET …/pages/home` only)

```typescript
{
  pageKey: 'home';
  content: PinpointGlobalPageContentStored;
  featuredProjects: PublicProject[]; // length ≤ 3, see endpoint section below; each has _id + slug + content fields
}
```

---

## Public GET endpoints

**Request:** no body. **Query:** none unless noted.

### `GET /pinpoint-global/global-config`

**Response `data`:**

```json
{
  "content": {
    "SEO_DETAILS": {
      "title": { "default": "string", "template": "%s | Pinpoint Global" },
      "description": "string",
      "metadataBase": "https://example.com/",
      "alternates": { "canonical": "https://example.com" },
      "image": "https://…",
      "icons": "https://…",
      "robots": {
        "index": true,
        "follow": true,
        "nocache": true,
        "googleBot": { "index": true, "follow": true, "max-video-preview": -1 }
      },
      "authors": [{ "name": "string", "url": "https://…" }],
      "keywords": ["string"],
      "generator": "string",
      "publisher": "string",
      "category": "string",
      "classification": "string"
    },
    "contactInformation": [],
    "quicklinks": { "location": "string", "links": [] },
    "pinpointSocials": [],
    "footerCompanyDescription": "string",
    "DEFAULT_WORKS_DISPLAYED": 10
  }
}
```

- **Full TypeScript shape:** [§ `PinpointGlobalGlobalConfigContent`](#pg-global-config-content).
- **`content`**: `{}` only when no row exists yet (not valid for **writes** until seed or admin PATCH).

---

### `GET /pinpoint-global/pages/:pageKey`

**Path parameter**

| Param | Description |
|-------|-------------|
| `pageKey` | One of: `home`, `about-us`, `our-works`, `contact`, `jobs`, `join-our-team`, `starting-a-new-project`, `privacy-policy` |

**Response `data` (200):**

Non-home:

```json
{
  "pageKey": "about-us",
  "content": {
    "ourStoryTexts": ["paragraph …"],
    "seo": { "title": "…", "description": "…", "keywords": [], "canonicalPath": "/about-us", "openGraph": {}, "twitter": {}, "robots": { "index": true, "follow": true } }
  }
}
```

Home (`pageKey === "home"`):

```json
{
  "pageKey": "home",
  "content": {
    "changingHeroTitleModifiers": ["brands", "campaigns"],
    "seo": {}
  },
  "featuredProjects": [
    {
      "_id": "674a1b2c3d4e5f6789abcdef",
      "slug": "project-slug",
      "name": "string",
      "pageTitle": "string",
      "descSummary": "string",
      "bannerURL": { "image": "https://…" },
      "cardImage": "https://…",
      "featured": true
    }
  ]
}
```

- **Page `content` type:** [§ `PinpointGlobalPageContentStored`](#pg-page-stored).
- **`featuredProjects`:** only on **`home`**; up to **three** [§ public project](#pg-public-project) objects from **active** projects only. Order: `featured === true` first (`updatedAt` desc, tie-break `_id` asc), then others by the same sort until three slots are filled.
- **`projectFilterOptions`:** on **`our-works`** and on **`GET /pinpoint-global/projects`**. Distinct non-empty `sectors` and `services` values taken from every project’s `content` (trimmed), each list sorted alphabetically (cached in Redis; invalidated on project writes). Use with **`GET /pinpoint-global/projects`** query params `sectors` and `services` (service **slugs** as stored on projects).

Our-works (`pageKey === "our-works"`):

```json
{
  "pageKey": "our-works",
  "content": {
    "DEFAULT_WORKS_DISPLAYED": 10,
    "AVAILABLE_SERVICE_IDS": ["branding_and_identity", "marketing_and_media"],
    "seo": {}
  },
  "projectFilterOptions": {
    "sectors": ["Corporate", "Finance"],
    "services": ["branding_and_identity", "web_design"]
  }
}
```

**Errors:** **404** if `pageKey` is not in the list above, or no document exists for that key.

---

### `GET /pinpoint-global/projects`

**Query parameters**

| Query | Default | Max | Description |
|-------|---------|-----|-------------|
| `page` | `1` | — | Page number (≥ 1) |
| `limit` | `12` | `100` | Items per page |
| `sectors` | — | — | Optional filter: repeat the param and/or use comma-separated values (e.g. `sectors=Corporate&sectors=Finance`). A project matches if its `sectors` contains **any** listed value (OR). Values are trimmed; URL-encoded characters are decoded. |
| `services` | — | — | Optional filter: same rules as `sectors`, matched against each project’s `services` array (service **slugs**). |

If both `sectors` and `services` are provided, a project must match **both** groups (AND): at least one requested sector **and** at least one requested service.

**Response `data` (200):**

```json
{
  "projects": [
    {
      "_id": "674a1b2c3d4e5f6789abcdef",
      "slug": "project-slug",
      "name": "string",
      "pageTitle": "string",
      "descSummary": "string",
      "bannerURL": { "image": "https://…" },
      "cardImage": "https://…",
      "descriptionBg": "string",
      "textColorClass": "string",
      "descriptionHighlightPhotos": [],
      "description": "string",
      "services": [],
      "extraServices": [],
      "sectors": [],
      "createdWebsite": "string",
      "renderedServices": [],
      "relatedProjects": [],
      "featured": false,
      "featuredInService": false,
      "keywords": [],
      "serviceBreakdown": [],
      "seo": {}
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 30,
    "pages": 3
  },
  "filters": {
    "sectors": ["Corporate"],
    "services": ["branding_and_identity"]
  },
  "projectFilterOptions": {
    "sectors": ["Corporate", "Finance"],
    "services": ["branding_and_identity", "web_design"]
  }
}
```

- **`filters`:** Echoes the normalized `sectors` and `services` query values applied to this response (empty arrays when those params were omitted).
- **`projectFilterOptions`:** Same facet lists as the **`our-works`** page payload (`GET /pinpoint-global/pages/our-works`).
- **Type:** [§ Public project](#pg-public-project) (`PublicProject[]`).
- **Pagination / filtering:** Matching projects are selected in **MongoDB** (`countDocuments` + `find` with `skip` / `limit`). Only **`isActive !== false`** projects are included. **`updatedAt` descending**, then `slug` ascending. **`featured`** affects home only; **`featuredInService`** affects [§ service detail](#pg-public-service).

---

### `GET /pinpoint-global/projects/:slug`

**Path parameter:** `slug` — unique per site, derived from `content.name` on create/update (with numeric suffixes if needed for uniqueness).

**Response `data` (200):** one [§ public project](#pg-public-project) object (`_id`, `slug`, and all content fields).

**Errors:** **404** if not found or the project is **inactive** (`isActive === false`).

---

### `GET /pinpoint-global/services`

**Response `data` (200):** `{ "services": PublicService[] }` where each element is `PinpointGlobalServiceContent & { _id: string; slug: string }` ([§ Public service](#pg-public-service)). Only **active** services.

**Order:** `slug` ascending. No pagination (small, bounded set).

---

### `GET /pinpoint-global/services/:slug`

**Response `data` (200):** service fields as in the list (`_id`, `slug`, content fields) plus **`featuredProjectsForService`**: up to **four** [§ public project](#pg-public-project) objects.

**Featured selection (idempotent):** Consider **active** projects whose `services` array contains this service’s `slug`. Sort that pool by **`updatedAt` descending**, then **`_id` ascending**. Take up to four with `featuredInService === true` (in that order). If fewer than four, append the next projects from the same sorted pool that are not already included until there are four or the pool is exhausted. If more than four have `featuredInService`, only the four most recently updated are returned.

**Errors:** **404** if not found or the service is **inactive**.

---

### `GET /pinpoint-global/jobs`

**Query parameters**

| Query | Default | Max | Description |
|-------|---------|-----|-------------|
| `page` | `1` | — | Page number (≥ 1) |
| `limit` | `25` | `100` | Items per page |

**Response `data` (200):**

```json
{
  "jobs": [
    {
      "_id": "674a1b2c3d4e5f6789abcdef",
      "slug": "job-slug",
      "title": "string",
      "description": "string"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 25,
    "total": 50,
    "pages": 2
  }
}
```

**Type:** [§ Public job](#pg-public-job). **Order:** `slug` ascending. Only **active** jobs; pagination is **MongoDB** `countDocuments` + `find` with `skip` / `limit`.

---

### `GET /pinpoint-global/jobs/:slug`

**Response `data` (200):** [§ Public job](#pg-public-job).  
**Errors:** **404** if not found or the job is **inactive**.

---

### `GET /pinpoint-global/team`

**Response `data` (200):** `{ "team": TeamRow[] }` — [§ Team](#pg-team).

---

### `GET /pinpoint-global/references`

**Response `data` (200):**

```json
{
  "featured": [{ "logo": "https://…", "link": "https://…" }],
  "marquee": [{ "logo": "https://…" }]
}
```

- Shapes: [§ References](#pg-references). Ordered by stored `order`.

---

### `GET /pinpoint-global/achievements`

**Response `data` (200):** `{ "achievements": AchievementRow[] }` — [§ Achievements](#pg-achievements).

---

### Rate limiting (public)

- **GET** routes above: only the **global** server rate limit (if configured), not a dedicated CMS limiter.
- **POST** `/pinpoint-global/form-submissions`: **20 requests / minute** per client identifier (see below). Counts are stored in **Redis** so the limit is **shared across all app instances** using the same Redis cluster. If Redis is unavailable, `passOnStoreError` allows the request to proceed.

There is **no** public GET for form submissions.

---

## Public POST — form submissions

### `POST /pinpoint-global/form-submissions`

**Headers:** `Content-Type: application/json`

**Purpose:** Insert one immutable **`PinpointGlobalFormSubmission`**. On success, the server notifies eligible admins (in-app + push); failures in that step **do not** change the HTTP result.

#### Request body (JSON)

The body is **strict**: only the fields below are allowed (no extra keys). This matches **`PinpointGlobalFormSubmissionPayload`** / `siteFormSubmissionSchema` in the backend.

| Field | Type | Required | Notes |
|-------|------|----------|--------|
| `formType` | string | Yes | `projectRequest` \| `jobApplication` \| `spontaneousApplication` \| `contact` |
| `formName` | string | Yes | Non-empty, max **240** characters |
| `jobSlug` | string | When `formType === "jobApplication"` | Non-empty, max **200** chars — must match an **active** job’s `slug` or the server returns **400** |
| `email` | string | No | Valid email address (Zod `.email()`, max **320** chars) |
| `phone` | string | No | Max **30** chars |
| `name`, `contactPerson`, `firstName`, `lastName`, `brandName`, `tagline`, … | string | No | Optional strings (max **5 000** chars each); see **`app/validation/siteContentForms.ts`** for the full list. |
| `websitePagesOrSections`, `services`, `rebrandingServices` | string[] | No | Optional string arrays |

**Example:**

```json
{
  "formType": "contact",
  "formName": "contact_page",
  "email": "user@example.com",
  "message": "Hello",
  "phone": "+1234567890"
}
```

The validated object is stored as **`payload`** on the document (same flat shape: `formType`, `formName`, and optional fields). There is **no** duplicate top-level `formType` on the document.

#### Success **201**

```json
{
  "success": true,
  "data": {
    "_id": "674a1b2c3d4e5f6789abcdef",
    "success": true
  },
  "responseCode": 201,
  "message": "Form submission received"
}
```

- **`data._id`**: MongoDB document id as string.

#### Errors

| HTTP | When |
|------|------|
| **400** | Zod validation; missing **`jobSlug`** for **`jobApplication`**; **`jobApplication`** for an **inactive** or unknown job slug (“not available for applications”) |
| **404** | Subsidiary `pinpoint-global` missing or inactive |
| **429** | Form rate limit exceeded — body typically `{ "success": false, "message": "Too many form submissions, try again later." }` (via `express-rate-limit`) |

#### File uploads (v1)

Use **JSON** only. Upload files elsewhere (e.g. presigned URL), then send **URLs / metadata** in the **allowed optional string fields** listed above (extend `formPayload` / Zod if you add new safe fields).

---

# Admin appendix — `/api/v1/admin/site-content/pinpoint-global`

**Authentication:** Same as other admin routes (e.g. session/JWT cookies).  
**Scope:** Admin must have **pinpoint-global** in subsidiary scope (`adminSubsidiaryScope`).  
**Permissions:**

- **Content reads:** `pinpoint-global:content:view` **or** `pinpoint-global:content:manage` (as implemented on each route).
- **Content writes:** `pinpoint-global:content:manage`.
- **Form submissions (GET only):** `pinpoint-global:form-submission:view`.

Success responses use the **same envelope** as public: `{ success, data, responseCode, message }`.

---

## Admin — form submissions (GET only)

Base path: **`/api/v1/admin/site-content/pinpoint-global/form-submissions`**

### `GET .../form-submissions`

**Query parameters**

| Query | Default | Max | Description |
|-------|---------|-----|-------------|
| `page` | `1` | — | Page number (≥ 1) |
| `limit` | `25` | `100` | Page size |
| `formType` | — | — | Optional filter; matches **`payload.formType`** (`projectRequest` \| `jobApplication` \| `spontaneousApplication` \| `contact`) |

**Response `data` (200):**

```json
{
  "submissions": [
    {
      "_id": "674a1b2c3d4e5f6789abcdef",
      "subsidiary": "674a00000000000000000001",
      "payload": {
        "formType": "contact",
        "formName": "contact_page",
        "email": "user@example.com"
      },
      "attachments": [],
      "createdAt": "2026-04-01T12:00:00.000Z",
      "updatedAt": "2026-04-01T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 25,
    "total": 100,
    "pages": 4
  }
}
```

- Sorted by **`createdAt`** descending.
- **`payload`**: full POST body that was stored.
- **`attachments`**: optional array `{ url?, filename?, mimeType?, size? }` per subdocument (usually empty if clients only send JSON).

### `GET .../form-submissions/:submissionId`

**Path:** `submissionId` — Mongo ObjectId string.

**Response `data` (200):** Single submission document (same shape as one element of `submissions` above).

**Errors:** **400** if id invalid; **404** if not found or not in scoped subsidiary.

**Not implemented:** `PATCH`, `PUT`, `DELETE` on submissions.

---

## Admin — site content CRUD (summary)

All paths are under **`/api/v1/admin/site-content/pinpoint-global/`**. Mutating requests use **`Content-Type: application/json`**.

| Method | Path | Request body | Response `data` (success) |
|--------|------|--------------|---------------------------|
| GET | `global-config` | — | `{ "content": {} }` |
| PATCH | `global-config` | `{ "content": { } }` — **`content`** required object | `{ "content": {} }` |
| GET | `pages` | — | `{ "pages": [ { "pageKey", "content" } ] }` |
| GET | `pages/:pageKey` | — | `{ "pageKey", "content" }` |
| PATCH | `pages/:pageKey` | `{ "content": { } }` — only fields valid for that `pageKey` accepted | `{ "pageKey", "content" }` |
| GET | `projects` | — | `{ "projects": [ full project docs ] }` |
| POST | `projects` | `{ "content": { "name": "…", … }, "isActive"? }` — optional **`isActive`** (default **true**); **`slug` auto-generated** from `content.name` | Created project document (includes **`isActive`**) |
| GET | `projects/:slug` | — | Full project document |
| PATCH | `projects/:slug` | At least one of **`content`** or **`isActive`**. With **`content`**: full valid project `content`; **`slug` regenerated** from `content.name` when needed. **`{ "isActive": false }`** alone toggles visibility. | Updated project document |
| DELETE | `projects/:slug` | — | `{ "deleted": true }` |
| GET | `services` | — | `{ "services": [ … ] }` |
| POST | `services` | `{ "content": { "name": "…", … }, "isActive"? }` | Created service document |
| GET | `services/:slug` | — | Full service document |
| PATCH | `services/:slug` | Same pattern as projects: optional **`content`** and/or **`isActive`** | Updated service document |
| DELETE | `services/:slug` | — | `{ "deleted": true }` |
| GET | `jobs` | — | `{ "jobs": [ … ] }` |
| POST | `jobs` | `{ "content": { "title": "…", … }, "isActive"? }` — **`slug` auto-generated** from `content.title` | Created job document |
| GET | `jobs/:slug` | — | Full job document |
| PATCH | `jobs/:slug` | Optional **`content`** and/or **`isActive`** (same as projects) | Updated job document |
| DELETE | `jobs/:slug` | — | `{ "deleted": true }` |
| GET | `team` | — | `{ "team": [ full member docs ] }` |
| POST | `team` | `{ "content": { "name": "…", … }, "order"? }` — **`memberKey` auto-generated** from `content.name` | Created member document |
| PATCH | `team/:memberKey` | `{ "content"? , "order"? }` — at least one required | Updated member document |
| DELETE | `team/:memberKey` | — | `{ "deleted": true }` |
| GET | `references` | — | `{ "references": [ full reference docs with _id, kind, order, content ] }` |
| POST | `references` | `{ "kind": "featured"\|"marquee", "content": {} }` — `order` auto-assigned | Created reference document |
| PATCH | `references/:referenceId` | `{ "content": {} }` | Updated reference document |
| DELETE | `references/:referenceId` | — | `{ "deleted": true }` |
| GET | `achievements` | — | `{ "achievements": [ … ] }` |
| POST | `achievements` | `{ "content": { … } }` — `order` auto-assigned | Created achievement document |
| PATCH | `achievements/:achievementId` | `{ "content": { … } }` — replaces achievement `content` | Updated achievement document |
| DELETE | `achievements/:achievementId` | — | `{ "deleted": true }` |

**Slugs:** On **create** and on **PATCH** when **`content`** is sent, URL slugs are regenerated from **`content.name`** (projects, services) or **`content.title`** (jobs), with numeric suffixes when needed for uniqueness. The document field is **`slug`** (not `projectId` / `serviceId` / `jobId`). **`content` does not include `id`.** On PATCH with **`content`**, the response may show a new `slug` if the name/title changed; clients should follow the returned `slug` for subsequent requests.

**Reference fields:** For projects, `relatedProjects` and `services` hold **slugs**. For services, each `expertise.breakdown[].services` entry must be an existing **service slug**. Unknown project or service slugs sent by the client are **removed silently** on create/update (no error).

**Existing databases:** If you already have `PinpointGlobalProject` / `Service` / `Job` documents using `projectId`, `serviceId`, or `jobId`, run a one-off MongoDB migration to rename those fields to **`slug`** and remove **`content.id`** from each document before deploying this schema.

**Caching:** Most public responses are cached in Redis (TTL ≈ 1 hour). **`GET /pinpoint-global/projects`** is not cached as a full list; it queries MongoDB with pagination. **`projectFilterOptions`** (also on **`our-works`**) is cached and invalidated on project writes. Redis read failures for Pinpoint Global cache keys are logged and the handler falls back to MongoDB. Admin writes invalidate the relevant cache keys so public endpoints reflect changes immediately.

**Audit logging:** All admin write operations (create, update, delete) are recorded in the audit log with the acting admin, action type, resource, and description.

**HTTP status:** **201** on create where applicable; **200** otherwise. **403** if subsidiary out of scope or missing permission; **404** / **409** as usual.

Machine-readable paths, permission arrays, and **typed** request/response shapes for the admin app are in **pinpoint-admin** `lib/constants/endpoints.ts` (`PG_SITE_*` keys), using TypeScript types from **pinpoint-backend** `app/lib/types/pinpointGlobal` via the `@backend-types/*` path alias in `pinpoint-admin/tsconfig.json`.

Per-field display hints for CMS `content` and document wrappers are exported from the same module as **`PG_*_CONTENT_FIELD_PURPOSE`** and **`PG_PINPOINT_GLOBAL_*_DOC_FIELD_PURPOSE`** (defined in `lib/constants/pinpointGlobalCmsFieldPurposes.ts` and `pinpointGlobalCmsDocumentFieldPurposes.ts`). Each map is `satisfies { [K in keyof T]: string }` so it stays aligned with the backend types.
