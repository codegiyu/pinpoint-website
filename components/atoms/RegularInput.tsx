'use client';
import { cn } from '@/lib/utils';
import { Input, type InputProps } from '../ui/input';
import { FocusEvent, ReactNode, useState } from 'react';
import { InputWrapper } from '../general/InputWrapper';

export interface RegularInputProps extends InputProps {
  label?: string;
  subtext?: string;
  labelClassName?: string;
  wrapClassName?: string;
  errors?: string[];
  bottomText?: ReactNode;
}

export const RegularInput = ({
  className,
  type,
  label,
  subtext,
  labelClassName,
  wrapClassName,
  placeholder,
  ref,
  required,
  onFocus,
  onBlur,
  errors = [],
  ...props
}: RegularInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputWrapper
      wrapClassName={wrapClassName}
      label={label}
      subtext={subtext}
      labelTextClassName={labelClassName}
      labelOnTop={isFocused || !!props.value}
      required={required}
      errors={errors}>
      <Input
        placeholder={
          isFocused
            ? placeholder
            : label + (required ? ' *' : '') + (subtext ? ` ${subtext}` : '') || placeholder
        }
        type={type}
        className={cn('py-5', className)}
        ref={ref}
        {...props}
        onFocus={(e: FocusEvent<HTMLInputElement>) => {
          setIsFocused(true);
          if (onFocus) onFocus(e);
        }}
        onBlur={(e: FocusEvent<HTMLInputElement>) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
      />
    </InputWrapper>
  );
};
