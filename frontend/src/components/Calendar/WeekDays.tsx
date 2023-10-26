import { memo } from 'react'

const WeekDays = (): JSX.Element => {
  return (
    <tr className="row row-cols-7">
      <th className="col text-danger">日</th>
      <th className="col">月</th>
      <th className="col">火</th>
      <th className="col">水</th>
      <th className="col">木</th>
      <th className="col">金</th>
      <th className="col">土</th>
    </tr>
  )
}
export default memo(WeekDays)
