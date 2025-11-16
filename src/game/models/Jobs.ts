import type { ResourceId } from './Resource'

export const JobIds = {
  Baker: 'baker',
  Beggar: 'beggar',
  Blacksmith: 'blacksmith',
  Farmer: 'farmer',
  Fishermen: 'fishermen',
  Gatherer: 'gatherer',
  Lumberjack: 'lumberjack',
  Miner: 'miner',
  Merchant: 'merchant',
} as const

export type JobId = (typeof JobIds)[keyof typeof JobIds]

export interface Job {
  id: JobId
  name: string
  totalJobs: number
  assignedWorkers: number
  baseOutputs: {
    resourceId: ResourceId
    rate: number
  }[]
  baseInputs?: {
    resourceId: ResourceId
    rate: number
    reduceRateMults?: Reduction[]
  }[]
  multipliers: number[]
  resourceMults: Record<ResourceId, number[]>
}

export type Reduction = number & { __brand: 'Reduction' }

// eslint-disable-next-line
function isBetweenZeroAndOneInclusive(input: unknown): input is Reduction {
  if (typeof input !== 'number') return false
  return input >= 0 && input <= 1
}
