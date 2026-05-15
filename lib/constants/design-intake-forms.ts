import type { RequestFormProps } from '@/components/sections/forms/ProjectRequestForm';
import type { PublicService } from '@/lib/api/pinpoint-public-types';
import { z } from 'zod';
import { generateOptionsFromArray } from '@/lib/utils/general';
import { getPackageOptionsForServiceSync } from '@/lib/utils/cms-mappers';

/** Appended to orientation-style selects for escape hatch. */
export const INTAKE_SELECT_UNKNOWN = "I don't know / None of the above";

const intakeReq = z.string().trim().min(1, { message: 'This field is required' }).max(5000);

const intakePhone = z
  .string()
  .trim()
  .min(11, { message: 'Please enter at least 11 characters' })
  .max(14, { message: 'Phone number is too long' });

export function intakeSelectOptions(values: string[]) {
  return generateOptionsFromArray({ arr: [...values, INTAKE_SELECT_UNKNOWN], capitalize: false });
}

/** PDF checklist examples → select option labels (+ {@link INTAKE_SELECT_UNKNOWN} via {@link intakeSelectOptions}). */
const INTAKE_STICKER_LABEL_MATERIAL_OPTIONS = ['Premium', 'Regular', 'UV', 'DTF'];
const INTAKE_STICKER_SHAPE_FINISH_OPTIONS = ['Square', 'Circular', 'Rounded edges'];
const INTAKE_PUBLICATION_TYPE_OPTIONS = ['Magazine', 'Brochure', 'Company profile', 'Catalogue'];
const INTAKE_STATIONERY_CUT_FINISH_OPTIONS = ['Straight cut', 'Die-cut'];
const INTAKE_BAG_TYPE_OPTIONS = [
  'Craft',
  'Tote',
  'Paper',
  'Shopping',
  'Mailer',
  'Ziplock',
  'Singlet-nylon',
  'Woven',
  'Die-cut',
];
const INTAKE_BAG_SHAPE_FINISH_OPTIONS = ['Die-cut', 'Custom shape'];
const INTAKE_BOX_TYPE_OPTIONS = ['Flip', 'Top', 'Custom'];
const INTAKE_PACK_TYPE_OPTIONS = [
  'Burger pack',
  'Shawarma pack',
  'Cosmetics pack',
  'Cup holder',
  'Custom',
];
const INTAKE_PRINTING_METHOD_OPTIONS = ['MO', 'Kord', 'DI'];

const NIL_HINT =
  'Required fields: type Nil if you do not have an answer. For dropdowns, you may choose “I don’t know / None of the above” when needed.';

function contactEmailPhoneRow() {
  return [
    {
      name: 'email' as const,
      kind: 'input' as const,
      inputProps: { label: 'Email', type: 'email' as const, required: true },
    },
    {
      name: 'phone' as const,
      kind: 'input' as const,
      inputProps: { label: 'Phone Number', required: true },
    },
  ] as const;
}

function fileBeforeNotes() {
  return [
    {
      kind: 'file' as const,
      fileProps: {
        inputProps: { required: false },
        label: 'Upload references or assets (optional)',
      },
    },
    {
      name: 'additionalInfo' as const,
      kind: 'textarea' as const,
      textareaProps: {
        label: 'Additional notes',
        subtext: 'Required. Use Nil if you have nothing to add.',
        required: true,
      },
    },
  ];
}

/** Logo & brand identity — PDF section 1 (branding + professional logo design). */
export const logoBrandIdentityFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }).max(320),
  phone: intakePhone,
  brandName: intakeReq,
  industryOrCategory: intakeReq,
  marketPositioning: intakeReq,
  brandLocation: intakeReq,
  brandMission: intakeReq,
  brandVision: intakeReq,
  brandValues: intakeReq,
  designBrief: intakeReq,
  targetAudience: intakeReq,
  messageToConvey: intakeReq,
  preferredColourDirection: intakeReq,
  brandImageryStyle: intakeReq,
  benchmarkReferences: intakeReq,
  package: intakeReq,
  additionalInfo: intakeReq,
});

export type LogoBrandIdentityFormValues = z.infer<typeof logoBrandIdentityFormSchema>;

/** Rebranding — same intake as logo/brand identity, no package tier. */
export const rebrandingIntakeFormSchema = logoBrandIdentityFormSchema.omit({ package: true });

export type RebrandingIntakeFormValues = z.infer<typeof rebrandingIntakeFormSchema>;

export function logoBrandIdentityDefaultValues(): LogoBrandIdentityFormValues {
  return {
    email: '',
    phone: '',
    brandName: '',
    industryOrCategory: '',
    marketPositioning: '',
    brandLocation: '',
    brandMission: '',
    brandVision: '',
    brandValues: '',
    designBrief: '',
    targetAudience: '',
    messageToConvey: '',
    preferredColourDirection: '',
    brandImageryStyle: '',
    benchmarkReferences: '',
    package: '',
    additionalInfo: '',
  };
}

