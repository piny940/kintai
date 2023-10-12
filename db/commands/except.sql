select worker_id from desired_shifts
  where company_id = 1
except
select worker_id from shifts
  where company_id = 1;
