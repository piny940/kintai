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
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [workStatus, setWorkStatus] = useState<WorkStatus | null>(null)
  const { data: companiesData } = useGetCompaniesQuery()
  const [loadCompany, { data: companyData }] = useGetCompanyLazyQuery()

  const _setSelectedCompany = useCallback(
    (company: Company | null) => {
      setSelectedCompany(company)
      if (!company) return
      void loadCompany({ variables: { id: company.id } })
    },
    [setSelectedCompany]
  )
  const company = useMemo(() => {
    return ((selectedCompany && companyData?.company) as Company) || null
  }, [companyData?.company, selectedCompany])

  const fetchWorkStatus = useCallback(async () => {
    if (!selectedCompany) return

    const json = (
      await getData(`/member/companies/${selectedCompany.id}/work_status`)
    )[1]

    setWorkStatus(json.work_status)
  }, [selectedCompany])

  const createStamp = useCallback(async () => {
    if (!selectedCompany) return

    await postData({
      url: `/member/companies/${selectedCompany.id}/stamps/now`,
      data: {},
    })
    void fetchWorkStatus()
  }, [selectedCompany, fetchWorkStatus])

  useEffect(() => {
    void fetchWorkStatus()
  }, [fetchWorkStatus])

  return (
    <div id="app" data-testid={TestID.APP}>
      <h1>勤怠プラス+</h1>
      <div className="container">
        {companiesData?.companies && (
          <CompanySelect
            setSelectedCompany={_setSelectedCompany}
            selectedCompany={selectedCompany}
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
