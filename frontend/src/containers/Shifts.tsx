import ShiftsCalendar from '@/components/Kintai/ShiftsCalendar'
import { useGetCompanyLazyQuery } from '@/graphql/types'
import { useCompanyId } from '@/hooks/calendar'
import Error from 'next/error'
import { memo, useEffect } from 'react'

const Shifts = (): JSX.Element => {
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
      <h1>シフト表 - {companyData.company.name}</h1>
      <ShiftsCalendar />
    </div>
  )
}

export default memo(Shifts)
