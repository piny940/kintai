import dayjs from 'dayjs'
import { memo, useMemo } from 'react'

export type ShiftItemButtonProps = {
  shift: {
    since: string
    till: string
    employment?: { worker: { name: { firstName: string; lastName: string } } }
  }
  className?: string
}

const ShiftItemButton = ({
  shift,
  className = '',
}: ShiftItemButtonProps): JSX.Element => {
  const renderRange = () => (
    <>
      {dayjs(shift.since).format('HH:mm')} ~ {dayjs(shift.till).format('HH:mm')}
    </>
  )
  const workerName = useMemo(() => {
    if (!shift?.employment?.worker) return undefined
    const { lastName } = shift.employment.worker.name
    return `${lastName}`
  }, [shift?.employment?.worker])

  return (
    <button className={'btn d-block small rounded p-1 m-1 ' + className}>
      {workerName ? (
        <>
          {workerName}: {renderRange()}
        </>
      ) : (
        <>{renderRange()}</>
      )}
    </button>
  )
}

export default memo(ShiftItemButton)
