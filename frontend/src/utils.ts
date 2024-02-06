export function percentDifference(a: number, b: number) {
  return  +(100 * Math.abs( (a - b) / ( (a + b)/2 ))).toFixed(2);
}

export function capitalize (str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1)
}

export function formatDigits(str: string) {
  return parseFloat(str).toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
} 