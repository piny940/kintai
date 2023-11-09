import { memo, useCallback, useState } from 'react'
import AddDesiredShiftsModal from './AddDesiredShiftsModal'
import Calendar from '../Calendar/Calendar'
import DesiredShiftsDate from './DesiredShiftsDate'
import dayjs, { Dayjs } from 'dayjs'
import {
  useMappedCompanyShifts,
  useMappedDesiredShifts,
} from '@/hooks/desired_shift'
import { useCompanyId } from '@/hooks/calendar'
import EditDesiredShiftModal from './EditDesiredShiftModal'

const ADD_DESIRED_SHIFTS_MODAL_ID = 'add-desired-shifts-modal'
const EDIT_DESIRED_SHIFTS_MODAL_ID = 'edit-desired-shifts-modal'
const DesiredShiftsCalendar = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs(Date.now()))
  const companyId = useCompanyId()
  const desiredShiftsMap = useMappedDesiredShifts(companyId, selectedMonth)
  const shiftsMap = useMappedCompanyShifts(companyId, selectedMonth)
  const [selectedDesiredShift, setSelectedDesiredShift] = useState<{
    id: number
    since: string
    till: string
  } | null>(null)

  const onAddButtonClicked = async (date: Dayjs) => {
    setSelectedDate(date)
    const bootstrap = await import('bootstrap')
    void new bootstrap.Modal('#' + ADD_DESIRED_SHIFTS_MODAL_ID).show()
  }
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
            onAddButtonClicked={() => {
              void onAddButtonClicked(date)
            }}
            onDesiredShiftItemClicked={onDesiredShiftItemClicked}
            desiredShifts={desiredShiftsMap.get(date.date()) || []}
            shifts={shiftsMap.get(date.date()) || []}
          />
        )}
      />
      <AddDesiredShiftsModal
        date={selectedDate}
        targetID={ADD_DESIRED_SHIFTS_MODAL_ID}
      />
      <EditDesiredShiftModal
        targetID={EDIT_DESIRED_SHIFTS_MODAL_ID}
        desiredShift={selectedDesiredShift}
      />
    </>
  )
}

export default memo(DesiredShiftsCalendar)
