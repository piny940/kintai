select avg(count) from (
  select count(*) from affiliations
    group by company_id
) as counts;
