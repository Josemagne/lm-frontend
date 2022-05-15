import { any } from "cypress/types/bluebird"
import { Fragment, useEffect } from "react"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
  DragUpdate,
  DragStart,
} from "react-beautiful-dnd"
import useAppSelector from "../../hooks/useAppSelector"
import BookContainer from "../../pages/Books/BooksViewer/SubComponents/BookContainer/BookContainer"
import {
  LM_Entity,
  LM_EntityID,
  LM_EntityName,
} from "../../types/Entity/entity"
import API from "../../api/API"
import FAPI from "../../storage/indexedDB/FAPI"
import { updateBook, booksSelector } from "../../state/redux/features/bookSlice"
import useAppDispatch from "../../hooks/useAppDispatch"

type Props = {
  type: LM_EntityName
  /**
   * Title for the entity
   */
  title: string
}

const Dragging = ({ type, title }: Props) => {
  const dispatch = useAppDispatch()
  /**
   * Maps the entity name to their id name
   * @param type
   * @example "BOOK" --> "book_id"
   * @returns
   */
  const entityIDMapping = (type: LM_EntityName): LM_EntityID => {
    switch (type) {
      case "BOOK":
        return "book_id"
      case "CHAPTER":
        return "chapter_id"
      default:
        return "book_id"
    }
  }

  interface EntityMapping {
    TO_READ: {
      [id: string]: LM_Entity
    }
    READING: {
      [id: string]: LM_Entity
    }
    READ: {
      [id: string]: LM_Entity
    }
  }

  /**
   * Object that contains the mapped entities for the LM_EntityStatus
   */
  const entityMapping: EntityMapping = {
    TO_READ: {},
    READING: {},
    READ: {},
  }

  /**
   * Contains the entities that we will fetch
   */
  let entities: any[] = []

  // TODO Move to utils
  /**
   * Decides which LM_Entity we will fetch
   * @param entity
   */
  const chooseEntity = (entity: string) => {
    switch (entity) {
      case "BOOK":
        {
          entities = useAppSelector(booksSelector)
        }
        break
      default: {
      }
    }
  }

  /**
   * Distributes the entities in their LM_EntityStatus
   * @param entity
   */
  const distributeEntity = (entity: LM_Entity[]) => {
    entity.forEach((ent: any) => {
      if (ent.status === "TO_READ") {
        // TODO Better?
        // @ts-ignore
        entityMapping.TO_READ[ent[entityIDMapping(type)]] = ent
      } else if (ent.status === "READING") {
        entityMapping.READING[ent[entityIDMapping(type)]] = ent
      } else if (ent.status === "READ") {
        // @ts-ignore
        entityMapping.READ[ent[entityIDMapping(type)]] = ent
      }
    })
  }

  chooseEntity(type)
  distributeEntity(entities)

  console.log("mapping: ", entityMapping)
  console.log("mapping entities: ", entities)

  // Move to utils

  /**
   * Calls the update function for redux, API and FAPIwith given entity obj
   */
  function mappingUpdate(entityName: LM_EntityName, entityObject: LM_Entity) {
    console.log("mappingUpdate called with: ", entityName, entityObject)
    switch (entityName) {
      case "BOOK":
        dispatch(updateBook(entityObject))
        // await FAPI.updateBook(entityObject)
        API.updateBook(entityObject)
        break
      default:
        break
    }
  }

  function sourceMapping(source: string) {
    switch (source) {
      case "entities":
        return "TO_READ"
        break
      case "entities_doing":
        return "READING"
        break
      case "entities_done":
        return "READ"
        break
      default:
        break
    }
  }

  function onDragStart(event: DragStart) {}

  function onDragUpdate(event: DragUpdate) {}

  function onDragEnd(result: DropResult, provided: ResponderProvided) {
    const { source, destination, draggableId } = result
    console.log("onDragEnd start")

    // Do not do anything if it was the same droppable
    if (destination && destination.droppableId === source.droppableId) return

    // If dragged to entities_doing
    if (destination && destination.droppableId === "entities_doing") {
      const draggedEntity = entities.find(
        (entity) => entity[entityIDMapping(entity)] === draggableId
      )

      entityMapping.READING[draggableId] = draggedEntity
      // @ts-ignore
      delete entityMapping[sourceMapping(source.droppableId)][draggableId]

      console.log("entityMapping in entities_doing", entityMapping)
      console.log("entities: ", entities)
      const entityCopy = JSON.parse(JSON.stringify(draggedEntity))
      entityCopy.status = "READING"
      mappingUpdate(type, entityCopy)
    }

    // If dragged to entities_done
    else if (destination && destination.droppableId === "entities_done") {
      const draggedEntity = entities.find(
        (entity) => entity[entityIDMapping(entity)] === draggableId
      )

      const entityCopy = JSON.parse(JSON.stringify(draggedEntity))
      entityCopy.status = "READ"
      console.log("entityCopy: ", entityCopy)
      entityMapping.READ[draggableId] = entityCopy

      console.log("entityMapping in entities_done", entityMapping)
      console.log("entities: ", entities)
      // @ts-ignore
      delete entityMapping[sourceMapping(source.droppableId)][draggableId]
      mappingUpdate(type, entityCopy)
    }

    // If dragged to entities
    else if (destination && destination.droppableId === "entities") {
      const draggedEntity = entities.find(
        (entity) => entity[entityIDMapping(entity)] === draggableId
      )

      const entityCopy = JSON.parse(JSON.stringify(draggedEntity))
      entityCopy.status = "TO_READ"
      entityMapping.TO_READ[draggableId] = entityCopy

      console.log("entityMapping in entities", entityMapping)
      console.log("entities: ", entities)
      // @ts-ignore
      delete entityMapping[sourceMapping(source.droppableId)][draggableId]
      mappingUpdate(type, entityCopy)
    }
  }
  useEffect(() => {
    console.log("entityMapping: ", entityMapping)
    console.log("entites: ", entities)
  }, [entities, entityMapping])

  return (
    <div className="lm-gc-dragging">
      <DragDropContext
        onDragEnd={(result, provided) => onDragEnd(result, provided)}
      >
        <div className="entities_container">
          <h3>{title}</h3>
          <Droppable droppableId="entities">
            {(droppable, snapshot) => {
              return (
                <div>
                  <ul {...droppable.droppableProps} ref={droppable.innerRef}>
                    {Object.values(entityMapping.TO_READ).map(
                      (entity: any, index) => {
                        return (
                          <Draggable
                            key={entity[entityIDMapping(type)]}
                            draggableId={entity[entityIDMapping(type)]}
                            index={index}
                          >
                            {(draggable) => {
                              return (
                                <li
                                  {...draggable.draggableProps}
                                  {...draggable.dragHandleProps}
                                  ref={draggable.innerRef}
                                  className="draggable-item"
                                >
                                  <BookContainer book={entity} />
                                </li>
                              )
                            }}
                          </Draggable>
                        )
                      }
                    )}
                  </ul>
                  {droppable.placeholder}
                </div>
              )
            }}
          </Droppable>
        </div>
        <div className="entities_container">
          <h3>Reading</h3>
          <Droppable droppableId="entities_doing">
            {(droppable, snapshot) => {
              return (
                <div>
                  <ul {...droppable.droppableProps} ref={droppable.innerRef}>
                    {Object.values(entityMapping.READING).map(
                      (entity: any, index) => {
                        return (
                          <Draggable
                            key={entity[entityIDMapping(type)]}
                            draggableId={entity[entityIDMapping(type)]}
                            index={index}
                          >
                            {(draggable) => {
                              return (
                                <li
                                  {...draggable.dragHandleProps}
                                  {...draggable.draggableProps}
                                  ref={draggable.innerRef}
                                  className="draggable-item"
                                >
                                  <BookContainer book={entity} />
                                </li>
                              )
                            }}
                          </Draggable>
                        )
                      }
                    )}
                  </ul>
                  {droppable.placeholder}
                </div>
              )
            }}
          </Droppable>
        </div>
        <div className="entities_container">
          <h3>Read</h3>
          <Droppable droppableId="entities_done">
            {(droppable, snapshot) => {
              return (
                <div>
                  <ul {...droppable.droppableProps} ref={droppable.innerRef}>
                    {Object.values(entityMapping.READ).map(
                      (entity: any, index) => {
                        return (
                          <Draggable
                            key={entity[entityIDMapping(type)]}
                            draggableId={entity[entityIDMapping(type)]}
                            index={index}
                          >
                            {(draggable) => {
                              return (
                                <li
                                  {...draggable.dragHandleProps}
                                  {...draggable.draggableProps}
                                  ref={draggable.innerRef}
                                  className="draggable-item"
                                >
                                  <BookContainer book={entity} />
                                  {droppable.placeholder}
                                </li>
                              )
                            }}
                          </Draggable>
                        )
                      }
                    )}
                  </ul>
                  {droppable.placeholder}
                </div>
              )
            }}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  )
}

export default Dragging
