import { Constructor } from "../../types/common/constructor";
import ChapterAPI from "./Chapter/ChapterAPI"
import BookAPI from './Book/BookAPI';
import FlashcardAPI from "./Flashcard/FlaschardAPI";

function FAPIMixin<TBase extends Constructor>(Base: TBase) {
    return class extends Base {

    }
}

const FAPI = FAPIMixin(ChapterAPI(BookAPI(FlashcardAPI(class { }))));

export default new FAPI();