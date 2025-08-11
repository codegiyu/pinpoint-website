import {
  brandingActivationRequestFormData,
  brandingRequestFormData,
  brandNamingRequestFormData,
  campaignBrandingRequestFormData,
  customRequestFormData,
  digitalProductsRequestFormData,
  enquiryFormData,
  logoDesignRequestFormData,
  productDesignRequestFormData,
  rebrandingRequestFormData,
  socialMediaRequestFormData,
  stickerRequestFormData,
} from '@/lib/constants/forms';
import { RequestForm } from './ProjectRequestForm';
import { Dispatch, JSX, SetStateAction } from 'react';
import { SelectOption } from '@/lib/types/general';
import { AvailablePackagedService } from '@/lib/constants/texts';

export const CustomRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  packageInURL?: { service: AvailablePackagedService; package: string };
}) => {
  return (
    <RequestForm
      {...customRequestFormData}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      {...packageInURL}
    />
  );
};

export const EnquiryRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  packageInURL?: { service: AvailablePackagedService; package: string };
}) => {
  return (
    <RequestForm
      {...enquiryFormData}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      {...packageInURL}
    />
  );
};

export const BrandingRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  packageInURL?: { service: AvailablePackagedService; package: string };
}) => {
  return (
    <RequestForm
      {...brandingRequestFormData}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      {...packageInURL}
    />
  );
};

export const RebrandingRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  packageInURL?: { service: AvailablePackagedService; package: string };
}) => {
  return (
    <RequestForm
      {...rebrandingRequestFormData}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      {...packageInURL}
    />
  );
};

export const BrandNamingRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  packageInURL?: { service: AvailablePackagedService; package: string };
}) => {
  return (
    <RequestForm
      {...brandNamingRequestFormData}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      {...packageInURL}
    />
  );
};

export const BrandActivationRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  packageInURL?: { service: AvailablePackagedService; package: string };
}) => {
  return (
    <RequestForm
      {...brandingActivationRequestFormData}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      {...packageInURL}
    />
  );
};

export const LogoDesignRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  packageInURL?: { service: AvailablePackagedService; package: string };
}) => {
  return (
    <RequestForm
      {...logoDesignRequestFormData}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      {...packageInURL}
    />
  );
};

export const CampaignBrandingRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  packageInURL?: { service: AvailablePackagedService; package: string };
}) => {
  return (
    <RequestForm
      {...campaignBrandingRequestFormData}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      {...packageInURL}
    />
  );
};

export const ProductDesignRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  packageInURL?: { service: AvailablePackagedService; package: string };
}) => {
  return (
    <RequestForm
      {...productDesignRequestFormData}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      {...packageInURL}
    />
  );
};

export const SocialMediaRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  packageInURL?: { service: AvailablePackagedService; package: string };
}) => {
  return (
    <RequestForm
      {...socialMediaRequestFormData}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      {...packageInURL}
    />
  );
};

export const StickerRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  packageInURL?: { service: AvailablePackagedService; package: string };
}) => {
  return (
    <RequestForm
      {...stickerRequestFormData}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      {...packageInURL}
    />
  );
};

export const DigitalProductsRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  packageInURL?: { service: AvailablePackagedService; package: string };
}) => {
  return (
    <RequestForm
      {...digitalProductsRequestFormData}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      {...packageInURL}
    />
  );
};

export const REQUEST_FORMS: Partial<
  Record<
    AvailablePackagedService,
    ({
      files,
      setFiles,
      serviceOptions,
      packageInURL,
    }: {
      files: File[];
      setFiles: Dispatch<SetStateAction<File[]>>;
      serviceOptions: SelectOption<string>[];
      packageInURL?: {
        service: AvailablePackagedService;
        package: string;
      };
    }) => JSX.Element
  >
> = {
  make_a_custom_request: CustomRequestForm,
  make_an_enquiry: EnquiryRequestForm,
  branding: BrandingRequestForm,
  rebranding: RebrandingRequestForm,
  brand_naming: BrandNamingRequestForm,
  brand_activation: BrandActivationRequestForm,
  professional_logo_design: LogoDesignRequestForm,
  campaign_branding: CampaignBrandingRequestForm,
  'packaging_&_product_design': ProductDesignRequestForm,
  social_media_strategy: SocialMediaRequestForm,
  stickers: StickerRequestForm,
  'website_design_&_development': DigitalProductsRequestForm,
};
