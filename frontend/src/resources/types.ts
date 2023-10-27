import { Dayjs } from 'dayjs'

export type Theme = 'dark' | 'light'

enum WorkerStatus {
  ACTIVE = 0,
  INACTIVE = 1,
}

export type Worker = {
  id: number
  status: WorkerStatus
  email: string
  name: {
    first_name: string
    last_name: string
  }
  created_at: Dayjs
  updated_at: Dayjs
}
export type WorkerJSON = {
  id: number
  status: WorkerStatus
  email: string
  name: {
    first_name: string
    last_name: string
  }
  created_at: string
  updated_at: string
}
export type Company = {
  id: number
  name: string
  created_at: Dayjs
  updated_at: Dayjs
}
export type CompanyJSON = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export enum EmploymentKind {
  ADMIN = 0,
  MEMBER = 1,
}
export enum EmploymentStatus {
  ACTIVE = 0,
  INACTIVE = 1,
}
export type Employment = {
  id: number
  kind: EmploymentKind
  status: EmploymentStatus
  company_id: number
  worker_id: number
  created_at: Dayjs
  updated_at: Dayjs
}
export type EmploymentJSON = {
  id: number
  kind: EmploymentKind
  status: EmploymentStatus
  company_id: number
  worker_id: number
  created_at: string
  updated_at: string
}

export enum WorkStatus {
  WORKING = 0,
  LEFT = 1,
}
export const workStatusLabels: { [key in WorkStatus]: string } = {
  0: '勤務中',
  1: '退勤済み',
}
export type DesiredShift = {
  id: number
  since: Dayjs
  till: Dayjs
  employment_id: number
  created_at: Dayjs
  updated_at: Dayjs
}
export type DesiredShiftJSON = {
  id: number
  since: string
  till: string
  employment_id: number
  created_at: string
  updated_at: string
}
