export type UnlockRequirement = {
  type: 'research' | 'building' | 'magic' | 'other'
  id: string
  amount: number
}

export type UnlockStatus = 'unlocked' | 'locked' | 'unknown'

export interface Unlockable {
  unlockRequirements?: UnlockRequirement[]
  unlockStatus?: UnlockStatus
}
