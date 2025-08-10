import {
  RequestFormProps,
  StringOrStringArraySchema,
} from '@/components/sections/forms/ProjectRequestForm';
import { AvailablePackagedService } from './texts';
import { z } from 'zod';
import { default as pick } from 'lodash/pick';
import { generateOptionsFromArray } from '../utils/general';

const ALL_FIELDS_SCHEMA: Record<string, StringOrStringArraySchema> = {
  name: z.string().min(3, { error: 'Please enter at least 3 characters' }),
  brandName: z.string().min(3, { error: 'Please enter at least 3 characters' }),
  tagline: z.string().min(2, { error: 'Please enter a value' }),
  email: z.email({ error: 'Please enter a valid email' }),
  phone: z
    .string()
    .min(11, { error: 'Please enter at least 11 characters' })
    .max(14, { error: 'Phone number is too long' }),
  company: z.string().min(3, { error: 'Please enter at least 3 characters' }),
  services: z.array(z.string()).min(1, { error: 'Please select at least one service' }),
  package: z.string({ error: 'Please select a package' }),
  requireWebsite: z.string({ error: 'Please select an option' }),
  brandServices: z.string({ error: 'Please input your response' }),
  message: z.string().min(10, { error: 'Message is not long enough' }),
  additionalInfo: z.string().min(10, { error: 'Additional information is not long enough' }),
};

export const ALL_FIELDS_DEFAULT: Record<string, string | string[]> = {
  name: '',
  brandName: '',
  tagline: '',
  email: '',
  phone: '',
  company: '',
  services: [],
  package: '',
  requireWebsite: '',
  brandServices: '',
  message: '',
  additionalInfo: '',
};

export const customFormSchema = z.object({
  name: ALL_FIELDS_SCHEMA.name,
  email: ALL_FIELDS_SCHEMA.email,
  phone: ALL_FIELDS_SCHEMA.phone,
  company: ALL_FIELDS_SCHEMA.company,
  services: ALL_FIELDS_SCHEMA.services,
  additionalInfo: ALL_FIELDS_SCHEMA.additionalInfo,
});
export const brandingFormSchema = z.object({
  email: ALL_FIELDS_SCHEMA.email,
  phone: ALL_FIELDS_SCHEMA.phone,
  brandName: ALL_FIELDS_SCHEMA.brandName,
  tagline: ALL_FIELDS_SCHEMA.tagline,
  requireWebsite: ALL_FIELDS_SCHEMA.requireWebsite,
  brandServices: ALL_FIELDS_SCHEMA.brandServices,
  package: ALL_FIELDS_SCHEMA.package,
  additionalInfo: ALL_FIELDS_SCHEMA.additionalInfo,
});

export type AnyFormSchema = typeof customFormSchema | typeof brandingFormSchema;

export const customRequestFormData: RequestFormProps<typeof customFormSchema> = {
  serviceId: 'make_a_custom_request',
  formName: 'Custom Project Request',
  formSchema: customFormSchema,
  defaultFormValues: pick(ALL_FIELDS_DEFAULT, [
    'name',
    'email',
    'phone',
    'company',
    'services',
    'additionalInfo',
  ]),
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
        options: [],
        useServiceOptions: true,
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
        required: true,
      },
    },
  ],
};
export const enquiryFormData: RequestFormProps<typeof customFormSchema> = {
  ...customRequestFormData,
  serviceId: 'make_an_enquiry',
  formName: 'Enquiry',
};
export const brandingFormData: RequestFormProps<typeof brandingFormSchema> = {
  serviceId: 'branding',
  formName: 'Branding Request',
  formSchema: brandingFormSchema,
  defaultFormValues: pick(ALL_FIELDS_DEFAULT, [
    'email',
    'phone',
    'brandName',
    'tagline',
    'requireWebsite',
    'brandServices',
    'package',
    'additionalInfo',
  ]),
  inputsArr: [
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
        name: 'brandName',
        kind: 'input',
        inputProps: {
          label: 'What is your brand name?',
          required: true,
        },
      },
      {
        name: 'tagline',
        kind: 'input',
        inputProps: {
          label: 'Do you have a tagline?',
          subtext: 'Please type it if your do',
          required: true,
        },
      },
    ],
    [
      {
        name: 'requireWebsite',
        kind: 'select',
        selectProps: {
          label: 'Do you need a website?',
          options: generateOptionsFromArray({ arr: ['Yes', 'No'] }),
          required: true,
        },
      },
      {
        name: 'package',
        kind: 'select',
        selectProps: {
          label: 'Choose a package',
          options: generateOptionsFromArray({ arr: ['Yes', 'No'] }),
          required: true,
        },
      },
    ],
    {
      name: 'brandServices',
      kind: 'input',
      inputProps: {
        label: 'What services does your brand offer?',
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
        required: true,
      },
    },
  ],
};

export const FORMS_DATA: Partial<
  Record<AvailablePackagedService, RequestFormProps<AnyFormSchema>>
> = {
  make_a_custom_request: customRequestFormData,
  make_an_enquiry: enquiryFormData,
  branding: brandingFormData,
};
