insert into companies (name) values
  ('Company 1'),
  ('Company 2'),
  ('Company 3'),
  ('Company 4'),
  ('Company 5');

insert into workers (status, email, encrypted_password, first_name, last_name) values
  (0, 'foo1@example.com', '$2a$10$kMRDR9q1ZNgVtrDahYZzWei7McVU1c7ivX2fcbP4/SoFpblrukM9i', '太郎', '佐藤'),
  (0, 'foo2@example.com', '$2a$10$kMRDR9q1ZNgVtrDahYZzWei7McVU1c7ivX2fcbP4/SoFpblrukM9i', '次郎', '鈴木'),
  (0, 'foo3@example.com', '$2a$10$kMRDR9q1ZNgVtrDahYZzWei7McVU1c7ivX2fcbP4/SoFpblrukM9i', '三郎', '高橋'),
  (0, 'foo4@example.com', '$2a$10$kMRDR9q1ZNgVtrDahYZzWei7McVU1c7ivX2fcbP4/SoFpblrukM9i', '四郎', '田中'),
  (0, 'foo5@example.com', '$2a$10$kMRDR9q1ZNgVtrDahYZzWei7McVU1c7ivX2fcbP4/SoFpblrukM9i', '五郎', '伊藤'),
  (0, 'foo6@example.com', '$2a$10$kMRDR9q1ZNgVtrDahYZzWei7McVU1c7ivX2fcbP4/SoFpblrukM9i', '六郎', '渡辺'),
  (0, 'foo7@example.com', '$2a$10$kMRDR9q1ZNgVtrDahYZzWei7McVU1c7ivX2fcbP4/SoFpblrukM9i', '七郎', '山本'),
  (0, 'foo8@example.com', '$2a$10$kMRDR9q1ZNgVtrDahYZzWei7McVU1c7ivX2fcbP4/SoFpblrukM9i', '八郎', '中村'),
  (0, 'foo9@example.com', '$2a$10$kMRDR9q1ZNgVtrDahYZzWei7McVU1c7ivX2fcbP4/SoFpblrukM9i', '九郎', '小林'),
  (0, 'foo10@example.com', '$2a$10$kMRDR9q1ZNgVtrDahYZzWei7McVU1c7ivX2fcbP4/SoFpblrukM9i', '十郎', '加藤'),
  (0, 'foo11@example.com', '$2a$10$kMRDR9q1ZNgVtrDahYZzWei7McVU1c7ivX2fcbP4/SoFpblrukM9i', '十一郎', '吉田'),
  (0, 'foo12@example.com', '$2a$10$kMRDR9q1ZNgVtrDahYZzWei7McVU1c7ivX2fcbP4/SoFpblrukM9i', '十二郎', '山田'),
  (0, 'foo13@example.com', '$2a$10$kMRDR9q1ZNgVtrDahYZzWei7McVU1c7ivX2fcbP4/SoFpblrukM9i', '十三郎', '佐々木'),
  (0, 'foo14@example.com', '$2a$10$kMRDR9q1ZNgVtrDahYZzWei7McVU1c7ivX2fcbP4/SoFpblrukM9i', '十四郎', '山口');

insert into employments (kind, status, worker_id, company_id) values
  (1, 0, 1, 1),
  (0, 0, 2, 1),
  (0, 0, 3, 1),
  (0, 0, 4, 1),
  (0, 0, 5, 1),
  (0, 0, 6, 1),
  (0, 0, 7, 1),
  (0, 0, 8, 1),
  (0, 0, 9, 1),
  (1, 0, 5, 2),
  (1, 0, 6, 2),
  (0, 0, 7, 2),
  (0, 0, 8, 2),
  (0, 0, 9, 2),
  (0, 0, 10, 2),
  (0, 0, 11, 2),
  (0, 0, 12, 2),
  (0, 0, 13, 2),
  (0, 0, 14, 2),
  (0, 0, 1, 3),
  (0, 0, 2, 3),
  (1, 0, 3, 3),
  (0, 0, 4, 3),
  (0, 0, 9, 3),
  (0, 0, 10, 3),
  (0, 0, 11, 3),
  (0, 0, 12, 3),
  (0, 0, 13, 3),
  (0, 0, 14, 3),
  (0, 0, 1, 4),
  (0, 0, 2, 4),
  (0, 0, 3, 4),
  (1, 0, 7, 4),
  (0, 0, 8, 4),
  (0, 0, 9, 4),
  (0, 0, 10, 4),
  (0, 0, 11, 4),
  (0, 0, 14, 4),
  (0, 0, 11, 5),
  (0, 0, 12, 5),
  (1, 0, 13, 5),
  (0, 0, 14, 5);

