select worker_id from employments
  inner join (
    select employment_id from desired_shifts
    union
    select employment_id from shifts
  ) as shifts on employments.id = shifts.employment_id
  where employments.company_id = 1;
