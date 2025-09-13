export class WorkerSystem {
  workerCount: number
  constructor(workerCount: number = 1) {
    this.workerCount = workerCount
  }

  // For Game Resets
  setWorkerCount(workerCount: number) {
    this.workerCount = workerCount
  }

  increaseWorkerCount(number: number) {
    for (let i = 0; i < number; i++) {
      this.workerCount++
    }
  }

  getWorkerCount(): number {
    return this.workerCount
  }
}