export function rebrandingDefaultValues(): RebrandingIntakeFormValues {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { package: _package, ...rest } = logoBrandIdentityDefaultValues();

  return rest;
}

export function logoBrandIdentityFormSections(
  services: PublicService[],
  packagedId: string,
  serviceGroupSlug: string,
  includePackage = true
) {
  const packageOptions = generateOptionsFromArray({
    arr: getPackageOptionsForServiceSync(services, packagedId, serviceGroupSlug),
  });

  const packageBlock = includePackage
    ? [
        {
          name: 'package' as const,
          kind: 'select' as const,
          selectProps: {
            label: 'Choose a package',
            options: packageOptions,
            required: true,
          },
        },
      ]
    : [];

  const sections = [
    {
      name: 'Company overview',
      desc: NIL_HINT,
      inputsArr: [
        contactEmailPhoneRow(),
        [
          {
            name: 'brandName',
            kind: 'input',
            inputProps: { label: 'Brand name', required: true },
          },
          {
            name: 'industryOrCategory',
            kind: 'input',
            inputProps: { label: 'Industry', required: true },
          },
        ],
        {
          name: 'marketPositioning',
          kind: 'textarea',
          textareaProps: { label: 'Market positioning', required: true },
        },
        {
          name: 'brandLocation',
          kind: 'input',
          inputProps: { label: 'Location', required: true },
        },
        {
          name: 'brandMission',
          kind: 'textarea',
          textareaProps: { label: 'Brand mission', required: true },
        },
        {
          name: 'brandVision',
          kind: 'textarea',
          textareaProps: { label: 'Brand vision', required: true },
        },
        {
          name: 'brandValues',
          kind: 'textarea',
          textareaProps: { label: 'Brand values', required: true },
        },
      ],
    },
    {
      name: 'Project objectives',
      inputsArr: [
        {
          name: 'designBrief',
          kind: 'textarea',
          textareaProps: {
            label: 'Design brief',
            subtext: 'Describe the type and feel of brand or logo you envision',
            required: true,
          },
        },
        {
          name: 'targetAudience',
          kind: 'textarea',
          textareaProps: { label: 'Target audience', required: true },
        },
        {
          name: 'messageToConvey',
          kind: 'textarea',
          textareaProps: { label: 'Message and image to convey', required: true },
        },
        {
          name: 'preferredColourDirection',
          kind: 'textarea',
          textareaProps: { label: 'Preferred colour direction', required: true },
        },
        {
          name: 'brandImageryStyle',
          kind: 'textarea',
          textareaProps: { label: 'Brand imagery style', required: true },
        },
        {
          name: 'benchmarkReferences',
          kind: 'textarea',
          textareaProps: {
            label: 'Benchmark references',
            subtext: 'Sample logos or brands you admire',
            required: true,
          },
        },
        ...packageBlock,
        ...fileBeforeNotes(),
      ],
    },
  ];

  return includePackage
    ? (sections as unknown as RequestFormProps<typeof logoBrandIdentityFormSchema>['formSections'])
    : (sections as unknown as RequestFormProps<typeof rebrandingIntakeFormSchema>['formSections']);
}

const eventFlyerSharedFields = {
  email: z.email({ message: 'Please enter a valid email' }).max(320),
  phone: intakePhone,
  brandName: intakeReq,
  industryOrCategory: intakeReq,
  marketPositioning: intakeReq,
  brandLocation: intakeReq,
  brandValues: intakeReq,
  targetAudience: intakeReq,
  preferredColourDirection: intakeReq,
  messageToConvey: intakeReq,
  expectedImagery: intakeReq,
  materialSpecifications: intakeReq,
  benchmarkReferences: intakeReq,
  additionalInfo: intakeReq,
};

/** Event and campaign branding — includes package (PDF flyer / event checklist). */
export const eventCampaignBrandingIntakeFormSchema = z.object({
  ...eventFlyerSharedFields,
  package: intakeReq,
});

export type EventCampaignBrandingIntakeFormValues = z.infer<
  typeof eventCampaignBrandingIntakeFormSchema
>;

/** Flyer design — same checklist, no package. */
export const flyerDesignIntakeFormSchema = z.object({
  ...eventFlyerSharedFields,
});

export type FlyerDesignIntakeFormValues = z.infer<typeof flyerDesignIntakeFormSchema>;

