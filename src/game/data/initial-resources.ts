// src/game/data/initialResources.ts
import type { Resource } from '../models/Resource'

export const initialResources: Resource[] = [
  {
    id: 'gold',
    name: 'Gold',
    currentAmount: 10,
    baseStorage: 100,
    baseStorageModifiers: [],
    calculatedStorage: 100,
    baseIncome: 1,
    baseIncomeModifiers: [],
    calculatedIncome: 1,
    lastUpdated: Date.now(),
  },
  {
    id: 'food',
    name: 'Food',
    currentAmount: 10,
    baseStorage: 100,
    baseStorageModifiers: [],
    calculatedStorage: 100,
    baseIncome: 1,
    baseIncomeModifiers: [],
    calculatedIncome: 1,
    lastUpdated: Date.now(),
  },
  {
    id: 'wood',
    name: 'Wood',
    currentAmount: 10,
    baseStorage: 100,
    baseStorageModifiers: [],
    calculatedStorage: 100,
    baseIncome: 1,
    baseIncomeModifiers: [],
    calculatedIncome: 1,
    lastUpdated: Date.now(),
  },
]
