import { type ResourceId } from '@/game/models/Resource'

export interface JobOutput {
  resource: ResourceId
  rate: number
}

export interface JobInput {
  resource: ResourceId
  rate: number
}

// Not sure if any job will do anything besides produce resources
export type JobInfo =
  | {
      unlocked: boolean
      output: JobOutput[]
      input?: JobInput[]
    }
  | {
      unlocked: boolean
      recipes: [
        {
          unlocked: boolean
          output: JobOutput[]
          input: JobInput[]
        },
      ]
    }

/* I'm focusing on getting working prototype out first.
I like the idea for jobs/building who may have multiple 
different linked input/outputs to use recipes.
Keep this has a second union option for JobInfo
*/
