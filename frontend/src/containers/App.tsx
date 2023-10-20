import { TestID } from '@/resources/TestID'
import CompanySelect from './CompanySelect'
import { getData, postData } from '@/utils/api'
import { useWorkerInfo } from '@/context/WorkerInfoProvider'
import { useCallback, useEffect, useState } from 'react'
import { WorkStatus, workStatusLabels } from '@/resources/types'

export const App: React.FC = () => {
  const { company } = useWorkerInfo()
  const [workStatus, setWorkStatus] = useState<WorkStatus | null>(null)

  const createStamp = useCallback(async () => {
    if (!company) return

    await postData({
      url: `/member/companies/${company.id}/stamps/now`,
      data: {},
    })
  }, [company])

  const fetchWorkStatus = useCallback(async () => {
    if (!company) return

    const json = (
      await getData(`/member/companies/${company.id}/work_status`)
    )[1]

    setWorkStatus(json.work_status)
  }, [company])

  useEffect(() => {
    void fetchWorkStatus()
  }, [fetchWorkStatus])

  return (
    <div id="app" data-testid={TestID.APP}>
      <h1>勤怠プラス+</h1>
      <div className="container">
        <CompanySelect />
        {company && (
          <div className="mt-5">
            <div className="stamp">
              <button
                className="btn btn-primary btn-lg w-100 py-5 fs-2"
                onClick={createStamp}
              >
                打刻する
              </button>
            </div>
            <div className="work-status">
              {workStatus != null ? workStatusLabels[workStatus] : '---'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
