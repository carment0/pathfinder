export function outBound(i: number, j:number, row: number, col: number) {
  return (i < 0 || row <= i) || (j < 0 || col <= j) 
}
  