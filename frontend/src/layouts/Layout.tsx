import Head from 'next/head'
import { ReactNode, useEffect } from 'react'
import { Navbar } from './Navbar'
import { useTheme } from '@/context/ThemeProvider'
import { useWorkerInfo } from '@/context/WorkerInfoProvider'
import { useRouter } from 'next/router'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { worker, loading } = useWorkerInfo()
  const { theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (worker) return
    void router.push('/accounts/sign_in')
  }, [worker, loading, router.asPath])

  if (loading) return <div>Loading...</div>
  return (
    <div data-bs-theme={theme} className="bg-body text-body">
      <Head>
        <title>勤怠プラス+</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="mt-3">{loading ? <div>Loading...</div> : children}</main>
    </div>
  )
}
