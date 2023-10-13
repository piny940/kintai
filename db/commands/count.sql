select count(*) from shifts
  inner join employments on shifts.employment_id = employments.id
  where company_id = 1;
