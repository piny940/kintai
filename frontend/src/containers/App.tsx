import { TestID } from '@/resources/TestID'
import CompanySelect from '../components/Kintai/CompanySelect'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  EmploymentKind,
  GetWorkStatusDocument,
  useGetCompaniesQuery,
  useGetCompanyLazyQuery,
  useGetWorkStatusLazyQuery,
  usePushStampMutation,
} from '@/graphql/types'
import { workStatusLabels } from '@/resources/enums'
import { useApolloClient } from '@apollo/client'
import { fromStorage, toStorage } from '@/utils/storage'

const COMPANY_ID_KEY = 'company-id'
export const App: React.FC = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  )
  const { data: companiesData } = useGetCompaniesQuery()
  const [loadCompany, { data: companyData }] = useGetCompanyLazyQuery()
  const [loadWorkStatus, { data: workStatusData }] = useGetWorkStatusLazyQuery()
  const pushStamp = usePushStampMutation()[0]
  const client = useApolloClient()

  const company = useMemo(
    () => (selectedCompanyId && companyData?.company) || null,
    [selectedCompanyId, companyData?.company]
  )

  const _selectCompany = (id: number | null) => {
    setSelectedCompanyId(id)
    if (!id) return
    toStorage(COMPANY_ID_KEY, id.toString())
  }

  const _pushStamp = useCallback(async () => {
    if (!company) return

    await pushStamp({ variables: { companyId: company.id } })
    await client.refetchQueries({ include: [GetWorkStatusDocument] })
  }, [company, client, pushStamp])

  useEffect(() => {
    if (!selectedCompanyId) return

    void loadCompany({ variables: { id: selectedCompanyId } })
    void loadWorkStatus({ variables: { companyId: selectedCompanyId } })
  }, [selectedCompanyId, loadCompany, loadWorkStatus])

  useEffect(() => {
    const id = fromStorage(COMPANY_ID_KEY)
    if (!id) return
    setSelectedCompanyId(Number(id))
  }, [])

  return (
    <div id="app" data-testid={TestID.APP}>
      <h1>勤怠プラス+</h1>
      <div className="container">
        {companiesData?.companies && (
          <CompanySelect
            setSelectedCompanyId={_selectCompany}
            selectedCompanyId={selectedCompanyId}
            companies={companiesData.companies}
          />
        )}
        {company && (
          <div className="mt-5">
            <h2 className="d-none">打刻</h2>
            <section className="stamp">
              {workStatusData?.workStatus != null && (
                <div className="">
                  <p className="work-status h2">
                    {workStatusLabels[workStatusData?.workStatus]}
                  </p>
                </div>
              )}
              <button
                className="btn btn-primary btn-lg w-100 py-5 fs-2"
                onClick={_pushStamp}
              >
                打刻する
              </button>
            </section>
            <section>
              <h2 className="d-none">操作</h2>
              <div className="list-group mt-5">
                <Link
                  className="list-group-item"
                  href={`/companies/${company.id}/work_reports`}
                >
                  勤務実績
                </Link>
                <Link
                  className="list-group-item"
                  href={`/companies/${company.id}/shifts`}
                >
                  シフト表
                </Link>
                <Link
                  className="list-group-item"
                  href={`/companies/${company.id}/desired_shifts`}
                >
                  希望シフト作成
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
