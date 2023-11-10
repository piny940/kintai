import { Dayjs } from 'dayjs'
import { memo } from 'react'

export type MonthReportProps = {
  month: Dayjs
}

const MonthReport = ({ month }: MonthReportProps): JSX.Element => {
  return <div>Month Report</div>
}

export default memo(MonthReport)
