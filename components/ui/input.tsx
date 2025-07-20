import { cn } from '@/lib/utils';
import { type ComponentPropsWithRef } from 'react';

type InputProps = ComponentPropsWithRef<'input'>;

function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex w-full py-3.5 px-4 m-0 bg-transparent border border-dark/25 \
        typo-body-4 placeholder:text-gray-66 text-dark file:border-0 \
        file:bg-transparent file:text-sm focus-visible:outline-1 \
        focus-visible:outline-dark focus-visible:outline-offset-0 \
        disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export { Input, type InputProps };
