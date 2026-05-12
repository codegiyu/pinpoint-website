/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  RequestFormProps,
  StringOrStringArraySchema,
} from '@/components/sections/forms/ProjectRequestForm';
import { z } from 'zod';
import { default as pick } from 'lodash/pick';
import { generateOptionsFromArray } from '../utils/general';
import type { PublicService } from '@/lib/api/pinpoint-public-types';
import {
  getAllIndividualServicesFromCatalog,
  getPackageOptionsForServiceSync,
} from '../utils/cms-mappers';
import {
  bagIntakeDefaults,
  bagIntakeFormSchema,
  bagIntakeFormSections,
  boxIntakeDefaults,
  boxIntakeFormSchema,
  boxIntakeFormSections,
  eventCampaignBrandingIntakeFormSchema,
  eventCampaignDefaultValues,
  eventFlyerFormSections,
  flyerDesignDefaultValues,
  flyerDesignIntakeFormSchema,
  logoBrandIdentityDefaultValues,
  logoBrandIdentityFormSchema,
  logoBrandIdentityFormSections,
  packIntakeDefaults,
  packIntakeFormSchema,
  packIntakeFormSections,
  pouchIntakeDefaults,
  pouchIntakeFormSchema,
  pouchIntakeFormSections,
  publicationIntakeDefaults,
  publicationIntakeFormSchema,
  publicationIntakeFormSections,
  stationeryIntakeDefaults,
  stationeryIntakeFormSchema,
  stationeryIntakeFormSections,
  stickerIntakeDefaultValues,
  stickerIntakeFormSchema,
  stickerIntakeFormSections,
} from './design-intake-forms';

const ENQUIRY_CATALOG_LINE = "I'm just making enquiries";

/** Individual service ids offered in project-request multiselects (from CMS catalog). */
function individualServiceSlugsFromCatalog(services: PublicService[]): string[] {
  return getAllIndividualServicesFromCatalog(services).filter(
    slug => slug !== ENQUIRY_CATALOG_LINE
  );
}

function serviceSlugsListedUnderPackage(services: PublicService[], packageSlug: string): string[] {
  const group = services.find(s => s.slug === packageSlug);
  if (!group) return [];
  return [...new Set(group.expertise.breakdown.flatMap(b => b.services))];
}

/**
 * Pre-select a few services for smoother UX: prefer items listed under the primary service group,
 * then fall back to any catalog offerings so `min(1)` validation still passes when CMS data exists.
 */
function defaultMultiselectServiceIds(
  services: PublicService[],
  primaryPackageSlug: string,
  max = 3
): string[] {
  const allowed = new Set(individualServiceSlugsFromCatalog(services));
  const preferred = serviceSlugsListedUnderPackage(services, primaryPackageSlug)
    .filter(slug => allowed.has(slug))
    .slice(0, max);
  if (preferred.length) return preferred;
  return Array.from(allowed).slice(0, Math.min(max, Math.max(1, allowed.size)));
}

const ALL_FIELDS_SCHEMA: Record<string, StringOrStringArraySchema> = {
  name: z.string().min(3, { error: 'Please enter at least 3 characters' }),
  contactPerson: z.string().min(3, { error: 'Please enter at least 3 characters' }),
  firstName: z.string({ error: 'Please enter your first name' }),
  lastName: z.string({ error: 'Please enter your last name' }),
  brandName: z.string({ error: 'Please enter a value' }),
  tagline: z.string(),
  email: z.email({ error: 'Please enter a valid email' }),
  phone: z
    .string()
    .min(11, { error: 'Please enter at least 11 characters' })
    .max(14, { error: 'Phone number is too long' }),
  productName: z.string({ error: 'Please enter a value' }),
  productType: z.string({ error: 'Please enter a value' }),
  designProjectPurpose: z.string({ error: 'Please enter a value' }),
  designProjectMessage: z.string({ error: 'Please enter a value' }),
  targetAudienceValuesAndInterests: z.string({ error: 'Please enter a value' }),
  favouriteDesignStyles: z.string({ error: 'Please enter a value' }),
  designElementsInMind: z.string({ error: 'Please enter a value' }),
  designRequirements: z.string({ error: 'Please enter a value' }),
  existingBrandGuidelines: z.string({ error: 'Please enter a value' }),
  designFormatsNeeded: z.string({ error: 'Please enter a value' }),
  numberOfDesignConceptsExpected: z.string({ error: 'Please enter a value' }),
  desiredLogoColors: z.string({ error: 'Please enter a value' }),
  industryOrCategory: z.string({ error: 'Please enter a value' }),
  company: z.string({ error: 'Please enter a value' }),
  targetAudience: z.string({ error: 'Please enter a value' }),
  companyGoals: z.string({ error: 'Please enter a value' }),
  companyValues: z.string({ error: 'Please enter a value' }),
  companyPersonality: z.string({ error: 'Please enter a value' }),
  companyNameTone: z.string({ error: 'Please enter a value' }),
  namingStyle: z.string({ error: 'Please enter a value' }),
  specificLengthOrSoundForCompanyName: z.string({ error: 'Please enter a value' }),
  brandNameSameWithCompanyName: z.string({ error: 'Please select an option' }),
  wordsOrPhrasesToInclude: z.string(),
  wordsOrPhrasesToAvoid: z.string(),
  whatBrandAimsToAchieve: z.string({ error: 'Please enter a value' }),
  stickerShape: z.string({ error: 'Please enter a value' }),
  stickerType: z.string({ error: 'Please enter a value' }),
  stickerQuantity: z.string({ error: 'Please enter a value' }),
  stickerDesignAlreadyOwned: z.string({ error: 'Please enter a value' }),
  stickerApplicationType: z.string({ error: 'Please enter a value' }),
  stickerDimensions: z.string({ error: 'Please enter a value' }),
  existingWebsite: z.string(),
  aboutTheBrand: z.string().min(10, { error: 'Please enter more details about your brand' }),
  onlineBrandInfo: z.string(),
  websiteGoal: z
    .string()
    .min(10, { error: 'Please enter more about the main goal of your website' }),
  expectedVisitorActions: z.string().min(1, { error: 'Let us hear your thoughts on this please' }),
  websiteStyle: z.string().min(1, { error: 'Please select an option' }),
  websiteInspirationLink: z.string({ error: 'Please enter a value' }),
  preferredDomainName: z.string({ error: 'Please enter a value' }),
  websiteType: z.string({ error: 'Please select an option' }),
  websiteDescription: z.string({ error: 'Please enter a value' }),
  websitePagesOrSections: z
    .array(z.string())
    .min(1, { error: 'Please select at least one option' }),
  websiteWrittenContent: z.string({ error: 'Please select an option' }),
  featuredMedia: z.string({ error: 'Please select an option' }),
  specialFeatures: z.string(),
  domainOrHosting: z.string({ error: 'Please select an option' }),
  services: z.array(z.string()).min(1, { error: 'Please select at least one service' }),
  rebrandingServices: z.array(z.string()).min(1, { error: 'Please select at least one service' }),
  package: z.string({ error: 'Please select a package' }),
  requireWebsite: z.string({ error: 'Please select an option' }),
  brandServices: z.string({ error: 'Please input your response' }),
  brandStory: z.string({ error: 'Please input your response' }),
  message: z.string().min(10, { error: 'Message is not long enough' }),
  requestDetails: z.string().min(10, { error: 'Additional information is not long enough' }),
  additionalInfo: z.string(),
};

