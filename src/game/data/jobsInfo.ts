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

export type JobInfo = {
  unlocked: boolean
  outputs: JobOutput[]
  inputs?: JobInput[]
}
