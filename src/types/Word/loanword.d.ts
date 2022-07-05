import { LM_Entity } from "../Entity/entity";

declare interface LM_Loanword {
    /**
     * The word is the primary key
     */
    word: string;
    entity: LM_Entity;
    /**
     * The entity the loanword belongs to
     */
    entity_id: string;
    language: "german" | "english" | "french" | "spanish" | "italian";
    /**
     * The word itself
     */
    translation: string;
}