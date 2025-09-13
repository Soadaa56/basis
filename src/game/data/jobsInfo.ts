import type { ResourceId } from '@/game/models/Resource'

export interface JobOutput {
  resource: ResourceId
  rate: number
}
// Still unsure if I should name input 'rate' instead of amount
export interface JobInput {
  resource: ResourceId
  amount: number
}

// Not sure if any job will do anything besides produce resources
export type JobInfo = {
  unlocked: boolean
  output: JobOutput[]
  input?: JobInput[]
}
