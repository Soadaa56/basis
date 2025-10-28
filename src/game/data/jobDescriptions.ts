import type { JobId } from '../models/Jobs'

export const JobDescriptions: Partial<Record<JobId, string>> = {
  baker: 'Bakes fresh bread and pastries.',
  beggar: 'Goes to the city to beg for coin. Probably shares most of their earnings with you',
  blacksmith: 'Turns useless lumps of metal into tools.',
  farmer: 'Works the field.',
  fishermen: "Pretends they're hard at work most of the day.",
  lumberjack: "Sterotypical 'chad' job.",
  merchant: 'What are ya selling, stranger?',
  miner: "*cough**cough* I think I'm getting the black lung pop.",
}
