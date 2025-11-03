import { baker } from './baker'
import { blacksmith } from './blacksmith'
import { beggar } from './beggar'
import { farmer } from './farmer'
import { fishermen } from './fisherman'
import { gatherer } from './gatherer'
import { lumberjack } from './lumberjack'
import { merchant } from './merchant'
import { miner } from './miner'

import type { JobId } from '@/game/models/Jobs'
import type { JobInfo } from '@/game/data/jobsInfo'

export const jobDefinitions: Partial<Record<JobId, JobInfo>> = {
  baker: baker,
  beggar: beggar,
  blacksmith: blacksmith,
  farmer: farmer,
  fishermen: fishermen,
  gatherer: gatherer,
  lumberjack: lumberjack,
  merchant: merchant,
  miner: miner,
}
