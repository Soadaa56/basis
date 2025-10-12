import { type ResourceId } from '@/game/models/Resource'

export interface JobOutput {
  resourceId: ResourceId
  rate: number
  multipliers?: number[]
}

export interface JobInput {
  resourceId: ResourceId
  rate: number
  multipliers?: number[]
}

// Not sure if any job will do anything besides produce resources
export type JobInfo = {
  unlocked: boolean
  output: JobOutput[]
  input?: JobInput[]
}
