create view employments_view (id, name, worker_id) as 
  select companies.id, name, worker_id from companies
    inner join employments on companies.id = employments.company_id;

select first_name, last_name from workers
  inner join employments_view on workers.id = employments_view.worker_id
  where employments_view.id = 2;
