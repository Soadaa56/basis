export const MagicIds = {
  Mana: 'mana',
  Ki: 'ki',
} as const

type MagicId = (typeof MagicIds)[keyof typeof MagicIds]

export interface Magic {
  id: MagicId
  name: string
  currentAmount: number
}
