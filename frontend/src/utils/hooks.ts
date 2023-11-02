import { useEffect, useMemo } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { useRouter } from 'next/router'
import { DesiredShift, useGetDesiredShiftsLazyQuery } from '@/graphql/types'

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
    if (typeof id === 'string') {
      return parseInt(id)
    } else {
      return undefined
    }
  }, [router.query])
  return companyId
}

export const useMappedDesiredShifts = (
  companyId: number,
  selectedMonth: Dayjs
) => {
  const [loadDesiredShifts, { data: desiredShiftsData }] =
    useGetDesiredShiftsLazyQuery()

  const desiredShiftsMap = useMemo(() => {
    const map = new Map<number, DesiredShift[]>()
    for (let i = 1; i <= 31; i++) {
      map.set(i, [])
    }
    desiredShiftsData?.desiredShifts.forEach((desiredShift) => {
      const date = dayjs(desiredShift.since)
      if (
        date.year() !== selectedMonth.year() ||
        date.month() !== selectedMonth.month()
      )
        return
      map.get(dayjs(desiredShift.since).date())?.push(desiredShift)
    })
    return map
  }, [desiredShiftsData?.desiredShifts, selectedMonth])

  useEffect(() => {
    if (!companyId) return
    void loadDesiredShifts({ variables: { companyId } })
  }, [companyId, loadDesiredShifts])

  return desiredShiftsMap
}
