import DesiredShiftsCalendar from '@/components/Kintai/DesiredShiftsCalendar'
import { memo, useState } from 'react'
import 'react-calendar/dist/Calendar.css'

const DesiredShifts = (): JSX.Element => {
  const [alert, setAlert] = useState('')
  const [desiredShifts, setDesiredShifts] = useState([])

  return (
    <div>
      <DesiredShiftsCalendar alert={alert} />
    </div>
  )
}

export default memo(DesiredShifts)
