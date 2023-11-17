select * from employments where company_id = 3 and worker_id = 1;

insert into stamps (stamped_at, employment_id) values
  ('2015-12-06 12:17:01', 1) returning *;
