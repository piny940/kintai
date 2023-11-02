import { TestID } from '@/resources/TestID'
import CompanySelect from '../components/Kintai/CompanySelect'
import { getData, postData } from '@/utils/api'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { WorkStatus, workStatusLabels } from '@/resources/types'
import Link from 'next/link'
import {
  Company,
  EmploymentKind,
  useGetCompaniesQuery,
  useGetCompanyLazyQuery,
} from '@/graphql/types'

export const App: React.FC = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  )
  const [workStatus, setWorkStatus] = useState<WorkStatus | null>(null)
  const { data: companiesData } = useGetCompaniesQuery()
  const [loadCompany, { data: companyData }] = useGetCompanyLazyQuery()

  const company = useMemo(
    () => (selectedCompanyId && (companyData?.company as Company)) || null,
    [selectedCompanyId, companyData?.company]
  )

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

  useEffect(() => {
    if (!selectedCompanyId) return
    void loadCompany({ variables: { id: selectedCompanyId } })
  }, [selectedCompanyId])

  return (
    <div id="app" data-testid={TestID.APP}>
      <h1>勤怠プラス+</h1>
      <div className="container">
        {companiesData?.companies && (
          <CompanySelect
            setSelectedCompanyId={setSelectedCompanyId}
            selectedCompanyId={selectedCompanyId}
            companies={companiesData.companies}
          />
        )}
        {company && (
          <div className="mt-5">
            <h2 className="d-none">打刻</h2>
            <section className="stamp">
              {workStatus != null && (
                <div className="">
                  <p className="work-status h2">
                    {workStatusLabels[workStatus]}
                  </p>
                </div>
              )}
              <button
                className="btn btn-primary btn-lg w-100 py-5 fs-2"
                onClick={createStamp}
              >
                打刻する
              </button>
            </section>
            <section>
              <h2 className="d-none">操作</h2>
              <div className="list-group mt-5">
                <Link
                  className="list-group-item"
                  href={`/companies/${company.id}/desired_shifts`}
                >
                  希望シフト
                </Link>
              </div>
            </section>
            {company.employment?.kind === EmploymentKind.Admin && (
              <section className="mt-5">
                <h2 className="">管理者ページ</h2>
                <div className="list-group">
                  <Link
                    className="list-group-item"
                    href={`/companies/${company.id}/admin/shifts/new`}
                  >
                    シフト作成
                  </Link>
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
