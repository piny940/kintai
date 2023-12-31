import { useGetCompanyQuery, useGetMonthReportQuery } from '@/graphql/types'
import { useCompanyId } from '@/hooks/calendar'
import { secondToTime, toDigit } from '@/utils/helpers'
import dayjs, { Dayjs } from 'dayjs'
import Error from 'next/error'
import Link from 'next/link'
import { memo, useMemo } from 'react'

export type MonthReportProps = {
  month: Dayjs
}

const MonthReport = ({ month }: MonthReportProps): JSX.Element => {
  const companyId = useCompanyId()
  const { data: companyData, error } = useGetCompanyQuery({
    variables: { id: companyId },
  })
  const { data: monthReportData } = useGetMonthReportQuery({
    variables: { companyId: companyId, month: month.toISOString() },
  })

  const dates = useMemo(() => {
    const dates = []
    for (
      let i = 1;
      month.date(i).startOf('date').isBefore(dayjs()) && i < 32;
      i++
    ) {
      dates.push(month.date(i))
    }
    return dates
  }, [month])

  if (error) return <Error statusCode={404} />
  if (!companyData?.company || !monthReportData) return <>loading...</>
  return (
    <div>
      <h1>勤務実績 - {companyData.company.name}</h1>
      <h2>
        {month.year()}年{month.month() + 1}月
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>月</th>
            <th>勤務時間</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date) => (
            <tr key={date.toISOString()}>
              <td>
                <Link
                  href={`/companies/${companyId}/work_reports/${toDigit(
                    date.year()
                  )}${toDigit(date.month())}/date_reports/${date.date()}`}
                >
                  {date.date()}日
                </Link>
              </td>
              <td>
                {secondToTime(
                  monthReportData.monthReport.workReports.find(
                    (r) => r.key === date.date()
                  )?.value.workTime || 0
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default memo(MonthReport)
