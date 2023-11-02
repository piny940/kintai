import { Dayjs } from 'dayjs'
import Calendar from '../Calendar/Calendar'
import NewShiftDate from './NewShiftDate'
import { useMappedCompanyDesiredShifts } from '@/hooks/desired_shift'
import { memo } from 'react'

export type NewShiftCalendarProps = {
  alert: string
  addDesiredShiftsModalID: string
  onAddButtonClicked: (date: Dayjs) => void
  selectedDate: Dayjs | null
  companyId: number
  addDesiredShift: (since: Dayjs, till: Dayjs) => void
  selectedMonth: Dayjs
  setSelectedMonth: (selectedMonth: Dayjs) => void
}

const NewShiftCalendar = ({
  alert,
  addDesiredShiftsModalID,
  onAddButtonClicked,
  selectedDate,
  companyId,
  addDesiredShift,
  selectedMonth,
  setSelectedMonth,
}: NewShiftCalendarProps): JSX.Element => {
  const desiredShiftsMap = useMappedCompanyDesiredShifts(
    companyId,
    selectedMonth
  )

  return (
    <Calendar
      yearMonth={selectedMonth}
      setYearMonth={setSelectedMonth}
      renderDate={(month, date) => (
        <NewShiftDate
          onAddButtonClicked={() => onAddButtonClicked(date)}
          month={month}
          date={date}
          desiredShifts={desiredShiftsMap.get(date.date()) || []}
        />
      )}
    />
  )
}

export default memo(NewShiftCalendar)
