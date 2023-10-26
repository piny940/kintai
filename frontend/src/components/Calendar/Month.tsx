import { memo } from 'react'
import { Dayjs } from 'dayjs'

export type MonthProps = {
  year: number
  month: number
  datesMatrix: Dayjs[][]
  renderDate?: (date: Dayjs) => JSX.Element
}

const Month = ({
  year,
  month,
  datesMatrix,
  renderDate,
}: MonthProps): JSX.Element => {
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
            <td className="col" key={`${year}-${month}-${date.date()}`}>
              {renderDate ? (
                renderDate(date)
              ) : (
                <span className={textColor(date)}>{date.date()}</span>
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export default memo(Month)
