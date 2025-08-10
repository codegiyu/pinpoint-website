import { brandingFormData, customRequestFormData, enquiryFormData } from '@/lib/constants/forms';
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
      {...brandingFormData}
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
};
