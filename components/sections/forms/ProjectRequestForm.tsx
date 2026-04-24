'use client';
import { FileUploadInput, FileUploadInputProps } from '@/components/atoms/FileUploadInput';
import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { RegularInput, RegularInputProps } from '@/components/atoms/RegularInput';
import { RegularTextarea, RegularTextareaProps } from '@/components/atoms/RegularTextarea';
import { toast } from '@/components/atoms/Toast';
import { useForm } from '@/lib/hooks/use-form';
import { ChangeEvent, Dispatch, memo, SetStateAction, useEffect, useMemo, useState } from 'react';
import { output, z, ZodArray, ZodEmail, ZodObject, ZodString } from 'zod';
import FormAlert from './FormAlert';
import { FormSubmissionProgress } from './FormSubmissionProgress';
import { CheckCheck } from 'lucide-react';
import { MultiSelect, MultiSelectProps } from '@/components/atoms/MultiSelect';
import { generateOptionsFromArray } from '@/lib/utils/general';
import { motion } from 'motion/react';
import type { PublicService } from '@/lib/api/pinpoint-public-types';
import { SelectOption } from '@/lib/types/general';
import { default as omit } from 'lodash/omit';
import { RegularSelect, RegularSelectProps } from '@/components/atoms/RegularSelect';
import { PackagedServiceId, REQUEST_FORMS } from './RequestForms';
import {
  submitPublicFormSubmission,
  uploadAttachmentsToR2,
} from '@/lib/api/public-form-submission';
import {
  buildProjectRequestSubmissionSteps,
  completeStepActivateNext,
  markActiveStepError,
  type SubmissionStep,
} from '@/lib/utils/form-submission-progress';

