import LM_EntityName from "../Entity/entity"

/**
 * The status of the flashcard.
 * NEW means that it has never been revised before
 * LEARNING means that we are revising the flashcard at the moment
 * LEARNT means that we have fully comprehended the flashcard
 */
declare type FlashcardStatus = "NEW" | "LEARNING" | "LEARNT"

export declare interface LM_Flashcard {
  flashcard_id: string
  status: FlashcardStatus
  /**
   * HTML string with question
   */
  question: string
  /**
   * HTML string with answer
   */
  /**
   * The number of times the flashcard was repeated in training
   */
  timesRepeated: number
  answer: string
  // bookcollection_id: string | undefined;
  // book_id: string | undefined;
  // subchapter_id: string | undefined;
  // chapter_id: string | undefined;
  // articlecollection_id: string | undefined;
  // article_id: string | undefined;
  /**
   * Shows how often the flashcard was revised on the specific date
   */
  repeatedDate: {
    [date: Date]: number
  }
  /**
   * When the flashcard was created
   */
  createdAt: Date
  /**
   * When the flashcard was last revised
   */
  updatedAt: Date
  entity: {
    entityType: LM_EntityName
    entityID: string
  }
}
