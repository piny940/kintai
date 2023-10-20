import { useWorkerInfo } from '@/context/WorkerInfoProvider'
import { TestID } from '@/resources/TestID'
import { fetchApi, postData } from '@/utils/api'
import { useEffect } from 'react'

export const App: React.FC = () => {
  const { worker, company, setWorker } = useWorkerInfo()

  const login = async () => {
    const json = await postData({
      url: '/sessions',
      data: {
        email: 'foo1@example.com',
        password: 'password',
      },
    })
    console.log(json)
  }
  console.log(worker)
  useEffect(() => {
    // void login()
  })
  return (
    <div id="app" data-testid={TestID.APP}>
      <h1>勤怠プラス+</h1>
    </div>
  )
}
