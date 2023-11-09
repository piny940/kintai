import { Dayjs } from 'dayjs'
import { memo } from 'react'
import ShiftItemButton from './ShiftItemButton'

export type NewShiftsDateProps = {
  month: number
  date: Dayjs
  showShifts: boolean
  showDesiredShifts: boolean
  onAddButtonClicked: () => void
  desiredShifts: Array<{
    since: string
    till: string
    id: number
    employment: {
      worker: {
        id: number
        name: { firstName: string; lastName: string }
      }
    }
  }>
  shifts: Array<{
    since: string
    till: string
    id: number
    employment: {
      worker: { id: number; name: { firstName: string; lastName: string } }
    }
  }>
  onDesiredShiftItemClicked: (desiredShift: {
    id: number
    since: string
    till: string
    employment: { worker: { id: number } }
  }) => void
  onShiftItemClicked: (shift: {
    id: number
    since: string
    till: string
    employment: { worker: { id: number } }
  }) => void
}

const NewShiftsDate = ({
  date,
  month,
  showShifts,
  showDesiredShifts,
  onAddButtonClicked,
  desiredShifts,
  shifts,
  onDesiredShiftItemClicked,
  onShiftItemClicked,
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
          {showDesiredShifts &&
            desiredShifts.map((desiredShift) => (
              <ShiftItemButton
                className="btn-outline-info text-body"
                key={desiredShift.id}
                shift={desiredShift}
                onClick={() => onDesiredShiftItemClicked(desiredShift)}
              />
            ))}
          {showShifts &&
            shifts.map((shift) => (
              <ShiftItemButton
                className="bg-info text-body"
                key={shift.id}
                shift={shift}
                onClick={() => onShiftItemClicked(shift)}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default memo(NewShiftsDate)
