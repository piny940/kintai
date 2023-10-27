import { memo, useState } from 'react'
import { ModalFormBox } from '../Common/ModalFormBox'
import { Dayjs } from 'dayjs'
import { toDigit } from '@/utils/helpers'

export type AddDesiredShiftsModalProps = {
  alert: string
  targetID: string
  date: Dayjs | null
  addDesiredShift: (since: Dayjs, till: Dayjs) => void
}

const SINCE_HOUR_OPTIONS = [9, 10, 11, 12, 13, 14, 15, 16, 17]
const UNTIL_HOUR_OPTIONS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
const MINUTE_OPTIONS = [0, 15, 30, 45]
const AddDesiredShiftsModal = ({
  alert,
  targetID,
  date,
}: AddDesiredShiftsModalProps): JSX.Element => {
  const [sinceHour, setSinceHour] = useState<number | null>(null)
  const [sinceMinute, setSinceMinute] = useState<number | null>(null)
  const [tillHour, setTillHour] = useState<number | null>(null)
  const [tillMinute, setTillMinute] = useState<number | null>(null)

  return (
    <ModalFormBox
      title="希望シフト作成"
      alert={alert}
      targetID={targetID}
      submitButtonText="作成"
      onSubmit={() => console.log('submit')}
    >
      {date && (
        <div className="mx-3">
          <h4>
            {date.month()}月{date.date()}日
          </h4>
          <div className="row my-3">
            <div className="col-md-3 fw-bold col-form-label">開始時間</div>
            <div className="col-md-9">
              <select
                name=""
                id=""
                className="form-control w-auto d-inline-block"
                onChange={(e) => setSinceHour(Number(e.target.value))}
                value={sinceHour ?? ''}
              >
                {SINCE_HOUR_OPTIONS.map((hour) => (
                  <option value={hour} key={hour}>
                    {toDigit(hour)}
                  </option>
                ))}
              </select>
              :
              <select
                name=""
                id=""
                className="form-control w-auto d-inline-block"
                onChange={(e) => setSinceMinute(Number(e.target.value))}
                value={sinceMinute ?? ''}
              >
                {MINUTE_OPTIONS.map((minute) => (
                  <option value={minute} key={minute}>
                    {toDigit(minute)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-md-3 fw-bold col-form-label">終了時間</div>
            <div className="col-md-9">
              <select
                name=""
                id=""
                className="form-control w-auto d-inline-block"
                onChange={(e) => setTillHour(Number(e.target.value))}
                value={tillHour ?? ''}
              >
                {UNTIL_HOUR_OPTIONS.map((hour) => (
                  <option value={hour} key={hour}>
                    {toDigit(hour)}
                  </option>
                ))}
              </select>
              :
              <select
                name=""
                id=""
                className="form-control w-auto d-inline-block"
                onChange={(e) => setTillMinute(Number(e.target.value))}
                value={tillMinute ?? ''}
              >
                {MINUTE_OPTIONS.map((minute) => (
                  <option value={minute} key={minute}>
                    {toDigit(minute)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </ModalFormBox>
  )
}

export default memo(AddDesiredShiftsModal)
