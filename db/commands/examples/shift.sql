select * from shifts
  where since >= '2023-11-01 00:00:00'
  and till < '2023-12-01 00:00:00'
  and employment_id in (
    select employments.id from employments
      where employments.company_id = 1
  );

insert into shifts (since, till, employment_id) values
  ('2023-12-15 10:00:00', '2023-12-15 14:00:00', 1) returning *;

update shifts set
  since = '2023-12-15 10:00:00',
  till = '2023-12-15 14:00:00',
  employment_id = 2
  where id = 1 returning *;

delete from shifts where id = 1 returning *;
