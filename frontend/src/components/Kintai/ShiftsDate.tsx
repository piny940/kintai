import { Dayjs } from 'dayjs'
import { memo } from 'react'
import ShiftItem from './ShiftItem'

export type ShiftsDateProps = {
  month: number
  date: Dayjs
  shifts: Array<{
    since: string
    till: string
    id: number
    employment: { worker: { name: { firstName: string; lastName: string } } }
  }>
}

const ShiftsDate = ({ date, month, shifts }: ShiftsDateProps): JSX.Element => {
  const textColor = (): string => {
    if (date.month() !== month) {
      return 'text-secondary'
    }
    if (date.day() === 0) {
      return 'text-danger'
    }
    return ''
  }
  const isCurrentMonth = month === date.month()

  return (
    <div className="">
      <div className="d-flex align-items-center">
        <span className={textColor()}>{date.date()}</span>
      </div>
      {isCurrentMonth && (
        <ul className="list-unstyled">
          {shifts.map((shift) => (
            <li key={shift.id}>
              <ShiftItem className="border border-info" shift={shift} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default memo(ShiftsDate)
