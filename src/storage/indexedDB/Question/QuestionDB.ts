import Dexie, { Table } from 'dexie';
import { LM_Question } from '../../../types/Question/question'

class QuestionDB extends Dexie {
    question!: Table<LM_Question>;

    constructor() {
        super("librimem")
        this.version(1).stores({
            "question": "question_id, questionType, question, bookcollection_id, book_id, chaptercollection_id, chapter_id"
        })
    }
}

const question = new QuestionDB();

export default question.question;
