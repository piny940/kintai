import { memo, useCallback } from 'react'

type SelectCompanyProps = {
  companies: Array<{ name: string; id: number }>
  setSelectedCompanyId: (companyId: number | null) => void
  selectedCompanyId: number | null
}

const SelectCompany = ({
  companies,
  setSelectedCompanyId,
  selectedCompanyId,
}: SelectCompanyProps): JSX.Element => {
  const onCompanyChange = useCallback(
    (value: string) => {
      if (!companies) return
      const newCompany = companies.find((c) => c.id.toString() === value)
      setSelectedCompanyId(newCompany?.id || null)
    },
    [companies, setSelectedCompanyId]
  )

  return (
    <select
      name=""
      id=""
      className="form-select"
      value={selectedCompanyId || ''}
      onChange={(e) => onCompanyChange(e.target.value)}
    >
      <option value="">--</option>
      {companies.map((company) => (
        <option key={company.id} value={company.id}>
          {company.name}
        </option>
      ))}
    </select>
  )
}

export default memo(SelectCompany)
