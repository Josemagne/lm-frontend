import { useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Editable, withReact, Slate } from "slate-react";

type Props = {};

const SummaryModifier = (props: Props) => {
  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withReact(createEditor()), []);

  const changeHandler = () => {};

  return (
    <div className="lm-summarymodifier">
      <Slate editor={editor} value={value} onChange={changeHandler}>
        <Editable readOnly={false} />
      </Slate>
    </div>
  );
};

export default SummaryModifier;
