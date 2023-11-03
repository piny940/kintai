import { memo } from 'react'
import AddDesiredShiftsModal from './AddDesiredShiftsModal'
import Calendar from '../Calendar/Calendar'
import DesiredShiftsDate from './DesiredShiftsDate'
import { Dayjs } from 'dayjs'
import { useMappedDesiredShifts } from '@/hooks/desired_shift'

export type DesiredShiftsCalendarProps = {
  addDesiredShiftsModalID: string
  onAddButtonClicked: (date: Dayjs) => void
  selectedDate: Dayjs | null
  companyId: number
  selectedMonth: Dayjs
  setSelectedMonth: (selectedMonth: Dayjs) => void
}

const DesiredShiftsCalendar = ({
  addDesiredShiftsModalID,
  onAddButtonClicked,
  selectedDate,
  companyId,
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
        date={selectedDate}
        targetID={addDesiredShiftsModalID}
      />
    </>
  )
}

export default memo(DesiredShiftsCalendar)
