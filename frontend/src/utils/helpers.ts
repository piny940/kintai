export const toClass = (...args: string[]) => {
  return args.join(' ')
}
export const toDigit = (num: number) => {
  return num < 10 ? `0${num}` : `${num}`
}