export function eventCampaignDefaultValues(): EventCampaignBrandingIntakeFormValues {
  return {
    email: '',
    phone: '',
    brandName: '',
    industryOrCategory: '',
    marketPositioning: '',
    brandLocation: '',
    brandValues: '',
    targetAudience: '',
    preferredColourDirection: '',
    messageToConvey: '',
    expectedImagery: '',
    materialSpecifications: '',
    benchmarkReferences: '',
    additionalInfo: '',
    package: '',
  };
}

export function flyerDesignDefaultValues(): FlyerDesignIntakeFormValues {
  return {
    email: '',
    phone: '',
    brandName: '',
    industryOrCategory: '',
    marketPositioning: '',
    brandLocation: '',
    brandValues: '',
    targetAudience: '',
    preferredColourDirection: '',
    messageToConvey: '',
    expectedImagery: '',
    materialSpecifications: '',
    benchmarkReferences: '',
    additionalInfo: '',
  };
}

export function eventFlyerFormSections(
  services: PublicService[],
  includePackage: boolean,
  packagedId: string,
  serviceGroupSlug: string
) {
  const packageOptions = generateOptionsFromArray({
    arr: getPackageOptionsForServiceSync(services, packagedId, serviceGroupSlug),
  });

  const packageBlock = includePackage
    ? [
        {
          name: 'package' as const,
          kind: 'select' as const,
          selectProps: {
            label: 'Choose a package',
            options: packageOptions,
            required: true,
          },
        },
      ]
    : [];

  const printMaterialOpts = intakeSelectOptions([...INTAKE_STICKER_LABEL_MATERIAL_OPTIONS]);

  const sections = [
    {
      name: 'Company overview',
      desc: NIL_HINT,
      inputsArr: [
        contactEmailPhoneRow(),
        [
          { name: 'brandName', kind: 'input', inputProps: { label: 'Brand name', required: true } },
          {
            name: 'industryOrCategory',
            kind: 'input',
            inputProps: { label: 'Industry', required: true },
          },
        ],
        {
          name: 'marketPositioning',
          kind: 'textarea',
          textareaProps: { label: 'Market positioning', required: true },
        },
        {
          name: 'brandLocation',
          kind: 'input',
          inputProps: { label: 'Location', required: true },
        },
        {
          name: 'brandValues',
          kind: 'textarea',
          textareaProps: { label: 'Brand values', required: true },
        },
      ],
    },
    {
      name: 'Project objectives',
      inputsArr: [
        {
          name: 'targetAudience',
          kind: 'textarea',
          textareaProps: { label: 'Target audience', required: true },
        },
        {
          name: 'preferredColourDirection',
          kind: 'textarea',
          textareaProps: { label: 'Preferred colour direction', required: true },
        },
        {
          name: 'messageToConvey',
          kind: 'textarea',
          textareaProps: { label: 'Message to convey', required: true },
        },
        {
          name: 'expectedImagery',
          kind: 'textarea',
          textareaProps: { label: 'Expected imagery', required: true },
        },
        {
          name: 'materialSpecifications',
          kind: 'select',
          selectProps: {
            label: 'Material specifications',
            subtext: 'If the flyer is to be physically produced (checklist examples)',
            options: printMaterialOpts,
            required: true,
          },
        },
        {
          name: 'benchmarkReferences',
          kind: 'textarea',
          textareaProps: {
            label: 'Benchmark references',
            subtext: 'Sample flyers or event branding you admire',
            required: true,
          },
        },
        ...packageBlock,
        ...fileBeforeNotes(),
      ],
    },
  ];

  return includePackage
    ? (sections as unknown as RequestFormProps<
        typeof eventCampaignBrandingIntakeFormSchema
      >['formSections'])
    : (sections as unknown as RequestFormProps<typeof flyerDesignIntakeFormSchema>['formSections']);
}

/** Sticker & label — PDF section 3 */
export const stickerIntakeFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }).max(320),
  phone: intakePhone,
  brandName: intakeReq,
  industryOrCategory: intakeReq,
  brandColours: intakeReq,
  brandTypography: intakeReq,
  brandValues: intakeReq,
  fullBrandIdentityPackage: intakeReq,
  designBrief: intakeReq,
  targetAudience: intakeReq,
  dimensions: intakeReq,
  materialSpecifications: intakeReq,
  shapeAndFinish: intakeReq,
  orientation: intakeReq,
  benchmarkReferences: intakeReq,
  additionalInfo: intakeReq,
});

export type StickerIntakeFormValues = z.infer<typeof stickerIntakeFormSchema>;

export function stickerIntakeDefaultValues(): StickerIntakeFormValues {
  return {
    email: '',
    phone: '',
    brandName: '',
    industryOrCategory: '',
    brandColours: '',
    brandTypography: '',
    brandValues: '',
    fullBrandIdentityPackage: '',
    designBrief: '',
    targetAudience: '',
    dimensions: '',
    materialSpecifications: '',
    shapeAndFinish: '',
    orientation: '',
    benchmarkReferences: '',
    additionalInfo: '',
  };
}

