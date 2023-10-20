import { createContext, ReactNode, useContext, useState } from 'react'
import { Company, Worker } from '../resources/types'

interface WorkerInfoInterface {
  worker: Worker | null
  company: Company | null
  setWorker: (worker: Worker) => void
  setCompany: (company: Company) => void
}

const defaultWorkerInfoState: WorkerInfoInterface = {
  worker: null,
  company: null,
  setWorker: (worker: Worker) => undefined,
  setCompany: (company: Company) => undefined,
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

  const value: WorkerInfoInterface = {
    worker,
    company,
    setWorker,
    setCompany,
  }

  return (
    <WorkerInfoContext.Provider value={value}>
      {children}
    </WorkerInfoContext.Provider>
  )
}

export { useWorkerInfo, WorkerInfoProvider }
