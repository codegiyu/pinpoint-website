'use client';
import { FileUploadInput } from '@/components/atoms/FileUploadInput';
import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { RegularInput } from '@/components/atoms/RegularInput';
import { RegularTextarea } from '@/components/atoms/RegularTextarea';
import { toast } from '@/components/atoms/Toast';
import { useForm } from '@/lib/hooks/use-form';
import { useMemo, useState } from 'react';
import z from 'zod';
import FormAlert from './FormAlert';
import { cn } from '@/lib/utils';
import { CheckCheck } from 'lucide-react';

const formSchema = z.object({
  firstName: z.string().min(3, { error: 'Please enter at least 3 characters' }),
  lastName: z.string().min(3, { error: 'Please enter at least 3 characters' }),
  email: z.email({ error: 'Please enter a valid email' }),
  phone: z.string().min(11, { error: 'Please enter a valid phone number' }),
  portfolio: z.url({ error: 'Please enter a valid url' }),
  linkedin: z.url({ error: 'Please enter a valid url' }),
  message: z.string().min(10, { error: 'Message is not long enough' }),
});
type FormSchema = z.infer<typeof formSchema>;
const defaultFormValues: FormSchema = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  portfolio: '',
  linkedin: '',
  message: '',
};

type JobsFormProps = {
  formName: string;
  heading: {
    text: string;
    className?: string;
  };
  description?: string;
  useFirstRef?: boolean;
};

export const JobsForm = ({ heading, description, useFirstRef, formName }: JobsFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const {
    formValues,
    formErrors,
    loading,
    isValid,
    firstFieldRef,
    errorsVisible,
    submitted,
    handleInputChange,
    resetForm,
    setFormErrors,
    handleSubmit,
    validateForm,
  } = useForm({
    formSchema,
    defaultFormValues,
    onSubmit,
  });

  const formValid = useMemo(() => isValid && !!files.length, [isValid, files]);

  const generalValidation = () => {
    if (!files.length) {
      toast({ title: 'Please upload at least one file', variant: 'error' });
      return false;
    }

    return validateForm();
  };

  async function onSubmit(values: FormSchema): Promise<boolean> {
    if (!generalValidation()) return false;

    const formData = new FormData();

    formData.append('formName', formName);
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    files.forEach(file => {
      formData.append('files', file);
    });

    console.log('Making request to backend');
    const res = await fetch('/api/send-company-mail', {
      method: 'POST',
      body: formData,
    });

    const parsedRes = await res.json();

    toast({ title: parsedRes.message, variant: parsedRes.success ? 'success' : 'error' });

    if (parsedRes.error) {
      setFormErrors({ message: parsedRes.error });
    }

    if (parsedRes.success) {
      resetForm();
      setFiles([]);
      return true;
    }

    return false;
  }

  return (
    <section className="w-full py-10">
      <form onSubmit={handleSubmit} className="form-page-container pb-12 grid gap-8 md:gap-14">
        <h2 className={cn('typo-h3 pt-4', heading.className)}>{heading.text}</h2>
        {description && (
          <p className="text-[clamp(18px,_1.2vw,_23px)] font-light py-4 ">{description}</p>
        )}
        <div className="inputs-wrap grid gap-5 lg:gap-7">
          <div className="w-full grid gap-x-4 gap-y-8 md:grid-cols-2">
            <RegularInput
              label="First Name"
              type="text"
              name="firstName"
              value={formValues.firstName}
              onChange={handleInputChange}
              errors={errorsVisible ? formErrors.firstName : undefined}
              wrapClassName=""
              required
              ref={useFirstRef ? firstFieldRef : undefined}
            />
            <RegularInput
              label="Last Name"
              type="text"
              name="lastName"
              value={formValues.lastName}
              onChange={handleInputChange}
              errors={errorsVisible ? formErrors.email : undefined}
              wrapClassName=""
              required
            />
          </div>
          <div className="w-full grid gap-x-4 gap-y-8 md:grid-cols-2">
            <RegularInput
              label="Email"
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              errors={errorsVisible ? formErrors.email : undefined}
              wrapClassName=""
              required
            />
            <RegularInput
              label="Phone Number"
              type="phone"
              name="phone"
              value={formValues.phone}
              onChange={handleInputChange}
              errors={errorsVisible ? formErrors.phone : undefined}
              wrapClassName=""
              required
            />
          </div>
          <div className="w-full grid gap-x-4 gap-y-8 md:grid-cols-2">
            <RegularInput
              label="Portfolio URL"
              type="url"
              name="portfolio"
              value={formValues.portfolio}
              onChange={handleInputChange}
              errors={errorsVisible ? formErrors.portfolio : undefined}
              wrapClassName=""
              required
            />
            <RegularInput
              label="LinkedIn URL"
              type="url"
              name="linkedin"
              value={formValues.linkedin}
              onChange={handleInputChange}
              errors={errorsVisible ? formErrors.linkedin : undefined}
              wrapClassName=""
              required
            />
          </div>
          <FileUploadInput
            files={files}
            setFiles={setFiles}
            inputProps={{ multiple: true, required: true }}
          />
          <RegularTextarea
            label="Message"
            placeholder="Message"
            name="message"
            value={formValues.message}
            onChange={handleInputChange}
            errors={errorsVisible ? formErrors.message : undefined}
            wrapClassName=""
          />
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
      </form>
    </section>
  );
};
