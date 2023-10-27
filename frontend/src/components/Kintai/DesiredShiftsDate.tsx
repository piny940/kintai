import { DesiredShift } from '@/resources/types'
import { Dayjs } from 'dayjs'
import { memo } from 'react'
import ShiftItem from './ShiftItem'

export type DesiredShiftsDateProps = {
  month: number
  date: Dayjs
  onAddButtonClicked: () => void
  desiredShifts: DesiredShift[]
}

const DesiredShiftsDate = ({
  date,
  month,
  onAddButtonClicked,
  desiredShifts,
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
        {month === date.month() && (
          <button
            className="mt-2 btn btn-outline-primary ms-2 btn-sm"
            onClick={onAddButtonClicked}
          >
            追加
          </button>
        )}
      </div>
      <ul className="list-unstyled">
        {desiredShifts.map((desiredShift) => (
          <ShiftItem key={desiredShift.id} shift={desiredShift} />
        ))}
      </ul>
    </div>
  )
}

export default memo(DesiredShiftsDate)
