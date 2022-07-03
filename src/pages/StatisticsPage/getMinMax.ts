import { LM_Flashcard } from "../../types/Flashcard/flashcard"
import * as d3 from "d3"

export default function getMinMax(flashcards: LM_Flashcard[]) {
  // @ts-ignore
  const xMin: Date = d3.min(flashcards, (d) => {
    return d.createdAt
  })

  // @ts-ignore
  const xMax: Date = d3.max(flashcards, (d) => {
    return d.updatedAt > d.createdAt ? d.updatedAt : d.createdAt
  })

  // @ts-ignore
  const yMin: number = d3.min(flashcards, (d) => {
    const numbers: number[] = Object.values(d.repeatedDate)

    return d3.min(numbers)
  })

  // @ts-ignore
  const yMax: number = d3.max(flashcards, (d) => {
    const numbers: number[] = Object.values(d.repeatedDate)

    return d3.max(numbers)
  })

  return { xMin, xMax, yMin, yMax }
}
