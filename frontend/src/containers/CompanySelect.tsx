import { useWorkerInfo } from '@/context/WorkerInfoProvider'
import { Company, CompanyJSON } from '@/resources/types'
import { getData } from '@/utils/api'
import dayjs from 'dayjs'
import { memo, useCallback, useEffect, useState } from 'react'

const SelectCompany = (): JSX.Element => {
  const { worker, company, setCompany } = useWorkerInfo()
  const [companies, setCompanies] = useState<Company[]>([])

  const fetchCompanies = useCallback(async () => {
    const json = (await getData('/member/companies'))[1] as {
      companies: CompanyJSON[]
    }
    const companies: Company[] = json.companies.map((c) => ({
      ...c,
      created_at: dayjs(c.created_at),
      updated_at: dayjs(c.updated_at),
    }))
    setCompanies(companies)
  }, [worker])

  const onCompanyChange = useCallback(
    (value: string) => {
      const newCompany = companies.find((c) => c.id.toString() === value)
      setCompany(newCompany || null)
    },
    [companies, setCompany]
  )

  useEffect(() => {
    if (!worker) return
    void fetchCompanies()
  }, [worker, fetchCompanies])

  return (
    <select
      name=""
      id=""
      className="form-select"
      value={company?.id || ''}
      onChange={(e) => onCompanyChange(e.target.value)}
    >
      <option value="">--</option>
      {companies.map((company) => (
        <option key={company.id} value={company.id}>
          {company.name}
        </option>
      ))}
    </select>
  )
}

export default memo(SelectCompany)
