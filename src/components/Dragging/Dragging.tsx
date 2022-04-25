import { any } from "cypress/types/bluebird";
import { Fragment, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { Panel } from "rsuite";
import useAppSelector from "../../hooks/useAppSelector";
import AuthorViewer from "../../pages/Books/BooksViewer/SubComponents/AuthorViewer/AuthorViewer";
import BookContainer from "../../pages/Books/BooksViewer/SubComponents/BookContainer/BookContainer";
import ImageViewer from "../../pages/Books/BooksViewer/SubComponents/ImageViewer/ImageViewer";
import PagesViewer from "../../pages/Books/BooksViewer/SubComponents/PagesViewer/PagesViewer";
import ProgressViewer from "../../pages/Books/BooksViewer/SubComponents/ProgressViewer/ProgressViewer";
import TitleViewer from "../../pages/Books/BooksViewer/SubComponents/TitleViewer/TitleViewer";
import {
  LM_Entity,
  LM_EntityID,
  LM_EntityName,
} from "../../types/Entity/entity";

type Props = {
  type: LM_EntityName;
};

const Dragging = ({ type }: Props) => {
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

  /**
   * Object that contains the mapped entities for the LM_EntityStatus
   */
  const entityMapping = {
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
  function onDragEnd(result: DropResult, provided: ResponderProvided) {}

  useEffect(() => {}, [entities, entityMapping]);

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
                                  book_id={entity.book_id}
                                  key={entity.book_id}
                                  children={
                                    <Panel
                                      header={
                                        <Fragment>
                                          <AuthorViewer
                                            author_prename={
                                              entity.author_prename
                                            }
                                            author_name={entity.author_name}
                                          />
                                          <TitleViewer
                                            title={entity.book_title}
                                          />
                                          <ProgressViewer
                                            progress={entity.progress}
                                          />
                                          <PagesViewer pages={entity.pages} />
                                          <ImageViewer />
                                        </Fragment>
                                      }
                                    ></Panel>
                                  }
                                />
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
                                className="draggable-item"
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
