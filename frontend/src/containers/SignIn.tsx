import { useWorkerInfo } from '@/context/WorkerInfoProvider'
import { useLoginMutation } from '@/graphql/types'
import { useRouter } from 'next/router'
import { FormEventHandler, memo, useState } from 'react'

const SignIn = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setWorker } = useWorkerInfo()
  const router = useRouter()
  const [login, { data, error }] = useLoginMutation()

  const submit: FormEventHandler = async (e) => {
    e.preventDefault()

    try {
      await login({
        variables: { email, password },
      })
      setWorker(data?.login || null)
      void router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container">
      <h1>ログイン</h1>
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

export default memo(SignIn)