export const ALL_FIELDS_DEFAULT: Record<string, string | string[]> = {
  name: '',
  contactPerson: '',
  firstName: '',
  lastName: '',
  brandName: '',
  tagline: '',
  email: '',
  phone: '',
  productName: '',
  productType: '',
  designProjectPurpose: '',
  designProjectMessage: '',
  targetAudienceValuesAndInterests: '',
  favouriteDesignStyles: '',
  designElementsInMind: '',
  designRequirements: '',
  existingBrandGuidelines: '',
  designFormatsNeeded: '',
  numberOfDesignConceptsExpected: '',
  desiredLogoColors: '',
  industryOrCategory: '',
  company: '',
  targetAudience: '',
  companyGoals: '',
  companyValues: '',
  companyPersonality: '',
  companyNameTone: '',
  namingStyle: '',
  specificLengthOrSoundForCompanyName: '',
  brandNameSameWithCompanyName: '',
  wordsOrPhrasesToInclude: '',
  wordsOrPhrasesToAvoid: '',
  whatBrandAimsToAchieve: '',
  stickerShape: '',
  stickerType: '',
  stickerQuantity: '',
  stickerDesignAlreadyOwned: '',
  stickerApplicationType: '',
  stickerDimensions: '',
  existingWebsite: '',
  aboutTheBrand: '',
  onlineBrandInfo: '',
  websiteGoal: '',
  expectedVisitorActions: '',
  websiteStyle: '',
  websiteInspirationLink: '',
  preferredDomainName: '',
  websiteType: '',
  websiteDescription: '',
  websitePagesOrSections: [],
  websiteWrittenContent: '',
  featuredMedia: '',
  specialFeatures: '',
  domainOrHosting: '',
  services: [],
  rebrandingServices: [],
  package: '',
  requireWebsite: '',
  brandServices: '',
  brandStory: '',
  message: '',
  requestDetails: '',
  additionalInfo: '',
};

