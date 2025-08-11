'use client';
import { FileUploadInput, FileUploadInputProps } from '@/components/atoms/FileUploadInput';
import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { RegularInput, RegularInputProps } from '@/components/atoms/RegularInput';
import { RegularTextarea, RegularTextareaProps } from '@/components/atoms/RegularTextarea';
import { toast } from '@/components/atoms/Toast';
import { useForm } from '@/lib/hooks/use-form';
import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from 'react';
import { output, z, ZodArray, ZodEmail, ZodObject, ZodString } from 'zod';
import FormAlert from './FormAlert';
import { CheckCheck } from 'lucide-react';
import { MultiSelect, MultiSelectProps } from '@/components/atoms/MultiSelect';
import { generateOptionsFromArray } from '@/lib/utils/general';
import { motion } from 'motion/react';
import { AvailablePackagedService } from '@/lib/constants/texts';
import { SelectOption } from '@/lib/types/general';
import { default as omit } from 'lodash/omit';
import { RegularSelect, RegularSelectProps } from '@/components/atoms/RegularSelect';
import { REQUEST_FORMS } from './RequestForms';

export const ProjectRequestForm = ({
  servicesList,
  service,
  selectedPackage,
}: {
  servicesList: string[];
  service: AvailablePackagedService;
  selectedPackage: string;
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const serviceOptions = useMemo(() => {
    return generateOptionsFromArray({ arr: servicesList });
  }, [servicesList]);

  const FormComp = useMemo(() => {
    return service ? REQUEST_FORMS[service] : null;
  }, [service]);

  if (!FormComp) return <div className="w-full pb-20 md:pb-[95px]" />;

  return (
    <FormComp
      files={files}
      setFiles={setFiles}
      serviceOptions={serviceOptions}
      {...(selectedPackage &&
        service && {
          packageInURL: { service, package: selectedPackage },
        })}
    />
  );
};

export type StringOrStringArraySchema = ZodString | ZodEmail | ZodArray<ZodString>;
export interface RequestFormProps<
  TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>,
> {
  serviceId: AvailablePackagedService;
  formName: string;
  formSchema: TSchema;
  defaultFormValues: z.infer<TSchema>;
  inputsArr: (FormArrayItem<TSchema> | [FormArrayItem<TSchema>, FormArrayItem<TSchema>])[];
  filesRequired?: boolean;
}
interface BaseFormArrayItem<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>> {
  name?: keyof z.TypeOf<TSchema>;
  kind: 'input' | 'textarea' | 'select' | 'multiselect' | 'file';
  inputProps?: Omit<RegularInputProps, 'name' | 'value' | 'onChange' | 'errors'>;
  textareaProps?: Omit<RegularTextareaProps, 'name' | 'value' | 'onChange' | 'errors'>;
  selectProps?: Omit<RegularSelectProps, 'name' | 'value' | 'onSelectChange' | 'errors'>;
  multiSelectProps?: Omit<MultiSelectProps, 'selected' | 'onChange' | 'errors'> & {
    useServiceOptions?: boolean;
  };
  fileProps?: Omit<FileUploadInputProps, 'files' | 'setFiles'>;
}
interface FormInputItem<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>
  extends BaseFormArrayItem<TSchema> {
  name: keyof z.TypeOf<TSchema>;
  kind: 'input';
  inputProps: Omit<RegularInputProps, 'name' | 'value' | 'onChange' | 'errors'>;
  textareaProps?: never;
  selectProps?: never;
  multiSelectProps?: never;
  fileProps?: never;
}
interface FormTextareaItem<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>
  extends BaseFormArrayItem<TSchema> {
  name: keyof z.TypeOf<TSchema>;
  kind: 'textarea';
  textareaProps: Omit<RegularTextareaProps, 'name' | 'value' | 'onChange' | 'errors'>;
  inputProps?: never;
  selectProps?: never;
  multiSelectProps?: never;
  fileProps?: never;
}
interface FormSelectItem<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>
  extends BaseFormArrayItem<TSchema> {
  name: keyof z.TypeOf<TSchema>;
  kind: 'select';
  selectProps: Omit<RegularSelectProps, 'name' | 'value' | 'onSelectChange' | 'errors'>;
  inputProps?: never;
  textareaProps?: never;
  multiSelectProps?: never;
  fileProps?: never;
}
interface FormMultiSelectItem<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>
  extends BaseFormArrayItem<TSchema> {
  name: keyof z.TypeOf<TSchema>;
  kind: 'multiselect';
  multiSelectProps: Omit<MultiSelectProps, 'selected' | 'onChange' | 'errors'> & {
    useServiceOptions?: boolean;
  };
  inputProps?: never;
  textareaProps?: never;
  selectProps?: never;
  fileProps?: never;
}
interface FormFileItem<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>
  extends BaseFormArrayItem<TSchema> {
  name?: never;
  kind: 'file';
  fileProps: Omit<FileUploadInputProps, 'files' | 'setFiles'>;
  inputProps?: never;
  textareaProps?: never;
  selectProps?: never;
  multiSelectProps?: never;
}

export type FormArrayItem<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>> =
  | FormInputItem<TSchema>
  | FormTextareaItem<TSchema>
  | FormSelectItem<TSchema>
  | FormMultiSelectItem<TSchema>
  | FormFileItem<TSchema>;

export const RequestForm = <TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>({
  formName,
  formSchema,
  defaultFormValues,
  files,
  setFiles,
  inputsArr,
  serviceOptions,
  filesRequired,
}: RequestFormProps<TSchema> & {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  packageInURL?: { service: AvailablePackagedService; package: string };
}) => {
  const {
    formValues,
    formErrors,
    loading,
    isValid,
    errorsVisible,
    submitted,
    resetForm,
    handleInputChange,
    onChange,
    setFormErrors,
    handleSubmit,
    validateForm,
  } = useForm({
    formSchema,
    defaultFormValues,
    onSubmit,
    validateOnChange: true,
  });

  const formValid = useMemo(
    () => (isValid && filesRequired ? !!files.length : true),
    [isValid, files, filesRequired]
  );

  const generalValidation = () => {
    if (filesRequired && !files.length) {
      toast({ title: 'Please upload at least one file', variant: 'error' });
    }

    return validateForm() && filesRequired ? !!files.length : true;
  };

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<boolean> {
    if (!generalValidation()) return false;

    const formData = new FormData();

    formData.append('formName', formName);
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(val => formData.append(key, val));
      } else {
        formData.append(key, value);
      }
    });
    files.forEach(file => {
      formData.append('files', file);
    });

    const res = await fetch('/api/send-company-mail', {
      method: 'POST',
      body: formData,
    });

    const parsedRes = await res.json();

    toast({ title: parsedRes.message, variant: parsedRes.success ? 'success' : 'error' });

    if (parsedRes.error) {
      setFormErrors({ root: [String(parsedRes.error)] } as Partial<
        Record<keyof output<TSchema> | 'root', string[] | undefined>
      >);
    }

    if (parsedRes.success) {
      resetForm();
      setFiles([]);
      return true;
    }

    return false;
  }

  return (
    <section className="w-full pb-20 md:pb-[95px]">
      <motion.form
        initial={{ opacity: 0, translateY: 50 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="form-page-container grid gap-14">
        <div className="inputs-wrap grid gap-5">
          {inputsArr.map((item, idx) => (
            <div key={idx} className="w-full">
              {Array.isArray(item) ? (
                <div className="w-full grid gap-x-4 gap-y-8 md:grid-cols-2">
                  {item.map((input, index) => (
                    <FormInputItem
                      key={index}
                      {...input}
                      {...{
                        files,
                        setFiles,
                        serviceOptions,
                        formValues,
                        formErrors,
                        handleInputChange,
                        onChange,
                        errorsVisible,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <FormInputItem
                  key={idx}
                  {...item}
                  {...{
                    files,
                    setFiles,
                    serviceOptions,
                    formValues,
                    formErrors,
                    handleInputChange,
                    onChange,
                    errorsVisible,
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="w-full flex items-center justify-center pt-4 gap-2">
          <PinpointBtn
            text="Submit"
            loading={loading}
            disabled={!formValid}
            onDisabledClick={generalValidation}
            RightIcon={submitted ? CheckCheck : undefined}
            rightIconProps={{ className: 'size-4 text-green-600' }}
          />
          <FormAlert />
        </div>
      </motion.form>
    </section>
  );
};

interface BaseInputItemProps<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>
  extends BaseFormArrayItem<TSchema> {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  formValues: z.TypeOf<TSchema>;
  formErrors: Partial<Record<keyof z.TypeOf<TSchema>, string[] | undefined>>;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    options?: {
      clearFields?: (keyof z.TypeOf<TSchema>)[];
    }
  ) => void;
  onChange: (
    name: keyof z.TypeOf<TSchema>,
    value: string | string[] | number | boolean,
    options?: {
      clearFields?: (keyof z.TypeOf<TSchema>)[];
    }
  ) => void;
  errorsVisible?: boolean;
}

const FormInputItem = <TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>({
  name,
  kind,
  inputProps,
  textareaProps,
  selectProps,
  multiSelectProps,
  fileProps,
  files,
  setFiles,
  serviceOptions,
  formValues,
  formErrors,
  handleInputChange,
  onChange,
  errorsVisible,
}: BaseInputItemProps<TSchema>) => {
  if (kind === 'input' && name) {
    return (
      <RegularInput
        name={name as string}
        value={formValues[name]}
        onChange={handleInputChange}
        errors={errorsVisible ? formErrors[name] : undefined}
        {...inputProps}
      />
    );
  }

  if (kind === 'textarea' && name) {
    return (
      <RegularTextarea
        name={name as string}
        value={formValues[name]}
        onChange={handleInputChange}
        errors={errorsVisible ? formErrors[name] : undefined}
        {...textareaProps}
      />
    );
  }

  if (kind === 'select' && name && selectProps) {
    return (
      <RegularSelect
        value={formValues[name] as string}
        onSelectChange={val => onChange(name, val)}
        errors={errorsVisible ? formErrors[name] : undefined}
        {...selectProps}
      />
    );
  }

  if (kind === 'multiselect' && name) {
    return (
      <MultiSelect
        options={
          multiSelectProps?.useServiceOptions ? serviceOptions : multiSelectProps?.options || []
        }
        selected={formValues[name] as string[]}
        onChange={values => onChange(name, values)}
        errors={errorsVisible ? formErrors[name] : undefined}
        {...omit(multiSelectProps, ['useServiceOptions', 'options'])}
      />
    );
  }

  if (kind === 'file') {
    return <FileUploadInput files={files} setFiles={setFiles} {...fileProps} />;
  }

  return null;
};
