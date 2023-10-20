import { TestID } from '@/resources/TestID'
import CompanySelect from './CompanySelect'
import { postData } from '@/utils/api'
import { useWorkerInfo } from '@/context/WorkerInfoProvider'
import { useCallback } from 'react'

export const App: React.FC = () => {
  const { company } = useWorkerInfo()

  const createStamp = useCallback(async () => {
    if (!company) return

    await postData({
      url: `/member/companies/${company.id}/stamps/now`,
      data: {},
    })
  }, [company])

  return (
    <div id="app" data-testid={TestID.APP}>
      <h1>勤怠プラス+</h1>
      <div className="container">
        <CompanySelect />
        {company && (
          <div className="mt-5">
            <button className="btn btn-primary btn-lg" onClick={createStamp}>
              打刻する
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
