import DesiredShiftsCalendar from '@/components/Kintai/DesiredShiftsCalendar'
import { useGetCompanyLazyQuery } from '@/graphql/types'
import { useCompanyId } from '@/hooks/calendar'
import Error from 'next/error'
import { memo, useEffect } from 'react'
import 'react-calendar/dist/Calendar.css'

const DesiredShifts = (): JSX.Element => {
  const companyId = useCompanyId()
  const [loadCompany, { data: companyData, error }] = useGetCompanyLazyQuery()

  useEffect(() => {
    if (!companyId) return
    void loadCompany({ variables: { id: companyId } })
  }, [companyId, loadCompany])

  if (error) return <Error statusCode={404} />
  if (!companyData?.company) return <>loading...</>
  return (
    <div className="mb-5">
      <h1>希望シフト作成 - {companyData.company.name}</h1>
      <DesiredShiftsCalendar />
    </div>
  )
}

export default memo(DesiredShifts)
