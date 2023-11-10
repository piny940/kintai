import { useGetCompanyQuery } from '@/graphql/types'
import { useCompanyId } from '@/hooks/calendar'
import { Dayjs } from 'dayjs'
import Error from 'next/error'

export type DateReportProps = {
  date: Dayjs
}

const DateReport = ({ date }: DateReportProps): JSX.Element => {
  const companyId = useCompanyId()
  const { data: companyData, error } = useGetCompanyQuery({
    variables: { id: companyId },
  })

  if (error) return <Error statusCode={404} />
  if (!companyData?.company) return <>loading...</>
  return (
    <div className="">
      <h1>
        {date.format('YYYY年M月D日')} 勤務実績 - {companyData.company.name}
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th>出勤</th>
            <th>退勤</th>
            <th>休憩</th>
            <th>勤務時間</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>9:00</td>
            <td>18:00</td>
            <td>1:00</td>
            <td>8:00</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DateReport
