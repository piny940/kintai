import { memo, useCallback, useState } from 'react'
import AddDesiredShiftsModal from './AddDesiredShiftsModal'
import Calendar from '../Calendar/Calendar'
import DesiredShiftsDate from './DesiredShiftsDate'
import { Dayjs } from 'dayjs'
import {
  useMappedCompanyShifts,
  useMappedDesiredShifts,
} from '@/hooks/desired_shift'
import { useCompanyId } from '@/hooks/calendar'
import EditDesiredShiftModal from './EditDesiredShiftModal'

export type DesiredShiftsCalendarProps = {
  addDesiredShiftsModalID: string
  onAddButtonClicked: (date: Dayjs) => void
  selectedDate: Dayjs | null
  selectedMonth: Dayjs
  setSelectedMonth: (selectedMonth: Dayjs) => void
}

const EDIT_DESIRED_SHIFTS_MODAL_ID = 'edit-desired-shifts-modal'
const DesiredShiftsCalendar = ({
  addDesiredShiftsModalID,
  onAddButtonClicked,
  selectedDate,
  selectedMonth,
  setSelectedMonth,
}: DesiredShiftsCalendarProps): JSX.Element => {
  const companyId = useCompanyId()
  const desiredShiftsMap = useMappedDesiredShifts(companyId, selectedMonth)
  const shiftsMap = useMappedCompanyShifts(companyId, selectedMonth)
  const [selectedDesiredShift, setSelectedDesiredShift] = useState<{
    id: number
    since: string
    till: string
  } | null>(null)

  const onDesiredShiftItemClicked = useCallback(
    async (desiredShift: { id: number; since: string; till: string }) => {
      setSelectedDesiredShift(desiredShift)
      const bootstrap = await import('bootstrap')
      void new bootstrap.Modal('#' + EDIT_DESIRED_SHIFTS_MODAL_ID).show()
    },
    []
  )

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
            onDesiredShiftItemClicked={onDesiredShiftItemClicked}
            desiredShifts={desiredShiftsMap.get(date.date()) || []}
            shifts={shiftsMap.get(date.date()) || []}
          />
        )}
      />
      <AddDesiredShiftsModal
        date={selectedDate}
        targetID={addDesiredShiftsModalID}
      />
      <EditDesiredShiftModal
        targetID={EDIT_DESIRED_SHIFTS_MODAL_ID}
        desiredShift={selectedDesiredShift}
      />
    </>
  )
}

export default memo(DesiredShiftsCalendar)
