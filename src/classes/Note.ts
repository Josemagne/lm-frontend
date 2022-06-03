import { LM_Note } from "../types/Note/note"
import { nanoid } from "nanoid"
import { LM_EntityName } from "../types/Entity/entity"

export default class Note implements LM_Note {
  note_id: string = nanoid()
  title: string
  note: string = ""
  entity: LM_EntityName
  entity_id: string
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  constructor(
    title: string,
    note: string,
    entity: LM_EntityName,
    entity_id: string
  ) {
    this.title = title
    this.entity = entity
    this.entity_id = entity_id
    this.note = note
  }
}
