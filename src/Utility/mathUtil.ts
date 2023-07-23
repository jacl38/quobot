
export function shuffle<T>(arr: T[]): T[] {
  const newArr = [...arr];
  for(let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function clamp(value: number, min?: number, max?: number) {
  if(min !== undefined && value < min) return min;
  if(max !== undefined && value > max) return max;
  return value;
}