select employments.worker_id from companies
  natural join (
    select company_id as id, worker_id from employments
  ) as employments
  where companies.id = 1;
