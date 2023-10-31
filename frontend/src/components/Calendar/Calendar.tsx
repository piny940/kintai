import WeekDays from './WeekDays'
import { memo } from 'react'
import Month from './Month'
import { useCalendar } from '@/utils/hooks'
import { Dayjs } from 'dayjs'

export type CalendarProps = {
  yearMonth: Dayjs
  setYearMonth: (yearMonth: Dayjs) => void
  renderDate?: (month: number, date: Dayjs) => JSX.Element
}

const Calendar = ({
  renderDate,
  yearMonth,
  setYearMonth,
}: CalendarProps): JSX.Element => {
  const { year, month, datesMatrix } = useCalendar({ yearMonth, setYearMonth })

  return (
    <table className="table table-striped">
      <thead className="flex flex-1">
        <WeekDays />
      </thead>
      <tbody>
        <Month
          renderDate={renderDate}
          year={year}
          month={month}
          datesMatrix={datesMatrix}
        />
      </tbody>
    </table>
  )
}
export default memo(Calendar)
