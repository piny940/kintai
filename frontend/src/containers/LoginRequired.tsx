import { useGetMeQuery } from '@/graphql/types'
import { useRouter } from 'next/router'
import { memo, useEffect } from 'react'

export type LoginRequiredProps = {
  children: React.ReactNode
}

const LoginRequired = ({ children }: LoginRequiredProps): JSX.Element => {
  const { data, loading } = useGetMeQuery()
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/accounts/sign_in') return
    if (loading) return
    if (data?.me) return
    void router.push('/accounts/sign_in')
  }, [data?.me, loading, router])

  if (loading) return <div>loading...</div>
  return <>{children}</>
}

export default memo(LoginRequired)
