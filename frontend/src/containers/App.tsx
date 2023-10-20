import { useWorkerInfo } from '@/context/WorkerInfoProvider'
import { TestID } from '@/resources/TestID'
import { Company } from '@/resources/types'
import { getData } from '@/utils/api'
import { useCallback, useEffect, useState } from 'react'

export const App: React.FC = () => {
  const { worker } = useWorkerInfo()
  const [companies, setCompanies] = useState<Company[]>([])

  const fetchCompanies = useCallback(async () => {
    const [_, json] = await getData('/member/companies')
    setCompanies(json.companies)
    console.log(json.companies)
  }, [worker])

  useEffect(() => {
    if (!worker) return
    void fetchCompanies()
  }, [worker, fetchCompanies])

  return (
    <div id="app" data-testid={TestID.APP}>
      <h1>勤怠プラス+</h1>
    </div>
  )
}
