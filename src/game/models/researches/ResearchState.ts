export const ResearchStates = {
  Completed: 'completed',
  InProgress: 'inProgress',
  Locked: 'locked',
  Unlocked: 'unlocked',
}

export type ResearchState = (typeof ResearchStates)[keyof typeof ResearchStates]
