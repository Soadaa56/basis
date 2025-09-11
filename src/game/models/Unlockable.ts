export type UnlockRequirement = {
  type: 'resource' | 'building' | 'magic' | 'worker' | 'other'
  id: string
  amount: number
}

export interface Unlockable {
  unlockRequirements?: UnlockRequirement[]
  isUnlocked?: boolean
}
