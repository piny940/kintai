import Head from 'next/head'
import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { useTheme } from '@/context/ThemeProvider'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme()

  return (
    <div id="root" data-bs-theme={theme} className="bg-body text-body">
      <Head>
        <title>勤怠プラス+</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="mt-3 mb-5">{children}</main>
    </div>
  )
}
