import WeekDays from './WeekDays'
import { memo } from 'react'
import Month from './Month'
import { useCalendar } from '@/utils/hooks'

const Calendar = (): JSX.Element => {
  const { year, month, datesMatrix } = useCalendar(new Date())

  console.log(datesMatrix)
  return (
    <table className="table table-striped">
      <thead className="flex flex-1">
        <WeekDays />
      </thead>
      <tbody>
        <Month />
      </tbody>
    </table>
  )
}
export default memo(Calendar)
