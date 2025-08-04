'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectOption } from '@/lib/types/general';
import { GhostBtn } from './GhostBtn';

interface MultiSelectProps {
  options: SelectOption[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Select options...',
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  function toggleSelect(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  function removeSelected(value: string) {
    onChange(selected.filter(v => v !== value));
  }

  const selectedLabels = options
    .filter(opt => selected.includes(opt.value))
    .map(opt => ({ ...opt }));

  const filteredOptions = options.filter(opt =>
    opt.text.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={cn('space-y-2', className)}>
      {selectedLabels.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedLabels.map(item => (
            <Badge key={item.value} variant="secondary" className="flex items-center gap-1">
              {item.text}
              <button
                type="button"
                onClick={() => removeSelected(item.value)}
                className="ml-1 hover:text-destructive"
                aria-label={`Remove ${item.text}`}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <GhostBtn
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            className="w-full">
            <div
              className="w-full flex items-center justify-between py-5 px-4 \
              m-0 bg-transparent border border-dark/25 typo-body-3 text-gray-66 \
              text-[0.825rem] lg:text-[0.95rem]">
              <span className="truncate">
                {selectedLabels.length > 0 ? 'Change selection' : placeholder}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </div>
          </GhostBtn>
        </PopoverTrigger>
        {/* <PopoverContent className="w-[--radix-popover-trigger-width] p-0"> */}
        <PopoverContent className="w-full p-0">
          <Command className="w-full max-w-full" shouldFilter={false}>
            <CommandInput
              placeholder="Search..."
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList className="max-w-full w-full">
              <ScrollArea className="w-full max-h-60">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {filteredOptions.map(option => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleSelect(option.value)}
                      className="cursor-pointer"
                      role="option"
                      aria-selected={selected.includes(option.value)}>
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-muted',
                          selected.includes(option.value) ? 'bg-green-500' : 'opacity-50'
                        )}>
                        {selected.includes(option.value) && <Check className="size-3 text-white" />}
                      </div>
                      <span className="typo-body-7">{option.text}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
