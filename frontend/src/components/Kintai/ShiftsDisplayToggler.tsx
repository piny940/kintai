import ShiftCheckBox from './ShiftCheckBox'
import ShiftItem from './ShiftItem'
import ShiftItemButton from './ShiftItemButton'

export type ShiftsDisplayTogglerProps = {
  showShifts: boolean
  toggleShowShifts: () => void
  showDesiredShifts: boolean
  toggleShowDesiredShifts: () => void
}

const ShiftsDisplayToggler = ({
  showShifts,
  toggleShowShifts,
  showDesiredShifts,
  toggleShowDesiredShifts,
}: ShiftsDisplayTogglerProps): JSX.Element => {
  return (
    <div className="rounded border px-4 py-2 bg-body-tertiary">
      <h2 className="h5 mb-0">表示</h2>
      <div className="row">
        <ShiftCheckBox
          label="希望シフト"
          checked={showDesiredShifts}
          toggle={toggleShowDesiredShifts}
        >
          <ShiftItemButton
            className="btn-outline-info text-body d-inline-block"
            onClick={() => undefined}
            shift={{
              since: '2023-11-10T00:00+09:00',
              till: '2023-11-10T00:00+09:00',
              employment: {
                worker: {
                  name: { firstName: 'xx', lastName: 'xx' },
                },
              },
            }}
          />
        </ShiftCheckBox>
        <ShiftCheckBox
          label="シフト"
          checked={showShifts}
          toggle={toggleShowShifts}
        >
          <ShiftItem
            className="bg-info d-inline-block"
            shift={{
              since: '2023-11-10T00:00+09:00',
              till: '2023-11-10T00:00+09:00',
              employment: {
                worker: {
                  name: { firstName: 'xx', lastName: 'xx' },
                },
              },
            }}
          />
        </ShiftCheckBox>
      </div>
    </div>
  )
}

export default ShiftsDisplayToggler
