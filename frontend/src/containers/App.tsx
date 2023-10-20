import { TestID } from '@/resources/TestID'
import { fetchApi, postData } from '@/utils/api'
import { useEffect } from 'react'

export const App: React.FC = () => {
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
  const currentUser = async () => {
    const res = await fetchApi({
      url: '/workers/me',
      method: 'GET',
    })
    const json = await res.json()
    console.log(json)
  }

  useEffect(() => {
    void login()
    void currentUser()
  })
  return (
    <div id="app" data-testid={TestID.APP}>
      <h1>勤怠プラス+</h1>
    </div>
  )
}
