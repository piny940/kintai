```mermaid
erDiagram
  companies ||--o{ affiliations : "従業員の所属"
  workers ||--o{ affiliations : "会社への所属"
  companies ||--o{ tags : "タグ"
  tags ||--o{ schedules : "タグ付け"
  workers ||--o{ attendances : "出勤退勤"
  workers ||--o{ shifts : "シフト"
  workers ||--o{ desired_shifts : "希望シフト"
  workers ||--o{ paid_holidays : "有給休暇"
  workers ||--o{ vacation_requests : "有給申請"
  workers ||--o{ default_shifts : "基本シフト"
  companies ||--o{ attendances : "出勤退勤"
  companies ||--o{ shifts : "シフト"
  companies ||--o{ desired_shifts : "希望シフト"
  companies ||--o{ paid_holidays : "有給休暇"
  companies ||--o{ vacation_requests : "有給申請"
  companies ||--o{ default_shifts : "基本シフト"

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
  }
  default_shifts {
    bigint id PK
    datetime since
    datetime till
    bigint staff_id FK "staffs"
  }
  
  tags {
    bigint id PK
    string name
    string color
    bigint company_id FK "companies"
  }
  schedules {
    bigint id PK
    datetime date
    bigint tag_id FK "tags"
  }

  paid_holidays {
    bigint id PK
    datetime since
    datetime till
    bigint staff_id FK "staffs"
  }
  vacation_requests {
    bigint id PK
    datetime since
    datetime till
    bigint staff_id FK "staffs"
  }
```