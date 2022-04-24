import { Constructor } from "../../../types/common/constructor";
import ChapterDB from "./ChapterDB"
import LM_Chapter from '../../../types/Book/chapter';

function ChapterAPI<TBase extends Constructor>(Base: TBase) {

    return class extends Base {
        public chapter = ChapterDB;

        public addChapter = async (chapter: LM_Chapter) => {
            this.chapter.add(chapter, chapter.chapter_id);
        }

        public getChapter = async (chapter_id: string) => {
            return await this.chapter.get(chapter_id);
        }

        public getChapters = async () => {
            return await this.chapter.toArray();
        }

        public updateChapter = async (chapter: LM_Chapter) => {
            return await this.chapter.update(chapter.chapter_id, chapter)
        }

        public deleteChapter = async (chapter_id: string) => {
            return await this.chapter.delete(chapter_id);
        }

    }
}

export default ChapterAPI;