export const customFormSchema = z.object({
  name: ALL_FIELDS_SCHEMA.name,
  email: ALL_FIELDS_SCHEMA.email,
  phone: ALL_FIELDS_SCHEMA.phone,
  company: ALL_FIELDS_SCHEMA.company,
  services: ALL_FIELDS_SCHEMA.services,
  requestDetails: ALL_FIELDS_SCHEMA.requestDetails,
});
export const brandingFormSchema = logoBrandIdentityFormSchema;
export const rebrandingFormSchema = z.object({
  firstName: ALL_FIELDS_SCHEMA.firstName,
  lastName: ALL_FIELDS_SCHEMA.lastName,
  phone: ALL_FIELDS_SCHEMA.phone,
  email: ALL_FIELDS_SCHEMA.email,
  rebrandingServices: ALL_FIELDS_SCHEMA.rebrandingServices,
  requestDetails: ALL_FIELDS_SCHEMA.requestDetails,
});
export const brandNamingFormSchema = z.object({
  company: ALL_FIELDS_SCHEMA.company,
  industryOrCategory: ALL_FIELDS_SCHEMA.industryOrCategory,
  targetAudience: ALL_FIELDS_SCHEMA.targetAudience,
  companyGoals: ALL_FIELDS_SCHEMA.companyGoals,
  companyValues: ALL_FIELDS_SCHEMA.companyValues,
  companyPersonality: ALL_FIELDS_SCHEMA.companyPersonality,
  companyNameTone: ALL_FIELDS_SCHEMA.companyNameTone,
  namingStyle: ALL_FIELDS_SCHEMA.namingStyle,
  specificLengthOrSoundForCompanyName: ALL_FIELDS_SCHEMA.specificLengthOrSoundForCompanyName,
  brandNameSameWithCompanyName: ALL_FIELDS_SCHEMA.brandNameSameWithCompanyName,
  wordsOrPhrasesToInclude: ALL_FIELDS_SCHEMA.wordsOrPhrasesToInclude,
  wordsOrPhrasesToAvoid: ALL_FIELDS_SCHEMA.wordsOrPhrasesToAvoid,
  package: ALL_FIELDS_SCHEMA.package,
  additionalInfo: ALL_FIELDS_SCHEMA.additionalInfo,
});
export const brandActivationFormSchema = z.object({
  company: ALL_FIELDS_SCHEMA.company,
  email: ALL_FIELDS_SCHEMA.email,
  phone: ALL_FIELDS_SCHEMA.phone,
  whatBrandAimsToAchieve: ALL_FIELDS_SCHEMA.whatBrandAimsToAchieve,
  services: ALL_FIELDS_SCHEMA.services,
  package: ALL_FIELDS_SCHEMA.package,
});
export const logoDesignFormSchema = logoBrandIdentityFormSchema;
export const campaignBrandingFormSchema = eventCampaignBrandingIntakeFormSchema;
export const flyerDesignFormSchema = flyerDesignIntakeFormSchema;
export const productDesignFormSchema = z.object({
  company: ALL_FIELDS_SCHEMA.company,
  contactPerson: ALL_FIELDS_SCHEMA.contactPerson,
  phone: ALL_FIELDS_SCHEMA.phone,
  email: ALL_FIELDS_SCHEMA.email,
  productName: ALL_FIELDS_SCHEMA.productName,
  productType: ALL_FIELDS_SCHEMA.productType,
  designProjectPurpose: ALL_FIELDS_SCHEMA.designProjectPurpose,
  designProjectMessage: ALL_FIELDS_SCHEMA.designProjectMessage,
  targetAudience: ALL_FIELDS_SCHEMA.targetAudience,
  targetAudienceValuesAndInterests: ALL_FIELDS_SCHEMA.targetAudienceValuesAndInterests,
  favouriteDesignStyles: ALL_FIELDS_SCHEMA.favouriteDesignStyles,
  designElementsInMind: ALL_FIELDS_SCHEMA.designElementsInMind,
  designRequirements: ALL_FIELDS_SCHEMA.designRequirements,
  existingBrandGuidelines: ALL_FIELDS_SCHEMA.existingBrandGuidelines,
  designFormatsNeeded: ALL_FIELDS_SCHEMA.designFormatsNeeded,
  numberOfDesignConceptsExpected: ALL_FIELDS_SCHEMA.numberOfDesignConceptsExpected,
  package: ALL_FIELDS_SCHEMA.package,
  services: ALL_FIELDS_SCHEMA.services,
  additionalInfo: ALL_FIELDS_SCHEMA.additionalInfo,
});
export const socialMediaFormSchema = z.object({
  brandName: ALL_FIELDS_SCHEMA.brandName,
  phone: ALL_FIELDS_SCHEMA.phone,
  email: ALL_FIELDS_SCHEMA.email,
  services: ALL_FIELDS_SCHEMA.services,
  package: ALL_FIELDS_SCHEMA.package,
  additionalInfo: ALL_FIELDS_SCHEMA.additionalInfo,
});
export const stickerFormSchema = stickerIntakeFormSchema;
export const publicationDesignFormSchema = publicationIntakeFormSchema;
export const stationeryDesignFormSchema = stationeryIntakeFormSchema;
export const bagDesignFormSchema = bagIntakeFormSchema;
export const pouchDesignFormSchema = pouchIntakeFormSchema;
export const boxDesignFormSchema = boxIntakeFormSchema;
export const packDesignFormSchema = packIntakeFormSchema;
export const digitalProductsFormSchema = z.object({
  brandName: ALL_FIELDS_SCHEMA.brandName,
  contactPerson: ALL_FIELDS_SCHEMA.contactPerson,
  phone: ALL_FIELDS_SCHEMA.phone,
  email: ALL_FIELDS_SCHEMA.email,
  tagline: ALL_FIELDS_SCHEMA.tagline,
  existingWebsite: ALL_FIELDS_SCHEMA.existingWebsite,
  aboutTheBrand: ALL_FIELDS_SCHEMA.aboutTheBrand,
  onlineBrandInfo: ALL_FIELDS_SCHEMA.onlineBrandInfo,
  websiteGoal: ALL_FIELDS_SCHEMA.websiteGoal,
  expectedVisitorActions: ALL_FIELDS_SCHEMA.expectedVisitorActions,
  websiteStyle: ALL_FIELDS_SCHEMA.websiteStyle,
  websiteInspirationLink: ALL_FIELDS_SCHEMA.websiteInspirationLink,
  preferredDomainName: ALL_FIELDS_SCHEMA.preferredDomainName,
  websiteType: ALL_FIELDS_SCHEMA.websiteType,
  websiteDescription: ALL_FIELDS_SCHEMA.websiteDescription,
  websitePagesOrSections: ALL_FIELDS_SCHEMA.websitePagesOrSections,
  websiteWrittenContent: ALL_FIELDS_SCHEMA.websiteWrittenContent,
  featuredMedia: ALL_FIELDS_SCHEMA.featuredMedia,
  specialFeatures: ALL_FIELDS_SCHEMA.specialFeatures,
  domainOrHosting: ALL_FIELDS_SCHEMA.domainOrHosting,
  package: ALL_FIELDS_SCHEMA.package,
  additionalInfo: ALL_FIELDS_SCHEMA.additionalInfo,
});

