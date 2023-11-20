import LoginRequired from '@/containers/LoginRequired'
import YearReport from '@/containers/YearReports'

const WorkReportsPage = (): JSX.Element => {
  return (
    <LoginRequired>
      <YearReport />
    </LoginRequired>
  )
}

export default WorkReportsPage
