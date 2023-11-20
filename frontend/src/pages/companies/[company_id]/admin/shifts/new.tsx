import LoginRequired from '@/containers/LoginRequired'
import NewShifts from '@/containers/NewShifts'

const NewShiftsPage = (): JSX.Element => {
  return (
    <LoginRequired>
      <NewShifts />
    </LoginRequired>
  )
}

export default NewShiftsPage