export const customRequestFormData = (
  _services: PublicService[]
): RequestFormProps<typeof customFormSchema> => {
  return {
    serviceId: 'make_a_custom_request',
    formName: 'Custom Project Request',
    formSchema: customFormSchema,
    defaultFormValues: {
      ...pick(ALL_FIELDS_DEFAULT, [
        'name',
        'email',
        'phone',
        'company',
        'services',
        'requestDetails',
      ]),
      services: [ENQUIRY_CATALOG_LINE],
    },
    formSections: [
      {
        inputsArr: [
          [
            {
              name: 'name',
              kind: 'input',
              inputProps: {
                label: 'Name',
                required: true,
              },
            },
            {
              name: 'email',
              kind: 'input',
              inputProps: {
                label: 'Email',
                type: 'email',
                required: true,
              },
            },
          ],
          [
            {
              name: 'phone',
              kind: 'input',
              inputProps: {
                label: 'Phone Number',
                required: true,
              },
            },
            {
              name: 'company',
              kind: 'input',
              inputProps: {
                label: 'Company',
                required: true,
              },
            },
          ],
          {
            name: 'services',
            kind: 'multiselect',
            multiSelectProps: {
              label: 'Select all services you may require',
              subtext: '(Select at least one)',
              options: [],
              useServiceOptions: true,
              required: true,
            },
          },
          {
            kind: 'file',
            fileProps: { inputProps: { required: false }, label: 'Select Files' },
          },
          {
            name: 'requestDetails',
            kind: 'textarea',
            textareaProps: {
              label: 'Additional Info',
              required: true,
            },
          },
        ],
      },
    ],
  };
};

export const enquiryFormData = (
  services: PublicService[]
): RequestFormProps<typeof customFormSchema> => ({
  ...customRequestFormData(services),
  serviceId: 'make_an_enquiry',
  formName: 'Enquiry',
});

export const brandingRequestFormData = (
  services: PublicService[]
): RequestFormProps<typeof brandingFormSchema> => ({
  serviceId: 'branding',
  formName: 'Branding Request',
  formSchema: brandingFormSchema,
  defaultFormValues: logoBrandIdentityDefaultValues(),
  formSections: logoBrandIdentityFormSections(services, 'branding', 'branding_and_identity'),
});

export const rebrandingRequestFormData = (
  services: PublicService[]
): RequestFormProps<typeof rebrandingFormSchema> => {
  return {
    serviceId: 'rebranding',
    formName: 'Rebranding Request',
    formSchema: rebrandingFormSchema,
    defaultFormValues: {
      ...pick(ALL_FIELDS_DEFAULT, [
        'firstName',
        'lastName',
        'phone',
        'email',
        'rebrandingServices',
        'requestDetails',
      ]),
      rebrandingServices: defaultMultiselectServiceIds(services, 'branding_and_identity', 3),
    },
    formSections: [
      {
        inputsArr: [
          [
            {
              name: 'firstName',
              kind: 'input',
              inputProps: {
                label: 'First Name',
                required: true,
              },
            },
            {
              name: 'lastName',
              kind: 'input',
              inputProps: {
                label: 'Last Name',
                required: true,
              },
            },
          ],
          [
            {
              name: 'phone',
              kind: 'input',
              inputProps: {
                label: 'Phone Number',
                required: true,
              },
            },
            {
              name: 'email',
              kind: 'input',
              inputProps: {
                label: 'Email',
                type: 'email',
                required: true,
              },
            },
          ],
          {
            name: 'rebrandingServices',
            kind: 'multiselect',
            multiSelectProps: {
              options: [],
              label: 'Please select services you may need',
              useServiceOptions: true,
            },
          },
          {
            kind: 'file',
            fileProps: { inputProps: { required: false }, label: 'Select Files' },
          },
          {
            name: 'requestDetails',
            kind: 'textarea',
            textareaProps: {
              label: 'Details and request',
              required: true,
            },
          },
        ],
      },
    ],
  };
};

