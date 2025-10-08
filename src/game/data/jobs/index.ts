import { Blacksmith } from './blacksmith'
import { Farmer } from './farmer'
import { Fishermen } from './fisherman'
import { Merchant } from './merchant'
import { Miner } from './miner'
import { Beggar } from './beggar'

import type { JobId } from '@/game/models/Jobs'
import type { JobInfo } from '@/game/data/info/jobsInfo'

export const jobDefinitions: Partial<Record<JobId, JobInfo>> = {
  blacksmith: Blacksmith,
  farmer: Farmer,
  fishermen: Fishermen,
  merchant: Merchant,
  miner: Miner,
  beggar: Beggar,
}
