import YearReport from '@/components/Kintai/YearReport'
import { useGetCompanyQuery } from '@/graphql/types'
import { useCompanyId } from '@/hooks/calendar'
import Error from 'next/error'
import { memo, useState } from 'react'

const YEAR_LIST = (() => {
  const years = []
  for (let i = 2021; i <= new Date().getFullYear(); i++) {
    years.push(i)
  }
  return years
})()
const YearReports = (): JSX.Element => {
  const companyId = useCompanyId()
  const { data: companyData, error } = useGetCompanyQuery({
    variables: { id: companyId },
  })
  const [year, setYear] = useState<number>(new Date().getFullYear())

  if (error) return <Error statusCode={404} />
  if (!companyData?.company) return <>loading...</>
  return (
    <div>
      <h1>勤務実績 - {companyData.company.name}</h1>
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
      <YearReport year={year} />
    </div>
  )
}

export default memo(YearReports)
