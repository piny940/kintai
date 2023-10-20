export type Theme = 'dark' | 'light'

export enum WorkerKind {
  ADMIN = 0,
  MEMBER = 1,
}
enum WorkerStatus {
  ACTIVE = 0,
  INACTIVE = 1,
}

export type Worker = {
  id: number
  kind: WorkerKind
  status: WorkerStatus
  email: string
  firstName: string
  lastName: string
}
export type Company = {
  id: number
  name: string
}
