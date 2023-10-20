import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Company, Worker } from '../resources/types'
import { fetchApi } from '@/utils/api'

interface WorkerInfoInterface {
  worker: Worker | null
  company: Company | null
  setWorker: (worker: Worker) => void
  setCompany: (company: Company) => void
  loading: boolean
}

const defaultWorkerInfoState: WorkerInfoInterface = {
  worker: null,
  company: null,
  setWorker: (worker: Worker) => undefined,
  setCompany: (company: Company) => undefined,
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

  const value: WorkerInfoInterface = {
    worker,
    company,
    setWorker,
    setCompany,
    loading,
  }

  const setCurrentUser = async () => {
    const res = await fetchApi({
      url: '/workers/me',
      method: 'GET',
    })
    const json = await res.json()
    setWorker(json.worker || null)
    setLoading(false)
  }

  useEffect(() => {
    void setCurrentUser()
  }, [])

  return (
    <WorkerInfoContext.Provider value={value}>
      {children}
    </WorkerInfoContext.Provider>
  )
}

export { useWorkerInfo, WorkerInfoProvider }
