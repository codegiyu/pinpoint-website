'use client';
import {
  type KeyboardEvent,
  type SVGProps,
  type JSX,
  MouseEvent,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
} from 'react';
import { buttonVariants } from '../ui/button';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { omit } from 'lodash';
import { Loader } from 'lucide-react';
import { motion } from 'framer-motion';

export interface PinpointBtnProps
  extends ComponentPropsWithRef<'button'>,
    VariantProps<typeof buttonVariants> {
  LeftIcon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  RightIcon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  leftIconClass?: string;
  rightIconClass?: string;
  leftIconProps?: SVGProps<SVGSVGElement>;
  rightIconProps?: SVGProps<SVGSVGElement>;
  text?: string;
  textClassName?: string;
  children?: React.ReactNode;
  loading?: boolean;
  loadingIconBesideText?: boolean;
  loadingIconClassName?: string;
  onDisabledClick?: () => void;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  wrapClassName?: string;
  linkProps?: Omit<ComponentPropsWithoutRef<'a'>, 'onClick' | 'className' | 'children' | 'href'> & {
    href: string;
    preventdefault?: string;
  };

  animate?: {
    duration: number;
    axis: 'x' | 'y';
  };
}

export const PinpointBtn = ({
  LeftIcon,
  RightIcon,
  leftIconClass = '',
  rightIconClass = '',
  leftIconProps = {},
  rightIconProps = {},
  className = '',
  text = '',
  textClassName = '',
  children,
  variant = 'default',
  size = 'default',
  typo = 'default',
  loading = false,
  loadingIconBesideText = false,
  loadingIconClassName,
  onDisabledClick,
  disabled = false,
  wrapClassName = '',
  linkProps,
  animate,
  ref,
  ...props
}: PinpointBtnProps) => {
  const fullWrapClassName = cn(
    `inline-block leading-none ${!!onDisabledClick && disabled ? 'cursor-pointer focus-visible:outline-gray-border focus-visible:outline-1' : 'cursor-default'} focus:outline-none focus-visible:outline-white/60 focus-visible:outline-2 outline-offset-2`,
    size === 'full' || className.includes('w-full')
      ? 'w-full'
      : variant && ['default', 'secondary'].includes(variant)
        ? 'w-full md:w-fit'
        : 'w-fit',
    wrapClassName
  );
  const wrapProps = {
    ...(disabled && {
      tabIndex: 0,
      role: 'button',
      onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(); // Prevent scrolling when pressing Space
          onDisabledClick?.();
        }
      },
      onClick: () => onDisabledClick?.(),
    }),
  };
  const mainEl = (
    <button
      className={cn(buttonVariants({ size, variant, typo, className }), 'group')}
      ref={ref}
      disabled={loading || disabled}
      aria-label={props['aria-label'] || text || 'button'}
      {...omit(props, ['aria-label'])}>
      {loading && children ? (
        <Loader className={cn('size-4 bg-green-500 animate-spin', loadingIconClassName)} />
      ) : !loading && children ? (
        children
      ) : loading && !loadingIconBesideText ? (
        <Loader className={cn('size-4 bg-green-500 animate-spin', loadingIconClassName)} />
      ) : (
        <>
          {LeftIcon && (
            <i className={cn('', leftIconClass)}>
              <LeftIcon {...leftIconProps} />
            </i>
          )}
          <div className="gap-3 grid place-items-center transition-colors relative overflow-hidden">
            {animate ? (
              <span className="block relative h-full  overflow-hidden">
                <motion.span
                  transition={{ ease: [0.25, 1, 0.5, 1] }}
                  className={cn(
                    `font-rubik block absolute h-full leading-10 top-0 left-0 w-full ${animate.axis === 'y' ? `group-hover:animate-[slideY_${animate.duration}s_ease-in-out_forwards]` : `group-hover:animate-[slideX_${animate.duration}s_ease-in-out_forwards]`} `,
                    textClassName
                  )}>
                  {text}
                </motion.span>
                <motion.span
                  transition={{ ease: [0.25, 1, 0.5, 1] }}
                  className={cn(
                    `font-rubik block relative h-full w-full leading-10 ${animate.axis === 'y' ? `left-0 top-full group-hover:animate-[slideY_${animate.duration}s_ease-in-out_forwards]` : `left-full top-0 group-hover:animate-[slideX_${animate.duration}s_ease-in-out_forwards]`} `,
                    textClassName
                  )}>
                  {text}
                </motion.span>
              </span>
            ) : (
              <span className={cn('font-rubik ', textClassName)}>{text}</span>
            )}
            {loading && (
              <Loader className={cn('size-4 bg-green-500 animate-spin', loadingIconClassName)} />
            )}
          </div>
          {RightIcon && (
            <i className={cn('', rightIconClass)}>
              <RightIcon {...rightIconProps} />
            </i>
          )}
        </>
      )}
    </button>
  );

  return (
    <>
      {linkProps && !disabled ? (
        <Link
          onClick={(e: MouseEvent<HTMLAnchorElement>) => {
            if (linkProps.preventdefault === 'true') e.preventDefault();
            props.onClick?.();
          }}
          className={fullWrapClassName}
          {...linkProps}>
          {mainEl}
        </Link>
      ) : (
        <div className={fullWrapClassName} {...wrapProps}>
          {mainEl}
        </div>
      )}
    </>
  );
};
