import { useLoginMutation } from '@/graphql/types'
import { useApolloClient } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEventHandler, memo, useState } from 'react'

const SignUp = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const client = useApolloClient()
  const router = useRouter()
  const [login, { error }] = useLoginMutation()

  const submit: FormEventHandler = async (e) => {
    e.preventDefault()

    try {
      await login({
        variables: { email, password },
      })
      await client.resetStore()
      void router.push('/')
    } catch {}
  }

  return (
    <div className="container">
      <h1>ユーザー作成</h1>
      <form onSubmit={submit}>
        <label className="form-group row my-2">
          <div className="col-form-label col-md-3">メールアドレス</div>
          <div className="col-md-9">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
            />
          </div>
        </label>
        <label className="form-group row my-2">
          <div className="col-form-label col-md-3">パスワード</div>
          <div className="col-md-9">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
        </label>

        {error && (
          <div className="row mb-2">
            <div className="col-md-9 offset-md-3 text-danger">
              {error.message}
            </div>
          </div>
        )}
        <div className="">
          <Link href="/accounts/sign_in" className="py-0">
            &gt;アカウントをすでにお持ちの場合はこちら
          </Link>
        </div>
        <div className="row my-2">
          <button
            type="submit"
            className="btn btn-primary w-100 d-inline-block"
          >
            送信
          </button>
        </div>
      </form>
    </div>
  )
}

export default memo(SignUp)
