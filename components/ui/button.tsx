import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap transition-all cursor-pointer focus:outline-none focus-visible:outline-white focus-visible:outline-2 outline-offset-2 disabled:pointer-events-none disabled:opacity-50 blur-0',
  {
    variants: {
      variant: {
        default: 'bg-dark text-white  transition-all duration-500 ease-in-out',
        secondary:
          'bg-dark-primary text-dark relative after:absolute after:inset-0 after:border after:border-black lg:hover:after:border-4 after:transition-all after:duration-300 after:ease-in-out',
        ghost: '',
      },
      size: {
        default:
          'w-full md:w-fit px-4 py-4 md:px-9 md:py-[1.025rem] xl:px-[clamp(35px,_2.612vw,_42px)] xl:py-[clamp(16px,_1.018vw,_20px)] rounded-none gap-2',
        icon: '',
        full: 'w-full px-4 py-4 md:px-9 md:py-[1.025rem] rounded-none gap-2',
      },
      typo: {
        default: 'typo-button',
        custom: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      typo: 'default',
    },
  }
);

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, typo, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, typo, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants, type ButtonProps };
