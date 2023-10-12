select workers.first_name, workers.last_name from workers
  where workers.id in
    (select worker_id from affiliations
      where company_id = 2);
