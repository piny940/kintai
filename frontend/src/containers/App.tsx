import { TestID } from '@/resources/TestID'
import CompanySelect from './CompanySelect'
import { getData, postData } from '@/utils/api'
import { useWorkerInfo } from '@/context/WorkerInfoProvider'
import { useCallback, useEffect, useState } from 'react'
import { WorkStatus, workStatusLabels } from '@/resources/types'
import Link from 'next/link'

export const App: React.FC = () => {
  const { company } = useWorkerInfo()
  const [workStatus, setWorkStatus] = useState<WorkStatus | null>(null)

  const fetchWorkStatus = useCallback(async () => {
    if (!company) return

    const json = (
      await getData(`/member/companies/${company.id}/work_status`)
    )[1]

    setWorkStatus(json.work_status)
  }, [company])

  const createStamp = useCallback(async () => {
    if (!company) return

    await postData({
      url: `/member/companies/${company.id}/stamps/now`,
      data: {},
    })
    void fetchWorkStatus()
  }, [company, fetchWorkStatus])

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
            {workStatus != null && (
              <div className="">
                <p className="work-status h2">{workStatusLabels[workStatus]}</p>
              </div>
            )}
            <div className="stamp">
              <button
                className="btn btn-primary btn-lg w-100 py-5 fs-2"
                onClick={createStamp}
              >
                打刻する
              </button>
            </div>
            <div className="list-group mt-5">
              <Link
                className="list-group-item"
                href={`/companies/${company.id}/desired_shifts`}
              >
                希望シフト
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
