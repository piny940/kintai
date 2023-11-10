import { Dayjs } from 'dayjs'

export type DateReportProps = {
  date: Dayjs
}

const DateReport = ({ date }: DateReportProps): JSX.Element => {
  return (
    <div className="">
      <h1>勤務実績 - {date.format('YYYY年M月D日')}</h1>
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
