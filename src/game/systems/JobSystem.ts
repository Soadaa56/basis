import { jobDefinitions } from '@/game/data/jobs'
import type { JobId } from '@/game/models/Jobs'

interface JobState {
  assignedWorkers: number
  MaxJobSlots: number
}

export class JobSystem {
  private jobs: Record<JobId, JobState> = {}

  isJobUnlocked(jobId: JobId) {
    const jobInfo = jobDefinitions[jobId]

    return jobInfo?.unlocked
  }

  addJobSlots(jobId: JobId, numberOfJobSlots: number) {
    if (this.isJobUnlocked(jobId)) {
    } else {
    }
  }
}
