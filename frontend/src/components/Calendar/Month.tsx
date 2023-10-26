import { memo } from 'react'
import { Dayjs } from 'dayjs'

export type MonthProps = {
  year: number
  month: number
  datesMatrix: Dayjs[][]
}

const Month = ({ year, month, datesMatrix }: MonthProps): JSX.Element => {
  const textColor = (date: Dayjs): string => {
    if (date.month() !== month) {
      return 'text-secondary'
    }
    if (date.day() === 0) {
      return 'text-danger'
    }
    return ''
  }

  return (
    <>
      {datesMatrix.map((dates, idx) => (
        <tr className="row row-cols-7" key={`${year}-${month}-${idx}`}>
          {dates.map((date) => (
            <td
              className={'col pb-5 ' + textColor(date)}
              key={`${year}-${month}-${date.date()}`}
            >
              {date.date()}
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export default memo(Month)
