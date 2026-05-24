export class Queue<T> extends Array<T> {
  constructor(readonly size: number) {
    super()
  }

  push(...items: T[]): number {
    for (const item of items) {
      this.addToQueue(item)
    }

    return items.length
  }

  private addToQueue(item: T) {
    if (this.length >= this.size) {
      super.shift()
    }
    super.push(item)
  }
}
