import { LM_EntityName } from "./Entity/entity";

declare interface LM_Character {
    character_id: string;
    entity: LM_EntityName;
    entity_id: string;
    /**
     * Name of the character
     */
    name: string;
    real?: boolean;
    description?: string;
    /**
     * Decides if the character appeared in the chapter
     */
    chapters_appeared?: {
        [chapter_id: string]: boolean;
    }
    favorite?: boolean;
}