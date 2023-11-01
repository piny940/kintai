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
  useGetCompanyQuery,
  useGetMeQuery,
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
  const [companyId, setCompanyId] = useState<number | null>(null)
  const router = useRouter()
  const { data: meData, loading: meLoading } = useGetMeQuery()
  const { data: companyData, loading: companyLoading } = useGetCompanyQuery({
    variables: { id: companyId },
  })

  const setCurrentCompany = useCallback(async () => {
    if (!meData?.me) return
    const companyId = router.query.company_id
    if (typeof companyId !== 'string') return
    setCompanyId(Number(companyId))
  }, [meData?.me, router.query])

  const _setCompany = useCallback(async (company: Company | null) => {
    setCompanyId(company?.id || null)
  }, [])

  useEffect(() => {
    void setCurrentCompany()
  }, [setCurrentCompany])

  const value: WorkerInfoInterface = {
    worker: meData?.me || null,
    company: (companyData?.company as Company) || null,
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
