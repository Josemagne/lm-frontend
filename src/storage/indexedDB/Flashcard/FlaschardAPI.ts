import { Constructor } from "../../../types/common/constructor";
import { LM_Flashcard} from '../../../types/Flashcard/flashcard';
import {LM_EntityName} from "../../../types/Entity/entity"
import FlashcardDB from "./FlashcardDB";

export default function FlashcardAPI<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        public flashcard = FlashcardDB

        public addFlashcard = async (flashcard: LM_Flashcard) => {
            this.flashcard.add(flashcard, flashcard.flashcard_id)
        }

        public getFlashcards = async (type: LM_EntityName) => {
            return await this.flashcard.where("flashcardType").equals(type).toArray();
        }

        public updateFlashcard = async (flashcard: LM_Flashcard) => {
            return await this.flashcard.update(flashcard.flashcard_id, flashcard);
        }

        public deleteFlashcard = async (flashcard: LM_Flashcard) => {
            return await this.flashcard.delete(flashcard.flashcard_id);
        }
    }
}
