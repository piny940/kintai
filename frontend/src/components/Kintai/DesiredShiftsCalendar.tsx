import { memo } from 'react'
import AddDesiredShiftsModal from './AddDesiredShiftsModal'
import Calendar from '../Calendar/Calendar'
import DesiredShiftsDate from './DesiredShiftsDate'

export type DesiredShiftsCalendarProps = {
  alert: string
}

const DesiredShiftsCalendar = ({
  alert,
}: DesiredShiftsCalendarProps): JSX.Element => {
  return (
    <>
      <Calendar
        renderDate={(month, date) => (
          <DesiredShiftsDate month={month} date={date} />
        )}
      />
      <AddDesiredShiftsModal alert={alert} />
    </>
  )
}

export default memo(DesiredShiftsCalendar)
