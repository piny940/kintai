import { useGetYearReportQuery } from '@/graphql/types'
import { useCompanyId } from '@/hooks/calendar'
import dayjs from 'dayjs'
import Error from 'next/error'
import { memo } from 'react'

export type YearReportProps = {
  year: number
}
const YearReport = ({ year }: YearReportProps): JSX.Element => {
  const companyId = useCompanyId()
  const { data: yearReportData, error } = useGetYearReportQuery({
    variables: { companyId: companyId, year: dayjs().year(year).toISOString() },
  })

  if (error) return <Error statusCode={400} />
  if (!yearReportData?.getYearReport) return <>loading...</>
  return <table className="table"></table>
}

export default memo(YearReport)
