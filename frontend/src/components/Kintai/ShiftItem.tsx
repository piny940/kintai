import dayjs from 'dayjs'
import { memo, useMemo } from 'react'

export type ShiftItemProps = {
  shift: {
    since: string
    till: string
    employment?: { worker: { name: { firstName: string; lastName: string } } }
  }
  className?: string
}

const ShiftItem = ({ shift, className = '' }: ShiftItemProps): JSX.Element => {
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
    <div className={'small rounded p-1 m-1 w-100 text-start ' + className}>
      {workerName ? (
        <>
          {workerName}: {renderRange()}
        </>
      ) : (
        <>{renderRange()}</>
      )}
    </div>
  )
}

export default memo(ShiftItem)
