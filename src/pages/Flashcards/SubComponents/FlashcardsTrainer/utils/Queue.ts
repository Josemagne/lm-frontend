import { clear } from "console"
import { AppDispatch } from "../../../../../state/redux/store"

export default class Queue<T> {
  private data: T[]
  /**
   * Points at the index of the next elem
   */
  private rear: number
  constructor(data?: T[]) {
    if (data) {
      this.data = [...data]
      this.rear = data.length
    } else {
      this.data = []
      this.rear = 0
    }
  }

  /**
   * Add an item to the rear
   * @param element
   */
  enqueue(element: T): void {
    this.data[this.rear] = element
    this.rear++
  }

  length(): number {
    return this.rear
  }

  isEmpty(): boolean {
    return this.rear === 0
  }

  peek(): T | undefined {
    if (this.rear !== 0) return
    const firsteElem = this.data.slice(0, 1)[0]
    return firsteElem
  }

  getLast(): T {
    return this.data[this.rear - 1]
  }

  /**
   * If the wrong was selected then we dequeue and we enqueue. If the right was selected then we only dequeue
   * @returns
   */
  dequeue(wrong = true): T | undefined {
    // If the queue is empty
    if (this.rear === 0) return undefined
    if (!wrong) {
      const firstElem = this.data.slice(0, 1)[0]
      return firstElem
    }
    this.rear = this.rear - 1
  }

  print() {
    this.data.forEach((data) => {
      console.log(data)
    })
  }

  clear(): void {
    this.rear = 0
    this.data.length = 0
  }
}
