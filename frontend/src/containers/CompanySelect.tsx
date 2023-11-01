import { useWorkerInfo } from '@/context/WorkerInfoProvider'
import { useGetCompaniesLazyQuery } from '@/graphql/types'
import { memo, useCallback, useEffect } from 'react'

const SelectCompany = (): JSX.Element => {
  const { worker, company, setCompany } = useWorkerInfo()
  const [loadCompanies, { data }] = useGetCompaniesLazyQuery()

  const onCompanyChange = useCallback(
    (value: string) => {
      if (!data?.companies) return
      const newCompany = data.companies.find((c) => c.id.toString() === value)
      setCompany(newCompany || null)
    },
    [data?.companies, setCompany]
  )

  useEffect(() => {
    if (!worker) return
    void loadCompanies()
  }, [worker, loadCompanies])

  return (
    <select
      name=""
      id=""
      className="form-select"
      value={company?.id || ''}
      onChange={(e) => onCompanyChange(e.target.value)}
    >
      <option value="">--</option>
      {data?.companies?.map((company) => (
        <option key={company.id} value={company.id}>
          {company.name}
        </option>
      ))}
    </select>
  )
}

export default memo(SelectCompany)
