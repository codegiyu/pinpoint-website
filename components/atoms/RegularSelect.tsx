import { type SelectOption } from '@/lib/types/general';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { cn } from '@/lib/utils';
import { InputWrapper } from '../general/InputWrapper';
import { ComponentPropsWithRef, FocusEvent, useState } from 'react';

export interface RegularSelectProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  label?: string;
  labelClassName?: string;
  value: string;
  placeholder?: string;
  className?: string;
  onSelectChange: (value: string) => void;
  optionsTitle?: string;
  options: SelectOption[];
  disabled?: boolean;
  required?: boolean;
  wrapClassName?: string;
  triggerClassName?: string;
  valueClassName?: string;
  hideCaretIfDisabled?: boolean;
  errors?: string[];
}

export const RegularSelect = ({
  label = '',
  labelClassName = '',
  value,
  placeholder = '',
  className = '',
  onSelectChange,
  optionsTitle,
  options,
  disabled = false,
  wrapClassName = '',
  triggerClassName = '',
  valueClassName = '',
  hideCaretIfDisabled,
  required,
  onFocus,
  onBlur,
  errors = [],
  ...props
}: RegularSelectProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputWrapper
      wrapClassName={wrapClassName}
      label={label}
      labelTextClassName={labelClassName}
      labelOnTop={isFocused || !!value}
      required={required}
      errors={errors}>
      <SelectGroup
        onFocus={(e: FocusEvent<HTMLDivElement>) => {
          setIsFocused(true);
          if (onFocus) onFocus(e);
        }}
        onBlur={(e: FocusEvent<HTMLDivElement>) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
        className={cn(
          'w-full flex items-center justify-between py-5 px-4 \
          m-0 bg-transparent border border-dark/25 typo-body-3 text-dark \
          text-[0.825rem] lg:text-[0.95rem]',
          className
        )}
        {...props}>
        <Select value={value} onValueChange={value => onSelectChange(value)}>
          <SelectTrigger
            disabled={disabled}
            hideCaretIfDisabled={hideCaretIfDisabled}
            className={cn(
              `w-full h-full px-0 py-0 rounded-[0px] grid grid-cols-[1fr_auto] items-center gap-2
            ${disabled && !hideCaretIfDisabled ? 'bg-gray-f2/70' : 'bg-transparent'} outline-none border-none`,
              triggerClassName
            )}>
            <SelectValue
              className={cn('typo-body-3 capitalize', valueClassName)}
              placeholder={
                <span className="block text-start text-gray-66">
                  {isFocused ? placeholder : label || placeholder}
                </span>
              }
            />
          </SelectTrigger>
          <SelectContent className="bg-white rounded-md border p-4 shadow-md outline-hidden max-h-[14.375rem]">
            {optionsTitle && (
              <SelectLabel className="py-1 px-3 text-sm font-medium text-d-30">
                {optionsTitle}
              </SelectLabel>
            )}
            {options.map(({ text, altText, value, disabled = false }, idx) => (
              <SelectItem key={idx} value={value} disabled={disabled}>
                <div className="flex w-full items-center gap-3">
                  <span className={cn('typo-body-7 text-dark', valueClassName)}>
                    {altText || text}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SelectGroup>
    </InputWrapper>
  );
  return (
    <div className={cn('w-full grid gap-2.5', wrapClassName)}>
      {label && (
        <span
          className={cn('text-[1rem] leading-none -tracking-[0.32px] text-d-70', labelClassName)}>
          {label}
        </span>
      )}
      <SelectGroup className={cn('w-full h-fit rounded-[0.625rem] border border-d-7', className)}>
        <Select value={value} onValueChange={value => onSelectChange(value)}>
          <SelectTrigger
            disabled={disabled}
            hideCaretIfDisabled={hideCaretIfDisabled}
            className={cn(
              `w-full h-full pl-3 pr-2 py-2 rounded-[10px] grid grid-cols-[1fr_auto] items-center gap-2
            ${disabled && !hideCaretIfDisabled ? 'bg-d-3' : 'bg-transparent'} outline-none border-none`,
              triggerClassName
            )}>
            <SelectValue
              className={cn(
                'text-[0.9375rem] leading-[1.125rem] font-medium text-d-100 capitalize',
                valueClassName
              )}
              placeholder={
                <span className="text-[0.9375rem] leading-[1.125rem] font-medium text-d-30 block text-start">
                  {placeholder}
                </span>
              }
            />
          </SelectTrigger>
          <SelectContent className="glass-bg rounded-[10px] max-h-[14.375rem]">
            {optionsTitle && (
              <SelectLabel className="py-1 px-3 text-sm font-medium text-d-30">
                {optionsTitle}
              </SelectLabel>
            )}
            {options.map(({ text, altText, value, disabled = false }, idx) => (
              <SelectItem key={idx} value={value} disabled={disabled}>
                <div className="flex w-full items-center gap-3">
                  <span className={cn('text-d-90 text-base font-medium', valueClassName)}>
                    {altText || text}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SelectGroup>
    </div>
  );
};
