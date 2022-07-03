import { LM_EntityName } from "../Entity/entity"

export declare interface LM_Note {
  note_id: string
  title: string
  note: string
  entity: LM_EntityName
  entity_id: string
  createdAt: Date
  updatedAt: Date
}
