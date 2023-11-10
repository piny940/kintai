import { useGetYearReportQuery } from '@/graphql/types'
import { useCompanyId } from '@/hooks/calendar'
import dayjs, { Dayjs } from 'dayjs'
import Error from 'next/error'
import { memo, useMemo } from 'react'

export type YearReportProps = {
  year: Dayjs
}
const YearReport = ({ year }: YearReportProps): JSX.Element => {
  const companyId = useCompanyId()
  const { data: yearReportData, error } = useGetYearReportQuery({
    variables: { companyId: companyId, year: year.toISOString() },
  })

  const months = useMemo(() => {
    const months = []
    for (
      let i = 0;
      year.month(i).startOf('month').isBefore(dayjs()) && i < 12;
      i++
    ) {
      months.push(year.month(i).startOf('month'))
    }
    return months
  }, [year])

  if (error) return <Error statusCode={400} />
  if (!yearReportData?.yearReport) return <>loading...</>
  return (
    <table className="table">
      <thead>
        <tr>
          <th>月</th>
          <th>勤務時間</th>
        </tr>
      </thead>
      <tbody>
        {months.map((month) => (
          <tr key={month.toISOString()}>
            <td>{month.month() + 1}月</td>
            <td>
              {
                yearReportData.yearReport.workReports.find(
                  (m) => m.key === month.month() + 1
                )?.value.workTime
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default memo(YearReport)
