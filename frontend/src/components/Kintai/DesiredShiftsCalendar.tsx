import Calendar from 'react-calendar'
import { memo } from 'react'
import AddDesiredShiftsModal from './AddDesiredShiftsModal'

export type DesiredShiftsCalendarProps = {
  alert: string
}

const DesiredShiftsCalendar = ({
  alert,
}: DesiredShiftsCalendarProps): JSX.Element => {
  return (
    <>
      <Calendar
        allowPartialRange
        className={['w-100']}
        tileClassName={['pb-5 px-3']}
        tileContent={({ date, view }) => {
          if (view !== 'month') return <></>
          return (
            <div className="pt-2">
              <button
                className="btn btn-primary btn-sm w-100"
                data-bs-toggle="modal"
                data-bs-target="#add-desired-shift-modal"
              >
                追加
              </button>
            </div>
          )
        }}
      />
      <AddDesiredShiftsModal alert={alert} />
    </>
  )
}

export default memo(DesiredShiftsCalendar)
