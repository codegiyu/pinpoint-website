import { cn } from '@/lib/utils';
import { ComponentPropsWithRef } from 'react';

type TextareaProps = ComponentPropsWithRef<'textarea'>;

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-dark/25  placeholder:text-[0.825rem] lg:placeholder:text-[0.95rem] \
        placeholder:leading-[1.6] placeholder:text-gray-66 focus-visible:outline-1 \
        focus-visible:outline-dark focus-visible:outline-offset-0 \
        aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 \
        aria-invalid:border-destructive flex field-sizing-content min-h-28 w-full \
        border bg-transparent px-3 py-2 typo-body-4 transition-[color,box-shadow] \
        outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export { Textarea, type TextareaProps };
