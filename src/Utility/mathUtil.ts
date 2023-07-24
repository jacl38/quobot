
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

export function seededRNG(a: number) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}