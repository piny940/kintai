import NewShiftCalendar from '@/components/Kintai/NewShiftCalendar'
import ShiftsDisplayToggler from '@/components/Kintai/ShiftsDisplayToggler'
import { useGetCompanyLazyQuery } from '@/graphql/types'
import { useCompanyId } from '@/hooks/calendar'
import Error from 'next/error'
import { memo, useEffect, useState } from 'react'

const NewShifts = (): JSX.Element => {
  const companyId = useCompanyId()
  const [showDesiredShifts, setShowDesiredShifts] = useState<boolean>(true)
  const [showShifts, setShowShifts] = useState<boolean>(true)
  const [loadCompany, { data: companyData, error }] = useGetCompanyLazyQuery()

  useEffect(() => {
    if (!companyId) return
    void loadCompany({ variables: { id: companyId } })
  }, [companyId, loadCompany])

  if (error) return <Error statusCode={404} />
  if (!companyData?.company) return <>loading...</>
  return (
    <div className="mb-5">
      <h1>シフト作成- {companyData.company.name}</h1>
      <div className="mb-4">
        <ShiftsDisplayToggler
          showDesiredShifts={showDesiredShifts}
          showShifts={showShifts}
          toggleShowShifts={() => setShowShifts(!showShifts)}
          toggleShowDesiredShifts={() =>
            setShowDesiredShifts(!showDesiredShifts)
          }
        />
      </div>
      <NewShiftCalendar
        showDesiredShifts={showDesiredShifts}
        showShifts={showShifts}
      />
    </div>
  )
}

export default memo(NewShifts)
