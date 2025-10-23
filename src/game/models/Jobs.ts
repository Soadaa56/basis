import type { Unlockable } from '@/game/models/Unlockable'

export const JobIds = {
  Baker: 'baker',
  Beggar: 'beggar',
  Blacksmith: 'blacksmith',
  Farmer: 'farmer',
  Fishermen: 'fishermen',
  LumberJack: 'lumberjack',
  Miner: 'miner',
  Merchant: 'merchant',
} as const

export type JobId = (typeof JobIds)[keyof typeof JobIds]

export interface Job extends Unlockable {
  id: JobId
  name: string
  totalJobs: number
  assignedWorkers: number
}
