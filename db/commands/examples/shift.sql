select * from shifts
  where since >= '2023-11-01 00:00:00'
  and till < '2023-12-01 00:00:00'
  and employment_id in (
    select employments.id from employments
      where employments.company_id = 1
  );