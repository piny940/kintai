import { FormEventHandler, memo, useCallback, useEffect, useState } from 'react'
import { ModalFormBox } from '../Common/ModalFormBox'
import dayjs, { Dayjs } from 'dayjs'
import { toDigit } from '@/utils/helpers'

export type AddShiftsModalProps = {
  alert: string
  targetID: string
  date: Dayjs | null
  addShift: (since: Dayjs, till: Dayjs) => void
  selectedDesiredShift: { id: number; since: string; till: string } | null
}

const SINCE_HOUR_OPTIONS = [9, 10, 11, 12, 13, 14, 15, 16, 17]
const TILL_HOUR_OPTIONS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
const MINUTE_OPTIONS = [0, 15, 30, 45]
const AddShiftsModal = ({
  alert,
  targetID,
  date,
  addShift,
  selectedDesiredShift,
}: AddShiftsModalProps): JSX.Element => {
  const [sinceHour, setSinceHour] = useState<number>(SINCE_HOUR_OPTIONS[0])
  const [sinceMinute, setSinceMinute] = useState<number>(MINUTE_OPTIONS[0])
  const [tillHour, setTillHour] = useState<number>(TILL_HOUR_OPTIONS[0])
  const [tillMinute, setTillMinute] = useState<number>(MINUTE_OPTIONS[0])

  const onSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault()

      if (!date) return
      const since = date.hour(sinceHour).minute(sinceMinute)
      const till = date.hour(tillHour).minute(tillMinute)
      addShift(since, till)
    },
    [date, sinceHour, sinceMinute, tillHour, tillMinute, addShift]
  )

  useEffect(() => {
    if (!selectedDesiredShift) {
      setSinceHour(SINCE_HOUR_OPTIONS[0])
      setSinceMinute(MINUTE_OPTIONS[0])
      setTillHour(TILL_HOUR_OPTIONS[0])
      setTillMinute(MINUTE_OPTIONS[0])
      return
    }
    const since = dayjs(selectedDesiredShift.since)
    const till = dayjs(selectedDesiredShift.till)
    setSinceHour(since.hour())
    setSinceMinute(since.minute())
    setTillHour(till.hour())
    setTillMinute(till.minute())
  }, [selectedDesiredShift])

  return (
    <ModalFormBox
      title="シフト作成"
      alert={alert}
      targetID={targetID}
      submitButtonText="作成"
      onSubmit={onSubmit}
    >
      {date && (
        <div className="mx-3">
          <h4>
            {date.month()}月{date.date()}日
          </h4>
          <div className="row my-3">
            <div className="col-md-3 fw-bold col-form-label">従業員</div>
            <div className="col-md-9">
              <select className="form-select"></select>
            </div>
          </div>
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
                {TILL_HOUR_OPTIONS.map((hour) => (
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

export default memo(AddShiftsModal)
