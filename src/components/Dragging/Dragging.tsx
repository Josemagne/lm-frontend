import { any } from "cypress/types/bluebird";
import { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import useAppSelector from "../../hooks/useAppSelector";
import {
  LM_Entity,
  LM_EntityID,
  LM_EntityName,
} from "../../types/Entity/entity";

type Props = {
  type: LM_EntityName;
};

const Dragging = ({ type }: Props) => {
  const a = {
    BOOK: "book_id",
  };

  const entityIDMapping = (type: LM_EntityName): LM_EntityID => {
    switch (type) {
      case "BOOK":
        return "book_id";
      default:
        return "book_id";
    }
  };

  const entityMapping = {
    TO_READ: {},
    READING: {},
    READ: {},
  };
  let entities: any[] = [];

  // TODO Move to utils
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
  function onDragEnd(result: DropResult, provided: ResponderProvided) {}

  useEffect(() => {}, [entities]);

  return (
    <div className="lm-gc-dragging">
      <DragDropContext
        onDragEnd={(result, provided) => onDragEnd(result, provided)}
      >
        <Droppable droppableId="entities">
          {(droppable) => {
            return (
              <>
                <h3>Books</h3>
                <ul
                  className="entities"
                  {...droppable.droppableProps}
                  ref={droppable.innerRef}
                >
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
                                {...draggable.draggableProps}
                                {...draggable.dragHandleProps}
                                ref={draggable.innerRef}
                              >
                                <p>{entity.book_title}</p>
                              </li>
                            );
                          }}
                        </Draggable>
                      );
                    }
                  )}
                </ul>
              </>
            );
          }}
        </Droppable>
        <Droppable droppableId="entities_to_do">
          {(droppable) => {
            return (
              <>
                <h3>To Read</h3>
                <ul
                  className="entities_to_do"
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
                              >
                                <p>{entity.book_title}</p>
                              </li>
                            );
                          }}
                        </Draggable>
                      );
                    }
                  )}
                </ul>
              </>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Dragging;
