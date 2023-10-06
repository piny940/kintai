create table if not exists companies (
  id bigserial not null unique primary key,
  name varchar not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

create table if not exists workers (
  id bigserial not null unique primary key,
  status integer not null,
  email varchar not null unique,
  first_name varchar not null,
  last_name varchar not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

create table if not exists affiliations (
  id bigserial not null unique primary key,
  kind integer not null,
  status integer not null,
  worker_id bigint not null references workers,
  company_id bigint not null references companies
);
create index if not exists index_affiliations_on_worker_id on affiliations(worker_id);
create index if not exists index_affiliations_on_company_id on affiliations(company_id);
create unique index if not exists index_affiliations_on_worker_id_and_company_id on affiliations(worker_id, company_id);

create table if not exists stamps (
  id bigserial not null unique primary key,
  stamped_at timestamp not null,
  worker_id bigint not null references workers,
  company_id bigint not null references companies,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);
create index if not exists index_stamps_on_worker_id on stamps(worker_id);
create index if not exists index_stamps_on_company_id on stamps(company_id);

create table if not exists shifts (
  id bigserial not null unique primary key,
  since timestamp not null,
  till timestamp not null,
  worker_id bigint not null references workers,
  company_id bigint not null references companies,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);
create index if not exists index_shifts_on_worker_id on shifts(worker_id);
create index if not exists index_shifts_on_company_id on shifts(company_id);

create table if not exists desired_shifts (
  id bigserial not null unique primary key,
  since timestamp not null,
  till timestamp not null,
  worker_id bigint not null references workers,
  company_id bigint not null references companies,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);
create index if not exists index_desired_shifts_on_worker_id on desired_shifts(worker_id);
create index if not exists index_desired_shifts_on_company_id on desired_shifts(company_id);