export function stickerIntakeFormSections() {
  const orientationOpts = intakeSelectOptions(['Landscape', 'Portrait']);
  const materialOpts = intakeSelectOptions([...INTAKE_STICKER_LABEL_MATERIAL_OPTIONS]);
  const shapeFinishOpts = intakeSelectOptions([...INTAKE_STICKER_SHAPE_FINISH_OPTIONS]);

  return [
    {
      name: 'Company overview',
      desc: `${NIL_HINT} Provide your brand assets, or describe your full brand identity package (use Nil if not applicable).`,
      inputsArr: [
        contactEmailPhoneRow(),
        [
          { name: 'brandName', kind: 'input', inputProps: { label: 'Brand name', required: true } },
          {
            name: 'industryOrCategory',
            kind: 'input',
            inputProps: { label: 'Industry', required: true },
          },
        ],
        {
          name: 'brandColours',
          kind: 'textarea',
          textareaProps: { label: 'Brand colours', required: true },
        },
        {
          name: 'brandTypography',
          kind: 'textarea',
          textareaProps: { label: 'Brand typography', required: true },
        },
        {
          name: 'brandValues',
          kind: 'textarea',
          textareaProps: { label: 'Brand values', required: true },
        },
        {
          name: 'fullBrandIdentityPackage',
          kind: 'textarea',
          textareaProps: {
            label: 'Full brand identity package',
            subtext:
              'Describe what you have, or type Nil if you are only providing the fields above',
            required: true,
          },
        },
      ],
    },
    {
      name: 'Project objectives',
      inputsArr: [
        {
          name: 'designBrief',
          kind: 'textarea',
          textareaProps: {
            label: 'Design brief',
            subtext: 'Type and purpose of the sticker or label',
            required: true,
          },
        },
        {
          name: 'targetAudience',
          kind: 'textarea',
          textareaProps: { label: 'Target audience', required: true },
        },
        {
          name: 'dimensions',
          kind: 'input',
          inputProps: { label: 'Dimensions', required: true },
        },
        {
          name: 'materialSpecifications',
          kind: 'select',
          selectProps: {
            label: 'Material specifications',
            subtext: 'Checklist examples: premium, regular, UV, DTF',
            options: materialOpts,
            required: true,
          },
        },
        {
          name: 'shapeAndFinish',
          kind: 'select',
          selectProps: {
            label: 'Shape and finish',
            subtext: 'Checklist examples: square, circular, rounded edges',
            options: shapeFinishOpts,
            required: true,
          },
        },
        {
          name: 'orientation',
          kind: 'select',
          selectProps: {
            label: 'Orientation',
            options: orientationOpts,
            required: true,
          },
        },
        {
          name: 'benchmarkReferences',
          kind: 'textarea',
          textareaProps: {
            label: 'Benchmark references',
            subtext: 'Sample stickers or labels you admire',
            required: true,
          },
        },
        ...fileBeforeNotes(),
      ],
    },
  ] as unknown as RequestFormProps<typeof stickerIntakeFormSchema>['formSections'];
}

const productOverviewFields = [
  contactEmailPhoneRow(),
  [
    {
      name: 'brandName',
      kind: 'input' as const,
      inputProps: { label: 'Brand name', required: true },
    },
    {
      name: 'industryOrCategory',
      kind: 'input' as const,
      inputProps: { label: 'Industry', required: true },
    },
  ],
  {
    name: 'brandColours',
    kind: 'textarea' as const,
    textareaProps: { label: 'Brand colours', required: true },
  },
  {
    name: 'brandTypography',
    kind: 'textarea' as const,
    textareaProps: { label: 'Brand typography', required: true },
  },
  {
    name: 'brandValues',
    kind: 'textarea' as const,
    textareaProps: { label: 'Brand values', required: true },
  },
  {
    name: 'fullBrandIdentityPackage',
    kind: 'textarea' as const,
    textareaProps: {
      label: 'Full brand identity package',
      subtext: 'Describe what you have, or type Nil if not applicable',
      required: true,
    },
  },
] as const;

/** Publication design — PDF section 4 */
export const publicationIntakeFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }).max(320),
  phone: intakePhone,
  brandName: intakeReq,
  industryOrCategory: intakeReq,
  brandColours: intakeReq,
  brandTypography: intakeReq,
  brandValues: intakeReq,
  fullBrandIdentityPackage: intakeReq,
  designBrief: intakeReq,
  targetAudience: intakeReq,
  publicationType: intakeReq,
  orientation: intakeReq,
  dimensions: intakeReq,
  paperGrammage: intakeReq,
  laminationType: intakeReq,
  benchmarkReferences: intakeReq,
  additionalInfo: intakeReq,
});

