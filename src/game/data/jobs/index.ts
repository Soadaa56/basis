import { Baker } from './Baker'
import { Blacksmith } from './blacksmith'
import { Beggar } from './beggar'
import { Farmer } from './farmer'
import { Fishermen } from './fisherman'
import { Lumberjack } from './lumberjack'
import { Merchant } from './merchant'
import { Miner } from './miner'

import type { JobId } from '@/game/models/Jobs'
import type { JobInfo } from '@/game/data/jobsInfo'

export const jobDefinitions: Partial<Record<JobId, JobInfo>> = {
  baker: Baker,
  beggar: Beggar,
  blacksmith: Blacksmith,
  farmer: Farmer,
  fishermen: Fishermen,
  lumberjack: Lumberjack,
  merchant: Merchant,
  miner: Miner,
}
