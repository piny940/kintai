select * from desired_shifts
  where employment_id = 1;

insert into desired_shifts (since, till, employment_id) values
  ('2023-12-15 10:00:00', '2023-12-15 14:00:00', 1) returning *;

update desired_shifts
  set since = '2023-12-15 10:00:00', till = '2023-12-15 14:00:00'
  where id = 1 returning *;

delete from desired_shifts where id = 1 returning *;

select * from desired_shifts
  where employment_id in (
    select id from employments
    where company_id = 1
  )
  and since >= '2023-12-01 00:00:00'
  and till < '2024-01-01 00:00:00';