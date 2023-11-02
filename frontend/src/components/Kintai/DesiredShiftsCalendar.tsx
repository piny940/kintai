import { memo } from 'react'
import AddDesiredShiftsModal from './AddDesiredShiftsModal'
import Calendar from '../Calendar/Calendar'
import DesiredShiftsDate from './DesiredShiftsDate'
import { Dayjs } from 'dayjs'
import { useMappedDesiredShifts } from '@/utils/hooks'

export type DesiredShiftsCalendarProps = {
  alert: string
  addDesiredShiftsModalID: string
  onAddButtonClicked: (date: Dayjs) => void
  selectedDate: Dayjs | null
  companyId: number
  addDesiredShift: (since: Dayjs, till: Dayjs) => void
  selectedMonth: Dayjs
  setSelectedMonth: (selectedMonth: Dayjs) => void
}

const DesiredShiftsCalendar = ({
  alert,
  addDesiredShiftsModalID,
  onAddButtonClicked,
  selectedDate,
  companyId,
  addDesiredShift,
  selectedMonth,
  setSelectedMonth,
}: DesiredShiftsCalendarProps): JSX.Element => {
  const desiredShiftsMap = useMappedDesiredShifts(companyId, selectedMonth)

  return (
    <>
      <Calendar
        yearMonth={selectedMonth}
        setYearMonth={setSelectedMonth}
        renderDate={(month, date) => (
          <DesiredShiftsDate
            month={month}
            date={date}
            onAddButtonClicked={() => onAddButtonClicked(date)}
            desiredShifts={desiredShiftsMap.get(date.date()) || []}
          />
        )}
      />
      <AddDesiredShiftsModal
        addDesiredShift={addDesiredShift}
        date={selectedDate}
        targetID={addDesiredShiftsModalID}
        alert={alert}
      />
    </>
  )
}

export default memo(DesiredShiftsCalendar)
