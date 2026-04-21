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
import type { PublicService } from '@/lib/api/pinpoint-public-types';
import { RequestForm } from './ProjectRequestForm';
import { Dispatch, JSX, SetStateAction } from 'react';
import { SelectOption } from '@/lib/types/general';

export type PackagedServiceId = string;

export type ProjectRequestFormWrapperProps = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  packageInURL?: { service: PackagedServiceId; package: string };
  services: PublicService[];
};

export const CustomRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
  services,
}: ProjectRequestFormWrapperProps) => {
  return (
    <RequestForm
      {...customRequestFormData(services)}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      packageInURL={packageInURL}
    />
  );
};

export const EnquiryRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
  services,
}: ProjectRequestFormWrapperProps) => {
  return (
    <RequestForm
      {...enquiryFormData(services)}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      packageInURL={packageInURL}
    />
  );
};

export const BrandingRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
  services,
}: ProjectRequestFormWrapperProps) => {
  return (
    <RequestForm
      {...brandingRequestFormData(services)}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      packageInURL={packageInURL}
    />
  );
};

export const RebrandingRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
  services,
}: ProjectRequestFormWrapperProps) => {
  return (
    <RequestForm
      {...rebrandingRequestFormData(services)}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      packageInURL={packageInURL}
    />
  );
};

export const BrandNamingRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
  services,
}: ProjectRequestFormWrapperProps) => {
  return (
    <RequestForm
      {...brandNamingRequestFormData(services)}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      packageInURL={packageInURL}
    />
  );
};

export const BrandActivationRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
  services,
}: ProjectRequestFormWrapperProps) => {
  return (
    <RequestForm
      {...brandingActivationRequestFormData(services)}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      packageInURL={packageInURL}
    />
  );
};

export const LogoDesignRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
  services,
}: ProjectRequestFormWrapperProps) => {
  return (
    <RequestForm
      {...logoDesignRequestFormData(services)}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      packageInURL={packageInURL}
    />
  );
};

export const CampaignBrandingRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
  services,
}: ProjectRequestFormWrapperProps) => {
  return (
    <RequestForm
      {...campaignBrandingRequestFormData(services)}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      packageInURL={packageInURL}
    />
  );
};

export const ProductDesignRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
  services,
}: ProjectRequestFormWrapperProps) => {
  return (
    <RequestForm
      {...productDesignRequestFormData(services)}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      packageInURL={packageInURL}
    />
  );
};

export const SocialMediaRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
  services,
}: ProjectRequestFormWrapperProps) => {
  return (
    <RequestForm
      {...socialMediaRequestFormData(services)}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      packageInURL={packageInURL}
    />
  );
};

export const StickerRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
  services,
}: ProjectRequestFormWrapperProps) => {
  return (
    <RequestForm
      {...stickerRequestFormData(services)}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      packageInURL={packageInURL}
    />
  );
};

export const DigitalProductsRequestForm = ({
  files,
  setFiles,
  serviceOptions,
  packageInURL,
  services,
}: ProjectRequestFormWrapperProps) => {
  return (
    <RequestForm
      {...digitalProductsRequestFormData(services)}
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      packageInURL={packageInURL}
    />
  );
};

export const REQUEST_FORMS: Partial<
  Record<PackagedServiceId, (p: ProjectRequestFormWrapperProps) => JSX.Element>
> = {
  make_a_custom_request: CustomRequestForm,
  make_an_enquiry: EnquiryRequestForm,
  branding: BrandingRequestForm,
  rebranding: RebrandingRequestForm,
  brand_naming: BrandNamingRequestForm,
  brand_activation: BrandActivationRequestForm,
  professional_logo_design: LogoDesignRequestForm,
  campaign_branding: CampaignBrandingRequestForm,
  packaging_and_product_design: ProductDesignRequestForm,
  social_media_strategy: SocialMediaRequestForm,
  stickers: StickerRequestForm,
  website_design_and_development: DigitalProductsRequestForm,
};
