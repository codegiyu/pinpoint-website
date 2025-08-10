/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormErrors as FormErrorsType } from '@/lib/types/general';
import { formatInputNumber } from '@/lib/utils/general';
import {
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type RefObject,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { z, ZodType } from 'zod';

export interface UseFormProps<TSchema extends ZodType<any>> {
  formSchema: TSchema;
  defaultFormValues: z.infer<TSchema>;
  onSubmit: (values: z.infer<TSchema>) => Promise<boolean>;
  buttonIsFirstField?: boolean;
  noFocusOnFirstField?: boolean;
  validateOnChange?: boolean;
  submitStateResetInMs?: number;
}

export interface UseFormReturn<TSchema extends ZodType<any>> {
  formValues: z.TypeOf<TSchema>;
  formErrors: Partial<Record<keyof z.TypeOf<TSchema>, string[] | undefined>>;
  setFormValues: Dispatch<SetStateAction<z.TypeOf<TSchema>>>;
  setFormErrors: (
    errors: Partial<Record<keyof z.TypeOf<TSchema> | 'root', string[] | undefined>>,
    options?: {
      clearFields?: (keyof z.TypeOf<TSchema>)[];
      noShow?: boolean;
    }
  ) => void;
  resetForm: () => void;
  errorsVisible: boolean;
  setErrorsVisible: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  firstFieldRef: RefObject<HTMLInputElement | null>;
  firstButtonFieldRef: RefObject<HTMLButtonElement | null>;
  isValid: boolean;
  submitted: boolean;
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
  validateForm: (obj?: Partial<z.TypeOf<TSchema>>) => boolean;
  validateField: (name: keyof z.TypeOf<TSchema>) => void;
  handleSubmit: (e?: FormEvent) => Promise<void>;
}

export const useForm = <TSchema extends ZodType<any>>({
  formSchema,
  defaultFormValues,
  onSubmit,
  buttonIsFirstField = false,
  noFocusOnFirstField = false,
  validateOnChange = false,
  submitStateResetInMs = 3000,
}: UseFormProps<TSchema>): UseFormReturn<TSchema> => {
  type FormValues = typeof defaultFormValues;
  type FormErrors = FormErrorsType<FormValues>;

  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>(() => {
    const initialErrors: FormErrors = {};
    for (const key in defaultFormValues) initialErrors[key] = [];
    return initialErrors;
  });
  const [errorsVisible, setErrorsVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const firstFieldRef = useRef<HTMLInputElement>(null);
  const firstButtonFieldRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const validateForm = (obj?: Partial<FormValues>) => {
    const result = formSchema.safeParse({ ...formValues, ...obj });
    const errors = result.success ? {} : z.flattenError(result.error).fieldErrors;

    setFormErrors(() => {
      return errors as FormErrors;
    });

    setErrorsVisible(!obj);
    setIsValid(result.success);

    return result.success;
  };

  const validateField = (name: keyof FormValues) => {
    const result = formSchema.safeParse(formValues);
    const error = result.success ? [] : (z.flattenError(result.error).fieldErrors[name] ?? []);

    setFormErrors(prev => ({ ...prev, root: undefined, [name]: error }));
    setIsValid(result.success);
  };

  const onChange = (
    name: keyof FormValues,
    value: string | string[] | number | boolean,
    options?: { clearFields?: (keyof FormValues)[] }
  ) => {
    setFormValues(prev => {
      if (prev[name] === value) return prev;

      const updated = { ...prev, [name]: value };

      if (options?.clearFields?.length) {
        for (const key of options.clearFields) {
          updated[key] = defaultFormValues[key];
        }
      }

      return updated;
    });
  };

  const setErrors = (
    errors: Partial<FormErrors>,
    options?: { noShow?: boolean; clearFields?: (keyof FormValues)[] }
  ) => {
    setFormErrors(prev => ({ ...prev, ...errors }));
    if (!options?.noShow) setErrorsVisible(true);

    if (options?.clearFields?.length) {
      setFormValues(prev => {
        const updated = { ...prev };

        for (const key of options.clearFields || []) {
          updated[key] = defaultFormValues[key];
        }

        return updated;
      });
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    options?: { clearFields?: (keyof FormValues)[] }
  ) => {
    const { name, dataset } = e.target;
    const fieldName = name as keyof FormValues;
    let value = e.target.value;
    const { type, maxlength, nodecimalsallowed } = dataset;

    if (type === 'number') {
      value = formatInputNumber(value, { noDecimalsAllowed: nodecimalsallowed === 'true' });
    }

    if (Number(maxlength) > 0) {
      value = value.slice(0, Number(maxlength));
    }

    onChange(fieldName, value, options);

    if (!validateOnChange) validateField(fieldName);
  };

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();

    const formValid = formSchema.safeParse(formValues);

    if (!formValid.success) {
      setErrorsVisible(true);
      return;
    }

    setLoading(true);
    const wasSubmittedSuccessfully = await onSubmit(formValues);
    setLoading(false);
    setSubmitted(wasSubmittedSuccessfully);
    setErrorsVisible(true);
  };

  const resetForm = () => {
    setFormValues(defaultFormValues);
    setFormErrors(() => {
      const initialErrors: FormErrors = {};
      for (const key in defaultFormValues) initialErrors[key] = [];
      return initialErrors;
    });
    setSubmitted(false);
    firstFieldRef.current?.focus();
  };

  useEffect(() => {
    if (!noFocusOnFirstField) {
      buttonIsFirstField ? firstButtonFieldRef.current?.focus() : firstFieldRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!validateOnChange) return;

    const timeout = setTimeout(() => {
      const partialValues: Partial<FormValues> = {};

      for (const key in formValues) {
        if (formValues[key]) partialValues[key] = formValues[key];
      }

      validateForm(partialValues);
    }, 250);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  useEffect(() => {
    if (submitted) {
      if (timeoutRef.current) {
        setSubmitted(false);
        clearTimeout(timeoutRef.current);
      } else {
        timeoutRef.current = setTimeout(() => {
          setSubmitted(false);
        }, submitStateResetInMs);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [submitted, submitStateResetInMs, formValues]);

  return {
    formValues,
    formErrors,
    setFormValues,
    setFormErrors: setErrors,
    resetForm,
    errorsVisible,
    setErrorsVisible,
    loading,
    setLoading,
    firstFieldRef,
    firstButtonFieldRef,
    isValid,
    handleInputChange,
    onChange,
    validateForm,
    validateField,
    handleSubmit,
    submitted,
  };
};