export type PublicationIntakeFormValues = z.infer<typeof publicationIntakeFormSchema>;

export function publicationIntakeDefaults(): PublicationIntakeFormValues {
  return {
    email: '',
    phone: '',
    brandName: '',
    industryOrCategory: '',
    brandColours: '',
    brandTypography: '',
    brandValues: '',
    fullBrandIdentityPackage: '',
    designBrief: '',
    targetAudience: '',
    publicationType: '',
    orientation: '',
    dimensions: '',
    paperGrammage: '',
    laminationType: '',
    benchmarkReferences: '',
    additionalInfo: '',
  };
}

export function publicationIntakeFormSections() {
  const orientationOpts = intakeSelectOptions(['Landscape', 'Portrait']);
  const publicationTypeOpts = intakeSelectOptions([...INTAKE_PUBLICATION_TYPE_OPTIONS]);

  return [
    {
      name: 'Company overview',
      desc: NIL_HINT,
      inputsArr: [...productOverviewFields],
    },
    {
      name: 'Project objectives',
      inputsArr: [
        {
          name: 'designBrief',
          kind: 'textarea',
          textareaProps: {
            label: 'Design brief',
            subtext: 'Magazine, brochure, company profile, catalogue, etc.',
            required: true,
          },
        },
        {
          name: 'targetAudience',
          kind: 'textarea',
          textareaProps: { label: 'Target audience', required: true },
        },
        {
          name: 'publicationType',
          kind: 'select',
          selectProps: {
            label: 'Publication type',
            subtext: 'Checklist examples: magazine, brochure, company profile, catalogue',
            options: publicationTypeOpts,
            required: true,
          },
        },
        {
          name: 'orientation',
          kind: 'select',
          selectProps: { label: 'Orientation', options: orientationOpts, required: true },
        },
        {
          name: 'dimensions',
          kind: 'input',
          inputProps: { label: 'Dimensions', required: true },
        },
        {
          name: 'paperGrammage',
          kind: 'input',
          inputProps: { label: 'Paper grammage', required: true },
        },
        {
          name: 'laminationType',
          kind: 'input',
          inputProps: { label: 'Lamination type', required: true },
        },
        {
          name: 'benchmarkReferences',
          kind: 'textarea',
          textareaProps: { label: 'Benchmark references', required: true },
        },
        ...fileBeforeNotes(),
      ],
    },
  ] as unknown as RequestFormProps<typeof publicationIntakeFormSchema>['formSections'];
}

/** Stationery design — PDF section 5 */
export const stationeryIntakeFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }).max(320),
  phone: intakePhone,
  brandName: intakeReq,
  industryOrCategory: intakeReq,
  brandColours: intakeReq,
  brandTypography: intakeReq,
  brandValues: intakeReq,
  fullBrandIdentityPackage: intakeReq,
  designBrief: intakeReq,
  targetAudience: intakeReq,
  dimensions: intakeReq,
  paperGrammage: intakeReq,
  laminationType: intakeReq,
  cuttingAndFinishing: intakeReq,
  benchmarkReferences: intakeReq,
  additionalInfo: intakeReq,
});

export type StationeryIntakeFormValues = z.infer<typeof stationeryIntakeFormSchema>;

export function stationeryIntakeDefaults(): StationeryIntakeFormValues {
  return {
    email: '',
    phone: '',
    brandName: '',
    industryOrCategory: '',
    brandColours: '',
    brandTypography: '',
    brandValues: '',
    fullBrandIdentityPackage: '',
    designBrief: '',
    targetAudience: '',
    dimensions: '',
    paperGrammage: '',
    laminationType: '',
    cuttingAndFinishing: '',
    benchmarkReferences: '',
    additionalInfo: '',
  };
}

export function stationeryIntakeFormSections() {
  const cuttingOpts = intakeSelectOptions([...INTAKE_STATIONERY_CUT_FINISH_OPTIONS]);

  return [
    {
      name: 'Company overview',
      desc: NIL_HINT,
      inputsArr: [...productOverviewFields],
    },
    {
      name: 'Project objectives',
      inputsArr: [
        {
          name: 'designBrief',
          kind: 'textarea',
          textareaProps: {
            label: 'Design brief',
            subtext: 'Type of stationery required',
            required: true,
          },
        },
        {
          name: 'targetAudience',
          kind: 'textarea',
          textareaProps: { label: 'Target audience', required: true },
        },
        {
          name: 'dimensions',
          kind: 'input',
          inputProps: { label: 'Dimensions', required: true },
        },
        {
          name: 'paperGrammage',
          kind: 'input',
          inputProps: { label: 'Paper grammage', required: true },
        },
        {
          name: 'laminationType',
          kind: 'input',
          inputProps: { label: 'Lamination type', required: true },
        },
        {
          name: 'cuttingAndFinishing',
          kind: 'select',
          selectProps: {
            label: 'Cutting and finishing',
            subtext: 'Checklist examples: straight cut, die-cut',
            options: cuttingOpts,
            required: true,
          },
        },
        {
          name: 'benchmarkReferences',
          kind: 'textarea',
          textareaProps: { label: 'Benchmark references', required: true },
        },
        ...fileBeforeNotes(),
      ],
    },
  ] as unknown as RequestFormProps<typeof stationeryIntakeFormSchema>['formSections'];
}

