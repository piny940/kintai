select * from companies
  where id in
    (select company_id from employments where worker_id = 1);