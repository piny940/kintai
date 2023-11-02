import { Worker } from '@/graphql/types'
import dayjs from 'dayjs'
import { memo } from 'react'

export type ShiftItemButtonProps = {
  shift: { since: string; till: string }
  worker?: Worker
  className?: string
}

const ShiftItemButton = ({
  shift,
  worker,
  className = '',
}: ShiftItemButtonProps): JSX.Element => {
  const renderRange = () => (
    <>
      {dayjs(shift.since).format('HH:mm')} ~ {dayjs(shift.till).format('HH:mm')}
    </>
  )
  return (
    <button className={'btn d-block small rounded p-1 m-1 ' + className}>
      {worker ? (
        <>
          {worker?.name.firstName}: {renderRange()}
        </>
      ) : (
        <>{renderRange()}</>
      )}
    </button>
  )
}

export default memo(ShiftItemButton)
