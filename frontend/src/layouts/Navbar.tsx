import { MaterialIcon } from '@/components/Common/MaterialIcon'
import { ThemeToggler } from '@/components/Common/ThemeToggler'
import { useTheme } from '@/context/ThemeProvider'
import { useGetMeQuery } from '@/graphql/types'
import { TestID } from '@/resources/TestID'
import Link from 'next/link'
import { useCallback } from 'react'

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const { data } = useGetMeQuery()

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme])

  const logout = useCallback(async () => {
    // await fetchApi({
    //   url: '/session',
    //   method: 'DELETE',
    // })
    // setWorker(null)
    // void router.push('/')
  }, [])

  return (
    <nav
      data-testid={TestID.NAVBAR}
      className={
        'navbar navbar-expand-lg ' +
        (theme === 'light' ? 'navbar-light bg-light ' : 'navbar-dark bg-dark')
      }
    >
      <div className="container-fluid px-5">
        <Link
          href="/"
          className="title fw-bold d-flex align-items-center text-body"
        >
          <span className="ms-2">勤怠プラス+</span>
        </Link>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-collapse-target"
          aria-label="ヘッダーの隠された要素を表示"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar-collapse-target">
          <div className="d-flex justify-content-end navbar-nav w-100 mx-3">
            <ul className="navbar-nav">
              {data?.me && (
                <li className="nav-item">
                  <div className="nav-link">
                    <button role="button" onClick={logout}>
                      ログアウト
                    </button>
                  </div>
                </li>
              )}
              <li className="nav-item d-none d-lg-block">
                <div className="nav-link p-0">
                  <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
                </div>
              </li>
              <li className="nav-item d-lg-none">
                <button
                  onClick={toggleTheme}
                  className="nav-link d-flex align-items-center"
                >
                  {theme === 'light' ? (
                    <>
                      <MaterialIcon className="me-1" name="light_mode" />
                      ライトモード
                    </>
                  ) : (
                    <>
                      <MaterialIcon className="me-1" name="dark_mode" />
                      ダークモード
                    </>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
