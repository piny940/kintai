import { memo } from 'react'

const SignIn = (): JSX.Element => {
  return (
    <div className="container">
      <h1>ログイン</h1>
      <form>
        <label className="form-group row my-2">
          <div className="col-form-label col-md-3">メールアドレス</div>
          <div className="col-md-9">
            <input type="email" className="form-control" />
          </div>
        </label>
        <label className="form-group row my-2">
          <div className="col-form-label col-md-3">パスワード</div>
          <div className="col-md-9">
            <input type="password" className="form-control" />
          </div>
        </label>
        <div className="row my-2">
          <button className="btn btn-primary w-100 d-inline-block">送信</button>
        </div>
      </form>
    </div>
  )
}

export default memo(SignIn)
