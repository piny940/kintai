import { memo, useState } from 'react'
import Calendar from '../Calendar/Calendar'
import dayjs, { Dayjs } from 'dayjs'
import { useMappedCompanyShifts } from '@/hooks/desired_shift'
import { useCompanyId } from '@/hooks/calendar'
import ShiftsDate from './ShiftsDate'

const ShiftsCalendar = (): JSX.Element => {
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs(Date.now()))
  const companyId = useCompanyId()
  const shiftsMap = useMappedCompanyShifts(companyId, selectedMonth)

  return (
    <>
      <Calendar
        yearMonth={selectedMonth}
        setYearMonth={setSelectedMonth}
        renderDate={(month, date) => (
          <ShiftsDate
            month={month}
            date={date}
            shifts={shiftsMap.get(date.date()) || []}
          />
        )}
      />
    </>
  )
}

export default memo(ShiftsCalendar)