/** Bag design — PDF section 6 */
export const bagIntakeFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }).max(320),
  phone: intakePhone,
  brandName: intakeReq,
  industryOrCategory: intakeReq,
  brandColours: intakeReq,
  brandTypography: intakeReq,
  brandValues: intakeReq,
  fullBrandIdentityPackage: intakeReq,
  designBrief: intakeReq,
  targetAudience: intakeReq,
  bagType: intakeReq,
  dimensions: intakeReq,
  orientation: intakeReq,
  handleMaterial: intakeReq,
  laminationType: intakeReq,
  bagShapeAndFinish: intakeReq,
  benchmarkReferences: intakeReq,
  additionalInfo: intakeReq,
});

export type BagIntakeFormValues = z.infer<typeof bagIntakeFormSchema>;

export function bagIntakeDefaults(): BagIntakeFormValues {
  return {
    email: '',
    phone: '',
    brandName: '',
    industryOrCategory: '',
    brandColours: '',
    brandTypography: '',
    brandValues: '',
    fullBrandIdentityPackage: '',
    designBrief: '',
    targetAudience: '',
    bagType: '',
    dimensions: '',
    orientation: '',
    handleMaterial: '',
    laminationType: '',
    bagShapeAndFinish: '',
    benchmarkReferences: '',
    additionalInfo: '',
  };
}

export function bagIntakeFormSections() {
  const orientationOpts = intakeSelectOptions(['Landscape', 'Portrait']);
  const bagTypeOpts = intakeSelectOptions([...INTAKE_BAG_TYPE_OPTIONS]);
  const bagShapeFinishOpts = intakeSelectOptions([...INTAKE_BAG_SHAPE_FINISH_OPTIONS]);

  return [
    { name: 'Company overview', desc: NIL_HINT, inputsArr: [...productOverviewFields] },
    {
      name: 'Project objectives',
      inputsArr: [
        {
          name: 'designBrief',
          kind: 'textarea',
          textareaProps: {
            label: 'Design brief',
            subtext: 'Purpose and look of the bag',
            required: true,
          },
        },
        {
          name: 'targetAudience',
          kind: 'textarea',
          textareaProps: { label: 'Target audience', required: true },
        },
        {
          name: 'bagType',
          kind: 'select',
          selectProps: {
            label: 'Bag type',
            subtext:
              'Checklist examples: craft, tote, paper, shopping, mailer, ziplock, singlet-nylon, woven, die-cut',
            options: bagTypeOpts,
            required: true,
          },
        },
        {
          name: 'dimensions',
          kind: 'input',
          inputProps: { label: 'Dimensions', required: true },
        },
        {
          name: 'orientation',
          kind: 'select',
          selectProps: { label: 'Orientation', options: orientationOpts, required: true },
        },
        {
          name: 'handleMaterial',
          kind: 'input',
          inputProps: { label: 'Handle material', required: true },
        },
        {
          name: 'laminationType',
          kind: 'input',
          inputProps: { label: 'Lamination type', required: true },
        },
        {
          name: 'bagShapeAndFinish',
          kind: 'select',
          selectProps: {
            label: 'Shape and finish',
            subtext: 'Checklist examples: die-cut, custom shape',
            options: bagShapeFinishOpts,
            required: true,
          },
        },
        {
          name: 'benchmarkReferences',
          kind: 'textarea',
          textareaProps: { label: 'Benchmark references', required: true },
        },
        ...fileBeforeNotes(),
      ],
    },
  ] as unknown as RequestFormProps<typeof bagIntakeFormSchema>['formSections'];
}

/** Pouch design — PDF section 7 */
export const pouchIntakeFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }).max(320),
  phone: intakePhone,
  brandName: intakeReq,
  industryOrCategory: intakeReq,
  brandColours: intakeReq,
  brandTypography: intakeReq,
  brandValues: intakeReq,
  fullBrandIdentityPackage: intakeReq,
  designBrief: intakeReq,
  targetAudience: intakeReq,
  orientation: intakeReq,
  dimensions: intakeReq,
  pouchMaterialType: intakeReq,
  pouchThickness: intakeReq,
  pouchFinish: intakeReq,
  pouchShape: intakeReq,
  benchmarkReferences: intakeReq,
  additionalInfo: intakeReq,
});

