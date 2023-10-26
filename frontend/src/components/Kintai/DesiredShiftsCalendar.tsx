import { memo } from 'react'
import AddDesiredShiftsModal from './AddDesiredShiftsModal'
import styles from '@/styles/DesiredShifts.module.scss'
import Calendar from '../Calendar/Calendar'

export type DesiredShiftsCalendarProps = {
  alert: string
}

const DesiredShiftsCalendar = ({
  alert,
}: DesiredShiftsCalendarProps): JSX.Element => {
  return (
    <>
      <Calendar />
      <AddDesiredShiftsModal alert={alert} />
    </>
  )
}

export default memo(DesiredShiftsCalendar)
