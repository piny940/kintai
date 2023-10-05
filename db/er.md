```mermaid
erDiagram
  companies ||--o{ affiliations : "従業員の所属"
  workers ||--o{ affiliations : "会社への所属"
  workers ||--o{ attendances : "出勤退勤"
  workers ||--o{ shifts : "シフト"
  workers ||--o{ desired_shifts : "希望シフト"
  companies ||--o{ attendances : "出勤退勤"
  companies ||--o{ shifts : "シフト"
  companies ||--o{ desired_shifts : "希望シフト"

  companies {
    bigint id PK
    string name
  }
  affiliations {
    bigint id PK
    int kind "管理職か一般職か"
    int status "アクティブか否か,退職済みか"
    bigint company_id FK "companies"
    bigint worker_id FK "workers"
  }
  workers {
    bigint id PK
    int status "アクティブか否か"
    string email "メールアドレス"
    string first_name "名"
    string last_name "姓"
  }

  attendances {
    bigint id PK
    datetime since
    datetime till
    bigint staff_id FK "staffs"
    bigint company_id FK "companies"
  }

  shifts {
    bigint id PK
    datetime since
    datetime till
    bigint staff_id FK "staffs"
  }
  desired_shifts {
    bigint id PK
    datetime since
    datetime till
    bigint staff_id FK "staffs"
    bigint company_id FK "companies"
  }
```