export type PouchIntakeFormValues = z.infer<typeof pouchIntakeFormSchema>;

export function pouchIntakeDefaults(): PouchIntakeFormValues {
  return {
    email: '',
    phone: '',
    brandName: '',
    industryOrCategory: '',
    brandColours: '',
    brandTypography: '',
    brandValues: '',
    fullBrandIdentityPackage: '',
    designBrief: '',
    targetAudience: '',
    orientation: '',
    dimensions: '',
    pouchMaterialType: '',
    pouchThickness: '',
    pouchFinish: '',
    pouchShape: '',
    benchmarkReferences: '',
    additionalInfo: '',
  };
}

export function pouchIntakeFormSections() {
  const orientationOpts = intakeSelectOptions(['Landscape', 'Portrait']);

  return [
    { name: 'Company overview', desc: NIL_HINT, inputsArr: [...productOverviewFields] },
    {
      name: 'Project objectives',
      inputsArr: [
        {
          name: 'designBrief',
          kind: 'textarea',
          textareaProps: {
            label: 'Design brief',
            subtext: 'Purpose and look of the pouch',
            required: true,
          },
        },
        {
          name: 'targetAudience',
          kind: 'textarea',
          textareaProps: { label: 'Target audience', required: true },
        },
        {
          name: 'orientation',
          kind: 'select',
          selectProps: { label: 'Orientation', options: orientationOpts, required: true },
        },
        {
          name: 'dimensions',
          kind: 'input',
          inputProps: { label: 'Dimensions', required: true },
        },
        {
          name: 'pouchMaterialType',
          kind: 'input',
          inputProps: { label: 'Material type', required: true },
        },
        {
          name: 'pouchThickness',
          kind: 'input',
          inputProps: { label: 'Thickness', required: true },
        },
        {
          name: 'pouchFinish',
          kind: 'input',
          inputProps: { label: 'Finish', required: true },
        },
        {
          name: 'pouchShape',
          kind: 'textarea',
          textareaProps: { label: 'Shape', required: true },
        },
        {
          name: 'benchmarkReferences',
          kind: 'textarea',
          textareaProps: { label: 'Benchmark references', required: true },
        },
        ...fileBeforeNotes(),
      ],
    },
  ] as unknown as RequestFormProps<typeof pouchIntakeFormSchema>['formSections'];
}

/** Box design — PDF section 8 */
export const boxIntakeFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }).max(320),
  phone: intakePhone,
  brandName: intakeReq,
  industryOrCategory: intakeReq,
  brandColours: intakeReq,
  brandTypography: intakeReq,
  brandValues: intakeReq,
  fullBrandIdentityPackage: intakeReq,
  designBrief: intakeReq,
  targetAudience: intakeReq,
  boxType: intakeReq,
  boxDemarcation: intakeReq,
  dimensions: intakeReq,
  orientation: intakeReq,
  stickerApplication: intakeReq,
  suedeLining: intakeReq,
  laminationType: intakeReq,
  benchmarkReferences: intakeReq,
  additionalInfo: intakeReq,
});

export type BoxIntakeFormValues = z.infer<typeof boxIntakeFormSchema>;

export function boxIntakeDefaults(): BoxIntakeFormValues {
  return {
    email: '',
    phone: '',
    brandName: '',
    industryOrCategory: '',
    brandColours: '',
    brandTypography: '',
    brandValues: '',
    fullBrandIdentityPackage: '',
    designBrief: '',
    targetAudience: '',
    boxType: '',
    boxDemarcation: '',
    dimensions: '',
    orientation: '',
    stickerApplication: '',
    suedeLining: '',
    laminationType: '',
    benchmarkReferences: '',
    additionalInfo: '',
  };
}

