import { ResearchTypes, Tiers, type Research, type Tier } from '../models/Research'
import { UnlockTypes } from '../models/researches/ResearchUnlockable'
import { Building } from '@/game/models/Buildings'

export class ResearchSystem {
  private allResearches: Research[] = []
  private unlockedResearches: Research[] = []
  private completedResearches: Research[] = []
  private tier: Tier = Tiers.Tier0
  private buildings: Building[]

  constructor(allResearches: Research[], buildings: Building[]) {
    this.allResearches = allResearches
    this.buildings = buildings
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

  public set setCurrentTier(v: Tier) {
    this.tier = v
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
    const tieredResearch = this.allResearches.filter((research) => research.tier == currentTier)

    return tieredResearch
  }

  areUnlockRequirementsMet(research: Research, building: Building[]): boolean {
    const currentTier = this.tier

    return (
      research.unlockRequirements?.every((res) => {
        switch (res.unlockType) {
          case UnlockTypes.BuildingUnlockRequirement:
            return building.some((b) => b.definition.id == res.id)
          case UnlockTypes.TierUnlockRequirement:
            const unlockTier = res.id

            if (typeof unlockTier !== 'number') {
              console.log('ResearchSystem: areUnlockRequirementsMet Bug')
              console.log(research, res.unlockType, unlockTier)
              return false
            }

            return currentTier >= unlockTier
          case UnlockTypes.ResearchUnlock:
            if (typeof res.id !== 'string') return false

            return this.completedResearches.some((completedResearch) => completedResearch.id === res.id)
          case UnlockTypes.MagicUnlock: // Magic System not yet implemented
            console.log(research, res, res.unlockType)
            return true
          default:
            console.log('ResearchSystem areUnlockRequirementsMet default triggered.')
            console.log(research, res, res.unlockType)
            return true
        }
      }) ?? false // if unlockRequirements is underfined
    )
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
