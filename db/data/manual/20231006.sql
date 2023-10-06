insert into companies (name) values
  ('Company 1'),
  ('Company 2');

insert into workers (status, email, first_name, last_name) values
  (0, 'foo1@example.com', '太郎', '佐藤'),
  (0, 'foo2@example.com', '次郎', '鈴木'),
  (0, 'foo3@example.com', '三郎', '高橋'),
  (0, 'foo4@example.com', '四郎', '田中');

insert into affiliations (kind, status, worker_id, company_id) values
  (1, 0, 1, 1),
  (0, 0, 2, 1),
  (0, 0, 3, 1),
  (0, 0, 4, 1),
  (0, 0, 1, 2),
  (1, 0, 2, 2),
  (0, 0, 3, 2);

insert into stamps (stamped_at, worker_id, company_id) values
  ('2023-10-06 09:17:01', 1, 1),
  ('2023-10-06 13:17:01', 1, 1),
  ('2023-10-06 08:17:01', 2, 1),
  ('2023-10-06 14:17:01', 2, 1),
  ('2023-10-06 09:17:01', 3, 1),
  ('2023-10-06 13:17:01', 3, 1),
  ('2023-10-06 08:17:01', 4, 1),
  ('2023-10-06 14:17:01', 4, 1),
  ('2023-10-06 09:17:01', 1, 2),
  ('2023-10-06 13:17:01', 1, 2),
  ('2023-10-06 08:17:01', 2, 2),
  ('2023-10-06 14:17:01', 2, 2);

insert into shifts (since, till, worker_id, company_id) values
  ('2023-10-06 09:00:00', '2023-10-06 18:00:00', 1, 1),
  ('2023-10-06 09:00:00', '2023-10-06 18:00:00', 2, 1);

insert into desired_shifts (since, till, worker_id, company_id) values
  ('2023-10-06 09:00:00', '2023-10-06 18:00:00', 1, 1),
  ('2023-10-06 09:00:00', '2023-10-06 18:00:00', 2, 1);
