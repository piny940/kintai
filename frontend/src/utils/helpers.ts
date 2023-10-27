import dayjs from 'dayjs'

export const toClass = (...args: string[]) => {
  return args.join(' ')
}
export const toDigit = (num: number) => {
  return num < 10 ? `0${num}` : `${num}`
}
export const toDayjs = (date: string) => {
  console.log(date)
  return dayjs(date)
}
