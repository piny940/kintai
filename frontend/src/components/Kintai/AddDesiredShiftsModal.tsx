import { memo } from 'react'
import { ModalFormBox } from '../Common/ModalFormBox'

export type AddDesiredShiftsModalProps = {
  alert: string
  targetID: string
}

const AddDesiredShiftsModal = ({
  alert,
  targetID,
}: AddDesiredShiftsModalProps): JSX.Element => {
  return (
    <ModalFormBox
      title="希望シフト作成"
      alert={alert}
      targetID={targetID}
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
  )
}

export default memo(AddDesiredShiftsModal)