export const brandNamingRequestFormData = (
  services: PublicService[]
): RequestFormProps<typeof brandNamingFormSchema> => ({
  serviceId: 'brand_naming',
  formName: 'Brand Naming Request',
  formSchema: brandNamingFormSchema,
  defaultFormValues: pick(ALL_FIELDS_DEFAULT, [
    'company',
    'industryOrCategory',
    'targetAudience',
    'companyGoals',
    'companyValues',
    'companyPersonality',
    'companyNameTone',
    'namingStyle',
    'specificLengthOrSoundForCompanyName',
    'brandNameSameWithCompanyName',
    'wordsOrPhrasesToInclude',
    'wordsOrPhrasesToAvoid',
    'package',
    'additionalInfo',
  ]),
  formSections: [
    {
      inputsArr: [
        [
          {
            name: 'company',
            kind: 'input',
            inputProps: {
              label: 'Company Name',
              subtext: '(if existing)',
              required: true,
            },
          },
          {
            name: 'industryOrCategory',
            kind: 'input',
            inputProps: {
              label: 'Industry / Category',
              required: true,
            },
          },
        ],
        {
          name: 'companyGoals',
          kind: 'textarea',
          textareaProps: {
            label: 'What are your goals for the brand and company name?',
            subtext: '(eg, establish credibility, convey innovation)',
            required: true,
          },
        },
        {
          name: 'companyValues',
          kind: 'textarea',
          textareaProps: {
            label: 'What values do you want the brand and company to represent?',
            subtext: '(eg, trust, creativity, sustainability)',
            required: true,
          },
        },
        {
          name: 'companyPersonality',
          kind: 'input',
          inputProps: {
            label: 'How would you describe the brand and company personality?',
            subtext: '(eg, friendly, professional, playful)',
            required: true,
          },
        },
        {
          name: 'companyNameTone',
          kind: 'input',
          inputProps: {
            label: 'What tone do you want the brand and company name to convey?',
            subtext: '(eg, serious, humorous, inspiring)',
            required: true,
          },
        },
        {
          name: 'namingStyle',
          kind: 'input',
          inputProps: {
            label: 'Do you have any specific naming styles in mind?',
            subtext: '(eg, descriptive, suggestive, literal)',
            required: true,
          },
        },
        {
          name: 'specificLengthOrSoundForCompanyName',
          kind: 'input',
          inputProps: {
            label: 'Do you prefer a specific length or sound for the brand and company name?',
            required: true,
          },
        },
        {
          name: 'brandNameSameWithCompanyName',
          kind: 'select',
          selectProps: {
            label: 'Do you want your brand name to be the same as your company name?',
            options: generateOptionsFromArray({
              arr: ['Same', 'Different'],
            }),
            required: true,
          },
        },
        {
          name: 'wordsOrPhrasesToInclude',
          kind: 'input',
          inputProps: {
            label:
              'Are there any words or phrases that must be included in the brand and company name?',
            required: false,
          },
        },
        {
          name: 'wordsOrPhrasesToAvoid',
          kind: 'input',
          inputProps: {
            label: 'Are there any words or phrases that must be avoided?',
            required: false,
          },
        },
        {
          name: 'package',
          kind: 'select',
          selectProps: {
            label: 'Choose a package',
            options: generateOptionsFromArray({
              arr: getPackageOptionsForServiceSync(
                services,
                'brand_naming',
                'branding_and_identity'
              ),
              capitalize: false,
            }),
            required: true,
          },
        },
        {
          name: 'additionalInfo',
          kind: 'textarea',
          textareaProps: {
            label: 'Additional Info',
            required: false,
          },
        },
      ],
    },
  ],
});

export const brandingActivationRequestFormData = (
  services: PublicService[]
): RequestFormProps<typeof brandActivationFormSchema> => ({
  serviceId: 'brand_activation',
  formName: 'Branding Activation Request',
  formSchema: brandActivationFormSchema,
  defaultFormValues: {
    ...pick(ALL_FIELDS_DEFAULT, [
      'company',
      'email',
      'phone',
      'whatBrandAimsToAchieve',
      'services',
      'package',
    ]),
    services: defaultMultiselectServiceIds(services, 'branding_and_identity', 3),
  },
  formSections: [
    {
      inputsArr: [
        {
          name: 'company',
          kind: 'input',
          inputProps: {
            label: 'Company Name',
            required: true,
          },
        },
        [
          {
            name: 'email',
            kind: 'input',
            inputProps: {
              label: 'Email',
              type: 'email',
              required: true,
            },
          },
          {
            name: 'phone',
            kind: 'input',
            inputProps: {
              label: 'Phone Number',
              required: true,
            },
          },
        ],
        {
          name: 'whatBrandAimsToAchieve',
          kind: 'textarea',
          textareaProps: {
            label: 'What does your brand aim to achieve?',
            required: true,
          },
        },
        {
          name: 'services',
          kind: 'multiselect',
          multiSelectProps: {
            label: 'Select all services you may require',
            subtext: '(Select at least one)',
            options: [],
            useServiceOptions: true,
            required: true,
          },
        },
        {
          name: 'package',
          kind: 'select',
          selectProps: {
            label: 'Choose a package',
            options: generateOptionsFromArray({
              arr: getPackageOptionsForServiceSync(services, 'branding', 'branding_and_identity'),
              capitalize: false,
            }),
            required: true,
          },
        },
      ],
    },
  ],
});

export const logoDesignRequestFormData = (
  services: PublicService[]
): RequestFormProps<typeof logoDesignFormSchema> => ({
  serviceId: 'professional_logo_design',
  formName: 'Logo Design Request',
  formSchema: logoDesignFormSchema,
  defaultFormValues: logoBrandIdentityDefaultValues(),
  formSections: logoBrandIdentityFormSections(
    services,
    'professional_logo_design',
    'branding_and_identity'
  ),
});

export const campaignBrandingRequestFormData = (
  services: PublicService[]
): RequestFormProps<typeof campaignBrandingFormSchema> => ({
  serviceId: 'campaign_branding',
  formName: 'Event and Campaign Branding Request',
  formSchema: campaignBrandingFormSchema,
  defaultFormValues: eventCampaignDefaultValues(),
  formSections: eventFlyerFormSections(services, true, 'campaign_branding', 'marketing_and_media'),
});

export const flyerDesignRequestFormData = (
  services: PublicService[]
): RequestFormProps<typeof flyerDesignFormSchema> => ({
  serviceId: 'flyer_design',
  formName: 'Flyer Design Request',
  formSchema: flyerDesignFormSchema,
  defaultFormValues: flyerDesignDefaultValues(),
  formSections: eventFlyerFormSections(services, false, 'campaign_branding', 'marketing_and_media'),
});

