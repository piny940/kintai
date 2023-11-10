import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Layout } from '../layouts/Layout'
import { useEffect } from 'react'
import { ThemeProvider } from '@/context/ThemeProvider'
import Head from 'next/head'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: `/api/query`,
  cache: new InMemoryCache(),
  credentials: 'include',
})

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('bootstrap')
  }, [])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Head>
          <meta content="width=device-width,initial-scale=1" name="viewport" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp
