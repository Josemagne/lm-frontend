import { LM_Entity } from "../Entity/entity";
import { LM_Loanword } from "./loanword";

declare interface LM_Vocabulary {
    vocabulary_id: string;
    entity: LM_Entity;
    /**
     * The entity the vocabulary belongs to
     */
    entity_id: string;
    language: "german" | "english" | "french" | "spanish" | "italian";
    loanwords: {
        [loanword: string]: LM_Loanword;
    }
}