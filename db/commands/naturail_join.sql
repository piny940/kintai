select shifts.id, shifts.since, shifts.till from shifts
  inner join companies on shifts.company_id = companies.id
  where companies.name = 'Company 1';
