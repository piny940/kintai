import { useMemo } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { useRouter } from 'next/router'

export const useCalendar = ({
  yearMonth,
  setYearMonth,
}: {
  yearMonth: Dayjs
  setYearMonth: (yearMonth: Dayjs) => void
}) => {
  const { year, month, datesMatrix } = useMemo(() => {
    const year = yearMonth.year()
    const month = yearMonth.month()
    const first = yearMonth.startOf('month')
    const last = yearMonth.endOf('month')

    let currentDate = 1 - first.day()
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
  }, [yearMonth])

  const goNextMonth = () => setYearMonth(yearMonth.add(1, 'month'))
  const goPrevMonth = () => setYearMonth(yearMonth.subtract(1, 'month'))

  return { year, month, datesMatrix, goNextMonth, goPrevMonth }
}

export const useCompanyId = () => {
  const router = useRouter()

  const companyId = useMemo(() => {
    const { company_id: id } = router.query
    return parseInt(id as string)
  }, [router.query])
  return companyId
}
