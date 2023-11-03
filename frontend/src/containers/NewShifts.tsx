import NewShiftCalendar from '@/components/Kintai/NewShiftCalendar'
import { useGetCompanyLazyQuery } from '@/graphql/types'
import { useCompanyId } from '@/hooks/calendar'
import dayjs, { Dayjs } from 'dayjs'
import Error from 'next/error'
import { memo, useEffect, useState } from 'react'

const ADD_SHIFTS_MODAL_ID = 'add-shifts-modal'
const NewShifts = (): JSX.Element => {
  const companyId = useCompanyId()
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs(Date.now()))
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedDesiredShift, setSelectedDesiredShift] = useState<{
    id: number
    since: string
    till: string
    employment: { worker: { id: number } }
  } | null>(null)
  const [loadCompany, { data: companyData, error }] = useGetCompanyLazyQuery()

  const onAddButtonClicked = async (date: Dayjs) => {
    setSelectedDesiredShift(null)
    setSelectedDate(date)
    const bootstrap = await import('bootstrap')
    void new bootstrap.Modal('#' + ADD_SHIFTS_MODAL_ID).show()
  }
  const onDesiredShiftItemClicked = async (desiredShift: {
    id: number
    since: string
    till: string
    employment: { worker: { id: number } }
  }) => {
    setSelectedDesiredShift(desiredShift)
    setSelectedDate(dayjs(desiredShift.since))
    const bootstrap = await import('bootstrap')
    void new bootstrap.Modal('#' + ADD_SHIFTS_MODAL_ID).show()
  }

  useEffect(() => {
    if (!companyId) return
    void loadCompany({ variables: { id: companyId } })
  }, [companyId, loadCompany])

  if (error) return <Error statusCode={404} />
  if (!companyData?.company) return <>loading...</>
  return (
    <div className="mb-5">
      <h1>シフト作成- {companyData.company.name}</h1>
      <NewShiftCalendar
        addShiftsModalID={ADD_SHIFTS_MODAL_ID}
        onAddButtonClicked={onAddButtonClicked}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        onDesiredShiftItemClicked={onDesiredShiftItemClicked}
        selectedDesiredShift={selectedDesiredShift}
      />
    </div>
  )
}

export default memo(NewShifts)
