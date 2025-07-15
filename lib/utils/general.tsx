import { RefObject } from 'react';
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
  targetsArr: RefObject<HTMLElement | null>[],
  mainEl: HTMLElement | null
): boolean => {
  if (!mainEl) return false;

  const existingTargets = targetsArr.filter(item => item);

  if (!existingTargets.length) return false;

  const { top: mainElTop, bottom: mainElBottom } = mainEl.getBoundingClientRect();

  return existingTargets.some(target => {
    const { top, bottom } = (target.current as HTMLElement).getBoundingClientRect();

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
