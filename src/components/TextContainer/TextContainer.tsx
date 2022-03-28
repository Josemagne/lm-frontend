import {
  useState,
  useCallback,
  SetStateAction,
  Dispatch,
  useRef,
  useEffect,
} from "react";
import { useMemo } from "react";
import { withReact, Slate, Editable, RenderElementProps } from "slate-react";
import { createEditor, Node, Descendant, Transforms } from "slate";
import { FieldInputProps } from "formik";
import { LM_TextcontainerActions } from "../../types/slate/actions";
import LM_Chapter from "../../types/Book/chapter";
import { LM_Book } from "../../types/Book/book";
import useAppDispatch from "../../../build/hooks/useAppDispatch";
import {
  changeSelectedBook,
  changeSelectedChapter,
} from "../../state/redux/features/bookSlice";

type Props = {
  /**
   * Values from formik
   */
  values?: FieldInputProps<Descendant[]>;
  content?: Descendant[];
  chapterId?: string;
  name: string;
  /**
   * The entity whose text field we are manipulating
   */
  entity?: any;
  action?: LM_TextcontainerActions;

  chapterIndex?: number;
  changeHandler?: (newEntity: any) => void;
};

const TextContainer = ({
  values,
  content,
  name,
  changeHandler,
  entity,
  chapterIndex,
  chapterId,
  action,
}: Props) => {
  const editorRef: any = useRef(null);

  const dispatch = useAppDispatch();
  // @ts-ignore
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(
    content ? content : values ? values.value : [{ children: [{ text: "" }] }]
  );
  const handleChange = (v: Descendant[]) => {
    setValue(v);
    const entityCopy = JSON.parse(JSON.stringify(entity));
    console.log("entityCopy", entityCopy);
    if (!entity) return;
    if (!changeHandler) return;
    if (action === "AddSummaryToBook") {
      console.log("AddSummaryToBook");
      console.log("ChapterIndex before", chapterIndex);
      const entityCopy = JSON.parse(JSON.stringify(entity));
      if (!chapterId) return;
      (entityCopy as LM_Book).chapters[chapterId].summary = v;
      dispatch(
        changeSelectedBook({ book_id: entityCopy.book_id, book: entityCopy })
      );

      changeHandler(entityCopy);
    }
  };

  useEffect(() => {}, [content]);

  return (
    <div className="lm-textcontainer">
      {/* @ts-ignore */}
      <Slate editor={editor} value={value} onChange={(v) => handleChange(v)}>
        <Editable />
      </Slate>
    </div>
  );
};

export default TextContainer;
