select sum(count) from (
  select count(*) from employments
    where company_id = 1
    or company_id = 2
    group by company_id
) as counts;
