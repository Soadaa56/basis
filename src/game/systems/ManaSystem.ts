import type { Magic } from '@/game/models/Magic'
import type { MagicCost } from '../models/Costs'

export class MagicSystem {
  private magic: Magic[] = []
  constructor(magic: Magic[]) {
    this.magic = magic
  }
}
