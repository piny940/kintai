import { memo } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const DesiredShifts = (): JSX.Element => {
  return (
    <div>
      <Calendar
        allowPartialRange
        className={['w-100']}
        tileClassName={['pb-5']}
      />
    </div>
  )
}

export default memo(DesiredShifts)
