import { useGetCompanyLazyQuery } from '@/graphql/types'
import { useCompanyId } from '@/hooks/calendar'
import Error from 'next/error'
import { memo, useEffect, useState } from 'react'

const YEAR_LIST = [2021, 2022, 2023]
const YearReports = (): JSX.Element => {
  const companyId = useCompanyId()
  const [loadCompany, { data: companyData, error }] = useGetCompanyLazyQuery()
  const [year, setYear] = useState<number>(new Date().getFullYear())

  useEffect(() => {
    if (!companyId) return
    void loadCompany({ variables: { id: companyId } })
  }, [companyId, loadCompany])

  if (error) return <Error statusCode={404} />
  if (!companyData?.company) return <>loading...</>
  return (
    <div>
      <h1>勤務実績</h1>
      <p>
        <select
          className="form-select"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {YEAR_LIST.map((year) => (
            <option key={year} value={year}>
              {year}年
            </option>
          ))}
        </select>
      </p>
    </div>
  )
}

export default memo(YearReports)
