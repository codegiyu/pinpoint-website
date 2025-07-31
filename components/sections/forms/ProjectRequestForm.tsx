'use client';
import { FileUploadInput } from '@/components/atoms/FileUploadInput';
import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { RegularInput } from '@/components/atoms/RegularInput';
import { RegularTextarea } from '@/components/atoms/RegularTextarea';
import { toast } from '@/components/atoms/Toast';
import { useForm } from '@/lib/hooks/use-form';
import { memo, useMemo, useState } from 'react';
import { z } from 'zod';
import FormAlert from './FormAlert';
import { CheckCheck } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(3, { error: 'Please enter at least 3 characters' }),
  email: z.email({ error: 'Please enter a valid email' }),
  phone: z
    .string()
    .min(11, { error: 'Please enter at least 11 characters' })
    .max(14, { error: 'Phone number is too long' }),
  company: z.string().min(3, { error: 'Please enter at least 3 characters' }),
  message: z.string().min(10, { error: 'Message is not long enough' }),
});
type FormSchema = z.infer<typeof formSchema>;
const defaultFormValues: FormSchema = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
};

export const ProjectRequestForm = memo(
  ({ formName = 'New Project Request' }: { formName?: string }) => {
    const [files, setFiles] = useState<File[]>([]);
    const {
      formValues,
      formErrors,
      loading,
      isValid,
      errorsVisible,
      submitted,
      resetForm,
      handleInputChange,
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
      <section className="w-full pb-20 md:pb-[95px]">
        <form onSubmit={handleSubmit} className="form-page-container grid gap-14">
          <div className="inputs-wrap grid gap-5">
            <div className="w-full grid gap-x-4 gap-y-8 md:grid-cols-2">
              <RegularInput
                label="Name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                errors={errorsVisible ? formErrors.name : undefined}
                wrapClassName=""
                required
              />
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
            </div>
            <div className="w-full grid gap-x-4 gap-y-8 md:grid-cols-2">
              <RegularInput
                label="Phone Number"
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
                errors={errorsVisible ? formErrors.phone : undefined}
                wrapClassName=""
                required
              />
              <RegularInput
                label="Company"
                name="company"
                value={formValues.company}
                onChange={handleInputChange}
                errors={errorsVisible ? formErrors.company : undefined}
                wrapClassName=""
                required
              />
            </div>
            <FileUploadInput files={files} setFiles={setFiles} inputProps={{ required: true }} />
            <RegularTextarea
              label="Message"
              placeholder="Tell us about your project: what is the objective, the budget, the schedule, any problems you want to solve...?"
              name="message"
              value={formValues.message}
              onChange={handleInputChange}
              errors={errorsVisible ? formErrors.message : undefined}
              wrapClassName=""
              required
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
  }
);
ProjectRequestForm.displayName = 'ProjectRequestForm';
