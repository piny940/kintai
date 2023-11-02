import { DesiredShift, Worker } from '@/graphql/types'
import dayjs from 'dayjs'
import { memo } from 'react'

export type ShiftItemProps = {
  shift: DesiredShift
  worker?: Worker
  className?: string
}

const ShiftItem = ({
  shift,
  worker,
  className = '',
}: ShiftItemProps): JSX.Element => {
  const renderRange = () => (
    <>
      {dayjs(shift.since).format('HH:mm')} ~ {dayjs(shift.till).format('HH:mm')}
    </>
  )
  return (
    <li className={'small rounded p-1 m-1 ' + className}>
      {worker ? (
        <>
          {worker?.name.firstName}: {renderRange()}
        </>
      ) : (
        <>{renderRange()}</>
      )}
    </li>
  )
}

export default memo(ShiftItem)
