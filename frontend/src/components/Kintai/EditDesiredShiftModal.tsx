import { FormEventHandler, memo, useCallback, useState } from 'react'
import { ModalFormBox } from '../Common/ModalFormBox'
import dayjs, { Dayjs } from 'dayjs'
import { toDigit } from '@/utils/helpers'
import {
  GetDesiredShiftsDocument,
  useCreateDesiredShiftMutation,
} from '@/graphql/types'
import { useApolloClient } from '@apollo/client'
import { useCompanyId } from '@/hooks/calendar'

export type EditDesiredShiftsModalProps = {
  targetID: string
  desiredShift: { id: number; since: string; till: string } | null
}

const SINCE_HOUR_OPTIONS = [9, 10, 11, 12, 13, 14, 15, 16, 17]
const TILL_HOUR_OPTIONS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
const MINUTE_OPTIONS = [0, 15, 30, 45]
const EditDesiredShiftsModal = ({
  targetID,
  desiredShift,
}: EditDesiredShiftsModalProps): JSX.Element => {
  const [sinceHour, setSinceHour] = useState<number>(SINCE_HOUR_OPTIONS[0])
  const [sinceMinute, setSinceMinute] = useState<number>(MINUTE_OPTIONS[0])
  const [tillHour, setTillHour] = useState<number>(TILL_HOUR_OPTIONS[0])
  const [tillMinute, setTillMinute] = useState<number>(MINUTE_OPTIONS[0])

  const companyId = useCompanyId()
  const [createDesiredShift, { error: desiredShiftError }] =
    useCreateDesiredShiftMutation()
  const client = useApolloClient()

  const postDesiredShift = useCallback(
    async (since: Dayjs, till: Dayjs) => {
      if (!companyId) return
      try {
        await createDesiredShift({
          variables: {
            companyId,
            since: since.toISOString(),
            till: till.toISOString(),
          },
        })
        await client.refetchQueries({ include: [GetDesiredShiftsDocument] })
      } catch {}
    },
    [companyId, createDesiredShift, client]
  )

  const onSubmit: FormEventHandler = useCallback((e) => {
    e.preventDefault()
  }, [])

  return (
    <ModalFormBox
      title="希望シフト作成"
      alert={desiredShiftError?.message || ''}
      targetID={targetID}
      submitButtonText="作成"
      onSubmit={onSubmit}
    >
      {desiredShift && (
        <div className="mx-3">
          <h4>
            {dayjs(desiredShift.since).month()}月
            {dayjs(desiredShift.since).date()}日
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

export default memo(EditDesiredShiftsModal)
