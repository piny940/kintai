import { useWorkerInfo } from '@/context/WorkerInfoProvider'
import { TestID } from '@/resources/TestID'
import { useEffect } from 'react'

export const App: React.FC = () => {
  const { worker, loading } = useWorkerInfo()

  useEffect(() => {
    if (loading) return
    if (worker) return
    console.log('ログインしてください')
  }, [worker, loading])

  if (loading) return <div>Loading...</div>
  return (
    <div id="app" data-testid={TestID.APP}>
      <h1>勤怠プラス+</h1>
    </div>
  )
}
