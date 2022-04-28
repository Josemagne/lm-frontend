import { any } from "cypress/types/bluebird";
import { Fragment, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import useAppSelector from "../../hooks/useAppSelector";
import BookContainer from "../../pages/Books/BooksViewer/SubComponents/BookContainer/BookContainer";
import {
  LM_Entity,
  LM_EntityID,
  LM_EntityName,
} from "../../types/Entity/entity";

type Props = {
  type: LM_EntityName;
  /**
   * Title for the entity
   */
  title: string;
};

const Dragging = ({ type, title }: Props) => {
  /**
   * Maps the entity name to their id name
   * @param type
   * @example "BOOK" --> "book_id"
   * @returns
   */
  const entityIDMapping = (type: LM_EntityName): LM_EntityID => {
    switch (type) {
      case "BOOK":
        return "book_id";
      default:
        return "book_id";
    }
  };

  interface EntityMapping  {
    TO_READ: {
      [id: string]: LM_Entity
    };
    READING: {
      [id: string]: LM_Entity
    };
    READ: {
      [id: string]: LM_Entity
    };
  }

  /**
   * Object that contains the mapped entities for the LM_EntityStatus
   */
  const entityMapping: EntityMapping = {
    TO_READ: {},
    READING: {},
    READ: {},
  };

  /**
   * Contains the entities that we will fetch
   */
  let entities: any[] = [];

  // TODO Move to utils
  /**
   * Decides which LM_Entity we will fetch
   * @param entity
   */
  const chooseEntity = (entity: string) => {
    switch (entity) {
      case "BOOK":
        {
          entities = Object.values(
            useAppSelector((state) => state.books.books.books)
          );
        }
        break;
      default: {
      }
    }
  };

  /**
   * Distributes the entities in their LM_EntityStatus
   * @param entity
   */
  const distributeEntity = (entity: LM_Entity[]) => {
    entity.forEach((ent: any) => {
      if (ent.status === "TO_READ") {
        // TODO Better?
        // @ts-ignore
        entityMapping.TO_READ[ent[entityIDMapping(type)]] = ent;
      } else if (ent.status === "READ") {
        // @ts-ignore
        entityMapping.READ[ent[entityIDMapping(type)]] = ent;
      }
    });
  };

  chooseEntity(type);
  distributeEntity(entities);

  console.log("mapping: ", entityMapping);
  console.log("mapping entities: ", entities);
  function onDragEnd(result: DropResult, provided: ResponderProvided) {
    console.log(result, provided)
    const {source, destination, draggableId } = result;

    if (destination && destination.droppableId === "entities_doing") {
      entityMapping.READING[draggableId] = entities.find((entity) => entity[entityIDMapping(entity)] === draggableId);
    }
    }

  useEffect(() => {}, [entities, entityMapping]);

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
              <div style={{
                backgroundColor: snapshot.isDraggingOver ? "green" : 'lightgray'
                }}>
                <ul
                  {...droppable.droppableProps}
                  ref={droppable.innerRef}
                >
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
                                <BookContainer
                                  book={entity}
                                />
                              </li>
                            );
                          }}
                        </Draggable>
                      );
                    }
                  )}
                </ul>
                            {droppable.placeholder}
              </div>
            );
          }}
        </Droppable>
        </div>
        <div className="entities_container">
                <h3>To Read</h3>
        <Droppable droppableId="entities_doing">
          {(droppable,snapshot) => {
            return (
              <div style={{
                backgroundColor: snapshot.isDraggingOver ? "green" : 'lightgray'
                }}>
                <ul
                  {...droppable.droppableProps}
                  ref={droppable.innerRef}
                >
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
                            );
                          }}
                        </Draggable>
                      );
                    }
                  )}
                </ul>
              {droppable.placeholder}
              </div>
            );
          }}
        </Droppable>
        </div>
        <div className="entities_container">
                <h3>Read</h3>
        <Droppable droppableId="entities_done">
          {(droppable, snapshot) => {
            return (
              <div style={{
                backgroundColor: snapshot.isDraggingOver ? "green" : 'lightgray'
                }}>
                <ul
                  {...droppable.droppableProps}
                  ref={droppable.innerRef}
                >
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
              {droppable.placeholder}
                              </li>
                            );
                          }}
                        </Draggable>
                      );
                    }
                  )}
                </ul>
              {droppable.placeholder}
              </div>
            );
          }}
        </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dragging;
