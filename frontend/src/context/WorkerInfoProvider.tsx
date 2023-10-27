import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Company, Worker } from '../resources/types'
import { fetchApi } from '@/utils/api'
import { useRouter } from 'next/router'

interface WorkerInfoInterface {
  worker: Worker | null
  company: Company | null
  setWorker: (worker: Worker | null) => void
  setCompany: (company: Company | null) => void
  loading: boolean
}

const defaultWorkerInfoState: WorkerInfoInterface = {
  worker: null,
  company: null,
  setWorker: (worker: Worker | null) => undefined,
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
  const [worker, setWorker] = useState<Worker | null>(null)
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  const value: WorkerInfoInterface = {
    worker,
    company,
    setWorker,
    setCompany,
    loading,
  }

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
    const res = await fetchApi({
      url: `/member/companies/${companyId}`,
      method: 'GET',
    })
    const json = await res.json()
    setCompany(json.company || null)
  }, [worker, router.query])

  useEffect(() => {
    void setCurrentUser()
  }, [setCurrentUser])

  useEffect(() => {
    void setCurrentCompany()
  }, [setCurrentCompany])

  return (
    <WorkerInfoContext.Provider value={value}>
      {children}
    </WorkerInfoContext.Provider>
  )
}

export { useWorkerInfo, WorkerInfoProvider }
