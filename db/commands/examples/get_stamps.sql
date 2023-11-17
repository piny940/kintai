select * from stamps
  where employment_id = 1
  and stamped_at >= '2023-10-01 00:00:00'
  and stamped_at < '2023-11-01 00:00:00';

select * from stamps
  where stamped_at >= '2023-10-01 00:00:00'
  and stamped_at < '2023-11-01 00:00:00'
  and employment_id in (
    select employments.id from employments
      where employments.worker_id = 1
      and employments.company_id = 3
  );

select count(*) from stamps
  where employment_id = 1;

select count(*) from stamps
  where employment_id in (
    select employments.id from employments
      where employments.worker_id = 1
      and employments.company_id = 3
  );

select * from stamps
  where employment_id = 1
  and stamped_at >= '2023-10-08 00:00:00'
  and stamped_at < '2023-10-09 00:00:00';