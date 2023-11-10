import { useGetCompanyQuery, useGetDateReportQuery } from '@/graphql/types'
import { useCompanyId } from '@/hooks/calendar'
import { secondToTime } from '@/utils/helpers'
import dayjs, { Dayjs } from 'dayjs'
import Error from 'next/error'

export type DateReportProps = {
  date: Dayjs
}

const DateReport = ({ date }: DateReportProps): JSX.Element => {
  const companyId = useCompanyId()
  const { data: companyData, error } = useGetCompanyQuery({
    variables: { id: companyId },
  })
  const { data: dateReportData } = useGetDateReportQuery({
    variables: { companyId: companyId, date: date.toISOString() },
  })

  if (error) return <Error statusCode={404} />
  if (!companyData?.company || !dateReportData) return <>loading...</>
  return (
    <div className="">
      <h1>
        {date.format('YYYY年M月D日')} 勤務実績 - {companyData.company.name}
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th>打刻日時</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dateReportData.dateReport.stamps.map((stamp) => (
            <tr key={stamp.id}>
              <td>{dayjs(stamp.stampedAt).format('YYYY/MM/DD HH:mm:ss')}</td>
              <td></td>
            </tr>
          ))}
          <tr>
            <th>{secondToTime(dateReportData.dateReport.workTime)}</th>
            <th>合計</th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DateReport
