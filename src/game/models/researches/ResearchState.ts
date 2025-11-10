export const ResearchStates = {
  Completed: 'completed',
  inProgress: 'inProgress',
  Unlocked: 'unlocked',
  Locked: 'locked',
}

export type ResearchState = (typeof ResearchStates)[keyof typeof ResearchStates]
