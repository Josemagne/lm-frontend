import { useState, useCallback, SetStateAction, Dispatch, useRef } from "react";
import { useMemo } from "react";
import { withReact, Slate, Editable, RenderElementProps } from "slate-react";
import { createEditor, Node, Descendant, Transforms } from "slate";
import { FieldInputProps } from "formik";
import { LM_Paragraph } from "../../types/slate/paragrahp";
import { useField } from "formik";
import { Editor } from "@tinymce/tinymce-react";

type Props = {
  /**
   * Values from formik
   */
  values?: FieldInputProps<Descendant[]>;
  content?: Descendant[];
  name: string;
};

const TextContainer = ({ values, content, name }: Props) => {
  const editorRef: any = useRef(null);

  // @ts-ignore
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <div className="lm-textcontainer">
      {/* @ts-ignore */}
      {/* <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
        <Editable />
      </Slate> */}
      <Editor
        onInit={(e, editor) => (editorRef.current = editor)}
        initialValue={"<p>hello</p>"}
        init={{
          height: 500,
          menubar: false,
          plugins: [],
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
};

export default TextContainer;
