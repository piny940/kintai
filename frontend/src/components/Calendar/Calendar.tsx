import dayjs from 'dayjs'
import WeekDays from './WeekDays'
import { memo } from 'react'

const Calendar = (): JSX.Element => {
  return (
    <table className="table table-striped">
      <thead className="flex flex-1">
        <WeekDays />
        {/* <Month /> */}
      </thead>
    </table>
  )
}
export default memo(Calendar)
