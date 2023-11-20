import type { NextPage } from 'next'
import { App } from '../containers/App'
import LoginRequired from '@/containers/LoginRequired'

const Home: NextPage = () => {
  return (
    <LoginRequired>
      <App />
    </LoginRequired>
  )
}

export default Home
