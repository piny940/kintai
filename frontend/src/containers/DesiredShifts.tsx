import DesiredShiftsCalendar from '@/components/Kintai/DesiredShiftsCalendar'
import {
  GetDesiredShiftsDocument,
  useCreateDesiredShiftMutation,
  useGetCompanyLazyQuery,
} from '@/graphql/types'
import { useCompanyId } from '@/hooks/calendar'
import dayjs, { Dayjs } from 'dayjs'
import Error from 'next/error'
import { memo, useCallback, useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import { useApolloClient } from '@apollo/client'

const ADD_DESIRED_SHIFTS_MODAL_ID = 'add-desired-shifts-modal'
const DesiredShifts = (): JSX.Element => {
  const companyId = useCompanyId()
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs(Date.now()))

  // GraphQL
  const [loadCompany, { data: companyData, error }] = useGetCompanyLazyQuery()
  const [createDesiredShift, { error: desiredShiftError }] =
    useCreateDesiredShiftMutation()
  const client = useApolloClient()

  const onAddButtonClicked = async (date: Dayjs) => {
    setSelectedDate(date)
    const bootstrap = await import('bootstrap')
    void new bootstrap.Modal('#' + ADD_DESIRED_SHIFTS_MODAL_ID).show()
  }
  const postDesiredShift = useCallback(
    async (since: Dayjs, till: Dayjs) => {
      if (!companyId) return
      try {
        await createDesiredShift({
          variables: {
            companyId,
            since: since.toISOString(),
            till: till.toISOString(),
          },
        })
        await client.refetchQueries({ include: [GetDesiredShiftsDocument] })
      } catch {}
    },
    [companyId, createDesiredShift, client]
  )

  useEffect(() => {
    if (!companyId) return
    void loadCompany({ variables: { id: companyId } })
  }, [companyId, loadCompany])

  if (error) return <Error statusCode={404} />
  if (!companyId || !companyData?.company) return <>loading...</>
  return (
    <div>
      <h1>希望シフト作成</h1>
      <h2 className="ms-2 mb-4">{companyData.company.name}</h2>
      <DesiredShiftsCalendar
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        addDesiredShift={postDesiredShift}
        companyId={companyId}
        selectedDate={selectedDate}
        addDesiredShiftsModalID={ADD_DESIRED_SHIFTS_MODAL_ID}
        onAddButtonClicked={onAddButtonClicked}
        alert={desiredShiftError?.message || ''}
      />
    </div>
  )
}

export default memo(DesiredShifts)
