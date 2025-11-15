import { type ResourceId } from '@/game/models/Resource'

export interface JobOutput {
  resourceId: ResourceId
  rate: number
}

export interface JobInput {
  resourceId: ResourceId
  rate: number
}

export type JobInfo = {
  outputs: JobOutput[]
  inputs?: JobInput[]
}
