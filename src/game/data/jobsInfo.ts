import { type ResourceId } from '@/game/models/Resource'

export interface BaseOutput {
  resourceId: ResourceId
  rate: number
}

export interface BaseInput {
  resourceId: ResourceId
  rate: number
}

export type JobInfo = {
  baseOutputs: BaseOutput[]
  baseInputs?: BaseInput[]
}
