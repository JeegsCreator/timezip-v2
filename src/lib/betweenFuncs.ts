export const numberWithinRange = (
  number: number,
  min: number,
  max: number,
): number => Math.min(Math.max(number, min), max);

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

export const adjustTween = (value: number) => {
  if (value >= 0.9) return 1;
  if (value >= 0.25) return lerp(0.4, 0.7, value);
  return value;
};
