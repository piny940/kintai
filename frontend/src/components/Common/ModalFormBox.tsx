import { FormEventHandler, ReactNode, RefObject } from 'react'
import { TestID } from '../../resources/TestID'
import { Modal } from './Modal'

export interface ModalFormBoxProps {
  targetID: string
  onSubmit: FormEventHandler
  title: string
  alert: string
  submitTestID?: TestID
  submitButtonText: string
  children: ReactNode
  closeButtonRef?: RefObject<HTMLButtonElement>
  anotherButton?: ReactNode
}

export const ModalFormBox: React.FC<ModalFormBoxProps> = ({
  targetID,
  children,
  onSubmit,
  title,
  alert,
  submitTestID,
  submitButtonText,
  closeButtonRef,
  anotherButton,
}) => {
  return (
    <Modal targetID={targetID} closeButtonRef={closeButtonRef}>
      <form onSubmit={onSubmit} className="container p-5">
        <h3 className="h2 ms-2 mb-4">{title}</h3>
        {alert ? <div className="text-danger">{alert}</div> : <></>}
        {children}
        <button
          className="btn btn-primary col-12 col-lg-6 mt-4 mb-2 offset-lg-3 d-block"
          data-testid={submitTestID}
        >
          {submitButtonText}
        </button>
        {anotherButton}
        <button
          className="btn btn-secondary col-12 col-lg-6 my-2 offset-lg-3 d-block"
          data-bs-dismiss="modal"
          onClick={(e) => e.preventDefault()}
        >
          キャンセル
        </button>
      </form>
    </Modal>
  )
}
