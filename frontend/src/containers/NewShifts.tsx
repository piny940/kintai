import NewShiftCalendar from '@/components/Kintai/NewShiftCalendar'
import { useGetCompanyLazyQuery } from '@/graphql/types'
import { useCompanyId } from '@/hooks/calendar'
import dayjs, { Dayjs } from 'dayjs'
import Error from 'next/error'
import { memo, useEffect, useState } from 'react'

const NewShifts = (): JSX.Element => {
  const companyId = useCompanyId()
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs(Date.now()))
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)

  // Graphql
  const [loadCompany, { data: companyData, error }] = useGetCompanyLazyQuery()

  useEffect(() => {
    if (!companyId) return
    void loadCompany({ variables: { id: companyId } })
  }, [companyId, loadCompany])

  if (error) return <Error statusCode={404} />
  if (!companyId || !companyData?.company) return <>loading...</>
  return (
    <div>
      <h1>シフト作成- {companyData.company.name}</h1>
      <NewShiftCalendar
        alert={''}
        addDesiredShiftsModalID={''}
        onAddButtonClicked={() => console.log('add')}
        selectedDate={selectedDate}
        companyId={companyId}
        addDesiredShift={() => console.log('add')}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
    </div>
  )
}

export default memo(NewShifts)