export const productDesignRequestFormData = (
  services: PublicService[]
): RequestFormProps<typeof productDesignFormSchema> => ({
  serviceId: 'packaging_and_product_design',
  formName: 'Packaging & Product Design Request',
  formSchema: productDesignFormSchema,
  defaultFormValues: {
    ...pick(ALL_FIELDS_DEFAULT, [
      'company',
      'contactPerson',
      'phone',
      'email',
      'productName',
      'productType',
      'designProjectPurpose',
      'designProjectMessage',
      'targetAudience',
      'targetAudienceValuesAndInterests',
      'favouriteDesignStyles',
      'designElementsInMind',
      'designRequirements',
      'existingBrandGuidelines',
      'designFormatsNeeded',
      'numberOfDesignConceptsExpected',
      'package',
      'services',
      'additionalInfo',
    ]),
    services: defaultMultiselectServiceIds(services, 'packaging_and_product_design', 3),
  },
  formSections: [
    {
      inputsArr: [
        [
          {
            name: 'company',
            kind: 'input',
            inputProps: {
              label: 'Company Name',
              required: true,
            },
          },
          {
            name: 'contactPerson',
            kind: 'input',
            inputProps: {
              label: 'Contact Person',
              required: true,
            },
          },
        ],
        [
          {
            name: 'email',
            kind: 'input',
            inputProps: {
              label: 'Email',
              type: 'email',
              required: true,
            },
          },
          {
            name: 'phone',
            kind: 'input',
            inputProps: {
              label: 'Phone Number',
              required: true,
            },
          },
        ],
        [
          {
            name: 'productName',
            kind: 'input',
            inputProps: {
              label: 'Product Name',
              required: true,
            },
          },
          {
            name: 'productType',
            kind: 'input',
            inputProps: {
              label: 'Product Type',
              required: true,
            },
          },
        ],
        {
          name: 'designProjectPurpose',
          kind: 'textarea',
          textareaProps: {
            label: 'Please describe the purpose and goals of the design project',
            required: true,
          },
        },
        {
          name: 'designProjectMessage',
          kind: 'input',
          inputProps: {
            label: 'What message do you want to convey through the design?',
            required: true,
          },
        },
        {
          name: 'targetAudience',
          kind: 'input',
          inputProps: {
            label: 'Who is your target audience?',
            required: true,
          },
        },
        {
          name: 'targetAudienceValuesAndInterests',
          kind: 'textarea',
          textareaProps: {
            label: 'What are their values and interests',
            required: true,
          },
        },
        {
          name: 'favouriteDesignStyles',
          kind: 'input',
          inputProps: {
            label: 'What are your favourite colors, fonts and design styles?',
            required: true,
          },
        },
        {
          name: 'designElementsInMind',
          kind: 'input',
          inputProps: {
            label: 'Do you have any specific design elements in mind?',
            subtext: '(e.g images, icons, patterns)',
            required: true,
          },
        },
        {
          name: 'designRequirements',
          kind: 'input',
          inputProps: {
            label: 'What are the specific design requirements?',
            subtext: '(e.g size, resolution, format)',
            required: true,
          },
        },
        {
          name: 'existingBrandGuidelines',
          kind: 'input',
          inputProps: {
            label: 'Do you have any existing brand guidelines?',
            subtext: '(e.g logos, color schemes)',
            required: true,
          },
        },
        {
          name: 'designFormatsNeeded',
          kind: 'input',
          inputProps: {
            label: 'What design formats do you need?',
            subtext: '(e.g CDR, PSD, AI, JPEG, PNG)',
            required: true,
          },
        },
        {
          name: 'numberOfDesignConceptsExpected',
          kind: 'input',
          inputProps: {
            label: 'How many design concepts would you like to see?',
            required: true,
          },
        },
        {
          name: 'package',
          kind: 'select',
          selectProps: {
            label: 'Choose a package',
            options: generateOptionsFromArray({
              arr: getPackageOptionsForServiceSync(
                services,
                'packaging_and_product_design',
                'packaging_and_product_design'
              ),
              capitalize: false,
            }),
            required: true,
          },
        },
        {
          name: 'services',
          kind: 'multiselect',
          multiSelectProps: {
            label: 'Select all services you may require',
            subtext: '(Select at least one)',
            options: [],
            useServiceOptions: true,
            required: true,
          },
        },
        {
          kind: 'file',
          fileProps: { inputProps: { required: false }, label: 'Select Files' },
        },
        {
          name: 'additionalInfo',
          kind: 'textarea',
          textareaProps: {
            label: 'Additional Info',
            required: false,
          },
        },
      ],
    },
  ],
});

export const socialMediaRequestFormData = (
  services: PublicService[]
): RequestFormProps<typeof socialMediaFormSchema> => ({
  serviceId: 'social_media_strategy',
  formName: 'Social Media Strategy Request',
  formSchema: socialMediaFormSchema,
  defaultFormValues: {
    ...pick(ALL_FIELDS_DEFAULT, [
      'brandName',
      'email',
      'phone',
      'package',
      'services',
      'additionalInfo',
    ]),
    services: defaultMultiselectServiceIds(services, 'marketing_and_media', 3),
  },
  formSections: [
    {
      inputsArr: [
        {
          name: 'brandName',
          kind: 'input',
          inputProps: {
            label: 'Brand Name',
            required: true,
          },
        },
        [
          {
            name: 'email',
            kind: 'input',
            inputProps: {
              label: 'Email',
              type: 'email',
              required: true,
            },
          },
          {
            name: 'phone',
            kind: 'input',
            inputProps: {
              label: 'Phone Number',
              required: true,
            },
          },
        ],
        {
          name: 'package',
          kind: 'select',
          selectProps: {
            label: 'Choose a package',
            options: generateOptionsFromArray({
              arr: getPackageOptionsForServiceSync(
                services,
                'social_media_strategy',
                'marketing_and_media'
              ),
              capitalize: false,
            }),
            required: true,
          },
        },
        {
          name: 'services',
          kind: 'multiselect',
          multiSelectProps: {
            label: 'Select all services you may require',
            subtext: '(Select at least one)',
            options: [],
            useServiceOptions: true,
            required: true,
          },
        },
        {
          kind: 'file',
          fileProps: { inputProps: { required: false }, label: 'Select Files' },
        },
        {
          name: 'additionalInfo',
          kind: 'textarea',
          textareaProps: {
            label: 'Additional Info',
            required: false,
          },
        },
      ],
    },
  ],
});

