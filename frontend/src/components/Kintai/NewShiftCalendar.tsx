import { Dayjs } from 'dayjs'
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
  addShiftsModalID: string
  onAddButtonClicked: (date: Dayjs) => void
  selectedDate: Dayjs | null
  selectedMonth: Dayjs
  setSelectedMonth: (selectedMonth: Dayjs) => void
  onDesiredShiftItemClicked: (desiredShift: {
    id: number
    since: string
    till: string
    employment: { worker: { id: number } }
  }) => void
  selectedDesiredShift: {
    id: number
    since: string
    till: string
    employment: { worker: { id: number } }
  } | null
}

const EDIT_SHIFT_MODAL_ID = 'edit-shift-modal'
const NewShiftCalendar = ({
  showShifts,
  showDesiredShifts,
  addShiftsModalID,
  onAddButtonClicked,
  selectedDate,
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
  const [selectedShift, setSelectedShift] = useState<{
    id: number
    since: string
    till: string
    employment: { worker: { id: number } }
  } | null>(null)
  const shiftsMap = useMappedCompanyShifts(companyId, selectedMonth)

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
            onAddButtonClicked={() => onAddButtonClicked(date)}
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
        targetID={addShiftsModalID}
        selectedDesiredShift={selectedDesiredShift}
      />
      <EditShiftModal targetID={EDIT_SHIFT_MODAL_ID} shift={selectedShift} />
    </>
  )
}

export default memo(NewShiftCalendar)
