import { SelectOption } from '../types/general';
import capitalize from 'lodash/capitalize';

/**
 * @param ms number of milliseconds you want your process to be delayed by
 * @returns void
 */
export const debounce = (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const assertENV = (variable: string | undefined, options?: { message: string }) => {
  const { message = 'Required Environment variable is missing or undefined' } = options ?? {};

  if (!variable) {
    throw new Error(message);
  }

  return variable;
};

export function findHalfPointOfArray(arr: Array<unknown>) {
  return Math.ceil(arr.length / 2);
}

export function splitTextIntoTwoWithBrTag(text: string) {
  const words = text.split(' ');
  const halfIndex = findHalfPointOfArray(words);

  return (
    <>
      {words.slice(0, halfIndex).join(' ')}
      <br />
      {words.slice(halfIndex).join(' ')}
    </>
  );
}

export function splitArrayInTwo(array: Array<unknown>): [Array<unknown>, Array<unknown>] {
  const halfIndex = findHalfPointOfArray(array);

  return [array.slice(0, halfIndex), array.slice(halfIndex)];
}

export const intersectionExists = (
  targetsArr: (HTMLElement | null)[],
  mainEl: HTMLElement | null
): boolean => {
  if (!mainEl) return false;

  const existingTargets = targetsArr.filter(item => item);

  if (!existingTargets.length) return false;

  const { top: mainElTop, bottom: mainElBottom } = mainEl.getBoundingClientRect();

  return existingTargets.some(target => {
    if (!target) return false;

    const { top, bottom } = (target as HTMLElement).getBoundingClientRect();

    const targetIntersects =
      (top <= mainElTop && bottom >= mainElBottom) ||
      (top >= mainElTop && top <= mainElBottom) ||
      (bottom <= mainElBottom && bottom >= mainElTop);

    return targetIntersects;
  });
};

export const formatPlural = (num: number, word: string, plural: string = '') => {
  if (num === 1) {
    return `1 ${word}`;
  }

  return `${num} ${plural ? plural : word + 's'}`;
};

export const formatCamelCaseName = (name: string, joinString = ' ') => {
  return capitalize(name.replace(/([a-z])([A-Z])/g, `$1${joinString}$2`));
};

export const formatSlugToText = (slug: string, joinerChar: string = ' ') => {
  return (
    slug
      ?.split(/[- _]/)
      .map(word => capitalize(word))
      .join(joinerChar) || ''
  );
};

export const generateOptionsFromArray = ({
  arr = [],
  capitalize = true,
  placeholder = 'Select Option',
}: {
  arr: string[];
  capitalize?: boolean;
  placeholder?: string;
}): SelectOption[] => {
  return arr.length
    ? arr.map(item => ({
        value: item,
        text: capitalize ? formatSlugToText(item) : item,
      }))
    : [
        {
          value: 'placeholder',
          text: placeholder,
          disabled: true,
        },
      ];
};

interface SplitNumberOptions {
  integerAsString?: true;
  decimalPlaces?: number;
  decimalAsNumber?: true;
}

export function splitNumber(
  num: number,
  options?: { decimalPlaces?: number }
): { integer: number; decimal: string };
export function splitNumber(
  num: number,
  options: { decimalAsNumber: true; decimalPlaces?: number }
): { integer: number; decimal: number };
export function splitNumber(
  num: number,
  options: { integerAsString: true; decimalPlaces?: number }
): { integer: string; decimal: string };
export function splitNumber(
  num: number,
  options: { integerAsString: true; decimalPlaces?: number; decimalAsNumber: true }
): { integer: string; decimal: number };

export function splitNumber(num: number, options?: SplitNumberOptions) {
  const [integer, decimal = '00'] = num.toFixed(options?.decimalPlaces ?? 2).split('.');
  return {
    integer: options?.integerAsString ? integer : Number(integer),
    decimal: options?.decimalAsNumber ? Number(decimal) : decimal,
  };
}

export type Protocol = 'http://' | 'https://';
export const splitUrl = (url: string): { protocol: Protocol | null; path: string } => {
  let protocol: Protocol | null = null;
  let path = '';

  switch (true) {
    case url.startsWith('https://'):
      protocol = 'https://';
      path = url.split('https://')[1];
      break;

    case url.startsWith('http://'):
      protocol = 'http://';
      path = url.split('http://')[1];
      break;

    default:
      path = url;
      break;
  }

  return { protocol, path };
};

export const toFixedLocaleString = (
  num: number,
  options?: SplitNumberOptions & { optionalDecimal?: boolean }
) => {
  const { integer, decimal } = splitNumber(num, options);

  return !options?.optionalDecimal || (options?.optionalDecimal && Number(decimal) > 0)
    ? `${integer.toLocaleString()}.${decimal}`
    : integer.toLocaleString();
};

export const formatInputNumber = (
  val: string | number | readonly string[],
  options?: {
    noDecimalsAllowed: boolean;
    // returnNumber: boolean;
  }
) => {
  const str = String(val);
  const value = str.startsWith('.') ? '0' + str : str;
  const pattern = options?.noDecimalsAllowed ? /[^\d]/g : /[^\d.]|(?<=\.\d*)\./g;
  const formattedVal = value.replace(pattern, '');

  return formattedVal;
};

export function formatFileSize(bytes: number): { filesize: number; unit: 'KB' | 'MB' } {
  if (bytes < 1024 * 1024) {
    return {
      filesize: parseFloat((bytes / 1024).toFixed(2)),
      unit: 'KB',
    };
  } else {
    return {
      filesize: parseFloat((bytes / (1024 * 1024)).toFixed(2)),
      unit: 'MB',
    };
  }
}

export const uploadFileWithProgress = (
  file: File,
  uploadUrl: string,
  onProgress: (percentage: number) => void
) => {
  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl);

    // Set headers, if required
    xhr.setRequestHeader('Content-Type', file.type);

    // Track upload progress
    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentComplete));
      }
    };

    // Resolve or reject the promise based on the response
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve('Image successfully uploaded');
      } else {
        reject(new Error('Upload failed'));
      }
    };

    xhr.onerror = () => reject(new Error('Upload failed'));

    // Send the file
    xhr.send(file);
  });
};

export function createFileList(files: File[]): FileList {
  const dataTransfer = new DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));
  return dataTransfer.files;
}

export function fixedPick<TObj, TKeys extends keyof TObj>(
  obj: TObj,
  keys: TKeys[]
): Pick<TObj, TKeys> {
  const result = {} as Pick<TObj, TKeys>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

export function chunkArray<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return [];

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
