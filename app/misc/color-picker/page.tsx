'use client';

import { useMemo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { ColorPickerInput } from '@/components/color-picker/ColorPickerInput';
import { ColorCard } from '@/components/color-picker/ColorCard';
import { Button } from '@/components/ui/button';
import { type ColorData, parseColor } from '@/lib/utils/color';
import {
  generateColorPNG,
  generateColorPDF,
  downloadFile,
  shareToWhatsApp,
  formatColorCaption,
} from '@/lib/utils/colorExport';
import { Download, Share2, Plus, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { parseAsString, useQueryState } from 'nuqs';
import { toast } from '@/components/atoms/Toast';

/**
 * Serializes colors to URL parameter format
 */
function serializeColors(colors: ColorData[]): string {
  return colors.map(color => color.hex.replace('#', '')).join(',');
}

/**
 * Deserializes colors from URL parameter format
 */
function deserializeColors(colorString: string): ColorData[] {
  if (!colorString) return [];
  const hexValues = colorString.split(',');
  const colors: ColorData[] = [];

  for (const hex of hexValues) {
    const color = parseColor(`#${hex.trim()}`);
    if (color) {
      colors.push(color);
    }
  }

  return colors;
}

export default function ColorPickerPage() {
  const [colorsParam, setColorsParam] = useQueryState('colors', parseAsString.withDefault(''));

  // Convert URL param to colors array
  const colors = useMemo(() => {
    return deserializeColors(colorsParam);
  }, [colorsParam]);

  // Update URL when colors change internally
  const updateColors = (newColors: ColorData[]) => {
    if (newColors.length === 0) {
      setColorsParam(null);
    } else {
      setColorsParam(serializeColors(newColors));
    }
  };

  const handleColorChange = (index: number, color: ColorData | null) => {
    if (!color) {
      const newColors = colors.filter((_, i) => i !== index);
      updateColors(newColors);
      return;
    }

    const newColors = [...colors];
    newColors[index] = color;
    updateColors(newColors);
  };

  const handleAddColor = () => {
    if (colors.length < 3) {
      // Default to a nice color instead of pure black
      const defaultColor: ColorData = {
        hex: '#FE7702', // Using the primary brand color
        rgb: { r: 254, g: 119, b: 2 },
        cmyk: { c: 0, m: 53, y: 99, k: 0 },
      };
      updateColors([...colors, defaultColor]);
    }
  };

  const handleRemoveColor = (index: number) => {
    updateColors(colors.filter((_, i) => i !== index));
  };

  const handleDownloadPNG = async () => {
    if (colors.length === 0) return;
    try {
      const blob = await generateColorPNG(colors);
      downloadFile(blob, `color-palette-${Date.now()}.png`);
    } catch (error) {
      console.error('Error generating PNG:', error);
    }
  };

  const handleDownloadPDF = async () => {
    if (colors.length === 0) return;
    try {
      const blob = await generateColorPDF(colors);
      downloadFile(blob, `color-palette-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleCopyCaption = async () => {
    if (colors.length === 0) return;
    try {
      const caption = formatColorCaption(colors);
      await navigator.clipboard.writeText(caption);
      toast({ title: 'Color caption copied to clipboard!', variant: 'success' });
    } catch (error) {
      console.error('Error copying caption:', error);
      toast({ title: 'Failed to copy caption. Please try again.', variant: 'error' });
    }
  };

  const handleShareWhatsApp = async () => {
    if (colors.length === 0) return;
    await shareToWhatsApp(colors);
  };

  return (
    <MainLayout pageName="Color Picker">
      <section className="w-full py-10 md:py-20 lg:py-[6.5rem]">
        <div className="pinpoint-container">
          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8">
            <div className="space-y-4">
              <h1 className="typo-h2-hero">Color Picker</h1>
              <p className="typo-body-1 text-gray-59 max-w-2xl">
                Pick up to 3 colors in RGB, HEX, or CMYK format. Download your color palette as PDF
                or PNG, or share it on WhatsApp.
              </p>
            </div>

            <div className="space-y-6">
              {colors.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, translateX: -20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}>
                  <ColorPickerInput
                    label={`Color ${index + 1}`}
                    value={color}
                    onChange={newColor => handleColorChange(index, newColor)}
                  />
                </motion.div>
              ))}

              {colors.length < 3 && (
                <Button
                  variant="secondary"
                  size="default"
                  onClick={handleAddColor}
                  className="w-full md:w-fit">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Color
                </Button>
              )}
            </div>

            {colors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6">
                <div className="border-t border-gray-d9 pt-8">
                  <h2 className="typo-h3 mb-6">Color Preview</h2>
                  <div
                    className={cn(
                      'grid gap-6',
                      colors.length === 1
                        ? 'grid-cols-1'
                        : colors.length === 2
                          ? 'grid-cols-1 md:grid-cols-2'
                          : 'grid-cols-1 md:grid-cols-3'
                    )}>
                    {colors.map((color, index) => (
                      <ColorCard
                        key={index}
                        color={color}
                        index={index}
                        onRemove={() => handleRemoveColor(index)}
                      />
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-d9 pt-8">
                  <h2 className="typo-h3 mb-6">Export & Share</h2>
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button
                      variant="default"
                      size="default"
                      onClick={handleDownloadPNG}
                      className="w-full md:w-fit">
                      <Download className="w-4 h-4 mr-2" />
                      Download PNG
                    </Button>
                    <Button
                      variant="default"
                      size="default"
                      onClick={handleDownloadPDF}
                      className="w-full md:w-fit">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button
                      variant="secondary"
                      size="default"
                      onClick={handleCopyCaption}
                      className="w-full md:w-fit">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Caption
                    </Button>
                    <Button
                      variant="secondary"
                      size="default"
                      onClick={handleShareWhatsApp}
                      className="w-full md:w-fit">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share on WhatsApp
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
      <PageSideDecoration caption="Color Picker" />
    </MainLayout>
  );
}
