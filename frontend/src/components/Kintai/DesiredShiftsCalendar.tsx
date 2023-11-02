import { memo, useMemo } from 'react'
import AddDesiredShiftsModal from './AddDesiredShiftsModal'
import Calendar from '../Calendar/Calendar'
import DesiredShiftsDate from './DesiredShiftsDate'
import dayjs, { Dayjs } from 'dayjs'
import { DesiredShift } from '@/graphql/types'

export type DesiredShiftsCalendarProps = {
  alert: string
  addDesiredShiftsModalID: string
  onAddButtonClicked: (date: Dayjs) => void
  selectedDate: Dayjs | null
  desiredShifts: DesiredShift[]
  addDesiredShift: (since: Dayjs, till: Dayjs) => void
  selectedMonth: Dayjs
  setSelectedMonth: (selectedMonth: Dayjs) => void
}

const DesiredShiftsCalendar = ({
  alert,
  addDesiredShiftsModalID,
  onAddButtonClicked,
  selectedDate,
  desiredShifts,
  addDesiredShift,
  selectedMonth,
  setSelectedMonth,
}: DesiredShiftsCalendarProps): JSX.Element => {
  const desiredShiftsMap = useMemo(() => {
    const map = new Map<number, DesiredShift[]>()
    for (let i = 1; i <= 31; i++) {
      map.set(i, [])
    }
    desiredShifts.forEach((desiredShift) => {
      const date = dayjs(desiredShift.since)
      if (
        date.year() !== selectedMonth.year() ||
        date.month() !== selectedMonth.month()
      )
        return
      map.get(dayjs(desiredShift.since).date())?.push(desiredShift)
    })
    return map
  }, [desiredShifts, selectedMonth])

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
