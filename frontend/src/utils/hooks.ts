import { useMemo, useState } from 'react'
import dayjs from 'dayjs'

export const useCalendar = (start: Date) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs(start))
  const { year, month, datesMatrix } = useMemo(() => {
    const year = selectedMonth.year()
    const month = selectedMonth.month()
    const first = selectedMonth.startOf('month')
    const last = selectedMonth.endOf('month')

    let currentDate = 1 - first.date()
    const datesMatrix = []
    while (currentDate <= last.date()) {
      datesMatrix.push(
        Array(7)
          .fill(0)
          .map(() => {
            const date = dayjs().year(year).month(month).date(currentDate)
            currentDate++
            return date
          })
      )
    }

    return { year, month, first, last, datesMatrix }
  }, [selectedMonth])

  const goNextMonth = () => setSelectedMonth(selectedMonth.add(1, 'month'))
  const goPrevMonth = () => setSelectedMonth(selectedMonth.subtract(1, 'month'))

  return { year, month, datesMatrix, goNextMonth, goPrevMonth }
}
