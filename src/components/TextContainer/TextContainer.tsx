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

type Props = {
  /**
   * Values from formik
   */
  values?: FieldInputProps<Descendant[]>;
  content?: Descendant[];
  chapterId?: number;
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
      if (chapterIndex || chapterIndex === 0) {
        console.log("chapterIndex: ", chapterIndex);
        console.log(entity.chapters[chapterIndex].summary);
        (entityCopy as LM_Book).chapters[chapterIndex].summary = v;
      }
    }
    changeHandler(entityCopy);
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
