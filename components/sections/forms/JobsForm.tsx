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
import { FormSubmissionProgress } from './FormSubmissionProgress';
import { cn } from '@/lib/utils';
import { CheckCheck } from 'lucide-react';
import { motion } from 'motion/react';
import {
  submitPublicFormSubmission,
  uploadAttachmentsToR2,
} from '@/lib/api/public-form-submission';
import {
  buildJobApplicationSubmissionSteps,
  completeStepActivateNext,
  markActiveStepError,
  type SubmissionStep,
} from '@/lib/utils/form-submission-progress';

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
  jobSlug?: string;
  heading: {
    text: string;
    className?: string;
  };
  description?: string;
  useFirstRef?: boolean;
  transitionDelay?: number;
};

export const JobsForm = memo(
  ({
    heading,
    description,
    useFirstRef,
    formName,
    jobSlug,
    transitionDelay = 0.2,
  }: JobsFormProps) => {
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
      validateOnChange: true,
    });

    const formValid = useMemo(() => isValid && !!files.length, [isValid, files]);

    const [submissionPanel, setSubmissionPanel] = useState<{
      visible: boolean;
      steps: SubmissionStep[];
      uploadPercent: number | null;
    }>({ visible: false, steps: [], uploadPercent: null });

    const generalValidation = () => {
      if (!files.length) {
        toast({ title: 'Please upload at least one file', variant: 'error' });
      }

      return validateForm() && !!files.length;
    };

    async function onSubmit(values: FormSchema): Promise<boolean> {
      if (!generalValidation()) return false;

      setSubmissionPanel({
        visible: true,
        steps: buildJobApplicationSubmissionSteps(),
        uploadPercent: 0,
      });

      let clearPanelAfterDelay = false;

      try {
        const attachments = await uploadAttachmentsToR2(files, pct =>
          setSubmissionPanel(p => ({ ...p, uploadPercent: pct }))
        );

        setSubmissionPanel(p => ({
          ...p,
          steps: completeStepActivateNext(p.steps, 'upload'),
          uploadPercent: 100,
        }));

        await submitPublicFormSubmission({
          formType: jobSlug ? 'jobApplication' : 'spontaneousApplication',
          formName,
          ...(jobSlug ? { jobSlug } : {}),
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
          ...(jobSlug ? { jobSlug } : {}),
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
          setFormErrors({ message: [String(parsedRes.error || parsedRes.message)] });
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
        setFormErrors({ message: [message] });
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

    return (
      <section className="w-full py-10">
        <motion.form
          initial={{ opacity: 0, translateY: -50 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.7, delay: transitionDelay }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="form-page-container pb-12 grid gap-8 md:gap-14">
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
JobsForm.displayName = 'JobsForm';
