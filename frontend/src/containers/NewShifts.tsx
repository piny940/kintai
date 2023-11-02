import Calendar from '@/components/Calendar/Calendar'
import { useGetCompanyLazyQuery } from '@/graphql/types'
import { useCompanyId } from '@/utils/hooks'
import dayjs, { Dayjs } from 'dayjs'
import Error from 'next/error'
import { memo, useEffect, useState } from 'react'

const NewShifts = (): JSX.Element => {
  const companyId = useCompanyId()
  const [loadCompany, { data: companyData, error }] = useGetCompanyLazyQuery()
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs(Date.now()))

  useEffect(() => {
    if (!companyId) return
    void loadCompany({ variables: { id: companyId } })
  }, [companyId, loadCompany])

  if (error) return <Error statusCode={404} />
  if (!companyData?.company) return <>loading...</>
  return (
    <div>
      <h1>シフト作成</h1>
      <h2 className="ms-2 mb-4">{companyData.company.name}</h2>
      <Calendar
        yearMonth={selectedMonth}
        setYearMonth={setSelectedMonth}
        renderDate={() => <div>test</div>}
      />
    </div>
  )
}

export default memo(NewShifts)
