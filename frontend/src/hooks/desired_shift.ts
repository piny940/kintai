import { DesiredShift, useGetDesiredShiftsLazyQuery } from '@/graphql/types'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useMemo } from 'react'

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
