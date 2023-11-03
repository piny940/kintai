import { Dayjs } from 'dayjs'
import { memo } from 'react'
import ShiftItem from './ShiftItem'

export type DesiredShiftsDateProps = {
  month: number
  date: Dayjs
  onAddButtonClicked: () => void
  desiredShifts: Array<{ id: number; since: string; till: string }>
  shifts: Array<{
    since: string
    till: string
    id: number
    employment: { worker: { name: { firstName: string; lastName: string } } }
  }>
}

const DesiredShiftsDate = ({
  date,
  month,
  onAddButtonClicked,
  desiredShifts,
  shifts,
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
  const isCurrentMonth = month === date.month()

  return (
    <div className="">
      <div className="d-flex align-items-center">
        <span className={textColor()}>{date.date()}</span>
        {isCurrentMonth && (
          <button
            className="mt-2 btn btn-outline-primary ms-2 btn-sm"
            onClick={onAddButtonClicked}
          >
            追加
          </button>
        )}
      </div>
      {isCurrentMonth && (
        <ul className="list-unstyled">
          {desiredShifts.map((desiredShift) => (
            <li key={desiredShift.id}>
              <ShiftItem className="bg-info" shift={desiredShift} />
            </li>
          ))}
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

export default memo(DesiredShiftsDate)
