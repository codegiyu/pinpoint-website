'use client';

import { AriaRole, ReactNode } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface DropdownOption {
  text: string;
  onClick: () => void;
  Icon?: ReactNode;
  iconClass?: string;
  destructive?: boolean;
  role?: AriaRole;
}

interface HoverDropdownProps {
  buttons: DropdownOption[];
  title?: string;
  text?: string;
  children?: ReactNode;
  contentClassName?: string;
  triggerClassName?: string;
  caretClassName?: string;
  side?: 'top' | 'right' | 'bottom' | 'left' | undefined;
}

export const HoverDropdown = ({
  buttons,
  title = '',
  text = '',
  side,
  contentClassName = '',
  triggerClassName = '',
  children = null,
}: HoverDropdownProps) => {
  return (
    <div className="group relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit outline-none focus:none" asChild>
          {text ? (
            <button
              className={cn(
                'w-full px-0 py-0 rounded-xl flex items-center gap-2 cursor-pointer',
                triggerClassName
              )}
              aria-label={'Opens the dropdown to show buttons'}>
              <p className="truncate text-[1rem] lg:text-[1.25rem] leading-[1.125rem] lg:leading-[1.25rem] font-bold text-dark">
                {text}
              </p>
              <ChevronDown className="size-3 stroke-3 text-dark font-bold" />
            </button>
          ) : (
            children
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={side}
          className={cn(
            'w-[12.5rem] rounded-none p-0 m-0 opacity-0 -z-[1] group-hover:opacity-100 group-hover:z-[60] absolute top-full -left-12 transition-all duration-500 ease-linear',
            contentClassName
          )}>
          <DropdownMenuGroup className="p-0 m-0" role="list">
            {title && (
              <DropdownMenuLabel className="py-1 px-3 text-sm font-medium text-dark/25">
                {title}
              </DropdownMenuLabel>
            )}
            {buttons.map((item, idx, arr) => (
              <DropdownMenuItem
                key={idx}
                role={item.role || 'button'}
                className={`flex items-center gap-[10px] rounded-none py-[20px] mx-0 px-[35px] cursor-pointer
                ${item.destructive ? 'text-trash hover:bg-trash hover:text-white' : 'hover:bg-dark/17.5 text-dark'}
                ${idx === arr.length - 1 ? '' : 'border-b border-dark/25'} transition-all duration-700 ease-in-out`}
                onClick={item.onClick}>
                {item.Icon && <i className={cn('text-2xl', item.iconClass || '')}>{item.Icon}</i>}
                <span className={`text-[11px] font-light`}>{item.text}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