export function boxIntakeFormSections() {
  const orientationOpts = intakeSelectOptions(['Landscape', 'Portrait']);
  const boxTypeOpts = intakeSelectOptions([...INTAKE_BOX_TYPE_OPTIONS]);

  return [
    { name: 'Company overview', desc: NIL_HINT, inputsArr: [...productOverviewFields] },
    {
      name: 'Project objectives',
      inputsArr: [
        {
          name: 'designBrief',
          kind: 'textarea',
          textareaProps: {
            label: 'Design brief',
            subtext: 'Purpose and look of the box',
            required: true,
          },
        },
        {
          name: 'targetAudience',
          kind: 'textarea',
          textareaProps: { label: 'Target audience', required: true },
        },
        {
          name: 'boxType',
          kind: 'select',
          selectProps: {
            label: 'Box type',
            subtext: 'Checklist examples: flip, top, custom',
            options: boxTypeOpts,
            required: true,
          },
        },
        {
          name: 'boxDemarcation',
          kind: 'textarea',
          textareaProps: {
            label: 'Demarcation and compartments',
            subtext: 'If custom inserts are required; use Nil if none',
            required: true,
          },
        },
        {
          name: 'dimensions',
          kind: 'input',
          inputProps: { label: 'Dimensions', required: true },
        },
        {
          name: 'orientation',
          kind: 'select',
          selectProps: { label: 'Orientation', options: orientationOpts, required: true },
        },
        {
          name: 'stickerApplication',
          kind: 'textarea',
          textareaProps: { label: 'Sticker application', required: true },
        },
        {
          name: 'suedeLining',
          kind: 'textarea',
          textareaProps: { label: 'Suede lining', required: true },
        },
        {
          name: 'laminationType',
          kind: 'input',
          inputProps: { label: 'Lamination type', required: true },
        },
        {
          name: 'benchmarkReferences',
          kind: 'textarea',
          textareaProps: { label: 'Benchmark references', required: true },
        },
        ...fileBeforeNotes(),
      ],
    },
  ] as unknown as RequestFormProps<typeof boxIntakeFormSchema>['formSections'];
}

/** Pack design — PDF section 9 */
export const packIntakeFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }).max(320),
  phone: intakePhone,
  brandName: intakeReq,
  industryOrCategory: intakeReq,
  brandColours: intakeReq,
  brandTypography: intakeReq,
  brandValues: intakeReq,
  fullBrandIdentityPackage: intakeReq,
  designBrief: intakeReq,
  targetAudience: intakeReq,
  packType: intakeReq,
  dimensions: intakeReq,
  orientation: intakeReq,
  paperGrammage: intakeReq,
  laminationType: intakeReq,
  printingMethod: intakeReq,
  benchmarkReferences: intakeReq,
  additionalInfo: intakeReq,
});

export type PackIntakeFormValues = z.infer<typeof packIntakeFormSchema>;

export function packIntakeDefaults(): PackIntakeFormValues {
  return {
    email: '',
    phone: '',
    brandName: '',
    industryOrCategory: '',
    brandColours: '',
    brandTypography: '',
    brandValues: '',
    fullBrandIdentityPackage: '',
    designBrief: '',
    targetAudience: '',
    packType: '',
    dimensions: '',
    orientation: '',
    paperGrammage: '',
    laminationType: '',
    printingMethod: '',
    benchmarkReferences: '',
    additionalInfo: '',
  };
}

export function packIntakeFormSections() {
  const orientationOpts = intakeSelectOptions(['Landscape', 'Portrait']);
  const packTypeOpts = intakeSelectOptions([...INTAKE_PACK_TYPE_OPTIONS]);
  const printingMethodOpts = intakeSelectOptions([...INTAKE_PRINTING_METHOD_OPTIONS]);

  return [
    { name: 'Company overview', desc: NIL_HINT, inputsArr: [...productOverviewFields] },
    {
      name: 'Project objectives',
      inputsArr: [
        {
          name: 'designBrief',
          kind: 'textarea',
          textareaProps: {
            label: 'Design brief',
            subtext: 'Purpose and look of the pack',
            required: true,
          },
        },
        {
          name: 'targetAudience',
          kind: 'textarea',
          textareaProps: { label: 'Target audience', required: true },
        },
        {
          name: 'packType',
          kind: 'select',
          selectProps: {
            label: 'Pack type',
            subtext:
              'Checklist examples: burger pack, shawarma pack, cosmetics pack, cup holder, custom',
            options: packTypeOpts,
            required: true,
          },
        },
        {
          name: 'dimensions',
          kind: 'input',
          inputProps: { label: 'Dimensions', required: true },
        },
        {
          name: 'orientation',
          kind: 'select',
          selectProps: { label: 'Orientation', options: orientationOpts, required: true },
        },
        {
          name: 'paperGrammage',
          kind: 'input',
          inputProps: { label: 'Paper grammage', required: true },
        },
        {
          name: 'laminationType',
          kind: 'input',
          inputProps: { label: 'Lamination type', required: true },
        },
        {
          name: 'printingMethod',
          kind: 'select',
          selectProps: {
            label: 'Printing method',
            subtext: 'Checklist examples: MO, Kord, DI',
            options: printingMethodOpts,
            required: true,
          },
        },
        {
          name: 'benchmarkReferences',
          kind: 'textarea',
          textareaProps: { label: 'Benchmark references', required: true },
        },
        ...fileBeforeNotes(),
      ],
    },
  ] as unknown as RequestFormProps<typeof packIntakeFormSchema>['formSections'];
}
