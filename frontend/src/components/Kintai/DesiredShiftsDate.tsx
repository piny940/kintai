import { Dayjs } from 'dayjs'
import { memo } from 'react'

export type DesiredShiftsDateProps = {
  month: number
  date: Dayjs
}

const DesiredShiftsDate = ({
  date,
  month,
}: DesiredShiftsDateProps): JSX.Element => {
  const textColor = (): string => {
    if (date.month() !== month) {
      return 'text-secondary'
    }
    if (date.day() === 0) {
      return 'text-danger'
    }
    return ''
  }

  return <div className={textColor()}>{date.date()}</div>
}

export default memo(DesiredShiftsDate)