insert into stamps (stamped_at, employment_id) values
  ('2023-10-06 09:00:00', 1),
  ('2023-10-06 09:00:00', 2),
  ('2023-10-06 09:00:00', 3),
  ('2023-10-06 09:00:00', 4),
  ('2023-10-06 15:00:00', 5),
  ('2023-10-06 15:00:00', 6),
  ('2023-10-06 15:00:00', 7),
  ('2023-10-06 15:00:00', 8),
  ('2023-10-06 15:00:00', 9),
  ('2023-10-06 09:00:00', 10),
  ('2023-10-06 09:00:00', 11),
  ('2023-10-06 09:00:00', 12),
  ('2023-10-06 09:00:00', 13),
  ('2023-10-06 15:00:00', 14),
  ('2023-10-06 15:00:00', 15),
  ('2023-10-06 15:00:00', 16),
  ('2023-10-06 15:00:00', 17),
  ('2023-10-06 15:00:00', 18),
  ('2023-10-06 09:00:00', 19),
  ('2023-10-06 09:00:00', 20),
  ('2023-10-06 09:00:00', 21),
  ('2023-10-06 09:00:00', 22),
  ('2023-10-06 15:00:00', 23),
  ('2023-10-06 15:00:00', 24),
  ('2023-10-06 15:00:00', 25),
  ('2023-10-06 15:00:00', 26),
  ('2023-10-06 15:00:00', 27),
  ('2023-10-06 09:00:00', 28),
  ('2023-10-06 09:00:00', 29),
  ('2023-10-06 09:00:00', 30),
  ('2023-10-06 09:00:00', 31),
  ('2023-10-06 15:00:00', 32),
  ('2023-10-06 15:00:00', 33),
  ('2023-10-06 15:00:00', 34),
  ('2023-10-06 15:00:00', 35),
  ('2023-10-06 15:00:00', 36),
  ('2023-10-06 09:00:00', 37),
  ('2023-10-06 09:00:00', 38),
  ('2023-10-06 09:00:00', 39),
  ('2023-10-06 09:00:00', 40),
  ('2023-10-06 15:00:00', 41),
  ('2023-10-06 15:00:00', 42),
  ('2023-10-06 16:00:00', 1),
  ('2023-10-06 16:00:00', 2),
  ('2023-10-06 16:00:00', 3),
  ('2023-10-06 16:00:00', 4),
  ('2023-10-06 22:00:00', 5),
  ('2023-10-06 22:00:00', 6),
  ('2023-10-06 22:00:00', 7),
  ('2023-10-06 22:00:00', 8),
  ('2023-10-06 22:00:00', 9),
  ('2023-10-06 16:00:00', 10),
  ('2023-10-06 16:00:00', 11),
  ('2023-10-06 16:00:00', 12),
  ('2023-10-06 16:00:00', 13),
  ('2023-10-06 22:00:00', 14),
  ('2023-10-06 22:00:00', 15),
  ('2023-10-06 22:00:00', 16),
  ('2023-10-06 22:00:00', 17),
  ('2023-10-06 22:00:00', 18),
  ('2023-10-06 16:00:00', 19),
  ('2023-10-06 16:00:00', 20),
  ('2023-10-06 16:00:00', 21),
  ('2023-10-06 16:00:00', 22),
  ('2023-10-06 22:00:00', 23),
  ('2023-10-06 22:00:00', 24),
  ('2023-10-06 22:00:00', 25),
  ('2023-10-06 22:00:00', 26),
  ('2023-10-06 22:00:00', 27),
  ('2023-10-06 16:00:00', 28),
  ('2023-10-06 16:00:00', 29),
  ('2023-10-06 16:00:00', 30),
  ('2023-10-06 16:00:00', 31),
  ('2023-10-06 22:00:00', 32),
  ('2023-10-06 22:00:00', 33),
  ('2023-10-06 22:00:00', 34),
  ('2023-10-06 22:00:00', 35),
  ('2023-10-06 22:00:00', 36),
  ('2023-10-06 16:00:00', 37),
  ('2023-10-06 16:00:00', 38),
  ('2023-10-06 16:00:00', 39),
  ('2023-10-06 16:00:00', 40),
  ('2023-10-06 22:00:00', 41),
  ('2023-10-06 22:00:00', 42),
  ('2023-10-07 09:00:00', 1),
  ('2023-10-07 09:00:00', 2),
  ('2023-10-07 09:00:00', 3),
  ('2023-10-07 09:00:00', 4),
  ('2023-10-07 15:00:00', 5),
  ('2023-10-07 15:00:00', 6),
  ('2023-10-07 15:00:00', 7),
  ('2023-10-07 15:00:00', 8),
  ('2023-10-07 15:00:00', 9),
  ('2023-10-07 09:00:00', 10),
  ('2023-10-07 09:00:00', 11),
  ('2023-10-07 09:00:00', 12),
  ('2023-10-07 09:00:00', 13),
  ('2023-10-07 15:00:00', 14),
  ('2023-10-07 15:00:00', 15),
  ('2023-10-07 15:00:00', 16),
  ('2023-10-07 15:00:00', 17),
  ('2023-10-07 15:00:00', 18),
  ('2023-10-07 09:00:00', 19),
  ('2023-10-07 09:00:00', 20),
  ('2023-10-07 09:00:00', 21),
  ('2023-10-07 09:00:00', 22),
  ('2023-10-07 15:00:00', 23),
  ('2023-10-07 15:00:00', 24),
  ('2023-10-07 15:00:00', 25),
  ('2023-10-07 15:00:00', 26),
  ('2023-10-07 15:00:00', 27),
  ('2023-10-07 09:00:00', 28),
  ('2023-10-07 09:00:00', 29),
  ('2023-10-07 09:00:00', 30),
  ('2023-10-07 09:00:00', 31),
  ('2023-10-07 15:00:00', 32),
  ('2023-10-07 15:00:00', 33),
  ('2023-10-07 15:00:00', 34),
  ('2023-10-07 15:00:00', 35),
  ('2023-10-07 15:00:00', 36),
  ('2023-10-07 09:00:00', 37),
  ('2023-10-07 09:00:00', 38),
  ('2023-10-07 09:00:00', 39),
  ('2023-10-07 09:00:00', 40),
  ('2023-10-07 15:00:00', 41),
  ('2023-10-07 15:00:00', 42),
  ('2023-10-07 16:00:00', 1),
  ('2023-10-07 16:00:00', 2),
  ('2023-10-07 16:00:00', 3),
  ('2023-10-07 16:00:00', 4),
  ('2023-10-07 22:00:00', 5),
  ('2023-10-07 22:00:00', 6),
  ('2023-10-07 22:00:00', 7),
  ('2023-10-07 22:00:00', 8),
  ('2023-10-07 22:00:00', 9),
  ('2023-10-07 16:00:00', 10),
  ('2023-10-07 16:00:00', 11),
  ('2023-10-07 16:00:00', 12),
  ('2023-10-07 16:00:00', 13),
  ('2023-10-07 22:00:00', 14),
  ('2023-10-07 22:00:00', 15),
  ('2023-10-07 22:00:00', 16),
  ('2023-10-07 22:00:00', 17),
  ('2023-10-07 22:00:00', 18),
  ('2023-10-07 16:00:00', 19),
  ('2023-10-07 16:00:00', 20),
  ('2023-10-07 16:00:00', 21),
  ('2023-10-07 16:00:00', 22),
  ('2023-10-07 22:00:00', 23),
  ('2023-10-07 22:00:00', 24),
  ('2023-10-07 22:00:00', 25),
  ('2023-10-07 22:00:00', 26),
  ('2023-10-07 22:00:00', 27),
  ('2023-10-07 16:00:00', 28),
  ('2023-10-07 16:00:00', 29),
  ('2023-10-07 16:00:00', 30),
  ('2023-10-07 16:00:00', 31),
  ('2023-10-07 22:00:00', 32),
  ('2023-10-07 22:00:00', 33),
  ('2023-10-07 22:00:00', 34),
  ('2023-10-07 22:00:00', 35),
  ('2023-10-07 22:00:00', 36),
  ('2023-10-07 16:00:00', 37),
  ('2023-10-07 16:00:00', 38),
  ('2023-10-07 16:00:00', 39),
  ('2023-10-07 16:00:00', 40),
  ('2023-10-07 22:00:00', 41),
  ('2023-10-07 22:00:00', 42),
  ('2023-10-08 09:00:00', 1),
  ('2023-10-08 09:00:00', 2),
  ('2023-10-08 09:00:00', 3),
  ('2023-10-08 09:00:00', 4),
  ('2023-10-08 15:00:00', 5),
  ('2023-10-08 15:00:00', 6),
  ('2023-10-08 15:00:00', 7),
  ('2023-10-08 15:00:00', 8),
  ('2023-10-08 15:00:00', 9),
  ('2023-10-08 09:00:00', 10),
  ('2023-10-08 09:00:00', 11),
  ('2023-10-08 09:00:00', 12),
  ('2023-10-08 09:00:00', 13),
  ('2023-10-08 15:00:00', 14),
  ('2023-10-08 15:00:00', 15),
  ('2023-10-08 15:00:00', 16),
  ('2023-10-08 15:00:00', 17),
  ('2023-10-08 15:00:00', 18),
  ('2023-10-08 09:00:00', 19),
  ('2023-10-08 09:00:00', 20),
  ('2023-10-08 09:00:00', 21),
  ('2023-10-08 09:00:00', 22),
  ('2023-10-08 15:00:00', 23),
  ('2023-10-08 15:00:00', 24),
  ('2023-10-08 15:00:00', 25),
  ('2023-10-08 15:00:00', 26),
  ('2023-10-08 15:00:00', 27),
  ('2023-10-08 09:00:00', 28),
  ('2023-10-08 09:00:00', 29),
  ('2023-10-08 09:00:00', 30),
  ('2023-10-08 09:00:00', 31),
  ('2023-10-08 15:00:00', 32),
  ('2023-10-08 15:00:00', 33),
  ('2023-10-08 15:00:00', 34),
  ('2023-10-08 15:00:00', 35),
  ('2023-10-08 15:00:00', 36),
  ('2023-10-08 09:00:00', 37),
  ('2023-10-08 09:00:00', 38),
  ('2023-10-08 09:00:00', 39),
  ('2023-10-08 09:00:00', 40),
  ('2023-10-08 15:00:00', 41),
  ('2023-10-08 15:00:00', 42),
  ('2023-10-08 16:00:00', 1),
  ('2023-10-08 16:00:00', 2),
  ('2023-10-08 16:00:00', 3),
  ('2023-10-08 16:00:00', 4),
  ('2023-10-08 22:00:00', 5),
  ('2023-10-08 22:00:00', 6),
  ('2023-10-08 22:00:00', 7),
  ('2023-10-08 22:00:00', 8),
  ('2023-10-08 22:00:00', 9),
  ('2023-10-08 16:00:00', 10),
  ('2023-10-08 16:00:00', 11),
  ('2023-10-08 16:00:00', 12),
  ('2023-10-08 16:00:00', 13),
  ('2023-10-08 22:00:00', 14),
  ('2023-10-08 22:00:00', 15),
  ('2023-10-08 22:00:00', 16),
  ('2023-10-08 22:00:00', 17),
  ('2023-10-08 22:00:00', 18),
  ('2023-10-08 16:00:00', 19),
  ('2023-10-08 16:00:00', 20),
  ('2023-10-08 16:00:00', 21),
  ('2023-10-08 16:00:00', 22),
  ('2023-10-08 22:00:00', 23),
  ('2023-10-08 22:00:00', 24),
  ('2023-10-08 22:00:00', 25),
  ('2023-10-08 22:00:00', 26),
  ('2023-10-08 22:00:00', 27),
  ('2023-10-08 16:00:00', 28),
  ('2023-10-08 16:00:00', 29),
  ('2023-10-08 16:00:00', 30),
  ('2023-10-08 16:00:00', 31),
  ('2023-10-08 22:00:00', 32),
  ('2023-10-08 22:00:00', 33),
  ('2023-10-08 22:00:00', 34),
  ('2023-10-08 22:00:00', 35),
  ('2023-10-08 22:00:00', 36),
  ('2023-10-08 16:00:00', 37),
  ('2023-10-08 16:00:00', 38),
  ('2023-10-08 16:00:00', 39),
  ('2023-10-08 16:00:00', 40),
  ('2023-10-08 22:00:00', 41),
  ('2023-10-08 22:00:00', 42);

insert into desired_shifts (since, till, employment_id) values
  ('2023-10-06 09:00:00', '2023-10-06 18:00:00', 1, 1),
  ('2023-10-06 09:00:00', '2023-10-06 18:00:00', 2, 1),
  ('2023-10-07 09:00:00', '2023-10-07 18:00:00', 1, 1),
  ('2023-10-07 09:00:00', '2023-10-07 18:00:00', 2, 1),
  ('2023-10-08 09:00:00', '2023-10-08 18:00:00', 1, 1),
  ('2023-10-08 09:00:00', '2023-10-08 18:00:00', 2, 1);

insert into shifts (since, till, employment_id) values
  ('2023-10-06 09:00:00', '2023-10-06 18:00:00', 1, 1),
  ('2023-10-06 09:00:00', '2023-10-06 18:00:00', 2, 1);
