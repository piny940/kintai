import {
  FormEventHandler,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ModalFormBox } from '../Common/ModalFormBox'
import dayjs, { Dayjs } from 'dayjs'
import { toDigit } from '@/utils/helpers'
import {
  GetCompanyShiftsDocument,
  useDeleteShiftMutation,
  useGetCompanyWorkersQuery,
  useUpdateShiftMutation,
} from '@/graphql/types'
import { useApolloClient } from '@apollo/client'
import { useCompanyId } from '@/hooks/calendar'

export type EditShiftsModalProps = {
  targetID: string
  shift: {
    id: number
    since: string
    till: string
    employment: { worker: { id: number } }
  } | null
}

const SINCE_HOUR_OPTIONS = [9, 10, 11, 12, 13, 14, 15, 16, 17]
const TILL_HOUR_OPTIONS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
const MINUTE_OPTIONS = [0, 15, 30, 45]
const EditShiftsModal = ({
  targetID,
  shift,
}: EditShiftsModalProps): JSX.Element => {
  const [sinceHour, setSinceHour] = useState<number>(SINCE_HOUR_OPTIONS[0])
  const [sinceMinute, setSinceMinute] = useState<number>(MINUTE_OPTIONS[0])
  const [tillHour, setTillHour] = useState<number>(TILL_HOUR_OPTIONS[0])
  const [tillMinute, setTillMinute] = useState<number>(MINUTE_OPTIONS[0])
  const [workerId, setWorkerId] = useState<number>()
  const [alert, setAlert] = useState('')
  const companyId = useCompanyId()
  const { data: workersData } = useGetCompanyWorkersQuery({
    variables: { companyId: companyId },
  })
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const [updateShift] = useUpdateShiftMutation()
  const [deleteShift] = useDeleteShiftMutation()
  const client = useApolloClient()

  const _updateShift = useCallback(
    async (id: number, since: Dayjs, till: Dayjs, workerId: number) => {
      try {
        await updateShift({
          variables: {
            id,
            since: since.toISOString(),
            till: till.toISOString(),
            workerId: workerId,
          },
        })
        await client.refetchQueries({ include: [GetCompanyShiftsDocument] })
        closeButtonRef.current?.click()
        setAlert('')
      } catch (error: any) {
        setAlert(error.message)
      }
    },
    [updateShift, client]
  )

  const onSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault()

      if (!shift || !workerId) return
      const since = dayjs(shift.since).hour(sinceHour).minute(sinceMinute)
      const till = dayjs(shift.till).hour(tillHour).minute(tillMinute)
      void _updateShift(shift.id, since, till, workerId)
    },
    [
      shift,
      _updateShift,
      sinceHour,
      sinceMinute,
      tillHour,
      tillMinute,
      workerId,
    ]
  )
  const onDeleteButtonClicked = useCallback(async () => {
    if (!shift) return
    try {
      await deleteShift({ variables: { id: shift.id } })
      await client.refetchQueries({ include: [GetCompanyShiftsDocument] })
      closeButtonRef.current?.click()
      setAlert('')
    } catch (error: any) {
      setAlert(error.message)
    }
  }, [shift, deleteShift, client])

  useEffect(() => {
    setAlert('')

    if (!shift) return
    setSinceHour(dayjs(shift.since).hour())
    setSinceMinute(dayjs(shift.since).minute())
    setTillHour(dayjs(shift.till).hour())
    setTillMinute(dayjs(shift.till).minute())
    setWorkerId(shift.employment.worker.id)
  }, [shift])

  return (
    <ModalFormBox
      title="シフト編集"
      alert={alert}
      targetID={targetID}
      submitButtonText="更新"
      onSubmit={onSubmit}
      closeButtonRef={closeButtonRef}
      anotherButton={
        <button
          className="btn btn-danger col-12 col-lg-6 my-2 offset-lg-3 d-block"
          onClick={onDeleteButtonClicked}
          type="button"
        >
          削除
        </button>
      }
    >
      {shift && (
        <div className="mx-3">
          <h4>
            {dayjs(shift.since).month() + 1}月{dayjs(shift.since).date()}日
          </h4>
          <div className="row my-3">
            <div className="col-md-3 fw-bold col-form-label">従業員</div>
            <div className="col-md-9">
              <select
                className="form-select"
                onChange={(e) => setWorkerId(Number(e.target.value))}
                value={workerId || ''}
              >
                <option value="">--</option>
                {workersData?.companyWorkers?.map((worker) => (
                  <option key={worker.id} value={worker.id}>
                    {worker.name.lastName} {worker.name.firstName}
                  </option>
                ))}
              </select>
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

export default memo(EditShiftsModal)
