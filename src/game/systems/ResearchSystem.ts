import { ResearchTypes, Tiers, type Research, type Tier } from '../models/Research'
import { UnlockTypes } from '../models/researches/ResearchUnlockable'
import { allResearch } from '../data/researches/allResearch'
import { BuildingSystem } from './BuildingSystem'
import { ResearchStates } from '../models/researches/ResearchState'
import type { JobSystem } from './JobSystem'
import type { ResourceSystem } from './ResourceSystem'

export class ResearchSystem {
  private allResearch: Research[] = allResearch
  private tier: Tier = Tiers.Tier0

  constructor(
    private buildingSystem: BuildingSystem,
    private jobSystem: JobSystem,
    private resourceSystem: ResourceSystem,
  ) {
    // research locked by default
    this.allResearch = allResearch.map((res) => ({
      ...res,
      state: res.state ?? ResearchStates.Locked,
    }))
  }

  loadResearches(saveFileResearch: Research[]) {
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

  unlockResearch(researchId: string) {
    const research = this.getResearchById(researchId)
    research.state = ResearchStates.Unlocked
  }

  completeResearch(researchId: string) {
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
            console.log('ResearchSystem: canBeUnlocked? default triggered.')
            console.log(research, res, res.unlockType)
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

  triggerResearchEffect(researchId: string) {
    const research = this.getResearchById(researchId)

    research.effect.forEach((effect) => {
      switch (effect.researchType) {
        case ResearchTypes.BuildingMult: {
          // Not currently implemented - Needs something similar to JobInput JobOutput system
          // (assuming I implement resource production on a building)
          console.log('ResearchSystem: triggerResearchEffect: BuildingMult triggered')
          console.log(researchId, effect, effect.researchType)
          break
        }
        case ResearchTypes.JobMult: {
          const jobDefinition = this.jobSystem.getJobInfoOrError(effect.targetId)
          console.log(researchId, effect, jobDefinition)
          break
        }
        // Meant for flat increase to research income
        case ResearchTypes.ResourceAddFlat: {
          const resource = this.resourceSystem.getResourceById(effect.targetId)
          if (!resource) {
            console.log(researchId, effect, resource)
            throw new Error('ResearchSystem: triggerResearchEffect: ResourceAddFlat')
          }

          resource.baseIncome += effect.value // Probably needs a refactor?
          break
        }
        case ResearchTypes.ResourceMult: {
          const resource = this.resourceSystem.getResourceById(effect.targetId)
          if (!resource) {
            console.log(researchId, effect, resource)
            throw new Error('ResearchSystem: triggerResearchEffect: ResourceMult')
          }

          resource.IncomeMultipliers[research.name] = effect.value
          break
        }
        case ResearchTypes.ResourceStorageAddFlat: {
          const resource = this.resourceSystem.getResourceById(effect.targetId)
          if (!resource) {
            console.log(researchId, effect, resource)
            throw new Error('ResearchSystem: triggerResearchEffect: ResourceStorageAddFlat')
          }

          resource.baseStorageFlatBonus[research.name] = effect.value
          break
        }
        case ResearchTypes.ResourceStorageMult: {
          const resource = this.resourceSystem.getResourceById(effect.targetId)
          if (!resource) {
            console.log(researchId, effect, resource)
            throw new Error('ResearchSystem: triggerResearchEffect: ResourceStorageMukt')
          }

          resource.baseStorageModifiers[research.name] = effect.value
          break
        }
        case ResearchTypes.UnlockBuilding: {
          this.buildingSystem.unlockBuilding(effect.targetId)
          break
        }
        case ResearchTypes.UnlockResearchTier: {
          this.setCurrentTier = effect.targetId
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
