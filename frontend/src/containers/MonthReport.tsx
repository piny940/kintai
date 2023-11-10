import { useGetCompanyQuery } from '@/graphql/types'
import { useCompanyId } from '@/hooks/calendar'
import { Dayjs } from 'dayjs'
import Error from 'next/error'
import { memo } from 'react'

export type MonthReportProps = {
  month: Dayjs
}

const MonthReport = ({ month }: MonthReportProps): JSX.Element => {
  const companyId = useCompanyId()
  const { data: companyData, error } = useGetCompanyQuery({
    variables: { id: companyId },
  })

  if (error) return <Error statusCode={404} />
  if (!companyData?.company) return <>loading...</>
  return (
    <div>
      <h1>勤務実績 - {companyData.company.name}</h1>
      <h2>
        {month.year()}年{month.month() + 1}月
      </h2>
    </div>
  )
}

export default memo(MonthReport)
