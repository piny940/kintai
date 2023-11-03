import { Dayjs } from 'dayjs'
import Calendar from '../Calendar/Calendar'
import NewShiftDate from './NewShiftDate'
import { memo } from 'react'
import AddShiftModal from './AddShiftModal'
import {
  useMappedCompanyDesiredShifts,
  useMappedCompanyShifts,
} from '@/hooks/desired_shift'
import { useCompanyId } from '@/hooks/calendar'

export type NewShiftCalendarProps = {
  alert: string
  addShiftsModalID: string
  onAddButtonClicked: (date: Dayjs) => void
  selectedDate: Dayjs | null
  addShift: (since: Dayjs, till: Dayjs) => void
  selectedMonth: Dayjs
  setSelectedMonth: (selectedMonth: Dayjs) => void
  onDesiredShiftItemClicked: (desiredShift: {
    id: number
    since: string
    till: string
  }) => void
  selectedDesiredShift: { id: number; since: string; till: string } | null
}

const NewShiftCalendar = ({
  alert,
  addShiftsModalID,
  onAddButtonClicked,
  selectedDate,
  addShift,
  selectedMonth,
  setSelectedMonth,
  onDesiredShiftItemClicked,
  selectedDesiredShift,
}: NewShiftCalendarProps): JSX.Element => {
  const companyId = useCompanyId()
  const desiredShiftsMap = useMappedCompanyDesiredShifts(
    companyId,
    selectedMonth
  )
  const shiftsMap = useMappedCompanyShifts(companyId, selectedMonth)

  return (
    <>
      <Calendar
        yearMonth={selectedMonth}
        setYearMonth={setSelectedMonth}
        renderDate={(month, date) => (
          <NewShiftDate
            onAddButtonClicked={() => onAddButtonClicked(date)}
            month={month}
            date={date}
            desiredShifts={desiredShiftsMap.get(date.date()) || []}
            shifts={shiftsMap.get(date.date()) || []}
            onDesiredShiftItemClicked={onDesiredShiftItemClicked}
          />
        )}
      />
      <AddShiftModal
        alert={alert}
        addShift={addShift}
        date={selectedDate}
        targetID={addShiftsModalID}
        selectedDesiredShift={selectedDesiredShift}
      />
    </>
  )
}

export default memo(NewShiftCalendar)
