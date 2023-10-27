import DesiredShiftsCalendar from '@/components/Kintai/DesiredShiftsCalendar'
import { useWorkerInfo } from '@/context/WorkerInfoProvider'
import { DesiredShift } from '@/resources/types'
import { getData } from '@/utils/api'
import { Dayjs } from 'dayjs'
import Error from 'next/error'
import { memo, useCallback, useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css'

const ADD_DESIRED_SHIFTS_MODAL_ID = 'add-desired-shifts-modal'
const DesiredShifts = (): JSX.Element => {
  const { company } = useWorkerInfo()
  const [alert, setAlert] = useState('')
  const [desiredShifts, setDesiredShifts] = useState<DesiredShift[]>([])
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)

  const pullDesiredShifts = useCallback(async () => {
    if (!company) return
    const json = (
      await getData(`/member/companies/${company.id}/desired_shifts`)
    )[1]
    setDesiredShifts(json.desired_shifts)
  }, [company])

  const onAddButtonClicked = async (date: Dayjs) => {
    const bootstrap = await import('bootstrap')
    void new bootstrap.Modal('#' + ADD_DESIRED_SHIFTS_MODAL_ID).show()
    setSelectedDate(date)
  }

  useEffect(() => {
    void pullDesiredShifts()
  }, [])

  if (!company) return <Error statusCode={404} />
  return (
    <div>
      <h1>希望シフト作成</h1>
      <h2 className="ms-2">{company.name}</h2>
      <DesiredShiftsCalendar
        addDesiredShiftsModalID={ADD_DESIRED_SHIFTS_MODAL_ID}
        onAddButtonClicked={onAddButtonClicked}
        alert={alert}
      />
    </div>
  )
}

export default memo(DesiredShifts)
