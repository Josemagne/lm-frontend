import { useState } from "react";
import { useMemo } from "react";
import { withReact, Slate, Editable } from "slate-react";
import { createEditor, Node } from "slate";

type Props = {
  /**
   * Values from formik
   */
  values: any;
};

const TextContainer = (props: Props) => {
  const [value, setValue] = useState<Node[]>([
    {
      type: "paragraph",
      children: [
        {
          text: "Text with a link ",
        },
        {
          type: "link",
          url: "https://kitemaker.co",
          children: [
            {
              text: "https://kitemaker.co",
            },
          ],
        },
        {
          text: " here",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Text with ",
        },
        {
          text: "bold",
          bold: true,
        },
        {
          text: " and ",
        },
        {
          text: "italic",
          italic: true,
        },
        {
          text: " here",
        },
      ],
    },
  ]);
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <div className="lm-textcontainer">
      <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
        <Editable />
      </Slate>
    </div>
  );
};

export default TextContainer;
