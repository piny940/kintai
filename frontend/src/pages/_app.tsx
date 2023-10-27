import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Layout } from '../layouts/Layout'
import { useEffect } from 'react'
import { ThemeProvider } from '@/context/ThemeProvider'
import Head from 'next/head'
import { WorkerInfoProvider } from '@/context/WorkerInfoProvider'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('bootstrap')
  }, [])

  return (
    <WorkerInfoProvider>
      <ThemeProvider>
        <Head>
          <meta content="width=device-width,initial-scale=1" name="viewport" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </WorkerInfoProvider>
  )
}

export default MyApp
