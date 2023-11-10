import { memo } from 'react'

export type YearReportProps = {
  year: number
}
const YearReport = ({ year }: YearReportProps): JSX.Element => {
  return <div className="">レポート</div>
}

export default memo(YearReport)
