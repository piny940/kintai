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
  created_at: Date
  updated_at: Date
}
export type Company = {
  id: number
  name: string
  created_at: Date
  updated_at: Date
}
