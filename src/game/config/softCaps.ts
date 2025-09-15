// In use for now until I seperate resources into different soft caps
export const softCap = [
  { factor: 1, reduction: 0.1 },
  { factor: 2, reduction: 0.25 },
  { factor: 3, reduction: 0.5 },
  { factor: 4, reduction: 0.75 },
  { factor: 5, reduction: 0.9 },
]

export const lightSoftCap = [
  { factor: 1, reduction: 0.3 },
  { factor: 2, reduction: 0.55 },
  { factor: 3, reduction: 0.75 },
  { factor: 5, reduction: 0.9 },
]

export const heavySoftCap = [
  { factor: 1, reduction: 0.6 },
  { factor: 1.5, reduction: 0.7 },
  { factor: 2, reduction: 0.8 },
  { factor: 3, reduction: 0.9 },
  { factor: 4, reduction: 0.95 },
]
