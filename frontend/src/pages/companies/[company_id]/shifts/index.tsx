import LoginRequired from '@/containers/LoginRequired'
import Shifts from '@/containers/Shifts'

const ShiftsIndexPage = (): JSX.Element => {
  return (
    <LoginRequired>
      <Shifts />
    </LoginRequired>
  )
}

export default ShiftsIndexPage
