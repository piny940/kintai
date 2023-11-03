import { Dayjs } from 'dayjs'
import Calendar from '../Calendar/Calendar'
import NewShiftDate from './NewShiftDate'
import { memo } from 'react'
import AddShiftModal from './AddShiftModal'
import {
  useMappedCompanyDesiredShifts,
  useMappedCompanyShifts,
} from '@/hooks/desired_shift'

export type NewShiftCalendarProps = {
  alert: string
  addShiftsModalID: string
  onAddButtonClicked: (date: Dayjs) => void
  selectedDate: Dayjs | null
  companyId: number
  addShift: (since: Dayjs, till: Dayjs) => void
  selectedMonth: Dayjs
  setSelectedMonth: (selectedMonth: Dayjs) => void
}

const NewShiftCalendar = ({
  alert,
  addShiftsModalID,
  onAddButtonClicked,
  selectedDate,
  companyId,
  addShift,
  selectedMonth,
  setSelectedMonth,
}: NewShiftCalendarProps): JSX.Element => {
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
          />
        )}
      />
      <AddShiftModal
        alert={alert}
        addShift={addShift}
        date={selectedDate}
        targetID={addShiftsModalID}
      />
    </>
  )
}

export default memo(NewShiftCalendar)
