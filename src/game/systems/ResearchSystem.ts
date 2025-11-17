import { ResearchTypes, Tiers, type Research, type Tier } from '../models/Research'
import { UnlockTypes } from '../models/researches/ResearchUnlockable'
import { BuildingSystem } from './BuildingSystem'
import { ResearchStates } from '../models/researches/ResearchState'
import type { JobSystem } from './JobSystem'
import type { ResourceSystem } from './ResourceSystem'

export class ResearchSystem {
  private allResearch: Research[]
  private tier: Tier = Tiers.Tier0

  constructor(
    private gameStateResearch: Research[],
    private buildingSystem: BuildingSystem,
    private jobSystem: JobSystem,
    private resourceSystem: ResourceSystem,
  ) {
    this.allResearch = gameStateResearch
  }

  loadResearch(saveFileResearch: Research[]) {
    this.allResearch = saveFileResearch
  }

  public get getAllResearch(): Research[] {
    return this.allResearch
  }

  public get getAllCompletedResearch(): Research[] {
    return this.allResearch.filter((res) => res.state === ResearchStates.Completed)
  }

  public get getAllUnlockedResearch(): Research[] {
    return this.allResearch.filter((res) => res.state === ResearchStates.Unlocked)
  }

  public get getAllLockedResearch(): Research[] {
    return this.allResearch.filter((res) => res.state === ResearchStates.Locked)
  }

  public set setCurrentTier(v: Tier) {
    this.tier = v
  }

  getResearchById(researchId: string): Research {
    const research = this.allResearch.find((res) => res.id === researchId)
    if (!research) {
      throw new Error(`getResearchById Error: ${researchId}`)
    }
    return research
  }

  unlockResearch(researchId: string): void {
    const research = this.getResearchById(researchId)
    research.state = ResearchStates.Unlocked
  }

  completeResearch(researchId: string): void {
    const research = this.getResearchById(researchId)
    research.state = ResearchStates.Completed
  }

  canBeUnlocked(researchId: string): boolean {
    const research = this.getResearchById(researchId)
    const currentTier = this.tier

    return (
      research.unlockRequirements?.every((res) => {
        switch (res.unlockType) {
          case UnlockTypes.BuildingUnlockRequirement:
            const allBuildings = this.buildingSystem.getAllBuildings

            return allBuildings.some((b) => b.definition.id === res.id)
          case UnlockTypes.TierUnlockRequirement:
            const unlockTier = res.id
            if (typeof unlockTier !== 'number') {
              console.log('ResearchSystem: canBeUnlocked? Bug')
              console.log(research, res.unlockType, unlockTier)
              return false
            }

            return currentTier >= unlockTier
          case UnlockTypes.ResearchUnlock:
            const requiredResearch = this.getResearchById(res.id as string)

            return requiredResearch.state === ResearchStates.Completed
          case UnlockTypes.MagicUnlock: // Magic System not yet implemented
            console.log(research, res, res.unlockType)
            return true
          default:
            console.log(
              'ResearchSystem: canBeUnlocked? default triggered.',
              research,
              res,
              res.unlockType,
            )
            return true
        }
      }) ?? false // if unlockRequirements is underfined
    )
  }

  checkLockedResearch(): void {
    const lockedResearch = this.getAllLockedResearch

    lockedResearch.forEach((res) => {
      if (this.canBeUnlocked(res.id)) {
        this.unlockResearch(res.id)
      }
    })
  }

  triggerResearchEffect(researchId: string): void {
    const research = this.getResearchById(researchId)

    research.effect.forEach((effect) => {
      switch (effect.type) {
        // Needs something similar to JobInput JobOutput system (if I implement)
        // case ResearchTypes.BuildingMult: {
        //   break
        // }
        case ResearchTypes.JobMult: {
          this.jobSystem.updateResearchJobMult(effect.targetId, effect.value)
          break
        }
        case ResearchTypes.ResourceAddFlat: {
          this.resourceSystem.updateBaseIncome(effect.targetId, effect.value)
          break
        }
        case ResearchTypes.ResourceMult: {
          this.resourceSystem.updateResearchMult(effect.targetId, effect.value)
          break
        }
        case ResearchTypes.ResourceStorageAddFlat: {
          this.resourceSystem.updateBaseStorage(effect.targetId, effect.value)
          break
        }
        // case ResearchTypes.ResourceStorageMult: {
        //   break
        // }
        case ResearchTypes.UnlockBuilding: {
          this.buildingSystem.unlockBuilding(effect.targetId)
          break
        }
        case ResearchTypes.UnlockJobResource: {
          this.jobSystem.addResourceToJobOutput(effect.jobId, effect.resourceId, effect.rate)
          break
        }
        case ResearchTypes.UnlockResearchTier: {
          this.setCurrentTier = effect.targetId
          break
        }
        default:
          console.warn('triggerResearchEffect Default case triggered')
          console.log(effect)
          break
      }
    })
  }
}
