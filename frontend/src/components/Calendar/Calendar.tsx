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
  const { year, month, datesMatrix, goNextMonth, goPrevMonth } = useCalendar({
    yearMonth,
    setYearMonth,
  })

  return (
    <div className="calendar">
      <div className="d-flex justify-content-around mb-2">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={goPrevMonth}
        >
          前月
        </button>
        <span className="h3 m-0">
          {year}年{month + 1}月
        </span>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={goNextMonth}
        >
          翌月
        </button>
      </div>
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
    </div>
  )
}
export default memo(Calendar)
