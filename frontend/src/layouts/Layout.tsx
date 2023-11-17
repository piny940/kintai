import Head from 'next/head'
import { ReactNode, useEffect } from 'react'
import { Navbar } from './Navbar'
import { useTheme } from '@/context/ThemeProvider'
import { useRouter } from 'next/router'
import { useGetMeQuery } from '@/graphql/types'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data, loading } = useGetMeQuery()
  const { theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/accounts/sign_in') return
    if (loading) return
    if (data?.me) return
    void router.push('/accounts/sign_in')
  }, [data?.me, loading, router])

  if (loading) return <div>Loading...</div>
  return (
    <div id="root" data-bs-theme={theme} className="bg-body text-body">
      <Head>
        <title>勤怠プラス+</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="mt-3 mb-5">
        {loading ? <div>Loading...</div> : children}
      </main>
    </div>
  )
}
