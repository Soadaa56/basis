import type { ResourceId } from '@/game/models/Resource'

// Not sure if any job will do anything besides produce resources
export type JobInfo = {
  resource: ResourceId
  rate: number
  consume?: {
    resource: ResourceId
    amount: number
  }
}
