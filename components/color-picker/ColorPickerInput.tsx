'use client';

import { useState, useEffect } from 'react';
import { RegularInput } from '@/components/atoms/RegularInput';
import { RegularSelect } from '@/components/atoms/RegularSelect';
import { parseColor, cmykToRgb, rgbToHex, type ColorData } from '@/lib/utils/color';
import { cn } from '@/lib/utils';

// Range input styles
const rangeInputStyles = `
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 8px;
    border-radius: 4px;
    outline: none;
  }
  
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #141414;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #141414;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  input[type="range"]::-webkit-slider-track {
    height: 8px;
    border-radius: 4px;
  }
  
  input[type="range"]::-moz-range-track {
    height: 8px;
    border-radius: 4px;
  }
`;

interface ColorPickerInputProps {
  value: ColorData | null;
  onChange: (color: ColorData | null) => void;
  label?: string;
  className?: string;
}

export function ColorPickerInput({ value, onChange, label, className }: ColorPickerInputProps) {
  const [format, setFormat] = useState<'hex' | 'rgb' | 'cmyk'>('hex');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Sync input value when value or format changes
  useEffect(() => {
    if (value) {
      switch (format) {
        case 'hex':
          setInputValue(value.hex);
          break;
        case 'rgb':
          setInputValue(`${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}`);
          break;
        case 'cmyk':
          setInputValue(`${value.cmyk.c}, ${value.cmyk.m}, ${value.cmyk.y}, ${value.cmyk.k}`);
          break;
      }
    } else {
      setInputValue('');
    }
  }, [value, format]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    setError(null);

    if (!newValue.trim()) {
      onChange(null);
      return;
    }

    const color = parseColor(newValue);
    if (color) {
      onChange(color);
    } else {
      setError('Invalid color format');
    }
  };

  const handleFormatChange = (newFormat: 'hex' | 'rgb' | 'cmyk') => {
    setFormat(newFormat);
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    const color = parseColor(hex);
    if (color) {
      onChange(color);
    }
  };

  const handleRGBChange = (channel: 'r' | 'g' | 'b', val: number) => {
    if (!value) return;
    const newRgb = { ...value.rgb, [channel]: val };
    const color = parseColor(`${newRgb.r}, ${newRgb.g}, ${newRgb.b}`);
    if (color) {
      onChange(color);
    }
  };

  const handleCMYKChange = (channel: 'c' | 'm' | 'y' | 'k', val: number) => {
    if (!value) return;
    // Clamp the value to valid range
    const clampedVal = Math.max(0, Math.min(100, val));
    const newCmyk = { ...value.cmyk, [channel]: clampedVal };

    // Convert CMYK directly to RGB and HEX, preserving exact CMYK values
    const rgb = cmykToRgb(newCmyk.c, newCmyk.m, newCmyk.y, newCmyk.k);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

    onChange({
      hex,
      rgb,
      cmyk: newCmyk, // Preserve the exact CMYK values the user set
    });
  };

  return (
    <>
      <style>{rangeInputStyles}</style>
      <div className={cn('w-full space-y-4', className)}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <RegularSelect
              label={label || 'Color Format'}
              value={format}
              onSelectChange={value => handleFormatChange(value as 'hex' | 'rgb' | 'cmyk')}
              options={[
                { value: 'hex', text: 'HEX' },
                { value: 'rgb', text: 'RGB' },
                { value: 'cmyk', text: 'CMYK' },
              ]}
            />
          </div>
          <div className="flex-1">
            <RegularInput
              label={
                format === 'hex'
                  ? 'HEX Color (e.g., #FF5733)'
                  : format === 'rgb'
                    ? 'RGB Color (e.g., 255, 87, 51)'
                    : 'CMYK Color (e.g., 0, 66, 79, 0)'
              }
              value={inputValue}
              onChange={e => handleInputChange(e.target.value)}
              placeholder={
                format === 'hex' ? '#FF5733' : format === 'rgb' ? '255, 87, 51' : '0, 66, 79, 0'
              }
              errors={error ? [error] : []}
            />
          </div>
          {format === 'hex' && (
            <div className="flex items-end">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-66 mb-2">Color Picker</label>
                <input
                  type="color"
                  value={value?.hex || '#FE7702'}
                  onChange={handleColorPickerChange}
                  className="w-full h-12 rounded border-2 border-gray-d9 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
        {format === 'rgb' && value && (
          <div className="space-y-4 pt-2">
            <label className="block text-sm font-medium text-gray-66">RGB Sliders</label>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-dark">Red</label>
                  <span className="text-sm text-gray-66">{value.rgb.r}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={value.rgb.r}
                  onChange={e => handleRGBChange('r', parseInt(e.target.value, 10))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(0, ${value.rgb.g}, ${value.rgb.b}) 0%, rgb(255, ${value.rgb.g}, ${value.rgb.b}) 100%)`,
                  }}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-dark">Green</label>
                  <span className="text-sm text-gray-66">{value.rgb.g}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={value.rgb.g}
                  onChange={e => handleRGBChange('g', parseInt(e.target.value, 10))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(${value.rgb.r}, 0, ${value.rgb.b}) 0%, rgb(${value.rgb.r}, 255, ${value.rgb.b}) 100%)`,
                  }}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-dark">Blue</label>
                  <span className="text-sm text-gray-66">{value.rgb.b}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={value.rgb.b}
                  onChange={e => handleRGBChange('b', parseInt(e.target.value, 10))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(${value.rgb.r}, ${value.rgb.g}, 0) 0%, rgb(${value.rgb.r}, ${value.rgb.g}, 255) 100%)`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {format === 'cmyk' && value && (
          <div className="space-y-4 pt-2">
            <label className="block text-sm font-medium text-gray-66">CMYK Sliders</label>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-dark">Cyan</label>
                  <span className="text-sm text-gray-66">{value.cmyk.c}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value.cmyk.c}
                  onChange={e => handleCMYKChange('c', parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-gray-d9 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-dark">Magenta</label>
                  <span className="text-sm text-gray-66">{value.cmyk.m}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value.cmyk.m}
                  onChange={e => handleCMYKChange('m', parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-gray-d9 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-dark">Yellow</label>
                  <span className="text-sm text-gray-66">{value.cmyk.y}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value.cmyk.y}
                  onChange={e => handleCMYKChange('y', parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-gray-d9 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-dark">Key (Black)</label>
                  <span className="text-sm text-gray-66">{value.cmyk.k}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value.cmyk.k}
                  onChange={e => handleCMYKChange('k', parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-gray-d9 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
        {value && (
          <div
            className="w-full h-24 rounded border-2 border-gray-d9"
            style={{ backgroundColor: value.hex }}
          />
        )}
        {value && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-66 font-medium mb-1">HEX</p>
              <p className="text-dark">{value.hex}</p>
            </div>
            <div>
              <p className="text-gray-66 font-medium mb-1">RGB</p>
              <p className="text-dark">
                {value.rgb.r}, {value.rgb.g}, {value.rgb.b}
              </p>
            </div>
            <div>
              <p className="text-gray-66 font-medium mb-1">CMYK</p>
              <p className="text-dark">
                {value.cmyk.c}, {value.cmyk.m}, {value.cmyk.y}, {value.cmyk.k}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
