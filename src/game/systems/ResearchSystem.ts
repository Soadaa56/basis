import { ResearchTypes, Tiers, type Research, type Tier } from '../models/Research'

export class ResearchSystem {
  private allResearches: Research[] = []
  private unlockedResearches: Research[] = []
  private completedResearches: Research[] = []
  private tier: Tier = Tiers.Tier0

  constructor(allResearches: Research[]) {
    this.allResearches = allResearches
  }

  loadResearches(unlockedResearches: Research[], completedResearches: Research[]) {
    this.unlockedResearches = unlockedResearches
    this.completedResearches = completedResearches
  }

  public get getAllUnlockedResearches(): Research[] {
    return this.unlockedResearches
  }

  public get getAllCompletedResearches(): Research[] {
    return this.completedResearches
  }

  getResearchOrError(researchId: string) {
    const research = this.allResearches.find((research) => research.id == researchId)
    if (!research) {
      throw new Error(`getResearchOrError on researchId: ${researchId}`)
    }
    return research
  }

  unlockResearch(researchId: string) {
    const research = this.getResearchOrError(researchId)
    if (!this.unlockedResearches.includes(research)) {
      this.unlockedResearches.push(research)
    }
  }

  completeResearch(researchId: string) {
    const research = this.getResearchOrError(researchId)
    this.unlockedResearches = this.unlockedResearches.filter((research) => research.id !== researchId)
    this.completedResearches.push(research)
  }

  getResearchByCurrentTier() {
    const currentTier = this.tier
    const tieredResearch = this.allResearches.filter((resarch) => resarch.tier == currentTier)

    return tieredResearch
  }

  unlockedResearchByTier() {
    const currentTier = this.tier
    const tieredResearch = this.getResearchByCurrentTier()

    tieredResearch.array.forEach((element) => {})
  }

  triggerResearchEffect(researchId: string) {
    const research = this.getResearchOrError(researchId)

    research.researchEffect.forEach((effect) => {
      switch (effect.researchType) {
        case ResearchTypes.BuildingMult: {
          console.log(effect)
          break
        }
        case ResearchTypes.JobMult: {
          console.log(effect)
          break
        }
        case ResearchTypes.ResourceAddFlat: {
          console.log(effect)
          break
        }
        case ResearchTypes.ResourceMult: {
          console.log(effect)
          break
        }
        case ResearchTypes.ResourceStorageAddFlat: {
          console.log(effect)
          break
        }
        case ResearchTypes.ResourceStorageMult: {
          console.log(effect)
          break
        }
        case ResearchTypes.UnlockBuilding: {
          console.log(effect)
          break
        }
        case ResearchTypes.UnlockResearch: {
          console.log(effect)
          break
        }
        case ResearchTypes.UnlockResearchTier: {
          this.tier = effect.targetId as Tier // Technical debt? but each one has its own Unlock file and there're only a handful of these.
          break
        }
        default:
          console.log('triggerResearchEffect Default case triggered')
          console.log(effect)
          break
      }
    })
  }
}
