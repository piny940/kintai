import WeekDays from './WeekDays'
import { memo } from 'react'
import Month from './Month'
import { useCalendar } from '@/utils/hooks'
import { Dayjs } from 'dayjs'

export type CalendarProps = {
  renderDate?: (month: number, date: Dayjs) => JSX.Element
}

const Calendar = ({ renderDate }: CalendarProps): JSX.Element => {
  const { year, month, datesMatrix } = useCalendar(new Date())

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
