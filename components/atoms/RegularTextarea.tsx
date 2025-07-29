'use client';
import { cn } from '@/lib/utils';
import { Textarea, type TextareaProps } from '../ui/textarea';
import { FocusEvent, useState } from 'react';
import { InputWrapper } from '../general/InputWrapper';

export interface RegularTextareaProps extends TextareaProps {
  label?: string;
  subtext?: string;
  labelClassName?: string;
  wrapClassName?: string;
  errors?: string[];
}

export const RegularTextarea = ({
  className,
  label,
  labelClassName,
  wrapClassName,
  placeholder,
  ref,
  required,
  onFocus,
  onBlur,
  errors = [],
  ...props
}: RegularTextareaProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputWrapper
      wrapClassName={wrapClassName}
      label={label}
      labelTextClassName={labelClassName}
      labelOnTop={isFocused || !!props.value}
      required={required}
      errors={errors}>
      <Textarea
        placeholder={isFocused ? '' : placeholder || label + (required ? ' *' : '')}
        className={cn('py-5 min-h-[14rem]', className)}
        ref={ref}
        {...props}
        onFocus={(e: FocusEvent<HTMLTextAreaElement>) => {
          setIsFocused(true);
          if (onFocus) onFocus(e);
        }}
        onBlur={(e: FocusEvent<HTMLTextAreaElement>) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
      />
    </InputWrapper>
  );
};
