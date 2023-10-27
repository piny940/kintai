import { memo } from 'react'
import AddDesiredShiftsModal from './AddDesiredShiftsModal'
import Calendar from '../Calendar/Calendar'
import DesiredShiftsDate from './DesiredShiftsDate'
import { Dayjs } from 'dayjs'

export type DesiredShiftsCalendarProps = {
  alert: string
  addDesiredShiftsModalID: string
  onAddButtonClicked: (date: Dayjs) => void
}

const DesiredShiftsCalendar = ({
  alert,
  addDesiredShiftsModalID,
  onAddButtonClicked,
}: DesiredShiftsCalendarProps): JSX.Element => {
  return (
    <>
      <Calendar
        renderDate={(month, date) => (
          <DesiredShiftsDate
            month={month}
            date={date}
            onAddButtonClicked={() => onAddButtonClicked(date)}
          />
        )}
      />
      <AddDesiredShiftsModal targetID={addDesiredShiftsModalID} alert={alert} />
    </>
  )
}

export default memo(DesiredShiftsCalendar)
