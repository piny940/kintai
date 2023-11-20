import DateReport from '@/containers/DateReport'
import LoginRequired from '@/containers/LoginRequired'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

const DateReportShowPage = (): JSX.Element => {
  const router = useRouter()
  const monthStr = router.query.month as string
  const year = Number(monthStr) / 100
  const month = Number(monthStr) % 100
  const date = Number(router.query.date as string)
  return (
    <LoginRequired>
      <DateReport date={dayjs().year(year).month(month).date(date)} />
    </LoginRequired>
  )
}

export default DateReportShowPage
