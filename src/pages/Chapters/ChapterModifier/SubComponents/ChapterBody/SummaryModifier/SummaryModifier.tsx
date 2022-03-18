import { useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Editable, withReact, Slate } from "slate-react";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";

type Props = {};

const SummaryModifier = (props: Props) => {
  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "Type in here your summary." }],
    },
  ];
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withReact(createEditor()), []);

  const changeHandler = () => {};

  const submitHandler = () => {
    useAppDispatch(changeS);
  };

  return (
    <div className="lm-summarymodifier">
      <Slate editor={editor} value={value} onChange={changeHandler}>
        <Editable readOnly={false} />
      </Slate>
    </div>
  );
};

export default SummaryModifier;
