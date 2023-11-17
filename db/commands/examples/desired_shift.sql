select * from desired_shifts
  where employment_id = 1;

insert into desired_shifts (since, till, employment_id) values
  ('2023-12-15 10:00:00', '2023-12-15 14:00:00', 1) returning *;

update desired_shifts
  set since = '2023-12-15 10:00:00', till = '2023-12-15 14:00:00'
  where id = 1 returning *;

delete from desired_shifts where id = 1 returning *;
