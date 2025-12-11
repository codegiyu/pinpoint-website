import { type ColorData } from './color';

// A4 dimensions in pixels at 300 DPI (portrait)
const A4_WIDTH = 2480;
const A4_HEIGHT = 3508;
const MARGIN_SIDE = 350; // Triple the side margins (~120mm at 300 DPI)
const MARGIN_TOP_BOTTOM = 450; // 1.5x the top/bottom margins (~120mm at 300 DPI)

/**
 * Loads an image from URL
 */
function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Generates a PNG image from color data
 */
export async function generateColorPNG(colors: ColorData[]): Promise<Blob> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  canvas.width = A4_WIDTH;
  canvas.height = A4_HEIGHT;

  // Load background pattern
  const backgroundPattern = await loadImage(
    'https://static.pinpoint.ng/images/pinpoint-pattern.png'
  );

  console.log({ backgroundPattern, loc: 'generateColorPNG' });

  // Draw background pattern
  ctx.drawImage(backgroundPattern, 0, 0, A4_WIDTH, A4_HEIGHT);

  // Load and draw full logo
  const logo = await loadImage('/icons/pinpoint-full.svg');
  const logoHeight = 120;
  const logoWidth = (logoHeight * 584) / 123; // Maintain aspect ratio (584:123 from viewBox)
  ctx.drawImage(logo, MARGIN_SIDE, MARGIN_TOP_BOTTOM, logoWidth, logoHeight);

  // Calculate color boxes area (middle section) - with more spacing
  const contentAreaTop = MARGIN_TOP_BOTTOM + logoHeight + 400; // Double the space after logo
  const contentAreaBottom = A4_HEIGHT - MARGIN_TOP_BOTTOM - 600; // Double the space before "COLOUR PALETTE" text
  const contentAreaHeight = contentAreaBottom - contentAreaTop;
  const contentAreaWidth = A4_WIDTH - MARGIN_SIDE * 2;

  // Draw color boxes - split evenly with no whitespace
  const boxWidth = contentAreaWidth / colors.length;
  const boxHeight = contentAreaHeight;

  colors.forEach((color, index) => {
    const x = MARGIN_SIDE + index * boxWidth;
    const y = contentAreaTop;

    // Color box
    ctx.fillStyle = color.hex;
    ctx.fillRect(x, y, boxWidth, boxHeight);

    // Text color (contrast)
    const brightness = (color.rgb.r * 299 + color.rgb.g * 587 + color.rgb.b * 114) / 1000;
    const textColor = brightness > 128 ? '#000000' : '#FFFFFF';

    ctx.fillStyle = textColor;
    ctx.font = 'bold 48px Roboto Mono, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Center text in box
    const centerX = x + boxWidth / 2;
    const centerY = y + boxHeight / 2;

    ctx.fillText(color.hex, centerX, centerY - 80);
    ctx.font = '36px Roboto Mono, monospace';
    ctx.fillText(`RGB(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`, centerX, centerY);
    ctx.fillText(
      `CMYK(${color.cmyk.c}, ${color.cmyk.m}, ${color.cmyk.y}, ${color.cmyk.k})`,
      centerX,
      centerY + 80
    );
  });

  // Draw "COLOUR PALETTE" at bottom right with more letter spacing and bolder text
  ctx.fillStyle = '#141414';
  ctx.font = '900 72px Roboto Mono, monospace'; // 900 is the boldest weight
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  const text = 'COLOUR PALETTE';
  const letterSpacing = 20; // Increased letter spacing
  let x = A4_WIDTH - MARGIN_SIDE;
  // Draw each character with spacing
  for (let i = text.length - 1; i >= 0; i--) {
    ctx.fillText(text[i], x, A4_HEIGHT - MARGIN_TOP_BOTTOM);
    x -= ctx.measureText(text[i]).width + letterSpacing;
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to generate PNG'));
        }
      },
      'image/png',
      1.0
    );
  });
}

/**
 * Generates a PDF from color data
 */
