import { DesiredShift } from '@/resources/types'
import { memo } from 'react'

export type ShiftItemProps = {
  shift: DesiredShift
}

const ShiftItem = ({ shift }: ShiftItemProps): JSX.Element => {
  return (
    <li className="small">
      {shift.since.format('HH:mm')} ~ {shift.till.format('HH:mm')}
    </li>
  )
}

export default memo(ShiftItem)
