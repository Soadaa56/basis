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
      state: res.researchState ?? ResearchStates.Locked,
    }))
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

  // researchNotUnlocked could be moved to a class variable for performance?
  areUnlockRequirementsMet(): boolean {
    const currentTier = this.tier
    // get all research not unlocked or completed
    const researchNotUnlocked = allResearch.filter((res: Research) => {
      const isUnlocked = this.unlockedResearches.some((r) => r.id === res.id)
      const isCompleted = this.completedResearches.some((r) => r.id === res.id)
      return !isUnlocked && !isCompleted
    })
    const research = researchNotUnlocked.find((res) => res.unlockRequirements)
    if (!research) return false

    return (
      research.unlockRequirements?.every((res) => {
        switch (res.unlockType) {
          case UnlockTypes.BuildingUnlockRequirement:
            const allBuildings = this.buildingSystem.getAllBuildings
            return allBuildings.some((b) => b.definition.id === res.id)
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

    this.areUnlockRequirementsMet()
  }
}