export async function generateColorPDF(colors: ColorData[]): Promise<Blob> {
  // Dynamic import to avoid SSR issues
  const { jsPDF } = await import('jspdf');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const marginSide = 120; // Triple the side margins (120mm)
  const marginTopBottom = 120; // 1.5x the top/bottom margins (120mm)

  // Add background pattern
  try {
    const bgResponse = await fetch('https://static.pinpoint.ng/images/pinpoint-pattern.png');
    const bgBlob = await bgResponse.blob();
    const bgDataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(bgBlob);
    });

    pdf.addImage(bgDataUrl, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
  } catch (error) {
    console.warn('Could not load background pattern:', error);
    // Fallback to white background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  }

  // Add full logo
  try {
    const logoResponse = await fetch('/icons/pinpoint-full.svg');
    const logoBlob = await logoResponse.blob();
    const logoDataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(logoBlob);
    });

    const logoHeight = 30; // mm
    const logoWidth = (logoHeight * 584) / 123; // Maintain aspect ratio (584:123 from viewBox)
    pdf.addImage(
      logoDataUrl,
      'SVG',
      marginSide,
      marginTopBottom,
      logoWidth,
      logoHeight,
      undefined,
      'FAST'
    );
  } catch (error) {
    console.warn('Could not load logo:', error);
  }

  // Calculate color boxes area (middle section) - with more spacing
  const contentAreaTop = marginTopBottom + 30 + 50; // logo + double the spacing
  const contentAreaBottom = pageHeight - marginTopBottom - 80; // Double the space before "COLOUR PALETTE" text
  const contentAreaHeight = contentAreaBottom - contentAreaTop;
  const contentAreaWidth = pageWidth - marginSide * 2;

  // Draw color boxes - split evenly with no whitespace
  const boxWidth = contentAreaWidth / colors.length;
  const boxHeight = contentAreaHeight;

  colors.forEach((color, index) => {
    const x = marginSide + index * boxWidth;
    const y = contentAreaTop;

    // Color box
    pdf.setFillColor(color.rgb.r, color.rgb.g, color.rgb.b);
    pdf.rect(x, y, boxWidth, boxHeight, 'F');

    // Text color (contrast)
    const brightness = (color.rgb.r * 299 + color.rgb.g * 587 + color.rgb.b * 114) / 1000;
    const textColor = brightness > 128 ? [0, 0, 0] : [255, 255, 255];

    pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
    pdf.setFont('courier', 'bold');
    pdf.setFontSize(12);

    // Center text in box
    const centerX = x + boxWidth / 2;
    const centerY = y + boxHeight / 2;

    pdf.text(color.hex, centerX, centerY - 8, { align: 'center' });
    pdf.setFontSize(9);
    pdf.setFont('courier', 'normal');
    pdf.text(`RGB(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`, centerX, centerY, {
      align: 'center',
    });
    pdf.text(
      `CMYK(${color.cmyk.c}, ${color.cmyk.m}, ${color.cmyk.y}, ${color.cmyk.k})`,
      centerX,
      centerY + 8,
      { align: 'center' }
    );
  });

  // Draw "COLOUR PALETTE" at bottom right with more letter spacing and bolder text
  pdf.setTextColor(20, 20, 20);
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(20); // Slightly larger and bolder
  const text = 'COLOUR PALETTE';
  // Draw each character with spacing for letter spacing effect
  const letterSpacing = 3; // mm between letters
  let x = pageWidth - marginSide;
  const y = pageHeight - marginTopBottom;
  // Draw characters from right to left
  for (let i = text.length - 1; i >= 0; i--) {
    const charWidth = pdf.getTextWidth(text[i]);
    pdf.text(text[i], x, y, { align: 'right' });
    x -= charWidth + letterSpacing;
  }

  return pdf.output('blob');
}

/**
 * Downloads a file
 */
export function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Formats color information as a caption
 */
export function formatColorCaption(colors: ColorData[]): string {
  const colorTexts = colors.map((color, index) => {
    return `Color ${index + 1}:
HEX: ${color.hex}
RGB: ${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}
CMYK: ${color.cmyk.c}, ${color.cmyk.m}, ${color.cmyk.y}, ${color.cmyk.k}`;
  });

  return `Color Palette:\n\n${colorTexts.join('\n\n')}`;
}

/**
 * Shares to WhatsApp with PNG image
 */
export async function shareToWhatsApp(colors: ColorData[]) {
  try {
    // Generate PNG
    const pngBlob = await generateColorPNG(colors);
    const caption = formatColorCaption(colors);
    // console.log({ caption, loc: 'shareToWhatsApp' });

    // Check if Web Share API is available and supports files
    if (navigator.share && navigator.canShare) {
      const file = new File([pngBlob], `color-palette-${Date.now()}.png`, {
        type: 'image/png',
      });

      // Check if we can share this file
      if (navigator.canShare({ files: [file] })) {
        try {
          // console.log({ caption, loc: 'Web Share API with file' });
          await navigator.share({
            files: [file],
            title: 'Color Palette',
            text: caption, // This will appear as caption in WhatsApp
          });
          return;
        } catch {
          // User cancelled or error occurred, fall back to WhatsApp Web
          console.log('Web Share API failed, falling back to WhatsApp Web');
        }
      }
    }

    // Fallback: Convert blob to data URL and use WhatsApp Web
    // Note: WhatsApp Web doesn't directly support image sharing via URL,
    // so we'll create a temporary link or use the Web Share API with data URL
    const dataUrl = URL.createObjectURL(pngBlob);

    // Try Web Share API with data URL (some browsers support this)
    if (navigator.share) {
      try {
        // Convert blob to File for sharing
        const file = new File([pngBlob], `color-palette-${Date.now()}.png`, {
          type: 'image/png',
        });
        // console.log({ caption, loc: 'Web Share API with data URL' });
        await navigator.share({
          files: [file],
          title: 'Color Palette',
          text: caption, // This will appear as caption in WhatsApp
        });
        URL.revokeObjectURL(dataUrl);
        return;
      } catch {
        // Fall through to download + WhatsApp text link
      }
    }

    // Final fallback: Download the image and share text link to WhatsApp
    // This allows users to manually attach the downloaded image
    downloadFile(pngBlob, `color-palette-${Date.now()}.png`);

    const message = `${caption}\n\n(I've downloaded the PNG image for you to attach)`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    URL.revokeObjectURL(dataUrl);
  } catch (error) {
    console.error('Error sharing to WhatsApp:', error);
    // Fallback to text-only sharing
    const caption = formatColorCaption(colors);
    const encodedMessage = encodeURIComponent(caption);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  }
}