export const stickerRequestFormData = (
  _services: PublicService[]
): RequestFormProps<typeof stickerFormSchema> => ({
  serviceId: 'stickers',
  formName: 'Stickers Request',
  formSchema: stickerFormSchema,
  defaultFormValues: stickerIntakeDefaultValues(),
  formSections: stickerIntakeFormSections(),
});

export const publicationDesignRequestFormData = (
  _services: PublicService[]
): RequestFormProps<typeof publicationDesignFormSchema> => ({
  serviceId: 'publication_design',
  formName: 'Publication Design Request',
  formSchema: publicationDesignFormSchema,
  defaultFormValues: publicationIntakeDefaults(),
  formSections: publicationIntakeFormSections(),
});

export const stationeryDesignRequestFormData = (
  _services: PublicService[]
): RequestFormProps<typeof stationeryDesignFormSchema> => ({
  serviceId: 'stationery_design',
  formName: 'Stationery Design Request',
  formSchema: stationeryDesignFormSchema,
  defaultFormValues: stationeryIntakeDefaults(),
  formSections: stationeryIntakeFormSections(),
});

export const bagDesignRequestFormData = (
  _services: PublicService[]
): RequestFormProps<typeof bagDesignFormSchema> => ({
  serviceId: 'bag_design',
  formName: 'Bag Design Request',
  formSchema: bagDesignFormSchema,
  defaultFormValues: bagIntakeDefaults(),
  formSections: bagIntakeFormSections(),
});

export const pouchDesignRequestFormData = (
  _services: PublicService[]
): RequestFormProps<typeof pouchDesignFormSchema> => ({
  serviceId: 'pouch_design',
  formName: 'Pouch Design Request',
  formSchema: pouchDesignFormSchema,
  defaultFormValues: pouchIntakeDefaults(),
  formSections: pouchIntakeFormSections(),
});

export const boxDesignRequestFormData = (
  _services: PublicService[]
): RequestFormProps<typeof boxDesignFormSchema> => ({
  serviceId: 'box_design',
  formName: 'Box Design Request',
  formSchema: boxDesignFormSchema,
  defaultFormValues: boxIntakeDefaults(),
  formSections: boxIntakeFormSections(),
});

export const packDesignRequestFormData = (
  _services: PublicService[]
): RequestFormProps<typeof packDesignFormSchema> => ({
  serviceId: 'pack_design',
  formName: 'Pack Design Request',
  formSchema: packDesignFormSchema,
  defaultFormValues: packIntakeDefaults(),
  formSections: packIntakeFormSections(),
});

