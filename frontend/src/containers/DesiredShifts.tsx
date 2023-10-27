import DesiredShiftsCalendar from '@/components/Kintai/DesiredShiftsCalendar'
import { useWorkerInfo } from '@/context/WorkerInfoProvider'
import { DesiredShift } from '@/resources/types'
import { getData } from '@/utils/api'
import { memo, useCallback, useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css'

const DesiredShifts = (): JSX.Element => {
  const { worker, loading, company } = useWorkerInfo()
  const [alert, setAlert] = useState('')
  const [desiredShifts, setDesiredShifts] = useState<DesiredShift[]>([])

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

  useEffect(() => {
    void pullDesiredShifts()
  }, [])

  return (
    <div>
      <DesiredShiftsCalendar alert={alert} />
    </div>
  )
}

export default memo(DesiredShifts)
