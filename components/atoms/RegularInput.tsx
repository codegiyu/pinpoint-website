'use client';
import { cn } from '@/lib/utils';
import { Input, type InputProps } from '../ui/input';
import { FocusEvent, useState } from 'react';
import { InputWrapper } from '../general/InputWrapper';

export interface RegularInputProps extends InputProps {
  label?: string;
  subtext?: string;
  labelClassName?: string;
  wrapClassName?: string;
  errors?: string[];
}

export const RegularInput = ({
  className,
  type,
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
}: RegularInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputWrapper
      wrapClassName={wrapClassName}
      label={label}
      labelTextClassName={labelClassName}
      labelOnTop={isFocused || !!props.value}
      required={required}
      errors={errors}>
      <Input
        placeholder={isFocused ? placeholder : label + (required ? ' *' : '') || placeholder}
        type={type}
        className={cn('', className)}
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
