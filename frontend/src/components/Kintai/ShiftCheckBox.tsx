import { memo } from 'react'

export type ShiftCheckBoxProps = {
  checked: boolean
  toggle: () => void
  children: React.ReactNode
  label: string
}

const ShiftCheckBox = ({
  checked,
  toggle,
  children,
  label,
}: ShiftCheckBoxProps): JSX.Element => {
  return (
    <div className="col col-lg-4 my-1">
      <label className="form-check d-flex align-items-center">
        <input
          type="checkbox"
          className="form-check-input"
          checked={checked}
          onChange={toggle}
        />
        <div className="form-check-label d-flex flex-wrap align-items-center">
          <span className="mx-2">{label}</span>
          <div className="position-relative">
            <div className="position-absolute w-100 h-100"></div>
            {children}
          </div>
        </div>
      </label>
    </div>
  )
}

export default memo(ShiftCheckBox)
