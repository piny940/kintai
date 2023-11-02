import { Company } from '@/graphql/types'
import { memo, useCallback } from 'react'

type SelectCompanyProps = {
  companies: Company[]
  setSelectedCompany: (company: Company | null) => void
  selectedCompany: Company | null
}

const SelectCompany = ({
  companies,
  setSelectedCompany,
  selectedCompany,
}: SelectCompanyProps): JSX.Element => {
  const onCompanyChange = useCallback(
    (value: string) => {
      if (!companies) return
      const newCompany = companies.find((c) => c.id.toString() === value)
      setSelectedCompany(newCompany || null)
    },
    [companies, setSelectedCompany]
  )

  return (
    <select
      name=""
      id=""
      className="form-select"
      value={selectedCompany?.id || ''}
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
