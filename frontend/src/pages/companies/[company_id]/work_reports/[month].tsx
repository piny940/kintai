import MonthReport from '@/containers/MonthReport'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

const WorkReportShow = (): JSX.Element => {
  const router = useRouter()
  console.log(router)
  const monthStr = router.query.month as string
  console.log(monthStr)
  console.log(Number(monthStr))
  const year = Number(monthStr) / 100
  const month = Number(monthStr) % 100
  return <MonthReport month={dayjs().year(year).month(month)} />
}

export default WorkReportShow
