import DesiredShiftsCalendar from '@/components/Kintai/DesiredShiftsCalendar'
import { useWorkerInfo } from '@/context/WorkerInfoProvider'
import { DesiredShift, DesiredShiftJSON } from '@/resources/types'
import { getData, postData } from '@/utils/api'
import { toDayjs } from '@/utils/helpers'
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
    )[1] as { desired_shifts: DesiredShiftJSON[] }
    const desiredShifts: DesiredShift[] = json.desired_shifts.map((d) => ({
      ...d,
      since: toDayjs(d.since),
      till: toDayjs(d.till),
      created_at: toDayjs(d.created_at),
      updated_at: toDayjs(d.updated_at),
    }))
    setDesiredShifts(desiredShifts)
  }, [company])

  const onAddButtonClicked = async (date: Dayjs) => {
    setSelectedDate(date)
    const bootstrap = await import('bootstrap')
    void new bootstrap.Modal('#' + ADD_DESIRED_SHIFTS_MODAL_ID).show()
  }
  const postDesiredShift = useCallback(
    async (since: Dayjs, till: Dayjs) => {
      if (!company) return
      if (till.isBefore(since)) {
        setAlert('開始時間は終了時間よりも前に設定してください')
        return
      }
      const [res, json] = await postData({
        url: `/member/companies/${company.id}/desired_shifts`,
        data: {
          since: since.toDate(),
          till: till.toDate(),
        },
      })
      if (!res.ok) {
        setAlert(json.message)
        return
      }
      setAlert('')
      void pullDesiredShifts()
    },
    [company]
  )

  useEffect(() => {
    void pullDesiredShifts()
  }, [pullDesiredShifts])

  if (!company) return <Error statusCode={404} />
  return (
    <div>
      <h1>希望シフト作成</h1>
      <h2 className="ms-2">{company.name}</h2>
      <DesiredShiftsCalendar
        addDesiredShift={postDesiredShift}
        desiredShifts={desiredShifts}
        selectedDate={selectedDate}
        addDesiredShiftsModalID={ADD_DESIRED_SHIFTS_MODAL_ID}
        onAddButtonClicked={onAddButtonClicked}
        alert={alert}
      />
    </div>
  )
}

export default memo(DesiredShifts)
