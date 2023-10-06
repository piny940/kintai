create table if not exists companies (
  id bigserial not null unique primary key,
  name varchar not null,
  created_at timestamp not null,
  updated_at timestamp not null
);

create table if not exists workers (
  id bigserial not null unique primary key,
  status integer not null,
  email varchar not null unique,
  first_name varchar not null,
  last_name varchar not null,
  created_at timestamp not null,
  updated_at timestamp not null
);

create table if not exists affiliations (
  id bigserial not null unique primary key,
  kind integer not null,
  status integer not null,
  worker_id bigint not null references workers,
  company_id bigint not null references companies
);
create index index_affiliations_on_worker_id on affiliations(worker_id);
create index index_affiliations_on_company_id on affiliations(company_id);
create unique index index_affiliations_on_worker_id_and_company_id on affiliations(worker_id, company_id);


