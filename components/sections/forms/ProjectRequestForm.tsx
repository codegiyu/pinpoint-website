'use client';
import { FileUploadInput } from '@/components/atoms/FileUploadInput';
import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { RegularInput } from '@/components/atoms/RegularInput';
import { RegularTextarea } from '@/components/atoms/RegularTextarea';
import { toast } from '@/components/atoms/Toast';
import { useForm } from '@/lib/hooks/use-form';
import { debounce } from '@/lib/utils/general';
import { useMemo, useState } from 'react';
import z from 'zod';

const formSchema = z.object({
  name: z.string().min(3, { error: 'Please enter at least 3 characters' }),
  email: z.email({ error: 'Please enter a valid email' }),
  message: z.string().min(10, { error: 'Message is not long enough' }),
});
type FormSchema = z.infer<typeof formSchema>;
const defaultFormValues: FormSchema = {
  name: '',
  email: '',
  message: '',
};

export const ProjectRequestForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const {
    formValues,
    formErrors,
    loading,
    isValid,
    firstFieldRef,
    errorsVisible,
    handleInputChange,
    // setFormErrors,
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
    }

    validateForm();
  };

  async function onSubmit(values: FormSchema): Promise<boolean> {
    console.log({ values });
    await debounce(2500);
    return true;
  }

  return (
    <section className="w-full py-10">
      <form onSubmit={handleSubmit} className="pinpoint-container grid gap-14">
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
              ref={firstFieldRef}
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
        <div className="w-full flex justify-center gap-2">
          <PinpointBtn
            text="Submit"
            loading={loading}
            disabled={!formValid}
            onDisabledClick={generalValidation}
          />
        </div>
      </form>
    </section>
  );
};
