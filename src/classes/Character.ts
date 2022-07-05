import { LM_Character } from "../types/character";
import { LM_Entity, LM_EntityName } from "../types/Entity/entity";
import { nanoid } from 'nanoid';

export default class Character implements LM_Character {
    character_id: string = nanoid();
    entity: LM_EntityName;
    entity_id: string;
    name: string;
    real?: boolean;
    description?: string;
    chapters_appeared?: { [chapterd_id: string]: boolean }
    favorite?: boolean;

    constructor(
        entity: LM_EntityName,
        entity_id: string,
        name: string,
        real?: boolean,
        description?: string,
        chapters_appeared?: { [chapterd_id: string]: boolean },
        favorite?: boolean
    ) {
        this.entity = entity
        this.entity_id = entity_id
        this.name = name
        this.real = real
        this.description = description
        this.chapters_appeared = chapters_appeared
        this.favorite = favorite
    }


}