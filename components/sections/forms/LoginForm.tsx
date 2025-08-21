'use client';

import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { RegularInput } from '@/components/atoms/RegularInput';
import { toast } from '@/components/atoms/Toast';
import { useForm } from '@/lib/hooks/use-form';
import { z } from 'zod';
import { CheckCheck } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.email({ error: 'Please enter a valid email' }),
  password: z.string({ error: 'Please enter your password' }),
});
type FormSchema = z.infer<typeof formSchema>;
const defaultFormValues: FormSchema = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const { replace } = useRouter();
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

  async function onSubmit(values: FormSchema): Promise<boolean> {
    const res = await signIn('credentials', { ...values, redirect: false });

    toast({
      title: res?.ok ? 'Login successful!' : res?.error || 'Error logging in',
      variant: res?.ok ? 'success' : 'error',
    });

    if (res?.ok) {
      resetForm();
      replace('/admin');
    } else {
      if (res?.error) {
        setFormErrors({ password: [res.error] });
      }
    }

    return res?.ok ?? false;
  }

  return (
    <section className="w-full py-10">
      <form onSubmit={handleSubmit} className="form-page-container pb-12 grid gap-8 md:gap-14">
        <div className="inputs-wrap grid gap-5 lg:gap-7">
          <RegularInput
            label="Email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            errors={errorsVisible ? formErrors.email : undefined}
            wrapClassName=""
            required
            ref={firstFieldRef}
          />
          <RegularInput
            label="Password"
            type="text"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            errors={errorsVisible ? formErrors.password : undefined}
            wrapClassName=""
            required
          />
        </div>
        <div className="w-full flex items-center justify-center pt-4 gap-2">
          <PinpointBtn
            text="Login"
            loading={loading}
            disabled={!isValid}
            onDisabledClick={validateForm}
            RightIcon={submitted ? CheckCheck : undefined}
            rightIconProps={{ className: 'size-4 text-green-600' }}
          />
        </div>
      </form>
    </section>
  );
};
