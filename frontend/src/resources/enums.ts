import { WorkStatus } from '@/graphql/types'

export const workStatusLabels: { [key in WorkStatus]: string } = {
  WORKING: '勤務中',
  LEFT: '退勤済み',
}
