select avg(count) from (
  select count(*) from employments
    group by company_id
) as counts;
