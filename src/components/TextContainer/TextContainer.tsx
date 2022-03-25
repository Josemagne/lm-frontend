import { useState, useCallback, SetStateAction, Dispatch, useRef } from "react";
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
};

const TextContainer = ({ values, content, name }: Props) => {
  const text = values ? values : [{ children: [{ text: "" }] }];
  const editorRef: any = useRef(null);

  // @ts-ignore
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(text);
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
