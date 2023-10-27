import { memo, useMemo } from 'react'
import AddDesiredShiftsModal from './AddDesiredShiftsModal'
import Calendar from '../Calendar/Calendar'
import DesiredShiftsDate from './DesiredShiftsDate'
import { Dayjs } from 'dayjs'
import { DesiredShift } from '@/resources/types'

export type DesiredShiftsCalendarProps = {
  alert: string
  addDesiredShiftsModalID: string
  onAddButtonClicked: (date: Dayjs) => void
  selectedDate: Dayjs | null
  desiredShifts: DesiredShift[]
}

const DesiredShiftsCalendar = ({
  alert,
  addDesiredShiftsModalID,
  onAddButtonClicked,
  selectedDate,
  desiredShifts,
}: DesiredShiftsCalendarProps): JSX.Element => {
  const desiredShiftsMap = useMemo(() => {
    const map = new Map<number, DesiredShift[]>()
    for (let i = 1; i <= 31; i++) {
      map.set(i, [])
    }
    desiredShifts.forEach((desiredShift) => {
      map.get(desiredShift.since.getDate())?.push(desiredShift)
    })
    return map
  }, [desiredShifts])

  return (
    <>
      <Calendar
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
        alert={alert}
      />
    </>
  )
}

export default memo(DesiredShiftsCalendar)
