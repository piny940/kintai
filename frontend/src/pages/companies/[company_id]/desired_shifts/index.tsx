import DesiredShifts from '@/containers/DesiredShifts'
import LoginRequired from '@/containers/LoginRequired'

const DesiredShiftsPage = (): JSX.Element => {
  return (
    <LoginRequired>
      <DesiredShifts />
    </LoginRequired>
  )
}

export default DesiredShiftsPage
