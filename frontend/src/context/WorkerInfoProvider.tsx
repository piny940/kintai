import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Company, Employment, Worker } from '../graphql/types'
import { fetchApi, fetchCompany } from '@/utils/api'
import { useRouter } from 'next/router'

interface WorkerInfoInterface {
  worker: Worker | null
  company: Company | null
  setWorker: (worker: Worker | null) => void
  setCompany: (company: Company | null) => void
  employment: Employment | null
  loading: boolean
}

const defaultWorkerInfoState: WorkerInfoInterface = {
  worker: null,
  company: null,
  setWorker: (worker: Worker | null) => undefined,
  setCompany: (company: Company | null) => undefined,
  employment: null,
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
  const [worker, setWorker] = useState<Worker | null>(null)
  const [company, setCompany] = useState<Company | null>(null)
  const [employment, setEmployment] = useState<Employment | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  const setCurrentUser = useCallback(async () => {
    const res = await fetchApi({
      url: '/workers/me',
      method: 'GET',
    })
    const json = await res.json()
    setWorker(json.worker || null)
    setLoading(false)
  }, [])

  const setCurrentCompany = useCallback(async () => {
    if (!worker) return
    const companyId = router.query.company_id
    if (typeof companyId !== 'string') return
    const { company, employment } = await fetchCompany(Number(companyId))
    setCompany(company)
    setEmployment(employment)
  }, [worker, router.query])

  const _setCompany = useCallback(async (company: Company | null) => {
    setCompany(company)
    if (!company) {
      setEmployment(null)
      return
    }
    const { employment } = await fetchCompany(company.id)
    setEmployment(employment)
  }, [])

  useEffect(() => {
    void setCurrentUser()
  }, [setCurrentUser])

  useEffect(() => {
    void setCurrentCompany()
  }, [setCurrentCompany])

  const value: WorkerInfoInterface = {
    worker,
    company,
    setWorker,
    setCompany: _setCompany,
    employment,
    loading,
  }

  return (
    <WorkerInfoContext.Provider value={value}>
      {children}
    </WorkerInfoContext.Provider>
  )
}

export { useWorkerInfo, WorkerInfoProvider }
