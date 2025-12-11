'use client';

import { type ColorData } from '@/lib/utils/color';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ColorCardProps {
  color: ColorData;
  onRemove?: () => void;
  index: number;
}

export function ColorCard({ color, onRemove, index }: ColorCardProps) {
  const getContrastColor = (hex: string): string => {
    const rgb = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!rgb) return '#000000';

    const r = parseInt(rgb[1], 16);
    const g = parseInt(rgb[2], 16);
    const b = parseInt(rgb[3], 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  const textColor = getContrastColor(color.hex);

  return (
    <div
      className={cn(
        'relative w-full rounded border-2 border-gray-d9 overflow-hidden',
        'transition-all duration-300 hover:shadow-lg'
      )}
      style={{ backgroundColor: color.hex }}>
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors z-10"
          aria-label="Remove color">
          <X className="w-4 h-4 text-dark" />
        </button>
      )}
      <div className="p-6 md:p-8 min-h-[200px] flex flex-col justify-end">
        <div className="space-y-2" style={{ color: textColor }}>
          <p className="text-sm font-medium opacity-80">Color {index + 1}</p>
          <p className="text-2xl md:text-3xl font-bold">{color.hex}</p>
          <div className="space-y-1 text-sm">
            <p>
              RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
            </p>
            <p>
              CMYK({color.cmyk.c}, {color.cmyk.m}, {color.cmyk.y}, {color.cmyk.k})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
