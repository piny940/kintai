import DesiredShiftsCalendar from '@/components/Kintai/DesiredShiftsCalendar'
import {
  useCreateDesiredShiftMutation,
  useGetCompanyLazyQuery,
  useGetDesiredShiftsLazyQuery,
} from '@/graphql/types'
import { useCompanyId } from '@/utils/hooks'
import dayjs, { Dayjs } from 'dayjs'
import Error from 'next/error'
import { memo, useCallback, useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css'

const ADD_DESIRED_SHIFTS_MODAL_ID = 'add-desired-shifts-modal'
const DesiredShifts = (): JSX.Element => {
  const companyId = useCompanyId()

  // GraphQL
  const [loadCompany, { data: companyData, error }] = useGetCompanyLazyQuery()
  const [loadDesiredShifts, { data: desiredShiftsData }] =
    useGetDesiredShiftsLazyQuery()
  const [createDesiredShift, { error: desiredShiftError }] =
    useCreateDesiredShiftMutation()

  const [alert, setAlert] = useState('')
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs(Date.now()))

  const onAddButtonClicked = async (date: Dayjs) => {
    setSelectedDate(date)
    const bootstrap = await import('bootstrap')
    void new bootstrap.Modal('#' + ADD_DESIRED_SHIFTS_MODAL_ID).show()
  }
  const postDesiredShift = useCallback(
    async (since: Dayjs, till: Dayjs) => {
      if (!companyId) return
      if (till.isBefore(since)) {
        setAlert('開始時間は終了時間よりも前に設定してください')
        return
      }
      try {
        await createDesiredShift({
          variables: {
            companyId,
            since: since.toISOString(),
            till: till.toISOString(),
          },
        })
      } catch {}
    },
    [companyId]
  )

  useEffect(() => {
    if (!companyId) return
    void loadCompany({ variables: { id: companyId } })
    void loadDesiredShifts({ variables: { companyId } })
  }, [companyId])

  if (error) return <Error statusCode={404} />
  if (!companyData?.company || !desiredShiftsData?.desiredShifts)
    return <>loading...</>
  return (
    <div>
      <h1>希望シフト作成</h1>
      <h2 className="ms-2 mb-4">{companyData.company.name}</h2>
      <DesiredShiftsCalendar
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        addDesiredShift={postDesiredShift}
        desiredShifts={desiredShiftsData?.desiredShifts || []}
        selectedDate={selectedDate}
        addDesiredShiftsModalID={ADD_DESIRED_SHIFTS_MODAL_ID}
        onAddButtonClicked={onAddButtonClicked}
        alert={desiredShiftError?.message || alert}
      />
    </div>
  )
}

export default memo(DesiredShifts)
