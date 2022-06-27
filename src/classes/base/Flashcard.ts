import { FlashcardStatus, LM_Flashcard } from "../../types/Flashcard/flashcard"
import { LM_EntityName } from "../../types/Entity/entity"
import { nanoid } from "nanoid"

class Flashcard implements LM_Flashcard {
  flashcard_id: string = nanoid()
  flashcardStatus: FlashcardStatus = "NEW"
  question = ""
  answer = ""
  status: FlashcardStatus = "NEW"
  entity: {
    entityType: LM_EntityName
    entityID: string
  }
  timesRepeated: number = 0
  repeatedDate: {} = {}
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  constructor(
    flashcard_id: string,
    question: string,
    answer: string,
    entityType: LM_EntityName,
    entityID: string
  ) {
    this.entity = { entityID, entityType }
    this.flashcard_id = flashcard_id
    this.question = question
    this.answer = answer
    this.entity.entityType = entityType
    this.entity.entityID = entityID
  }
}

export default Flashcard
