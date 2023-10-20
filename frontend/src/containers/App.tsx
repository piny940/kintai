import { useWorkerInfo } from '@/context/WorkerInfoProvider'
import { TestID } from '@/resources/TestID'
import { Company } from '@/resources/types'
import { getData } from '@/utils/api'
import { useCallback, useEffect, useState } from 'react'

export const App: React.FC = () => {
  const { worker, company, setCompany } = useWorkerInfo()
  const [companies, setCompanies] = useState<Company[]>([])

  const fetchCompanies = useCallback(async () => {
    const json = (await getData('/member/companies'))[1]
    setCompanies(json.companies)
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
    <div id="app" data-testid={TestID.APP}>
      <h1>勤怠プラス+</h1>
      <div className="container">
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
      </div>
    </div>
  )
}
