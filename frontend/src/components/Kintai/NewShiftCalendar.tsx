import dayjs, { Dayjs } from 'dayjs'
import Calendar from '../Calendar/Calendar'
import NewShiftDate from './NewShiftDate'
import { memo, useCallback, useState } from 'react'
import AddShiftModal from './AddShiftModal'
import {
  useMappedCompanyDesiredShifts,
  useMappedCompanyShifts,
} from '@/hooks/desired_shift'
import { useCompanyId } from '@/hooks/calendar'
import EditShiftModal from './EditShiftModal'

export type NewShiftCalendarProps = {
  showShifts: boolean
  showDesiredShifts: boolean
}

const ADD_SHIFTS_MODAL_ID = 'add-shifts-modal'
const EDIT_SHIFT_MODAL_ID = 'edit-shift-modal'
const NewShiftCalendar = ({
  showShifts,
  showDesiredShifts,
}: NewShiftCalendarProps): JSX.Element => {
  const companyId = useCompanyId()
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs(Date.now()))
  const [selectedDesiredShift, setSelectedDesiredShift] = useState<{
    id: number
    since: string
    till: string
    employment: { worker: { id: number } }
  } | null>(null)
  const [selectedShift, setSelectedShift] = useState<{
    id: number
    since: string
    till: string
    employment: { worker: { id: number } }
  } | null>(null)
  const desiredShiftsMap = useMappedCompanyDesiredShifts(
    companyId,
    selectedMonth
  )
  const shiftsMap = useMappedCompanyShifts(companyId, selectedMonth)

  const onAddButtonClicked = async (date: Dayjs) => {
    setSelectedDesiredShift(null)
    setSelectedDate(date)
    const bootstrap = await import('bootstrap')
    void new bootstrap.Modal('#' + ADD_SHIFTS_MODAL_ID).show()
  }
  const onDesiredShiftItemClicked = async (desiredShift: {
    id: number
    since: string
    till: string
    employment: { worker: { id: number } }
  }) => {
    setSelectedDesiredShift(desiredShift)
    setSelectedDate(dayjs(desiredShift.since))
    const bootstrap = await import('bootstrap')
    void new bootstrap.Modal('#' + ADD_SHIFTS_MODAL_ID).show()
  }

  const onShiftItemClicked = useCallback(
    async (shift: {
      id: number
      since: string
      till: string
      employment: { worker: { id: number } }
    }) => {
      setSelectedShift(shift)
      const bootstrap = await import('bootstrap')
      void new bootstrap.Modal('#' + EDIT_SHIFT_MODAL_ID).show()
    },
    []
  )

  return (
    <>
      <Calendar
        yearMonth={selectedMonth}
        setYearMonth={setSelectedMonth}
        renderDate={(month, date) => (
          <NewShiftDate
            showShifts={showShifts}
            showDesiredShifts={showDesiredShifts}
            onAddButtonClicked={() => {
              void onAddButtonClicked(date)
            }}
            month={month}
            date={date}
            desiredShifts={desiredShiftsMap.get(date.date()) || []}
            shifts={shiftsMap.get(date.date()) || []}
            onDesiredShiftItemClicked={onDesiredShiftItemClicked}
            onShiftItemClicked={onShiftItemClicked}
          />
        )}
      />
      <AddShiftModal
        date={selectedDate}
        targetID={ADD_SHIFTS_MODAL_ID}
        selectedDesiredShift={selectedDesiredShift}
      />
      <EditShiftModal targetID={EDIT_SHIFT_MODAL_ID} shift={selectedShift} />
    </>
  )
}

export default memo(NewShiftCalendar)
