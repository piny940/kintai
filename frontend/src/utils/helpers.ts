import dayjs from 'dayjs'

export const toClass = (...args: string[]) => {
  return args.join(' ')
}
export const toDigit = (num: number) => {
  return num < 10 ? `0${num}` : `${num}`
}
export const toDayjs = (date: string) => {
  return dayjs(date)
}
export const secondToTime = (second: number) => {
  const hour = Math.floor(second / 3600)
  const minute = Math.floor((second % 3600) / 60)
  return `${toDigit(hour)}時間${toDigit(minute)}分`
}
