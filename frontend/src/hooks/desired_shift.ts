import {
  useGetCompanyDesiredShiftsLazyQuery,
  useGetDesiredShiftsLazyQuery,
} from '@/graphql/types'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useMemo } from 'react'

const mapShifts = <T extends { since: string }>(
  shifts: T[],
  selectedMonth: Dayjs
) => {
  const map = new Map<number, T[]>()
  for (let i = 1; i <= 31; i++) {
    map.set(i, [])
  }
  shifts.forEach((shift) => {
    const date = dayjs(shift.since)
    if (
      date.year() !== selectedMonth.year() ||
      date.month() !== selectedMonth.month()
    )
      return

    map.get(dayjs(shift.since).date())?.push(shift)
  })
  return map
}

export const useMappedDesiredShifts = (
  companyId: number,
  selectedMonth: Dayjs
) => {
  const [loadDesiredShifts, { data: desiredShiftsData }] =
    useGetDesiredShiftsLazyQuery()

  const desiredShiftsMap = useMemo(() => {
    return mapShifts(desiredShiftsData?.desiredShifts || [], selectedMonth)
  }, [desiredShiftsData?.desiredShifts, selectedMonth])

  useEffect(() => {
    if (!companyId) return
    void loadDesiredShifts({
      variables: {
        companyId,
        fromTime: selectedMonth.startOf('month').toISOString(),
        toTime: selectedMonth.endOf('month').toISOString(),
      },
    })
  }, [companyId, loadDesiredShifts, selectedMonth])

  return desiredShiftsMap
}
export const useMappedCompanyDesiredShifts = (
  companyId: number,
  selectedMonth: Dayjs
) => {
  const [loadDesiredShifts, { data: desiredShiftsData }] =
    useGetCompanyDesiredShiftsLazyQuery()

  const desiredShiftsMap = useMemo(() => {
    return mapShifts(
      desiredShiftsData?.companyDesiredShifts || [],
      selectedMonth
    )
  }, [desiredShiftsData?.companyDesiredShifts, selectedMonth])

  useEffect(() => {
    if (!companyId) return
    void loadDesiredShifts({
      variables: {
        companyId,
        fromTime: selectedMonth.startOf('month').toISOString(),
        toTime: selectedMonth.endOf('month').toISOString(),
      },
    })
  }, [companyId, loadDesiredShifts, selectedMonth])

  return desiredShiftsMap
}
