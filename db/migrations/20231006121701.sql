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
  encrypted_password varchar not null,
  first_name varchar not null,
  last_name varchar not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

create table if not exists employments (
  id bigserial not null unique primary key,
  kind integer not null,
  status integer not null,
  worker_id bigint not null references workers,
  company_id bigint not null references companies,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);
create index if not exists index_employments_on_worker_id on employments(worker_id);
create index if not exists index_employments_on_company_id on employments(company_id);
create unique index if not exists index_employments_on_worker_id_and_company_id on employments(worker_id, company_id);

create table if not exists stamps (
  id bigserial not null unique primary key,
  stamped_at timestamp not null,
  employment_id bigint not null references employments,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);
create index if not exists index_stamps_on_employment_id on stamps(employment_id);

create table if not exists shifts (
  id bigserial not null unique primary key,
  since timestamp not null,
  till timestamp not null,
  employment_id bigint not null references employments,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);
create index if not exists index_shifts_on_employment_id on shifts(employment_id);

create table if not exists desired_shifts (
  id bigserial not null unique primary key,
  since timestamp not null,
  till timestamp not null,
  employment_id bigint not null references employments,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);
create index if not exists index_desired_shifts_on_employment_id on desired_shifts(employment_id);