export const ProjectRequestForm = ({
  servicesList,
  service,
  selectedPackage,
  servicesCatalog,
}: {
  servicesList: string[];
  service: PackagedServiceId;
  selectedPackage: string;
  servicesCatalog: PublicService[];
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
      services={servicesCatalog}
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
  serviceId: PackagedServiceId;
  formName: string;
  formSchema: TSchema;
  defaultFormValues: z.infer<TSchema>;
  formSections: FormSection<TSchema>[];
  filesRequired?: boolean;
}

export interface FormSection<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>> {
  name?: string;
  desc?: string;
  inputsArr: (FormArrayItem<TSchema> | [FormArrayItem<TSchema>, FormArrayItem<TSchema>])[];
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

export const RequestForm = memo(
  <TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>({
    formName,
    formSchema,
    defaultFormValues,
    files,
    setFiles,
    formSections,
    serviceOptions,
    filesRequired,
    serviceId,
    packageInURL,
  }: RequestFormProps<TSchema> & {
    files: File[];
    setFiles: Dispatch<SetStateAction<File[]>>;
    serviceOptions: SelectOption<string>[];
    packageInURL?: { service: PackagedServiceId; package: string };
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
      setFormValues,
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

    const [submissionPanel, setSubmissionPanel] = useState<{
      visible: boolean;
      steps: SubmissionStep[];
      uploadPercent: number | null;
    }>({ visible: false, steps: [], uploadPercent: null });

    const generalValidation = () => {
      if (filesRequired && !files.length) {
        toast({ title: 'Please upload at least one file', variant: 'error' });
      }

      return validateForm() && filesRequired ? !!files.length : true;
    };

    async function onSubmit(values: z.infer<typeof formSchema>): Promise<boolean> {
      if (!generalValidation()) return false;

      const hasAttachments = files.length > 0;
      setSubmissionPanel({
        visible: true,
        steps: buildProjectRequestSubmissionSteps(hasAttachments),
        uploadPercent: hasAttachments ? 0 : null,
      });

      let clearPanelAfterDelay = false;

      try {
        let attachments: Awaited<ReturnType<typeof uploadAttachmentsToR2>> = [];
        if (hasAttachments) {
          attachments = await uploadAttachmentsToR2(files, pct =>
            setSubmissionPanel(p => ({ ...p, uploadPercent: pct }))
          );
          setSubmissionPanel(p => ({
            ...p,
            steps: completeStepActivateNext(p.steps, 'upload'),
            uploadPercent: 100,
          }));
        }

        await submitPublicFormSubmission({
          formType: 'projectRequest',
          formName,
          fields: Object.entries(values).reduce<Record<string, string | string[]>>(
            (acc, [key, value]) => {
              acc[key] = value;
              return acc;
            },
            {}
          ),
          attachments,
        });

        setSubmissionPanel(p => ({
          ...p,
          steps: completeStepActivateNext(p.steps, 'save'),
        }));

        const mailBody = JSON.stringify({
          formName,
          ...values,
          ...(attachments.length ? { attachments } : {}),
        });

        setSubmissionPanel(p => ({
          ...p,
          steps: completeStepActivateNext(p.steps, 'compile'),
        }));

        const mailRes = await fetch('/api/send-company-mail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: mailBody,
        });

        const parsedRes = await mailRes.json();

        toast({ title: parsedRes.message, variant: parsedRes.success ? 'success' : 'error' });

        if (!parsedRes.success) {
          setSubmissionPanel(p => ({
            ...p,
            steps: p.steps.map(s =>
              s.key === 'send' && s.status === 'active' ? { ...s, status: 'error' as const } : s
            ),
          }));

          setFormErrors({ root: [String(parsedRes.error || parsedRes.message)] } as Partial<
            Record<keyof output<TSchema> | 'root', string[] | undefined>
          >);

          window.setTimeout(
            () => setSubmissionPanel({ visible: false, steps: [], uploadPercent: null }),
            2800
          );

          return false;
        }

        setSubmissionPanel(p => ({
          ...p,
          steps: p.steps.map(s => (s.key === 'send' ? { ...s, status: 'done' as const } : s)),
        }));

        resetForm();
        setFiles([]);

        clearPanelAfterDelay = true;

        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Could not submit form';

        toast({ title: message, variant: 'error' });

        setSubmissionPanel(p => ({
          ...p,
          steps: markActiveStepError(p.steps),
        }));

        setFormErrors({ root: [message] } as Partial<
          Record<keyof output<TSchema> | 'root', string[] | undefined>
        >);

        window.setTimeout(
          () => setSubmissionPanel({ visible: false, steps: [], uploadPercent: null }),
          2800
        );

        return false;
      } finally {
        if (clearPanelAfterDelay) {
          await new Promise<void>(resolve => window.setTimeout(resolve, 900));
          setSubmissionPanel({ visible: false, steps: [], uploadPercent: null });
        }
      }
    }

    useEffect(() => {
      if (!packageInURL) return;

      if (packageInURL.service !== serviceId) return;

      if (!('package' in defaultFormValues)) return;

      const packageInputData = formSections
        .flatMap(section => section.inputsArr) // get all inputs arrays from all sections
        .flat() // flatten any tuples [a, b]
        .find(input => input.kind === 'select' && input.name === 'package');

      if (!packageInputData) return;

      const options = packageInputData.selectProps?.options;
      // console.log({ options });

      if (!options) return;

      const packageOptionValue = options.find(option =>
        option.value.toLowerCase().includes(packageInURL.package.toLowerCase())
      )?.value;
      // console.log({ packageInURL, serviceId, packageOptionValue });

      setFormValues(prev =>
        'package' in prev ? { ...prev, package: packageOptionValue || '' } : prev
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceId, packageInURL, formSections, defaultFormValues]);

    return (
      <section className="w-full pb-20 md:pb-[95px]">
        <motion.form
          initial={{ opacity: 0, translateY: 50 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="form-page-container grid gap-14">
          {formSections.map(({ name, desc, inputsArr }, idx) => (
            <div key={idx} className="w-full grid gap-3">
              {(name || desc) && (
                <div className="grid gap-2">
                  <h3 className="typo-h5 text-wrap break-words">{name}</h3>
                  <p className="typo-body-7 text-gray-59/90">{desc}</p>
                </div>
              )}
              <FormInputSection
                {...{
                  inputsArr,
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
            </div>
          ))}
          <div className="w-full flex flex-col items-center pt-4 gap-2">
            <div className="flex items-center justify-center gap-2">
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
            <FormSubmissionProgress
              visible={submissionPanel.visible}
              steps={submissionPanel.steps}
              uploadAveragePercent={submissionPanel.uploadPercent}
            />
          </div>
        </motion.form>
      </section>
    );
  }
);
RequestForm.displayName = 'RequestForm';

function FormInputSection<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>({
  inputsArr,
  files,
  setFiles,
  serviceOptions,
  formValues,
  formErrors,
  handleInputChange,
  onChange,
  errorsVisible,
}: {
  inputsArr: (FormArrayItem<TSchema> | [FormArrayItem<TSchema>, FormArrayItem<TSchema>])[];
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  serviceOptions: SelectOption<string>[];
  formValues: output<TSchema>;
  formErrors: Partial<Record<keyof output<TSchema>, string[] | undefined>>;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    options?:
      | {
          clearFields?: (keyof output<TSchema>)[] | undefined;
        }
      | undefined
  ) => void;
  onChange: (
    name: keyof output<TSchema>,
    value: string | string[] | number | boolean,
    options?:
      | {
          clearFields?: (keyof output<TSchema>)[] | undefined;
        }
      | undefined
  ) => void;
  errorsVisible: boolean;
}) {
  return (
    <div className="inputs-wrap grid gap-5">
      {inputsArr.map((item, idx) => (
        <div key={idx} className="w-full">
          {Array.isArray(item) ? (
            <div className="w-full grid items-end gap-x-4 gap-y-8 md:grid-cols-2">
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
  );
}

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
    // if (name === 'package') {
    //   console.log({ value: formValues[name], loc: 'form input and kind is select' });
    // }
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
