import type { Unlockable } from '@/game/models/Unlockable'

export const JobIds = {
  Farmer: 'farmer',
  Miner: 'miner',
  Logger: 'logger',
  Blacksmith: 'blacksmith',
  Fishermen: 'fishermen',
  Merchant: 'merchant',
} as const

export type JobId = (typeof JobIds)[keyof typeof JobIds]

export interface Job extends Unlockable {
  id: JobId
  name: string
  totalJobs: number
  assignedWorkers: number
}