export const digitalProductsRequestFormData = (
  services: PublicService[]
): RequestFormProps<typeof digitalProductsFormSchema> => ({
  serviceId: 'website_design_and_development',
  formName: 'Web Design & Development Request',
  formSchema: digitalProductsFormSchema,
  defaultFormValues: pick(ALL_FIELDS_DEFAULT, [
    'brandName',
    'contactPerson',
    'phone',
    'email',
    'tagline',
    'existingWebsite',
    'aboutTheBrand',
    'onlineBrandInfo',
    'websiteGoal',
    'expectedVisitorActions',
    'websiteStyle',
    'websiteInspirationLink',
    'preferredDomainName',
    'websiteType',
    'websiteDescription',
    'websitePagesOrSections',
    'websiteWrittenContent',
    'featuredMedia',
    'specialFeatures',
    'domainOrHosting',
    'package',
    'additionalInfo',
  ]),
  formSections: [
    {
      name: 'Basic Information',
      inputsArr: [
        [
          {
            name: 'brandName',
            kind: 'input',
            inputProps: {
              label: 'Brand Name',
              required: true,
            },
          },
          {
            name: 'contactPerson',
            kind: 'input',
            inputProps: {
              label: 'Contact Person',
              required: true,
            },
          },
        ],
        [
          {
            name: 'email',
            kind: 'input',
            inputProps: {
              label: 'Email',
              type: 'email',
              required: true,
            },
          },
          {
            name: 'phone',
            kind: 'input',
            inputProps: {
              label: 'Phone Number',
              required: true,
            },
          },
        ],
        [
          {
            name: 'tagline',
            kind: 'input',
            inputProps: {
              label: "Do you have a slogan / tagline you'd like displayed on the site?",
              required: true,
            },
          },
          {
            name: 'existingWebsite',
            kind: 'input',
            inputProps: {
              label: 'Existing Website',
              placeholder: 'Do you currently have a website? Please provide the link if so',
              required: false,
            },
          },
        ],
        {
          name: 'aboutTheBrand',
          kind: 'textarea',
          textareaProps: {
            label: 'About your brand',
            placeholder: 'Briefly describe what your business or brand does',
            required: true,
          },
        },
        {
          name: 'onlineBrandInfo',
          kind: 'textarea',
          textareaProps: {
            label: 'Online Brand Info',
            placeholder:
              'Please write down any links online where we can find more info about your brand...',
            required: false,
          },
        },
      ],
    },
    {
      name: 'Website Goals',
      inputsArr: [
        {
          name: 'websiteGoal',
          kind: 'textarea',
          textareaProps: {
            label: 'Website goal',
            placeholder: 'What is the main goal of your website?',
            required: true,
          },
        },
        {
          name: 'expectedVisitorActions',
          kind: 'textarea',
          textareaProps: {
            label: 'Expected Visitor actions',
            placeholder: 'What actions would you like visitors to take on your site?',
            required: true,
          },
        },
      ],
    },
    {
      name: 'Design & Style',
      inputsArr: [
        {
          name: 'websiteStyle',
          kind: 'select',
          selectProps: {
            label: 'Website style',
            options: generateOptionsFromArray({
              arr: [
                '🧭 Modern/Clean - simple layouts, lots of white space, clear typography',
                '🎨 Creative/Artistic - expressive design, bold colors, unique layouts',
                '💎 Elegant/Luxurious - refined fonts, subtle animations, classy feel',
                '🌿 Natural/Organic - soft colors, textures, earthy tones, calming visuals',
                '⚡ Bold/High-Impact - strong contrast, striking visuals, big headlines',
                '🤝 Professional/Corporate - trustworthy, minimal, structured design',
                '❤️ Warm/Friendly - approachable, personal, with human touch',
                '🌈 Playful/Fun - colorful, energetic, youthful vibe',
                '🧘 Minimalist - very clean, uncluttered, focus on essentials',
                '📸 Visual/Gallery-Focused - strong emphasis on photos and media',
                '🕶️ Dark/Sleek - dark mode aesthetic, stylish and modern',
                '✨ Trendy/Fashion-Forward - current design trends, eye-catching',
                '📰 Editorial/Magazine-Style - storytelling layout, rich typography',
                '🛍️ E-commerce/Product-Focused - clear product display, conversion-driven',
              ],
            }),
            required: true,
          },
        },
        {
          name: 'websiteType',
          kind: 'select',
          selectProps: {
            label: 'Website type',
            options: generateOptionsFromArray({
              arr: [
                'E-commerce (sell products)',
                'Company website',
                'Blog website',
                'Porfolio website',
                'Hotel and reservation website',
                'Academic website',
                'Website redesign',
                'Mobile app',
                'Others',
              ],
            }),
            required: true,
          },
        },
        {
          name: 'websiteDescription',
          kind: 'textarea',
          textareaProps: {
            label: 'Expected website description',
            placeholder: 'Write a detailed explanation of the type of website you need',
            required: false,
          },
        },
        {
          name: 'websiteInspirationLink',
          kind: 'input',
          inputProps: {
            label: 'Website Inspiration Link',
            placeholder: 'Do you have a sample website link you want us to draw inspiration from?',
            required: false,
          },
        },
      ],
    },
    {
      name: 'Content',
      inputsArr: [
        {
          name: 'websitePagesOrSections',
          kind: 'multiselect',
          multiSelectProps: {
            label: 'Which pages / sections do you think your website will need?',
            subtext: '(Select as many as suit your needs)',
            options: generateOptionsFromArray({
              arr: [
                'Home',
                'About',
                'Services',
                'Team / Our People',
                'Portfolio',
                'Gallery',
                'Products',
                'Shop',
                'Bookings / Appointments',
                'Pricing / Packages',
                'Blog / News',
                'Testimonial / Reviews',
                'FAQs',
                'Contact',
                'Terms & Conditions',
                'Privacy Policy',
                'Events / Announcements',
                'Case Studies / Projects',
                'Partners / Clients',
                'Careers / Join Us',
              ],
            }),
            useServiceOptions: false,
            required: true,
          },
        },
        {
          name: 'websiteWrittenContent',
          kind: 'select',
          selectProps: {
            label: 'Do you already have written content for these pages?',
            subtext: '(Or you would need help creating them?)',
            options: generateOptionsFromArray({
              arr: [
                'I have no written content',
                'I have some written content and would like some help with the rest',
                'I have all the needed written content',
              ],
            }),
            required: true,
          },
        },
        {
          name: 'featuredMedia',
          kind: 'select',
          selectProps: {
            label: "Are there any specific photos, videos or graphics you'd like featured?",
            subtext: '',
            options: generateOptionsFromArray({
              arr: ['Yes, I have some', "No, I don't have any"],
            }),
            required: true,
          },
        },
      ],
    },
    {
      name: 'Functionality',
      inputsArr: [
        {
          name: 'specialFeatures',
          kind: 'textarea',
          textareaProps: {
            label: 'Special Features',
            placeholder: 'Do you need any special features? Please write all you need...',
            required: false,
          },
        },
      ],
    },
    {
      name: 'Other Details',
      inputsArr: [
        [
          {
            name: 'domainOrHosting',
            kind: 'select',
            selectProps: {
              label: 'Do you have a domain or hosting yet?',
              options: generateOptionsFromArray({
                arr: [
                  'No domain or hosting yet',
                  'I have a domain but not hosting yet',
                  'I have hosting but no domain yet',
                  'I have both at the moment',
                ],
              }),
              required: true,
            },
          },
          {
            name: 'package',
            kind: 'select',
            selectProps: {
              label: 'Choose a package',
              options: generateOptionsFromArray({
                arr: getPackageOptionsForServiceSync(
                  services,
                  'website_design_and_development',
                  'digital_products_creation'
                ),
                capitalize: false,
              }),
              required: true,
            },
          },
        ],
        {
          name: 'preferredDomainName',
          kind: 'input',
          inputProps: {
            label: 'Preferred domain name',
            subtext: "(We'll give feedback on its availability)",
            required: true,
          },
        },
        {
          kind: 'file',
          fileProps: {
            inputProps: { required: false },
            label: 'Please upload any necessary files you may have for us',
          },
        },
        {
          name: 'additionalInfo',
          kind: 'textarea',
          textareaProps: {
            label: 'Additional Info',
            placeholder: 'Anything else you would like us to know?',
            required: false,
          },
        },
      ],
    },
  ],
});
