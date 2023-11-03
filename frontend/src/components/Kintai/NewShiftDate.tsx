import { Dayjs } from 'dayjs'
import { memo } from 'react'
import ShiftItemButton from './ShiftItemButton'
import ShiftItem from './ShiftItem'

export type NewShiftsDateProps = {
  month: number
  date: Dayjs
  onAddButtonClicked: () => void
  desiredShifts: Array<{ since: string; till: string; id: number }>
  shifts: Array<{ since: string; till: string; id: number }>
}

const NewShiftsDate = ({
  date,
  month,
  onAddButtonClicked,
  desiredShifts,
  shifts,
}: NewShiftsDateProps): JSX.Element => {
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
        <div className="list-unstyled">
          {desiredShifts.map((desiredShift) => (
            <ShiftItemButton
              className="btn-outline-info text-body"
              key={desiredShift.id}
              shift={desiredShift}
            />
          ))}
          {shifts.map((shift) => (
            <ShiftItem
              className="bg-info text-body"
              key={shift.id}
              shift={shift}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(NewShiftsDate)
