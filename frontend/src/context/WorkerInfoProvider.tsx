import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  Company,
  useGetCompanyLazyQuery,
  useGetMeLazyQuery,
  Worker,
} from '@/graphql/types'
import { useRouter } from 'next/router'

interface WorkerInfoInterface {
  worker: Worker | null
  company: Company | null
  setCompany: (company: Company | null) => void
  loading: boolean
}

const defaultWorkerInfoState: WorkerInfoInterface = {
  worker: null,
  company: null,
  setCompany: (company: Company | null) => undefined,
  loading: false,
}

const WorkerInfoContext = createContext(defaultWorkerInfoState)

const useWorkerInfo = () => useContext(WorkerInfoContext)

interface WorkerInfoProviderProps {
  children: ReactNode
}

const WorkerInfoProvider: React.FC<WorkerInfoProviderProps> = ({
  children,
}) => {
  const router = useRouter()
  const [company, setCompany] = useState<Company | null>(null)
  const [loadMe, { data: meData, loading: meLoading }] = useGetMeLazyQuery()
  const [loadCompany, { loading: companyLoading }] = useGetCompanyLazyQuery()

  const setCurrentCompany = useCallback(async () => {
    if (!meData?.me) setCompany(null)
    const companyId = router.query.company_id
    if (typeof companyId !== 'string') return
    const { data } = await loadCompany({
      variables: { id: Number(companyId) },
    })
    setCompany((data?.company as Company) || null)
  }, [meData?.me, router.query])

  console.log(meData?.me)
  const _setCompany = useCallback(async (company: Company | null) => {
    console.log(company)
    console.log(meData?.me)
    if (!company || !meData?.me) {
      setCompany(null)
      return
    }

    const { data } = await loadCompany({
      variables: { id: company.id },
    })
    setCompany((data?.company as Company) || null)
  }, [])

  useEffect(() => {
    void loadMe()
  }, [loadMe])

  useEffect(() => {
    void setCurrentCompany()
  }, [setCurrentCompany])

  const value: WorkerInfoInterface = {
    worker: meData?.me || null,
    company: company,
    setCompany: _setCompany,
    loading: meLoading || companyLoading,
  }

  return (
    <WorkerInfoContext.Provider value={value}>
      {children}
    </WorkerInfoContext.Provider>
  )
}

export { useWorkerInfo, WorkerInfoProvider }
