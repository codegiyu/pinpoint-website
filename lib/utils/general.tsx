import { RefObject } from 'react';

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
