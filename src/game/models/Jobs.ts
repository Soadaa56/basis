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
}
