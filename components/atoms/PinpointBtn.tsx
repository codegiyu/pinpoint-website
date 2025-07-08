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
      className={cn(buttonVariants({ size, variant, typo, className }))}
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
          <div className="flex items-center gap-3">
            <span className={cn('font-rubik', textClassName)}>{text}</span>
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
