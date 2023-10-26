import { ModalFormBox } from '@/components/Common/ModalFormBox'
import { memo, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const DesiredShifts = (): JSX.Element => {
  const [alert, setAlert] = useState('')

  return (
    <div>
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
      <ModalFormBox
        title="希望シフト作成"
        alert={alert}
        targetID="add-desired-shift-modal"
        submitButtonText="作成"
        onSubmit={() => console.log('submit')}
      >
        <div className="row my-3">
          <div className="col-md-3 fw-bold col-form-label">開始時間</div>
          <div className="col-md-9">
            <input type="time" className="form-control" />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md-3 fw-bold col-form-label">終了時間</div>
          <div className="col-md-9">
            <input type="time" className="form-control" />
          </div>
        </div>
      </ModalFormBox>
    </div>
  )
}

export default memo(DesiredShifts)
