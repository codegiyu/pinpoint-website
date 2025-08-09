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
import { MultiSelect } from '@/components/atoms/MultiSelect';
import { generateOptionsFromArray } from '@/lib/utils/general';
import { motion } from 'motion/react';

const formSchema = z.object({
  name: z.string().min(3, { error: 'Please enter at least 3 characters' }),
  email: z.email({ error: 'Please enter a valid email' }),
  phone: z
    .string()
    .min(11, { error: 'Please enter at least 11 characters' })
    .max(14, { error: 'Phone number is too long' }),
  company: z.string().min(3, { error: 'Please enter at least 3 characters' }),
  services: z.array(z.string()).min(1, { error: 'Please select at least one service' }),
  message: z.string().min(10, { error: 'Message is not long enough' }),
});
type FormSchema = z.infer<typeof formSchema>;
const defaultFormValues: FormSchema = {
  name: '',
  email: '',
  phone: '',
  company: '',
  services: [],
  message: '',
};

export const ProjectRequestForm = memo(
  ({
    formName = 'New Project Request',
    servicesList,
  }: {
    formName?: string;
    servicesList: string[];
  }) => {
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

    const formValid = useMemo(() => isValid && !!files.length, [isValid, files]);

    const serviceOptions = useMemo(() => {
      return generateOptionsFromArray({ arr: servicesList });
    }, [servicesList]);

    const generalValidation = () => {
      if (!files.length) {
        toast({ title: 'Please upload at least one file', variant: 'error' });
      }

      return validateForm() && !!files.length;
    };

    async function onSubmit(values: FormSchema): Promise<boolean> {
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

      console.log('Making request to backend');
      const res = await fetch('/api/send-company-mail', {
        method: 'POST',
        body: formData,
      });

      const parsedRes = await res.json();

      toast({ title: parsedRes.message, variant: parsedRes.success ? 'success' : 'error' });

      if (parsedRes.error) {
        setFormErrors({ message: [parsedRes.error] });
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
            <MultiSelect
              options={serviceOptions}
              selected={formValues.services}
              onChange={values => onChange('services', values)}
              errors={errorsVisible ? formErrors.services : undefined}
              placeholder="Select at least one service which covers what you need *"
              label="Services"
            />
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
        </motion.form>
      </section>
    );
  }
);
ProjectRequestForm.displayName = 'ProjectRequestForm';
