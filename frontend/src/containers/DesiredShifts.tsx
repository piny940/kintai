import DesiredShiftsCalendar from '@/components/Kintai/DesiredShiftsCalendar'
import { useWorkerInfo } from '@/context/WorkerInfoProvider'
import { DesiredShift } from '@/resources/types'
import { getData } from '@/utils/api'
import { Dayjs } from 'dayjs'
import { memo, useCallback, useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css'

const ADD_DESIRED_SHIFTS_MODAL_ID = 'add-desired-shifts-modal'
const DesiredShifts = (): JSX.Element => {
  const { worker, loading, company } = useWorkerInfo()
  const [alert, setAlert] = useState('')
  const [desiredShifts, setDesiredShifts] = useState<DesiredShift[]>([])
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)

  const pullDesiredShifts = useCallback(async () => {
    if (!company) return
    const [res, json] = await getData(`/companies/${company.id}/desired_shifts`)
    if (!res.ok) {
      setAlert(json.message)
      console.log(json.message)
      return
    }
    setDesiredShifts(json.desired_shifts)
    console.log(json.desired_shifts)
  }, [company])

  const onAddButtonClicked = async (date: Dayjs) => {
    const bootstrap = await import('bootstrap')
    void new bootstrap.Modal('#' + ADD_DESIRED_SHIFTS_MODAL_ID).show()
    setSelectedDate(date)
  }

  useEffect(() => {
    void pullDesiredShifts()
  }, [])

  return (
    <div>
      <DesiredShiftsCalendar
        addDesiredShiftsModalID={ADD_DESIRED_SHIFTS_MODAL_ID}
        onAddButtonClicked={onAddButtonClicked}
        alert={alert}
      />
    </div>
  )
}

export default memo(DesiredShifts)
