import { jobDefinitions } from '@/game/data/jobs'
import type { Job, JobId } from '@/game/models/Jobs'
import type { ResourceSystem } from './ResourceSystem'
import type { JobInfo } from '../data/jobsInfo'
import type { ResourceId } from '../models/Resource'
import type { BuildingId } from '../data/buildingsId'

export class JobSystem {
  private jobs: Job[] = []

  constructor(
    jobs: Job[],
    private resourceSystem: ResourceSystem,
  ) {
    this.jobs = jobs
  }

  loadJobs(jobs: Job[]): void {
    this.jobs = jobs
  }

  public get getAllJobs(): Job[] {
    return this.jobs
  }

  getJobById(jobId: JobId): Job {
    const job = this.jobs.find((job) => job.id === jobId)
    if (!job) throw new Error(`Could not get job by jobId: ${jobId}.`)
    return job
  }

  doesJobExist(jobId: JobId): boolean {
    return Boolean(this.jobs.some((job) => job.id === jobId))
  }

  createNewJob(jobId: JobId): void {
    if (this.doesJobExist(jobId)) return
    const jobInfo = jobDefinitions[jobId]
    if (!jobInfo) throw new Error(`createNewJob: jobInfo should exist for jobId: ${jobId}`)

    const newJob: Job = {
      id: jobId,
      name: jobId.charAt(0).toUpperCase() + jobId.slice(1),
      totalJobs: 0,
      assignedWorkers: 0,
      baseOutputs: jobInfo.baseOutputs,
      baseInputs: jobInfo.baseInputs,
      multipliers: {},
      resourceMults: {} as Record<ResourceId, number[]>,
    }

    this.jobs.push(newJob)
    const jobResourceIds = this.allJobResourceIds(newJob.id)
    jobResourceIds.forEach((resourceId) => this.resourceSystem.ensureResourceExists(resourceId))
  }

  allJobResourceIds(jobId: JobId): ResourceId[] {
    const job = this.getJobById(jobId)
    const resourceOutputIds = job.baseOutputs.map((output) => output.resourceId) ?? []
    const resourceInputIds = job.baseInputs?.map((input) => input.resourceId) ?? []

    return [...resourceOutputIds, ...resourceInputIds]
  }

  addJobSlots(jobId: JobId, numberOfJobSlots: number): void {
    if (!this.doesJobExist(jobId)) {
      this.createNewJob(jobId)
    }
    const job = this.getJobById(jobId)
    if (!job) throw new Error(`Job ${job} should exist after creation`)

    job.totalJobs += numberOfJobSlots
  }

  // Caching is possible here on mult calculations
  // This should be called on job assignment or infrequently on new mults (from research/meta)
  jobResourceContribution(jobId: JobId): void {
    const job = this.getJobById(jobId)

    job.baseOutputs.forEach((output) => {
      // multiply all mults if there is any, otherwise default to 1 (same as no mult).
      const resourceMult = (job.resourceMults?.[output.resourceId] ?? [1]).reduce(
        (sum, value) => sum * value,
        1,
      )
      const jobMult = (Object.values(job.multipliers) ?? [1]).reduce((sum, value) => sum * value, 1)
      const totalOutput = output.rate * job.assignedWorkers * (resourceMult * jobMult)

      this.resourceSystem.addJobContribution(output.resourceId, jobId, totalOutput)
    })

    job.baseInputs?.forEach((input) => {
      const resourceMult = (job.resourceMults?.[input.resourceId] ?? [1]).reduce(
        (sum, value) => sum * value,
        1,
      )
      const reduceRateMult = (input.reduceRateMults ?? [1]).reduce((sum, value) => sum * value, 1)
      // negative totalInput to simulate consumption of resources
      const totalInput = input.rate * job.assignedWorkers * (resourceMult * reduceRateMult) * -1

      this.resourceSystem.addJobContribution(input.resourceId, jobId, totalInput)
    })
  }

  // If each building gives 5% bonus, 5 building should give a final bonus of 25%
  updateBuildingJobMult(jobId: JobId, buildingId: BuildingId, mult: number, count: number): void {
    const job = this.getJobById(jobId)
    job.multipliers[buildingId] = Math.pow(mult, count)
  }

  // Consolidate all research upgrades, final is multiplicative (20% and 20% = 42% total)
  updateResearchJobMult(jobId: JobId, mult: number): void {
    const job = this.getJobById(jobId)
    const researchMult = (job.multipliers['research'] ?? [1]) * mult

    job.multipliers['research'] = researchMult
    this.jobResourceContribution(jobId)
  }

  addResourceToJobOutput(jobId: JobId, resourceId: ResourceId, rate: number): void {
    const job = this.getJobById(jobId)

    job.baseOutputs.push({
      resourceId: resourceId,
      rate: rate,
    })
    this.jobResourceContribution(jobId)
  }

  private getJobInfoById(jobId: JobId): JobInfo {
    const jobInfo = jobDefinitions[jobId]
    if (!jobInfo) throw new Error(`Could not get jobInfo with jobId: ${jobId}`)

    return jobInfo
  }
}
