import { ReactNode, RefObject } from 'react'
import { toClass } from '../../utils/helpers'

export interface ModalProps {
  targetID: string
  children: ReactNode
  closeButtonRef?: RefObject<HTMLButtonElement>
  title?: string
  scrollable?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  targetID,
  children,
  title,
  scrollable = true,
  closeButtonRef,
}) => {
  return (
    <div className="modal fade" id={targetID}>
      <div
        className={toClass(
          'modal-dialog modal-dialog-centered modal-lg',
          scrollable ? 'modal-dialog-scrollable' : ''
        )}
      >
        <div className="modal-content">
          <div className="modal-header">
            {title ? <h5 className="modal-title">{title}</h5> : <></>}
            <button
              className="btn btn-close"
              data-bs-dismiss="modal"
              ref={closeButtonRef}
            />
          </div>
          <div className="modal-body p-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
