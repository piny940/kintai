import dayjs from 'dayjs'
import WeekDays from './WeekDays'
import { memo } from 'react'
import Month from './Month'

const Calendar = (): JSX.Element => {
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
