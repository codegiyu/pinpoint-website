import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, PropsWithChildren } from 'react';

export type InputWrapperProps = PropsWithChildren<{
  wrapClassName?: string;
  label?: string;
  labelTextClassName?: string;
  labelOnTop?: boolean;
  required?: boolean;
  errors?: string[];
  otherLabelProps?: Omit<ComponentPropsWithRef<'label'>, 'className'>;
}>;

export const InputWrapper = ({
  children,
  wrapClassName,
  label,
  labelTextClassName,
  otherLabelProps,
  labelOnTop,
  required,
  errors = [],
}: InputWrapperProps) => {
  return (
    <label className={cn(`w-full`, wrapClassName)} {...otherLabelProps}>
      <div className={`flex flex-col justify-center gap-2`}>
        {label && (
          <span
            className={cn(
              'text-[0.625rem] lg:text-[0.75rem] leading-[1.2] font-extralight text-gray-66 transition-all ease-linear duration-300',
              labelOnTop
                ? 'transform-y-0 transform-x-0 opacity-100'
                : 'transform-y-2 transform-x-2 opacity-0',
              labelTextClassName
            )}>
            {label}
            {required ? ' *' : ''}
          </span>
        )}
        <div className="relative w-full">{children}</div>
      </div>
      {errors.length > 0 && <p className={cn('typo-body-6 text-red-500 mt-1')}>{errors[0]}</p>}
    </label>
  );
};
