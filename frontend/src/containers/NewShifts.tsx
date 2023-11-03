import NewShiftCalendar from '@/components/Kintai/NewShiftCalendar'
import ShiftItem from '@/components/Kintai/ShiftItem'
import ShiftItemButton from '@/components/Kintai/ShiftItemButton'
import { useGetCompanyLazyQuery } from '@/graphql/types'
import { useCompanyId } from '@/hooks/calendar'
import dayjs, { Dayjs } from 'dayjs'
import Error from 'next/error'
import { memo, useEffect, useState } from 'react'

const ADD_SHIFTS_MODAL_ID = 'add-shifts-modal'
const NewShifts = (): JSX.Element => {
  const companyId = useCompanyId()
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs(Date.now()))
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedDesiredShift, setSelectedDesiredShift] = useState<{
    id: number
    since: string
    till: string
    employment: { worker: { id: number } }
  } | null>(null)
  const [loadCompany, { data: companyData, error }] = useGetCompanyLazyQuery()

  const onAddButtonClicked = async (date: Dayjs) => {
    setSelectedDesiredShift(null)
    setSelectedDate(date)
    const bootstrap = await import('bootstrap')
    void new bootstrap.Modal('#' + ADD_SHIFTS_MODAL_ID).show()
  }
  const onDesiredShiftItemClicked = async (desiredShift: {
    id: number
    since: string
    till: string
    employment: { worker: { id: number } }
  }) => {
    setSelectedDesiredShift(desiredShift)
    setSelectedDate(dayjs(desiredShift.since))
    const bootstrap = await import('bootstrap')
    void new bootstrap.Modal('#' + ADD_SHIFTS_MODAL_ID).show()
  }

  useEffect(() => {
    if (!companyId) return
    void loadCompany({ variables: { id: companyId } })
  }, [companyId, loadCompany])

  if (error) return <Error statusCode={404} />
  if (!companyData?.company) return <>loading...</>
  return (
    <div className="mb-5">
      <h1>シフト作成- {companyData.company.name}</h1>
      <div className="mb-4 rounded border px-4 py-2 bg-body-tertiary">
        <h2 className="h5 mb-0">表示</h2>
        <div className="row">
          <div className="col col-lg-4 d-flex flex-wrap mb-1 align-items-center">
            <span className="mx-2">希望シフト</span>
            <div className="">
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
            </div>
          </div>
          <div className="col col-lg-4 d-flex flex-wrap mb-1 align-items-center">
            <span className="mx-2">シフト</span>
            <div className="">
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
            </div>
          </div>
        </div>
      </div>
      <NewShiftCalendar
        addShiftsModalID={ADD_SHIFTS_MODAL_ID}
        onAddButtonClicked={onAddButtonClicked}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        onDesiredShiftItemClicked={onDesiredShiftItemClicked}
        selectedDesiredShift={selectedDesiredShift}
      />
    </div>
  )
}

export default memo(NewShifts)
