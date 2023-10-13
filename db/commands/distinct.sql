select distinct worker_id from employments
  inner join desired_shifts on employments.id = desired_shifts.employment_id
  where company_id = 1;
