export function clamp(star: number, end: number, value: number) {

  if (value <= star) {
    return star
  }
  if (value >= end) {
    return end
  }
  return value

  // if (min > max) [min, max] = [max, min];
  // if (value < min) return min;
  // if (value > max) return max;
  // return value;
}

export function mix(src: any, dest: any, p: any) {
  return src * (1 - p) + dest * p;
}

export function transformPoint(p: any, m: any) {
  const [x, y] = p;
  return [x * m[0] + y * m[2] + m[4], x * m[1] + y * m[3] + m[5]];
}
