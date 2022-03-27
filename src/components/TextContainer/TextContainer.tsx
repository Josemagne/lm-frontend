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

type Props = {
  /**
   * Values from formik
   */
  values?: FieldInputProps<Descendant[]>;
  content?: Descendant[];
  name: string;
  /**
   * The entity whose text field we are manipulating
   */
  entity?: any;
  /**
   * The property of entity we want to change
   */
  propToChange?: string;
  changeHandler?: (newEntity: any) => void;
};

const TextContainer = ({
  values,
  content,
  name,
  changeHandler,
  entity,
  propToChange,
}: Props) => {
  const editorRef: any = useRef(null);

  // @ts-ignore
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(
    content ? content : values ? values.value : [{ children: [{ text: "" }] }]
  );
  const handleChange = (v: Descendant[]) => {
    setValue(v);
    if (!entity) return;
    if (!propToChange) return;
    if (!changeHandler) return;
    entity[propToChange] = v;
    changeHandler(entity);
  };

  return (
    <div className="lm-textcontainer">
      {/* @ts-ignore */}
      <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
        <Editable />
      </Slate>
    </div>
  );
};

export default TextContainer;
