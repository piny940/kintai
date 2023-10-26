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

  return (
    <div className="">
      <div className="d-flex align-items-center">
        <span className={textColor()}>{date.date()}</span>
        <button className="mt-2 btn btn-outline-primary ms-2 btn-sm">
          追加
        </button>
      </div>
    </div>
  )
}

export default memo(DesiredShiftsDate)
