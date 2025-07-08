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
