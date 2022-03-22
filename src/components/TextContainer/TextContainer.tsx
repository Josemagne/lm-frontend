import { useState, useCallback } from "react";
import { useMemo } from "react";
import { withReact, Slate, Editable, RenderElementProps } from "slate-react";
import { createEditor, Node, Editor, Descendant, Transforms } from "slate";
import { LM_Paragraph } from "../../types/slate/paragrahp";

type Props = {
  /**
   * Values from formik
   */
  values?: any;
  content: Descendant[];
};

const TextContainer = (props: Props) => {
  const [value, setValue] = useState<Descendant[]>([
    {
      children: [{ text: "type here the question" }],
    },
  ]);
  // TODO Create a renderElement
  // const renderElement = useCallback(
  //   ({ attributes, children, element }: RenderElementProps) => {
  //     switch (element.type) {
  //       case "text":
  //         return <p>{element.text}</p>;
  //         break;
  //     }
  //   },
  //   []
  // );

  // @ts-ignore
  const editor = useMemo(() => withReact(createEditor()), []);
  console.log(Node.isNode({ text: "kjlasjdf" }));
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
